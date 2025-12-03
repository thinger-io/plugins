#!/usr/bin/env python3
"""
Pre-build script for MkDocs documentation.
Generates the docs structure automatically from plugin README.md, CHANGELOG.md and plugin.json files.

This script generates all documentation in _build/plugins/ directory, keeping the
source plugin directories clean. The generated structure is:

_build/plugins/
└── plugin-name/
    ├── index.md          (from README.md)
    ├── changelog.md      (from CHANGELOG.md)
    ├── plugin_file.md    (from plugin.json)
    ├── assets/           (copied from plugin/assets/)
    ├── *.md              (extra pages from plugin/pages/)
    └── mkdocs.yml        (with docs_dir: . for flat structure)

Run this script before `mkdocs build` or `mkdocs gh-deploy`.
"""

import json
import re
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).parent
MAIN_MKDOCS = REPO_ROOT / "mkdocs.yml"
BUILD_DIR = REPO_ROOT / "_build" / "plugins"

# Directories/files to ignore when scanning for plugins
IGNORE_DIRS = {".github", "docs", "_build", ".cache", "site", "__pycache__"}

# Files that are auto-generated
GENERATED_FILES = {"index.md", "changelog.md", "plugin_file.md"}

# Category display names and order
CATEGORY_ORDER = ["devices", "connectivity", "monitoring", "development", "infrastructure", "templates"]
CATEGORY_NAMES = {
    "connectivity": "Connectivity",
    "devices": "Devices",
    "monitoring": "Monitoring",
    "development": "Development",
    "infrastructure": "Infrastructure",
    "templates": "Templates",
}


def find_plugins() -> list[Path]:
    """Find all plugin directories (those containing a plugin.json file)."""
    plugins = []
    for item in REPO_ROOT.iterdir():
        if item.is_dir() and item.name not in IGNORE_DIRS and not item.name.startswith("."):
            plugin_json = item / "plugin.json"
            if plugin_json.exists():
                plugins.append(item)
    return sorted(plugins, key=lambda p: p.name)


def load_plugin_metadata(plugin_dir: Path) -> dict:
    """Load plugin.json metadata."""
    plugin_json = plugin_dir / "plugin.json"
    with open(plugin_json, "r", encoding="utf-8") as f:
        return json.load(f)


def get_display_name(plugin_data: dict, fallback: str) -> str:
    """Get the display name from plugin.json, preferring metadata.name."""
    # Try metadata.name first (the pretty display name)
    if "metadata" in plugin_data and "name" in plugin_data["metadata"]:
        return plugin_data["metadata"]["name"]
    # Fallback to top-level name or directory name
    return plugin_data.get("name", fallback)


def get_category(plugin_data: dict) -> str:
    """Get the category from plugin.json metadata."""
    if "metadata" in plugin_data and "category" in plugin_data["metadata"]:
        return plugin_data["metadata"]["category"].strip().lower()
    return "other"


def generate_deprecation_warning(plugin_data: dict) -> str:
    """Generate a GitHub-style deprecation warning if plugin is deprecated."""
    deprecated = plugin_data.get("deprecated")
    if not deprecated:
        return ""

    message = deprecated.get("message", "This plugin is no longer maintained")
    replacement = deprecated.get("replacement", "")

    if replacement:
        message = f"{message}. Use [{replacement}](../{replacement}/) instead."

    return f"\n> [!WARNING]\n> {message}\n"


def generate_plugin_docs(plugin_dir: Path, category: str) -> list[str]:
    """
    Generate documentation structure for a single plugin in _build/plugins/<category>/.
    Returns list of extra page names found.
    """
    plugin_name = plugin_dir.name
    plugin_data = load_plugin_metadata(plugin_dir)

    # Output directory in _build/plugins/<category>/<plugin_name>/
    output_dir = BUILD_DIR / category / plugin_name

    # Clean and create output directory
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True)

    # Check for extra pages in source plugin's pages/ folder (if exists)
    extra_pages = []
    source_pages = plugin_dir / "pages"
    if source_pages.exists():
        for md_file in source_pages.glob("*.md"):
            # Copy extra page to build dir
            shutil.copy(md_file, output_dir / md_file.name)
            extra_pages.append(md_file.stem)

    # 1. Generate index.md from README.md
    readme = plugin_dir / "README.md"
    index_file = output_dir / "index.md"
    if readme.exists():
        content = readme.read_text(encoding="utf-8")
        # Inject deprecation warning after first heading if deprecated
        deprecation_warning = generate_deprecation_warning(plugin_data)
        if deprecation_warning:
            # Insert after the first line (title)
            lines = content.split("\n", 1)
            if len(lines) == 2:
                content = lines[0] + "\n" + deprecation_warning + lines[1]
            else:
                content = lines[0] + "\n" + deprecation_warning
        index_file.write_text(content, encoding="utf-8")
    else:
        print(f"  WARNING: {plugin_name} has no README.md")
        index_file.write_text(f"# {plugin_name}\n\nNo documentation available.\n")

    # 2. Generate changelog.md from CHANGELOG.md
    changelog = plugin_dir / "CHANGELOG.md"
    changelog_file = output_dir / "changelog.md"
    if changelog.exists():
        content = changelog.read_text(encoding="utf-8")
        changelog_file.write_text(content, encoding="utf-8")
    else:
        changelog_file.write_text("# Changelog\n\nNo changelog available.\n")

    # 3. Generate plugin_file.md from plugin.json
    plugin_json = plugin_dir / "plugin.json"
    plugin_json_content = plugin_json.read_text(encoding="utf-8")
    plugin_file_content = f'''---
search:
  exclude: true
---

# Plugin file

```` json title="Plugin configuration file"
{plugin_json_content}
````
'''
    (output_dir / "plugin_file.md").write_text(plugin_file_content, encoding="utf-8")

    # 4. Copy assets from plugin root to build
    assets_src = plugin_dir / "assets"
    assets_dst = output_dir / "assets"
    if assets_src.exists():
        shutil.copytree(assets_src, assets_dst)

    # 5. Generate mkdocs.yml for this plugin (with docs_dir: . for flat structure)
    nav_items = ['"index.md"']

    # Add extra pages to navigation (sorted alphabetically)
    for page in sorted(extra_pages):
        # Convert filename to title (get_started -> Get Started)
        title = page.replace("_", " ").replace("-", " ").title()
        nav_items.append(f'{title}: "{page}.md"')

    nav_items.append('Changelog: "changelog.md"')
    nav_items.append('Plugin file: "plugin_file.md"')

    mkdocs_content = f"""site_name: plugins/{category}/{plugin_name}
docs_dir: .

nav:
  - {(chr(10) + "  - ").join(nav_items)}
"""
    (output_dir / "mkdocs.yml").write_text(mkdocs_content, encoding="utf-8")

    return extra_pages


def generate_category_index(category: str, plugins_info: list[tuple[str, str, str, str, bool]]) -> None:
    """
    Generate an index.md for a category with a grid of plugin cards.
    plugins_info is a list of (display_name, plugin_name, description, icon_path, is_deprecated)
    Outputs to docs/plugins/<category>/index.md so MkDocs can find it.
    """
    # Put category index in docs/plugins/<category>/ so MkDocs can find it
    category_dir = REPO_ROOT / "docs" / "plugins" / category
    category_dir.mkdir(parents=True, exist_ok=True)

    category_display = CATEGORY_NAMES.get(category, category.title())

    # Build the cards as custom HTML grid (not using Material cards)
    cards = []
    for display_name, plugin_name, description, icon_path, is_deprecated in plugins_info:
        # Icon path relative to the category index page
        icon_url = f"{plugin_name}/{icon_path}" if icon_path else ""

        if icon_url:
            icon_html = f'<img src="{icon_url}" style="height: 48px; width: 48px; object-fit: contain; flex-shrink: 0;">'
        else:
            icon_html = '<div style="height: 48px; width: 48px; flex-shrink: 0;"></div>'

        card = f'''<a href="{plugin_name}/" class="plugin-card">
  {icon_html}
  <div class="plugin-info">
    <strong>{display_name}</strong>
    <span>{description}</span>
  </div>
</a>'''
        cards.append(card)

    content = f"""# {category_display}

<div class="plugin-grid">
{chr(10).join(cards)}
</div>

<style>
.plugin-grid {{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}}
.plugin-card {{
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem;
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}}
.plugin-card:hover {{
  border-color: var(--md-accent-fg-color);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}}
.plugin-info {{
  display: flex;
  flex-direction: column;
  gap: 4px;
}}
.plugin-info strong {{
  color: var(--md-default-fg-color);
}}
.plugin-info span {{
  font-size: 0.85em;
  color: var(--md-default-fg-color--light);
}}
</style>
"""
    (category_dir / "index.md").write_text(content, encoding="utf-8")


def generate_main_nav_section(categories_data: dict) -> str:
    """Generate the Integrations section for the main mkdocs.yml nav, with category index pages."""
    lines = []

    # Generate nav with category index + plugins (flatter structure)
    for category in CATEGORY_ORDER:
        if category in categories_data:
            category_display = CATEGORY_NAMES.get(category, category.title())
            lines.append(f"      - {category_display}:")
            lines.append(f"        - Overview: 'plugins/{category}/index.md'")
            for display_name, plugin_name, _, _, _ in categories_data[category]:
                lines.append(f"        - {display_name}: '!include ./_build/plugins/{category}/{plugin_name}/mkdocs.yml'")

    # Handle any categories not in CATEGORY_ORDER
    for category in sorted(categories_data.keys()):
        if category not in CATEGORY_ORDER:
            category_display = CATEGORY_NAMES.get(category, category.title())
            lines.append(f"      - {category_display}:")
            lines.append(f"        - Overview: 'plugins/{category}/index.md'")
            for display_name, plugin_name, _, _, _ in categories_data[category]:
                lines.append(f"        - {display_name}: '!include ./_build/plugins/{category}/{plugin_name}/mkdocs.yml'")

    return "\n".join(lines)


def update_main_mkdocs_nav(categories_data: dict):
    """
    Update the main mkdocs.yml with the auto-generated plugin list.
    Replaces content between markers.
    """
    mkdocs_content = MAIN_MKDOCS.read_text(encoding="utf-8")

    # Define markers for the auto-generated section
    start_marker = "    # AUTO-GENERATED-PLUGINS-START"
    end_marker = "    # AUTO-GENERATED-PLUGINS-END"

    nav_content = generate_main_nav_section(categories_data)
    new_section = f"{start_marker}\n    - Integrations:\n{nav_content}\n{end_marker}"

    if start_marker in mkdocs_content and end_marker in mkdocs_content:
        # Replace existing section
        pattern = re.compile(
            re.escape(start_marker) + r".*?" + re.escape(end_marker),
            re.DOTALL
        )
        mkdocs_content = pattern.sub(new_section, mkdocs_content)
        MAIN_MKDOCS.write_text(mkdocs_content, encoding="utf-8")
        print("   Updated main mkdocs.yml with plugin list")
    else:
        # Print instructions for manual integration
        print("\n" + "=" * 60)
        print("Add these markers to mkdocs.yml to enable auto-updates:")
        print("=" * 60)
        print(f"""
  - Plugins:
    - 'plugins/index.md'
    - Managing Plugins: 'plugins/managing.md'
{new_section}
""")
        print("=" * 60 + "\n")


def main():
    from collections import defaultdict

    print("Pre-building documentation structure...")
    print(f"   Repository root: {REPO_ROOT}")

    # Find all plugins
    plugins = find_plugins()
    print(f"\n   Found {len(plugins)} plugins:\n")

    # Group plugins by category and generate docs
    categories_data = defaultdict(list)

    for plugin_dir in plugins:
        plugin_name = plugin_dir.name
        plugin_data = load_plugin_metadata(plugin_dir)
        display_name = get_display_name(plugin_data, plugin_name)
        category = get_category(plugin_data)
        description = plugin_data.get("metadata", {}).get("description", plugin_data.get("description", ""))
        is_deprecated = "deprecated" in plugin_data

        # Generate plugin docs in category subfolder
        extra_pages = generate_plugin_docs(plugin_dir, category)
        extras = f" (+{len(extra_pages)} extra)" if extra_pages else ""
        print(f"   - [{category}] {plugin_name}{extras}")

        # Get icon from metadata.icon with fallback to metadata.image
        metadata = plugin_data.get("metadata", {})
        icon_path = metadata.get("icon", "") or metadata.get("image", "")

        # Store for category index and nav
        categories_data[category].append((display_name, plugin_name, description, icon_path, is_deprecated))

    # Sort plugins within each category by display name
    for category in categories_data:
        categories_data[category].sort(key=lambda x: x[0].lower())

    # Generate category index pages
    print("\n   Generating category index pages...")
    for category, plugins_info in categories_data.items():
        generate_category_index(category, plugins_info)
        print(f"   - {category}/ ({len(plugins_info)} plugins)")

    # Update main mkdocs.yml
    print("")
    update_main_mkdocs_nav(categories_data)

    print("\n   Documentation pre-build complete!")


if __name__ == "__main__":
    main()
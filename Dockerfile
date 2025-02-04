FROM squidfunk/mkdocs-material

RUN pip install \
  mkdocs-git-revision-date-localized-plugin \
  mkdocs-monorepo-plugin \
  mkdocs-rss-plugin \
  "mkdocs-material[imaging]"

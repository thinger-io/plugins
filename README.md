# Thinger.io Marketplace

Official plugin repository for [Thinger.io](https://thinger.io) IoT platform. Plugins extend the platform with integrations for third-party services, device protocols, and data visualization tools.

Browse the marketplace at [marketplace.thinger.io](https://marketplace.thinger.io).

## Repository Structure

```
plugin-name/
├── plugin.json      # Plugin metadata and configuration
├── README.md        # Documentation (rendered in marketplace)
├── CHANGELOG.md     # Version history
├── assets/          # Images and resources
└── task/            # Container definition (if applicable)
    └── Dockerfile
```

## Development

Requires Docker installed.

```bash
make build   # Build Docker image (first time only)
make serve   # Start dev server at http://localhost:9000
```

Changes to `docs/` are hot-reloaded. For plugin changes, restart the server.

## Contributing

See the [contributing guide](https://marketplace.thinger.io/contributing/) for detailed documentation on:

- Plugin structure and required files
- Writing integration plugins
- Developing custom plugins
- Documentation guidelines

## License

MIT License - see [LICENSE](LICENSE) for details.

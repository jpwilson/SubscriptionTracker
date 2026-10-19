# SubTracker MCP Server

This directory contains the Model Context Protocol (MCP) server for SubTracker.

## Setup

```bash
cd mcp-server
npm install
npm run build
```

## Usage

Add to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "subtracker": {
      "command": "node",
      "args": ["./mcp-server/build/index.js"],
      "env": {
        "SUBTRACKER_API_URL": "https://subtracker.app/api",
        "SUBTRACKER_AUTH_TOKEN": "your-token-here"
      }
    }
  }
}
```

See [MCP_SERVER.md](../MCP_SERVER.md) for full documentation.

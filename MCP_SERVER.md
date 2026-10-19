# SubTracker MCP Server

A Model Context Protocol (MCP) server that provides AI assistants with read-only access to user subscription data.

## Features

- **List Subscriptions**: View all active subscriptions for authenticated user
- **Get Stats**: Retrieve monthly/yearly spending statistics
- **Category Breakdown**: See spending by category
- **Upcoming Renewals**: Check subscriptions renewing soon
- **Privacy-First**: Users can only access their own data via authentication token

## Installation

```bash
npm install @subtracker/mcp-server
```

## Configuration

Add to your MCP settings:

```json
{
  "mcpServers": {
    "subtracker": {
      "command": "node",
      "args": ["/path/to/subtracker-mcp/build/index.js"],
      "env": {
        "SUBTRACKER_API_URL": "https://subtracker.app/api",
        "SUBTRACKER_AUTH_TOKEN": "your-personal-token-here"
      }
    }
  }
}
```

## Getting Your Auth Token

1. Log in to [SubTracker](https://subtracker.app)
2. Go to Settings → API Access
3. Generate a personal access token
4. Copy and paste into your MCP configuration

## Available Tools

### `list_subscriptions`
Returns all active subscriptions for the authenticated user.

**Returns:**
```json
{
  "subscriptions": [
    {
      "id": "sub_123",
      "name": "Netflix",
      "cost": 15.99,
      "billingCycle": "monthly",
      "nextBillingDate": "2025-02-01",
      "category": "Entertainment"
    }
  ]
}
```

### `get_spending_stats`
Get monthly and yearly spending statistics.

**Parameters:**
- `period` (optional): "month", "year", "all" (default: "month")

**Returns:**
```json
{
  "monthly": 273.45,
  "yearly": 3281.40,
  "subscriptionCount": 12,
  "avgPerSubscription": 22.79
}
```

### `get_category_breakdown`
See spending organized by category.

**Returns:**
```json
{
  "categories": [
    {
      "name": "Entertainment",
      "total": 45.97,
      "subscriptions": 3
    },
    {
      "name": "Productivity",
      "total": 29.98,
      "subscriptions": 2
    }
  ]
}
```

### `get_upcoming_renewals`
Check subscriptions renewing in the next N days.

**Parameters:**
- `days` (optional): Number of days to look ahead (default: 7)

**Returns:**
```json
{
  "renewals": [
    {
      "name": "Netflix",
      "cost": 15.99,
      "renewalDate": "2025-01-25",
      "daysUntil": 5
    }
  ]
}
```

## Example Usage with AI Assistants

**User**: "What subscriptions do I have?"

**AI**: Uses `list_subscriptions` tool to fetch and display your subscriptions.

**User**: "How much am I spending per month?"

**AI**: Uses `get_spending_stats` tool to show your monthly total.

**User**: "What's renewing this week?"

**AI**: Uses `get_upcoming_renewals` with `days: 7` to show upcoming charges.

## Security

- **Token-based authentication**: Each user has a unique token
- **Read-only access**: MCP server cannot modify or delete data
- **Rate limiting**: 100 requests per hour per token
- **No sensitive data**: Payment methods and financial details are never exposed
- **Revocable tokens**: Generate new tokens anytime from settings

## Privacy

Your subscription data is:
- Only accessible with your personal token
- Never shared with other users
- Never used for training AI models
- Kept private and secure

## API Endpoint

If you prefer REST API instead of MCP:
```
https://subtracker.app/api/mcp/v1/*
```

Requires `Authorization: Bearer YOUR_TOKEN` header.

## Support

- Documentation: https://docs.subtracker.app/mcp
- Issues: https://github.com/jpwilson/SubscriptionTracker/issues
- Email: support@subtracker.app

## License

MIT - See LICENSE file for details

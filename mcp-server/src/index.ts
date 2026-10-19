#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Environment variables
const API_URL = process.env.SUBTRACKER_API_URL || 'https://subtracker.app/api';
const AUTH_TOKEN = process.env.SUBTRACKER_AUTH_TOKEN;

if (!AUTH_TOKEN) {
  console.error('Error: SUBTRACKER_AUTH_TOKEN environment variable is required');
  process.exit(1);
}

// Helper function to make authenticated API requests
async function fetchFromAPI(endpoint: string): Promise<any> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid authentication token. Please check your SUBTRACKER_AUTH_TOKEN.');
    }
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Create MCP server instance
const server = new Server(
  {
    name: 'subtracker',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_subscriptions',
        description: 'List all active subscriptions for the authenticated user. Returns subscription details including name, cost, billing cycle, next billing date, and category.',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'get_spending_stats',
        description: 'Get monthly and yearly spending statistics including total costs, subscription count, and average cost per subscription.',
        inputSchema: {
          type: 'object',
          properties: {
            period: {
              type: 'string',
              enum: ['month', 'year', 'all'],
              description: 'Time period for statistics (default: month)',
              default: 'month',
            },
          },
          required: [],
        },
      },
      {
        name: 'get_category_breakdown',
        description: 'Get spending breakdown by category, showing total spend and subscription count per category.',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'get_upcoming_renewals',
        description: 'Get subscriptions that are renewing in the next N days, with renewal dates and costs.',
        inputSchema: {
          type: 'object',
          properties: {
            days: {
              type: 'number',
              description: 'Number of days to look ahead (default: 7)',
              default: 7,
              minimum: 1,
              maximum: 365,
            },
          },
          required: [],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_subscriptions': {
        const data = await fetchFromAPI('/mcp/subscriptions');
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case 'get_spending_stats': {
        const period = (args as any)?.period || 'month';
        const data = await fetchFromAPI(`/mcp/stats?period=${period}`);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case 'get_category_breakdown': {
        const data = await fetchFromAPI('/mcp/categories');
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case 'get_upcoming_renewals': {
        const days = (args as any)?.days || 7;
        const data = await fetchFromAPI(`/mcp/renewals?days=${days}`);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('SubTracker MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});

# poodle-js

[![npm version](https://badge.fury.io/js/@usepoodle%2Fpoodle-js.svg)](https://www.npmjs.com/package/@usepoodle/poodle-js)
[![Build Status](https://github.com/usepoodle/poodle-js/workflows/CI/badge.svg)](https://github.com/usepoodle/poodle-js/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

JavaScript and TypeScript SDK for Poodle's email sending API.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Features](#features)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install @usepoodle/poodle-js
```

## Quick Start

```typescript
import { PoodleClient, PoodleError } from '@usepoodle/poodle-js';

// Initialize the client with your API key
const client = new PoodleClient({
  apiKey: 'YOUR_POODLE_API_KEY_HERE',
});

// Send an email
async function sendEmail() {
  try {
    const response = await client.sendEmail({
      from: 'sender@yourdomain.com',
      to: 'recipient@example.com',
      subject: 'Hello from Poodle!',
      html: '<h1>Hello!</h1><p>This is a test email.</p>',
    });

    console.log('Email API call successful:', response.message);
  } catch (error: any) {
    console.error('Failed to send email:', error.message);

    if (error instanceof PoodleError) {
      console.error('Status Code:', error.statusCode);
      console.error('Specific Details:', error.details);
    }
  }
}

sendEmail();
```

For more usage patterns, including sending text-only emails, see the [examples](./examples) directory.

## Features

- **Intuitive API**: Get started in minutes.
- **TypeScript First**: Robust type safety out-of-the-box.
- **Modern Async**: Clean async/await for non-blocking operations.
- **Detailed Errors**: Understand and debug issues quickly with PoodleError objects.
- **Flexible Content**: Send rich HTML or plain text emails easily.

## API Reference

### PoodleClient

The main class for interacting with the Poodle API.

#### Constructor

```typescript
new PoodleClient(options: PoodleClientOptions)
```

Options:

- `apiKey` (required): Your Poodle API key
- `baseUrl` (optional): Custom API base URL (defaults to production API)

#### Methods

##### sendEmail

```typescript
sendEmail(options: SendEmailOptions): Promise<SendEmailResponse>
```

Options:

- `from` (required): Sender email address
- `to` (required): Recipient email address
- `subject` (required): Email subject line
- `html` (optional): HTML content of the email
- `text` (optional): Plain text content of the email

At least one of `html` or `text` must be provided.

Response:

- `success`: `boolean` - Indicates if the email was successfully queued (typically `true` for a successful call).
- `message`: `string` - A confirmation message from the API (e.g., "Email queued for sending").

## Error Handling

The SDK throws `PoodleError` instances for API-related errors. Each error includes:

- `message`: Human-readable error message (from the API's `message` field).
- `statusCode`: HTTP status code (if applicable).
- `details`: Detailed error information or specific error code from the API (from the API's `error` field in the JSON response, if available).

Common error scenarios:

- Invalid API key (401)
- Rate limiting (429)
- Invalid email addresses (400)
- Account issues (402)

## Examples

Check the [examples](./examples) directory for more usage examples.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build

# Run linter
npm run lint

# Format code
npm run format
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on the process for submitting pull requests and our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

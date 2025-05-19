# poodle-js

JavaScript and TypeScript SDK for Poodle's email sending API.

## Installation

```bash
npm install poodle-js
# or
yarn add poodle-js
```

## Quick Start

```typescript
import { PoodleClient } from 'poodle-js';

// Initialize the client with your API key
const client = new PoodleClient({
  apiKey: 'your-api-key-here',
});

// Send an email
async function sendEmail() {
  try {
    const response = await client.sendEmail({
      from: 'sender@yourdomain.com',
      to: 'recipient@example.com',
      subject: 'Hello from Poodle!',
      html: '<h1>Hello!</h1><p>This is a test email.</p>',
      text: 'Hello! This is a test email.',
    });

    console.log('Email sent successfully!', response.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
```

## Features

- Simple and intuitive API
- TypeScript support with full type definitions
- Promise-based async/await interface
- Comprehensive error handling
- Supports both HTML and plain text emails

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

- `status`: 'queued' | 'failed'
- `messageId`: Unique identifier for the email (if queued)
- `error`: Error message (if failed)

## Error Handling

The SDK throws `PoodleError` instances for API-related errors. Each error includes:

- `message`: Human-readable error message
- `statusCode`: HTTP status code (if applicable)
- `code`: Error code from the API (if available)

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

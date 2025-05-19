# Poodle SDK Examples

This directory contains examples of how to use the Poodle JavaScript/TypeScript SDK.

## Running the Examples

Before running the examples, make sure you have installed the required dependencies:

```bash
npm install
```

### TypeScript Example

```bash
# Make sure the SDK is built
npm run build

# Run the TypeScript example
npx ts-node examples/send-email.ts
```

### JavaScript Example

```bash
# Make sure the SDK is built
npm run build

# Run the JavaScript example
node examples/send-email.js
```

## Customizing the Examples

To use the examples with your own Poodle account:

1. Replace `'your-api-key-here'` with your actual Poodle API key
2. Replace the sender and recipient email addresses with valid addresses
3. Customize the email content as needed

## List of Examples

- `send-email.ts` - Demonstrates how to send an email using TypeScript
- `send-email.js` - Demonstrates how to send an email using JavaScript (CommonJS)

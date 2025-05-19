/**
 * Configuration options for the Poodle client
 */
export interface PoodleClientOptions {
  /**
   * The API key for authentication with Poodle's API
   */
  apiKey: string;
  /**
   * Optional base URL for the Poodle API (defaults to production URL)
   */
  baseUrl?: string;
}

/**
 * Parameters for sending an email
 */
export interface SendEmailOptions {
  /**
   * Email address of the sender
   */
  from: string;
  /**
   * Email address of the recipient
   */
  to: string;
  /**
   * Subject line of the email
   */
  subject: string;
  /**
   * HTML content of the email (optional if text is provided)
   */
  html?: string;
  /**
   * Plain text content of the email (optional if html is provided)
   */
  text?: string;
}

/**
 * Response from the send email API
 */
export interface SendEmailResponse {
  /**
   * Indicates if the request was successful in queueing the email.
   * For a 202 response, this will be true.
   */
  success: boolean;
  /**
   * Confirmation message from the API.
   * e.g., "Email queued for sending"
   */
  message: string;
}

/**
 * Custom error class for Poodle API errors
 */
export class PoodleError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: string
  ) {
    super(message);
    this.name = 'PoodleError';
  }
}

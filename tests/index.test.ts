import axios from 'axios';
import { PoodleClient } from '../src';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PoodleClient', () => {
  const defaultOptions = {
    apiKey: 'test-api-key',
  };

  let mockPost: jest.Mock;

  beforeEach(() => {
    mockPost = jest.fn();
    mockedAxios.create.mockReturnValue({
      post: mockPost,
      defaults: {
        baseURL: 'https://api.usepoodle.com/v1',
      },
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should throw error if apiKey is not provided', () => {
      expect(() => new PoodleClient({} as any)).toThrow('API key is required');
    });

    it('should create axios instance with correct config', () => {
      new PoodleClient(defaultOptions);
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.usepoodle.com/v1',
        headers: {
          Authorization: 'Bearer test-api-key',
          'Content-Type': 'application/json',
          'User-Agent': 'poodle-js/0.1.0',
        },
      });
    });
  });

  describe('sendEmail', () => {
    let client: PoodleClient;
    const validEmailOptions = {
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'Hello World',
    };

    beforeEach(() => {
      client = new PoodleClient(defaultOptions);
    });

    it('should validate required fields', async () => {
      await expect(client.sendEmail({} as any)).rejects.toThrow(
        'From address is required'
      );
      await expect(
        client.sendEmail({ from: 'test@example.com' } as any)
      ).rejects.toThrow('To address is required');
      await expect(
        client.sendEmail({
          from: 'test@example.com',
          to: 'test@example.com',
        } as any)
      ).rejects.toThrow('Subject is required');
      await expect(
        client.sendEmail({
          from: 'test@example.com',
          to: 'test@example.com',
          subject: 'Test',
        })
      ).rejects.toThrow('Either html or text content is required');
    });

    it('should send email successfully', async () => {
      const responseData = { status: 'queued', messageId: '123' };
      mockPost.mockResolvedValueOnce({ data: responseData });

      const result = await client.sendEmail(validEmailOptions);
      expect(result).toEqual(responseData);
      expect(mockPost).toHaveBeenCalledWith('/send-email', validEmailOptions);
    });

    it('should handle API errors', async () => {
      const errorData = {
        message: 'Invalid email address',
        code: 'INVALID_EMAIL',
      };

      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: errorData,
        },
      };

      mockPost.mockRejectedValueOnce(axiosError);

      await expect(client.sendEmail(validEmailOptions)).rejects.toEqual(
        expect.objectContaining({
          message: errorData.message,
          statusCode: 400,
          code: errorData.code,
        })
      );
    });
  });
});

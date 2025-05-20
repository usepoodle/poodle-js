import axios from 'axios';
import { PoodleClient, PoodleClientOptions, SendEmailOptions } from '../src';

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
    } as unknown as import('axios').AxiosInstance);
    mockedAxios.isAxiosError.mockImplementation(
      (payload: unknown): payload is import('axios').AxiosError => {
        return (
          typeof payload === 'object' &&
          payload !== null &&
          (payload as { isAxiosError?: boolean }).isAxiosError === true
        );
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should throw error if apiKey is not provided', () => {
      expect(
        () => new PoodleClient({} as unknown as PoodleClientOptions)
      ).toThrow('API key is required');
    });

    it('should create axios instance with correct config', () => {
      new PoodleClient(defaultOptions);
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.usepoodle.com/v1',
        headers: {
          Authorization: 'Bearer test-api-key',
          'Content-Type': 'application/json',
          'User-Agent': 'poodle-js/0.2.0',
        },
      });
    });
  });

  describe('sendEmail', () => {
    let client: PoodleClient;
    const validEmailOptions: SendEmailOptions = {
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'Hello World',
    };

    beforeEach(() => {
      client = new PoodleClient(defaultOptions);
    });

    it('should validate required fields', async () => {
      await expect(
        client.sendEmail({} as unknown as SendEmailOptions)
      ).rejects.toThrow('From address is required');
      await expect(
        client.sendEmail({
          from: 'test@example.com',
        } as unknown as SendEmailOptions)
      ).rejects.toThrow('To address is required');
      await expect(
        client.sendEmail({
          from: 'test@example.com',
          to: 'test@example.com',
        } as unknown as SendEmailOptions)
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
      const responseData = {
        success: true,
        message: 'Email queued for sending',
      };
      mockPost.mockResolvedValueOnce({ data: responseData });

      const result = await client.sendEmail(validEmailOptions);
      expect(result).toEqual(responseData);
      expect(mockPost).toHaveBeenCalledWith('/send-email', validEmailOptions);
    });

    it('should handle API errors', async () => {
      const errorData = {
        message: 'Invalid email address',
        error: 'You used an invalid email address for the "to" field',
      };

      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: errorData,
        },
        config: {},
        request: {},
        name: 'AxiosError',
        message: 'Request failed with status code 400',
        toJSON: (): object => ({}),
      };

      mockPost.mockRejectedValueOnce(axiosError);

      await expect(client.sendEmail(validEmailOptions)).rejects.toEqual(
        expect.objectContaining({
          message: errorData.message,
          statusCode: 400,
          details: errorData.error,
        })
      );
    });
  });
});

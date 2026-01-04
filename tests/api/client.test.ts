import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { z } from 'zod';
import { api, ApiError } from '@/lib/api/client';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe('API Client', () => {
  /**
   * Property 3: API Client Credential Inclusion
   * For any API request made through the API_Client, the request SHALL include `credentials: 'include'` header.
   * Validates: Requirements 2.2
   */
  describe('Property 3: API Client Credential Inclusion', () => {
    it('should include credentials for all GET requests', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes('/')),
          async (endpoint) => {
            mockFetch.mockResolvedValueOnce({
              ok: true,
              json: async () => ({}),
            });

            await api.get(endpoint);

            expect(mockFetch).toHaveBeenCalledWith(
              expect.any(String),
              expect.objectContaining({
                credentials: 'include',
              })
            );
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should include credentials for all POST requests', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes('/')),
          fc.jsonValue(),
          async (endpoint, body) => {
            mockFetch.mockResolvedValueOnce({
              ok: true,
              json: async () => ({}),
            });

            await api.post(endpoint, body);

            expect(mockFetch).toHaveBeenCalledWith(
              expect.any(String),
              expect.objectContaining({
                credentials: 'include',
              })
            );
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should include credentials for all PUT requests', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes('/')),
          fc.jsonValue(),
          async (endpoint, body) => {
            mockFetch.mockResolvedValueOnce({
              ok: true,
              json: async () => ({}),
            });

            await api.put(endpoint, body);

            expect(mockFetch).toHaveBeenCalledWith(
              expect.any(String),
              expect.objectContaining({
                credentials: 'include',
              })
            );
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should include credentials for all DELETE requests', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes('/')),
          async (endpoint) => {
            mockFetch.mockResolvedValueOnce({
              ok: true,
              json: async () => ({}),
            });

            await api.delete(endpoint);

            expect(mockFetch).toHaveBeenCalledWith(
              expect.any(String),
              expect.objectContaining({
                credentials: 'include',
              })
            );
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 4: API Response Validation
   * For any API response received, if a Zod schema is provided, THE API_Client SHALL validate the response.
   * Validates: Requirements 2.3
   */
  describe('Property 4: API Response Validation', () => {
    it('should validate response against provided schema', async () => {
      const schema = z.object({
        id: z.number(),
        name: z.string(),
      });

      await fc.assert(
        fc.asyncProperty(
          fc.record({
            id: fc.integer(),
            name: fc.string(),
          }),
          async (validData) => {
            mockFetch.mockResolvedValueOnce({
              ok: true,
              json: async () => validData,
            });

            const result = await api.get('test', schema);
            expect(result).toEqual(validData);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should throw ZodError for invalid response when schema provided', async () => {
      const schema = z.object({
        id: z.number(),
        name: z.string(),
      });

      await fc.assert(
        fc.asyncProperty(
          fc.record({
            id: fc.string(), // Wrong type - should be number
            name: fc.integer(), // Wrong type - should be string
          }),
          async (invalidData) => {
            mockFetch.mockResolvedValueOnce({
              ok: true,
              json: async () => invalidData,
            });

            await expect(api.get('test', schema)).rejects.toThrow(z.ZodError);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 5: API Error Typing
   * For any failed API request, THE API_Client SHALL throw an ApiError with status code and message.
   * Validates: Requirements 2.4
   */
  describe('Property 5: API Error Typing', () => {
    it('should throw ApiError with status and message for failed requests', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.integer({ min: 400, max: 599 }),
          fc.string({ minLength: 1, maxLength: 100 }),
          async (status, message) => {
            mockFetch.mockResolvedValueOnce({
              ok: false,
              status,
              json: async () => ({ message }),
            });

            try {
              await api.get('test');
              expect.fail('Should have thrown');
            } catch (error) {
              expect(error).toBeInstanceOf(ApiError);
              expect((error as ApiError).status).toBe(status);
              expect((error as ApiError).message).toBe(message);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle JSON parse errors gracefully', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.integer({ min: 400, max: 599 }),
          async (status) => {
            mockFetch.mockResolvedValueOnce({
              ok: false,
              status,
              json: async () => { throw new Error('Invalid JSON'); },
            });

            try {
              await api.get('test');
              expect.fail('Should have thrown');
            } catch (error) {
              expect(error).toBeInstanceOf(ApiError);
              expect((error as ApiError).status).toBe(status);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});

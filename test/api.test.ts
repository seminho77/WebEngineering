import { describe, it, expect, vi } from 'vitest';
import { fetchBearData, fetchImageUrl } from '../src/api';

global.fetch = vi.fn();

describe('API functions', () => {
  it('fetchBearData should fetch and return wikitext', async () => {
    const mockResponse = { parse: { wikitext: { '*': 'mocked data' } } };
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchBearData('List_of_ursids');
    expect(result).toBe('mocked data');
  });

  it('fetchImageUrl should return a URL if available', async () => {
    const mockResponse = {
      query: {
        pages: {
          '1': {
            imageinfo: [{ url: 'http://example.com/image.jpg' }],
          },
        },
      },
    };
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchImageUrl('bear.jpg');
    expect(result).toBe('http://example.com/image.jpg');
  });

  it('fetchImageUrl should return an empty string if no image found', async () => {
    const mockResponse = { query: { pages: { '1': {} } } };
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchImageUrl('nonexistent.jpg');
    expect(result).toBe('');
  });
});

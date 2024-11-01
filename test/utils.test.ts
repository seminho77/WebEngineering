import { describe, it, expect, vi } from 'vitest';
import { checkImageAvailability } from '../src/utils';

global.fetch = vi.fn();

describe('Utility functions', () => {
  it('checkImageAvailability should return the URL if the image exists', async () => {
    (fetch as vi.Mock).mockResolvedValue({ ok: true });

    const url = 'http://example.com/image.jpg';
    const result = await checkImageAvailability(url);
    expect(result).toBe(url);
  });

  it('checkImageAvailability should return placeholder URL if the image does not exist', async () => {
    (fetch as vi.Mock).mockResolvedValue({ ok: false });

    const url = 'http://example.com/nonexistent.jpg';
    const result = await checkImageAvailability(url);
    expect(result).toBe(
      'https://via.placeholder.com/200x200.png?text=Image+Not+Available'
    );
  });
});

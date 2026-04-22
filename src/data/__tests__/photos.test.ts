import { describe, it, expect } from 'vitest';
import { photos, type Photo } from '../photos';

describe('photos data', () => {
  it('exports a photos array', () => {
    expect(Array.isArray(photos)).toBe(true);
  });

  it('has at least one photo', () => {
    expect(photos.length).toBeGreaterThan(0);
  });

  it('each photo has required fields', () => {
    photos.forEach((photo: Photo) => {
      expect(photo).toHaveProperty('id');
      expect(photo).toHaveProperty('src');
      expect(photo).toHaveProperty('alt');
      expect(photo).toHaveProperty('category');
      expect(photo).toHaveProperty('title');
    });
  });

  it('category is one of the valid values', () => {
    const validCategories = ['landscape', 'portrait', 'commercial'];
    photos.forEach((photo: Photo) => {
      expect(validCategories).toContain(photo.category);
    });
  });

  it('has photos from each category', () => {
    const categories = photos.map((p) => p.category);
    expect(categories).toContain('landscape');
    expect(categories).toContain('portrait');
    expect(categories).toContain('commercial');
  });
});

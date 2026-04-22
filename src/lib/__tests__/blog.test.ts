import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('fs', () => ({
  default: {
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
  },
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
}));

import * as fs from 'fs';
import { getAllPosts, getPostBySlug } from '../blog';

const MOCK_FILE_CONTENT = `---
title: Test Post
date: 2026-01-01
excerpt: This is a test post excerpt.
tags: [test, demo]
---

# Hello World

This is the post content.
`;

const MOCK_FILE_CONTENT_2 = `---
title: Second Post
date: 2026-02-01
excerpt: Second post excerpt.
tags: [second]
---

Second post content.
`;

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getAllPosts', () => {
  it('returns posts sorted by date descending', () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['first-post.md', 'second-post.md'] as never);
    vi.mocked(fs.readFileSync).mockImplementation((filePath: unknown) => {
      if (String(filePath).includes('first-post')) return MOCK_FILE_CONTENT;
      return MOCK_FILE_CONTENT_2;
    });

    const posts = getAllPosts();

    expect(posts).toHaveLength(2);
    expect(posts[0].slug).toBe('second-post');
    expect(posts[1].slug).toBe('first-post');
  });

  it('ignores non-.md files', () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['post.md', '.DS_Store', 'readme.txt'] as never);
    vi.mocked(fs.readFileSync).mockReturnValue(MOCK_FILE_CONTENT);

    const posts = getAllPosts();
    expect(posts).toHaveLength(1);
  });

  it('returns correct metadata shape', () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['test-post.md'] as never);
    vi.mocked(fs.readFileSync).mockReturnValue(MOCK_FILE_CONTENT);

    const [post] = getAllPosts();
    expect(post.slug).toBe('test-post');
    expect(post.title).toBe('Test Post');
    expect(post.date).toBe('2026-01-01');
    expect(post.excerpt).toBe('This is a test post excerpt.');
    expect(post.tags).toEqual(['test', 'demo']);
  });
});

describe('getPostBySlug', () => {
  it('returns post with content when slug exists', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(MOCK_FILE_CONTENT);

    const post = getPostBySlug('test-post');
    expect(post).not.toBeNull();
    expect(post!.title).toBe('Test Post');
    expect(post!.content).toContain('Hello World');
  });

  it('returns null when slug does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const post = getPostBySlug('nonexistent');
    expect(post).toBeNull();
  });
});

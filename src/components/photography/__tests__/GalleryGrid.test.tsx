import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src as string} alt={props.alt as string} />;
  },
}));

import GalleryGrid from '../GalleryGrid';
import type { Photo } from '@/data/photos';

const mockPhotos: Photo[] = [
  { id: '1', src: '/photos/placeholder.jpg', alt: 'Landscape', category: 'landscape', title: 'Mountain View' },
  { id: '2', src: '/photos/placeholder.jpg', alt: 'Portrait', category: 'portrait', title: 'Studio Portrait' },
  { id: '3', src: '/photos/placeholder.jpg', alt: 'Commercial', category: 'commercial', title: 'Product Shoot' },
];

describe('GalleryGrid', () => {
  it('renders all photos by default', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });

  it('renders category tab buttons', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    expect(screen.getByRole('button', { name: 'all' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'landscape' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'portrait' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'commercial' })).toBeInTheDocument();
  });

  it('filters photos by category on tab click', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    fireEvent.click(screen.getByRole('button', { name: 'landscape' }));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('shows all photos when all tab is clicked', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    fireEvent.click(screen.getByRole('button', { name: 'landscape' }));
    fireEvent.click(screen.getByRole('button', { name: 'all' }));
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });

  it('shows photo title on each grid item', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    expect(screen.getByText('Mountain View')).toBeInTheDocument();
    expect(screen.getByText('Studio Portrait')).toBeInTheDocument();
    expect(screen.getByText('Product Shoot')).toBeInTheDocument();
  });
});

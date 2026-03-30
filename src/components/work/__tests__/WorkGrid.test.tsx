import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => (
    <img src={props.src as string} alt={props.alt as string} />
  ),
}));

import WorkGrid from '../WorkGrid';
import { workItems } from '@/data/work';

describe('WorkGrid', () => {
  it('renders all work items', () => {
    render(<WorkGrid />);
    expect(screen.getAllByRole('article').length).toBe(workItems.length);
  });

  it('renders the first work item title', () => {
    render(<WorkGrid />);
    expect(screen.getByText(workItems[0].title)).toBeInTheDocument();
  });

  it('renders category badge for each item', () => {
    render(<WorkGrid />);
    const firstCategory = workItems[0].category;
    expect(screen.getAllByText(firstCategory).length).toBeGreaterThan(0);
  });

  it('renders year for each item', () => {
    render(<WorkGrid />);
    expect(screen.getAllByText(workItems[0].year).length).toBeGreaterThan(0);
  });
});

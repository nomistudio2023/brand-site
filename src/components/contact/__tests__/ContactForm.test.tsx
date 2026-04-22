import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockPush = vi.fn();
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

import ContactForm from '../ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText('namePlaceholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('emailPlaceholder')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /serviceLabel/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('messagePlaceholder')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: 'submitButton' })).toBeInTheDocument();
  });

  it('shows error message when form submission fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: () => Promise.resolve({ success: false }) }));
    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText('namePlaceholder'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('emailPlaceholder'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('messagePlaceholder'), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: 'submitButton' }));
    await waitFor(() => {
      expect(screen.getByText('errorMessage')).toBeInTheDocument();
    });
  });

  it('redirects to /thank-you on successful submission', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ success: true }) }));
    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText('namePlaceholder'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('emailPlaceholder'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('messagePlaceholder'), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: 'submitButton' }));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/thank-you');
    });
  });
});

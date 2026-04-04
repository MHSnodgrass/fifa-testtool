import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Events from './Events';
import { getAllEvents } from '../api/client';
import type { EventResponse } from '../types/api';

// 1. Mock the API client module so we don't actually make network requests
vi.mock('../api/client', () => ({
  getAllEvents: vi.fn(),
  getEventsByStage: vi.fn()
}));

describe('Events Page Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the initial idle state', () => {
    render(<Events />);

    // Assert the default UI state before any searches happen
    expect(screen.getByText(/Select your filters and click Search/i)).toBeInTheDocument();
    expect(screen.getByText('Current Filter:')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
  });

  it('fetches and displays events when searching', async () => {
    // Arrange: Setup our mock API to return 1 fake match
    const mockData: Partial<EventResponse>[] = [
      { id: 1, matchDate: '2026-06-11', homeScore: 1, awayScore: 0, status: 'FINISHED' }
    ];
    vi.mocked(getAllEvents).mockResolvedValueOnce(mockData as EventResponse[]);

    render(<Events />);

    // Act: Click the search button
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    // Assert: We must use waitFor() because fetching data is asynchronous!
    await waitFor(() => {
      // 1. Did we call the right API?
      expect(getAllEvents).toHaveBeenCalledTimes(1);

      // 2. Did the heading update correctly?
      // Since "All Stages" is also an option in the dropdown, we find the heading specifically!
      expect(
        screen.getByRole('heading', { name: /current filter:\s*all stages/i })
      ).toBeInTheDocument();

      // 3. Did the MatchCard render our fake score?
      expect(screen.getByText('1 - 0')).toBeInTheDocument();
    });
  });

  it('shows an error message if the API fails', async () => {
    // Arrange: Force the mock API to fail
    vi.mocked(getAllEvents).mockRejectedValueOnce(new Error('Network failure'));

    render(<Events />);

    // Act: Search
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    // Assert: Wait for the React state to update and display the error box
    await waitFor(() => {
      expect(screen.getByText('System Error')).toBeInTheDocument();
      expect(screen.getByText('Network failure')).toBeInTheDocument();
    });
  });

  it('shows empty state when search returns no results', async () => {
    // Arrange: Return an empty array
    vi.mocked(getAllEvents).mockResolvedValueOnce([]);

    render(<Events />);

    // Act: Search
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    // Assert: Wait for the empty state message
    await waitFor(() => {
      expect(screen.getByText('No events found for this filter combination.')).toBeInTheDocument();
    });
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Teams from './Teams';
import { getAllTeams } from '../api/client';
import type { TeamResponse } from '../types/api';

// Mock the API client
vi.mock('../api/client', () => ({
  getAllTeams: vi.fn()
}));

describe('Teams Page Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Setup a promise that won't resolve immediately to test loading state
    vi.mocked(getAllTeams).mockReturnValueOnce(new Promise(() => {}));

    render(<Teams />);

    expect(screen.getByText(/Fetching Teams.../i)).toBeInTheDocument();
  });

  it('fetches and displays teams', async () => {
    // Setup our mock API to return 2 fake teams
    const mockData: Partial<TeamResponse>[] = [
      { id: 1, countryName: 'Canada', countryCode: 'CAN', flagUrl: '/assets/flags/can.svg' },
      { id: 2, countryName: 'Mexico', countryCode: 'MEX', flagUrl: '/assets/flags/mex.svg' }
    ];
    vi.mocked(getAllTeams).mockResolvedValueOnce(mockData as TeamResponse[]);

    render(<Teams />);

    // Wait for the teams to be displayed
    await waitFor(() => {
      // Did we call the API?
      expect(getAllTeams).toHaveBeenCalledTimes(1);

      // Are the team counts correct?
      expect(screen.getByText('2')).toBeInTheDocument();

      // Are the country names present?
      expect(screen.getByText('Canada')).toBeInTheDocument();
      expect(screen.getByText('Mexico')).toBeInTheDocument();
    });
  });

  it('shows an error message if the API fails', async () => {
    // Force the mock API to fail
    vi.mocked(getAllTeams).mockRejectedValueOnce(new Error('Network failure'));

    render(<Teams />);

    // Wait for the error box
    await waitFor(() => {
      expect(screen.getByText('System Error')).toBeInTheDocument();
      expect(screen.getByText('Network failure')).toBeInTheDocument();
    });
  });
});

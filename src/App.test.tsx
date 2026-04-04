import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// We mock the API client because the Events page (the default route)
// might try to use them, and we want to keep our tests isolated from network calls.
vi.mock('./api/client', () => ({
  getAllEvents: vi.fn(),
  getEventsByStage: vi.fn(),
  getAllTeams: vi.fn().mockResolvedValue([])
}));

describe('App Root & Routing', () => {
  it('renders the TopBar, Sidebar, and defaults to the Events page', () => {
    // App contains the <BrowserRouter>, so jsdom will handle routing perfectly!
    render(<App />);

    // 1. Verify TopBar rendered
    expect(screen.getByText('FIFA WORLD CUP')).toBeInTheDocument();
    expect(screen.getByText('TEST TOOL')).toBeInTheDocument();

    // 2. Verify Sidebar rendered (by checking for a navigation link)
    expect(screen.getByRole('link', { name: /teams/i })).toBeInTheDocument();

    // 3. Verify Default Route is the Events Page
    // (We know it's the events page if we see its unique heading)
    expect(screen.getByText('Current Filter:')).toBeInTheDocument();
  });

  it('updates the URL when navigating via the Sidebar', async () => {
    render(<App />);

    // Act: Find the "Teams" link in the sidebar and click it
    const teamsLink = screen.getByRole('link', { name: /teams/i });
    await userEvent.click(teamsLink);

    // Assert: The jsdom environment updates the window location just like a real browser!
    expect(window.location.pathname).toBe('/teams');
  });
});

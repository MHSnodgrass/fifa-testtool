import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import MatchCard from './MatchCard';
import type { EventResponse } from '../types/api';

// A helper to generate a fake match event so we don't have to type this out every time
const createMockEvent = (overrides?: Partial<EventResponse>): EventResponse => ({
  id: 1,
  matchNumber: 1,
  stage: 'GROUP',
  groupLetter: 'A',
  homeTeam: {
    id: 1,
    countryName: 'Canada',
    countryCode: 'CAN',
    groupLetter: 'A',
    flagUrl: '/assets/flags/can.svg',
    logoUrl: null,
    fifaRanking: null,
    managerName: null,
    stats: null
  },
  awayTeam: {
    id: 2,
    countryName: 'Mexico',
    countryCode: 'MEX',
    groupLetter: 'A',
    flagUrl: '/assets/flags/mex.svg',
    logoUrl: null,
    fifaRanking: null,
    managerName: null,
    stats: null
  },
  homeTeamPlaceholder: null,
  awayTeamPlaceholder: null,
  matchDate: '2026-06-11',
  kickoffTime: '12:00',
  kickoffUtc: '16:00',
  arenaName: 'BMO Field',
  city: 'Toronto',
  status: 'FINISHED',
  homeScore: 2,
  awayScore: 1,
  winnerTeam: null,
  isDraw: false,
  hasExtraTime: false,
  hasPenalties: false,
  ...overrides
});

describe('MatchCard', () => {
  it('renders team names, flags, and the correct score', () => {
    const mockEvent = createMockEvent();

    render(<MatchCard event={mockEvent} />);

    // 1. Verify Team Names
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText('Mexico')).toBeInTheDocument();

    // 2. Verify Score
    expect(screen.getByText('2 - 1')).toBeInTheDocument();

    // 3. Verify Flags (Find images by their alt text)
    const homeFlag = screen.getByAltText('Canada');
    expect(homeFlag).toHaveAttribute('src', '/assets/flags/can.svg');

    const awayFlag = screen.getByAltText('Mexico');
    expect(awayFlag).toHaveAttribute('src', '/assets/flags/mex.svg');
  });

  it('renders ? - ? when the match has no score yet', () => {
    // Override the default mock to pretend the match hasn't started
    const scheduledEvent = createMockEvent({
      homeScore: null,
      awayScore: null,
      status: 'SCHEDULED'
    });

    render(<MatchCard event={scheduledEvent} />);

    expect(screen.getByText('? - ?')).toBeInTheDocument();
  });

  it('renders team placeholders when teams are not decided yet (e.g. knockouts)', () => {
    // Override to simulate a future knockout match
    const knockoutEvent = createMockEvent({
      homeTeam: null,
      awayTeam: null,
      homeTeamPlaceholder: 'Winner Match 49',
      awayTeamPlaceholder: 'Winner Match 50'
    });

    render(<MatchCard event={knockoutEvent} />);

    // The component should display the placeholder strings
    expect(screen.getByText('Winner Match 49')).toBeInTheDocument();
    expect(screen.getByText('Winner Match 50')).toBeInTheDocument();
  });

  it('falls back to country codes if the flag URL is missing', () => {
    // Override to remove flags
    const noFlagEvent = createMockEvent({
      homeTeam: { ...createMockEvent().homeTeam!, flagUrl: null },
      awayTeam: { ...createMockEvent().awayTeam!, flagUrl: null }
    });

    render(<MatchCard event={noFlagEvent} />);

    // Because there are no images, the alt-text query shouldn't find anything
    expect(screen.queryByAltText('Canada')).not.toBeInTheDocument();

    // But it should render the country codes in the fallback spans
    expect(screen.getByText('CAN')).toBeInTheDocument();
    expect(screen.getByText('MEX')).toBeInTheDocument();
  });

  it('opens and closes the inspect modal, displaying team stats', async () => {
    // Add stats to the mock event
    const eventWithStats = createMockEvent({
      homeTeam: {
        ...createMockEvent().homeTeam!,
        stats: {
          matchesPlayed: 3,
          wins: 2,
          draws: 1,
          losses: 0,
          goalsFor: 5,
          goalsAgainst: 2,
          goalDifference: 3,
          groupPoints: 7,
          yellowCards: 2,
          redCards: 0,
          eliminated: false
        }
      },
      awayTeam: {
        ...createMockEvent().awayTeam!,
        stats: {
          matchesPlayed: 3,
          wins: 1,
          draws: 0,
          losses: 2,
          goalsFor: 3,
          goalsAgainst: 4,
          goalDifference: -1,
          groupPoints: 3,
          yellowCards: 4,
          redCards: 1,
          eliminated: false
        }
      }
    });

    render(<MatchCard event={eventWithStats} />);

    // Modal should not be in the document initially
    expect(screen.queryByText('Match Statistics')).not.toBeInTheDocument();

    // Click "Inspect"
    await userEvent.click(screen.getByText('Inspect'));

    // Modal should appear
    expect(screen.getByText('Match Statistics')).toBeInTheDocument();

    // Raw Event Data should be displayed
    expect(screen.getByText('Raw Event Data')).toBeInTheDocument();
    expect(screen.getByText('Event ID')).toBeInTheDocument();
    expect(screen.getByText('Match Number')).toBeInTheDocument();
    expect(screen.getByText('Arena Name')).toBeInTheDocument();

    // Check specific raw data values
    expect(screen.getByText('BMO Field')).toBeInTheDocument();
    expect(screen.getByText('Toronto')).toBeInTheDocument();

    // Team Statistics Comparison should be displayed
    expect(screen.getByText('Team Statistics Comparison')).toBeInTheDocument();

    // Stats should be displayed (checking a few labels and values)
    expect(screen.getByText('Played')).toBeInTheDocument();

    // Check specific stat values like '5' for Goals For (home team) and '-1' for Goal Diff (away team)
    expect(screen.getByText('GF')).toBeInTheDocument();
    expect(screen.getAllByText('5').length).toBeGreaterThan(0);
    expect(screen.getAllByText('-1').length).toBeGreaterThan(0);

    // Close the modal
    await userEvent.click(screen.getByRole('button', { name: /close modal/i }));

    // Modal should be gone
    expect(screen.queryByText('Match Statistics')).not.toBeInTheDocument();
  });
});

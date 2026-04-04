import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllEvents, getEventsByStage, getAllTeams, getTeamsByGroup } from './client';

// 1. Mock the global fetch function provided by the browser/jsdom
const mockFetch = vi.fn();
globalThis.fetch = mockFetch as any;

describe('API Client', () => {
  // 2. Clear out any previous calls to the mock before every single test
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('getAllEvents fetches the correct URL and returns data', async () => {
    // 3. Arrange: Setup the fake response data and tell our mock fetch to return it
    const mockData = [{ id: 1, matchDate: '2026-06-11' }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    // 4. Act: Call the function we are actually trying to test
    const result = await getAllEvents();

    // 5. Assert: Check that fetch was called with the right URL, and the result matches our mock
    expect(mockFetch).toHaveBeenCalledWith('/api/events');
    expect(result).toEqual(mockData);
  });

  it('throws an error when the response is not ok (e.g. 404 or 500)', async () => {
    // Arrange: Setup the mock to simulate a server error
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    // Act & Assert: We expect this specific call to reject and throw an Error
    await expect(getAllEvents()).rejects.toThrow('API error: 404');
  });

  it('getEventsByStage fetches the correct URL with the provided stage', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

    await getEventsByStage('GROUP');

    expect(mockFetch).toHaveBeenCalledWith('api/events/stage/GROUP');
  });

  it('getAllTeams fetches the correct URL', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

    await getAllTeams();

    expect(mockFetch).toHaveBeenCalledWith('/api/teams');
  });

  it('getTeamsByGroup fetches the correct URL with the provided group', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

    await getTeamsByGroup('A');

    expect(mockFetch).toHaveBeenCalledWith('/api/teams/group/A');
  });
});

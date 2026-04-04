import { type TeamResponse, type EventResponse, type Group, type Stage } from '../types/api';

// Generic Fetch
async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Endpoints
// Vite proxy provides base url
export const getAllEvents = () => apiFetch<EventResponse[]>(`/api/events`);
export const getEventsByStage = (stage: Stage) =>
  apiFetch<EventResponse[]>(`api/events/stage/${stage}`);
export const getEventsByTeam = (teamId: number) =>
  apiFetch<EventResponse[]>(`/api/events/team/${teamId}`);
export const getAllTeams = () => apiFetch<TeamResponse[]>(`/api/teams`);
export const getTeamsByGroup = (group: Group) =>
  apiFetch<TeamResponse[]>(`/api/teams/group/${group}`);
export const getTeamDetails = (teamId: number) => apiFetch<TeamResponse>(`/api/teams/${teamId}`);

export interface TeamStatsResponse {
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    groupPoints: number;
    yellowCards: number;
    redCards: number;
    eliminated: boolean;
}

export interface TeamResponse {
    id: number;
    countryName: string;
    countryCode: string;
    groupLetter: Group;
    flagUrl: string | null;
    logoUrl: string | null;
    fifaRanking: number | null;
    managerName: string | null;
    stats: TeamStatsResponse | null;
}

export interface EventResponse {
    id: number;
    matchNumber: number;
    stage: Stage;
    groupLetter: Group | null;
    homeTeam: TeamResponse | null;
    awayTeam: TeamResponse | null;
    homeTeamPlaceholder: string | null;
    awayTeamPlaceholder: string | null;
    matchData: string;
    kickoffTime: string | null;
    kickoffUtc: string | null;
    arenaName: string;
    city: string;
    status: MatchStatus;
    homeScore: number | null;
    awayScore: number | null;
    winnerTeam: TeamResponse | null;
    isDraw: boolean | null;
    hasExtraTime: boolean;
    hasPenalties: boolean;
}

export type Stage = 'GROUP' | 'ROUND_OF_32' | 'ROUND_OF_16' | 'QUARTERFINAL' | 'SEMIFINAL' | 'THIRD_PLACE' | 'FINAL';
export const STAGES: Stage[] = ['GROUP', 'ROUND_OF_32', 'ROUND_OF_16', 'QUARTERFINAL', 'SEMIFINAL', 'THIRD_PLACE', 'FINAL'];
export const STAGE_LABELS: Record<Stage, string> = {
    'GROUP': 'Group Stage',
    'ROUND_OF_32': 'Round of 32',
    'ROUND_OF_16': 'Round of 16',
    'QUARTERFINAL': 'Quarterfinals',
    'SEMIFINAL': 'Semifinals',
    'THIRD_PLACE': 'Third Place',
    'FINAL': 'Final',
}

export type MatchStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'HALFTIME' | 'FINISHED' | 'POSTPONED' | 'CANCELLED';
export type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';
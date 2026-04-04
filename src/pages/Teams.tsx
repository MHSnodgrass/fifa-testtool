import { useState, useEffect } from 'react';
import type { TeamResponse } from '../types/api';
import { getAllTeams } from '../api/client';

function Teams() {
  const [teams, setTeams] = useState<TeamResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamResponse | null>(null);

  useEffect(() => {
    getAllTeams()
      .then((data) => setTeams(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-headline font-bold tracking-tighter text-on-surface my-8">
        Teams
      </h1>

      {loading && (
        <div className="text-center py-12 text-primary animate-pulse">
          <p className="font-bold tracking-widest uppercase">Fetching Teams...</p>
        </div>
      )}

      {error && (
        <div className="bg-error-container text-on-error-container p-4 border-l-4 border-error">
          <p className="font-bold">System Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {teams !== null && !loading && !error && (
        <div className="space-y-6 mb-12">
          <p className="text-lg">
            There are <span className="font-bold">{teams.length}</span> teams.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className={`group relative flex items-center justify-center w-full aspect-video sm:aspect-square overflow-hidden bg-transparent border border-outline-variant/10 hover:border-primary/50 transition-colors cursor-pointer ${
                  team.stats?.eliminated ? 'opacity-50 grayscale' : ''
                }`}
              >
                {team.flagUrl ? (
                  <img
                    className="w-full h-full object-cover"
                    src={team.flagUrl}
                    alt={team.countryName}
                  />
                ) : (
                  <span className="text-secondary text-xs font-bold uppercase tracking-widest">
                    {team.countryCode}
                  </span>
                )}
                <div className="absolute inset-0 bg-surface-container-highest/90 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs sm:text-sm font-bold text-center text-on-surface uppercase tracking-wider drop-shadow-md">
                    {team.countryName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTeam && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setSelectedTeam(null)}
          data-testid="modal-backdrop"
        >
          <div
            className="bg-surface-container-low border border-outline-variant/30 rounded shadow-xl w-full max-w-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/10">
              <h2 className="text-xl font-headline font-bold uppercase tracking-widest text-on-surface flex items-center gap-3">
                {selectedTeam.logoUrl ? (
                  <img
                    src={selectedTeam.logoUrl}
                    alt={selectedTeam.countryName}
                    className="h-8 object-contain"
                  />
                ) : (
                  selectedTeam.countryName
                )}
              </h2>
              <button
                className="material-symbols-outlined text-secondary hover:text-primary transition-colors cursor-pointer"
                onClick={() => setSelectedTeam(null)}
                aria-label="Close modal"
              >
                close
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                Team Details
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { key: 'countryCode', label: 'Country Code' },
                  { key: 'groupLetter', label: 'Group' },
                  { key: 'fifaRanking', label: 'FIFA Ranking' },
                  { key: 'managerName', label: 'Manager' }
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="bg-surface-container-highest p-3 rounded border border-outline-variant/10"
                  >
                    <div className="text-[0.625rem] uppercase tracking-widest text-secondary mb-1">
                      {label}
                    </div>
                    <div
                      className="text-sm font-medium text-on-surface truncate"
                      title={selectedTeam[key as keyof TeamResponse]?.toString() ?? '-'}
                    >
                      {selectedTeam[key as keyof TeamResponse]?.toString() ?? '-'}
                    </div>
                  </div>
                ))}
                <div className="bg-surface-container-highest p-3 rounded border border-outline-variant/10">
                  <div className="text-[0.625rem] uppercase tracking-widest text-secondary mb-1">
                    Status
                  </div>
                  <div className="text-sm font-medium text-on-surface truncate">
                    {selectedTeam.stats?.eliminated ? 'Eliminated' : 'Active'}
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                Tournament Statistics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { key: 'matchesPlayed', label: 'Matches Played' },
                  { key: 'wins', label: 'Wins' },
                  { key: 'draws', label: 'Draws' },
                  { key: 'losses', label: 'Losses' },
                  { key: 'goalsFor', label: 'Goals For (GF)' },
                  { key: 'goalsAgainst', label: 'Goals Against (GA)' },
                  { key: 'goalDifference', label: 'Goal Diff (GD)' },
                  { key: 'groupPoints', label: 'Group Points' },
                  { key: 'yellowCards', label: 'Yellow Cards' },
                  { key: 'redCards', label: 'Red Cards' }
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="bg-surface-container-highest p-3 rounded border border-outline-variant/10"
                  >
                    <div className="text-[0.625rem] uppercase tracking-widest text-secondary mb-1">
                      {label}
                    </div>
                    <div
                      className="text-sm font-medium text-on-surface truncate"
                      title={
                        selectedTeam.stats?.[key as keyof typeof selectedTeam.stats]?.toString() ??
                        '-'
                      }
                    >
                      {selectedTeam.stats?.[key as keyof typeof selectedTeam.stats]?.toString() ??
                        '-'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Teams;

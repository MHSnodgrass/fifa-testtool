import { useState, useEffect } from 'react';
import type { TeamResponse } from '../types/api';
import { getAllTeams } from '../api/client';

function Teams() {
  const [teams, setTeams] = useState<TeamResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
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
    </>
  );
}

export default Teams;

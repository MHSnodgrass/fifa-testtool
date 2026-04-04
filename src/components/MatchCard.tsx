import React, { useState } from 'react';
import type { EventResponse } from '../types/api';
import StatusBadge from './StatusBadge';

interface MatchCardProps {
  event: EventResponse;
}

function MatchCard({ event }: MatchCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const homeName = event.homeTeam?.countryName ?? event.homeTeamPlaceholder ?? '?';
  const awayName = event.awayTeam?.countryName ?? event.awayTeamPlaceholder ?? '?';
  const homeFlag = event.homeTeam?.flagUrl ? `${event.homeTeam.flagUrl}` : null;
  const awayFlag = event.awayTeam?.flagUrl ? `${event.awayTeam.flagUrl}` : null;
  const scoreDisplay =
    event.homeScore !== null && event.awayScore !== null
      ? `${event.homeScore} - ${event.awayScore}`
      : '? - ?';

  console.log(homeFlag);

  return (
    <>
      {/* Main div controlling the columns: status, match data, inspect - Using relative and overflow-hidden to anchor hover strip of orange (and to make sure it doesnt bleed outside of the container) */}
      <div className="bg-surface-container-low hover:bg-surface-container-high transition-colors p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-0 group relative overflow-hidden">
        {/* Hover strip of orange for the card */}
        <div className="w-1 absolute left-0 top-0 bottom-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {/* Left column, using shrink-0 to avoid this part from being squashed if space is limited*/}
        <div className="w-full md:w-32 shrink-0 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start">
          <p className="text-[0.6875rem] uppercase tracking-widest text-secondary opacity-60">
            {event.matchDate}
          </p>
          <div className="md:mt-1">
            <StatusBadge status={event.status} />
          </div>
        </div>
        {/* Middle column, match scores, etc - the /10 at the end of border-outline sets opacity*/}
        <div className="flex-1 flex items-center justify-center gap-4 md:gap-12 py-4 md:py-0 px-2 md:px-12 border-y md:border-y-0 md:border-x border-outline-variant/10 w-full">
          {/* Home Team Info */}
          <div className="flex flex-col items-center gap-2 w-24 md:w-32">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
              {homeFlag ? (
                <img className="w-full h-full object-cover" src={homeFlag} alt={homeName} />
              ) : (
                <span className="text-secondary text-xs">{event.homeTeam?.countryCode ?? '?'}</span>
              )}
            </div>
            <span
              className="text-sm font-bold uppercase tracking-wide truncate block w-full text-center"
              title={homeName}
            >
              {homeName}
            </span>
          </div>
          {/* Score */}
          <div className="flex flex-col items-center shrink-0">
            <span className="text-3xl md:text-4xl font-black font-headline tracking-tighter text-on-surface">
              {scoreDisplay}
            </span>
          </div>
          {/* Away Team Info */}
          <div className="flex flex-col items-center gap-2 w-24 md:w-32">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
              {awayFlag ? (
                <img className="w-full h-full object-cover" src={awayFlag} alt={awayName} />
              ) : (
                <span className="text-secondary text-xs">{event.awayTeam?.countryCode ?? '?'}</span>
              )}
            </div>
            <span
              className="text-sm font-bold uppercase tracking-wide truncate block w-full text-center"
              title={awayName}
            >
              {awayName}
            </span>
          </div>
        </div>
        {/* Third column, basically just the inspect link to open a modal with match information*/}
        <div className="w-full md:w-32 shrink-0 text-center md:text-right">
          <a
            className="text-[0.6875rem] font-bold uppercase tracking-widest text-primary hover:text-primary-fixed border-b border-primary/30 pb-0.5 inline-flex items-center gap-1 hover:cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Inspect
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
          data-testid="modal-backdrop"
        >
          <div
            className="bg-surface-container-low border border-outline-variant/30 rounded shadow-xl w-full max-w-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/10">
              <h2 className="text-xl font-headline font-bold uppercase tracking-widest text-on-surface">
                Match Statistics
              </h2>
              <button
                className="material-symbols-outlined text-secondary hover:text-primary transition-colors cursor-pointer"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                close
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                Raw Event Data
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {(
                  [
                    { key: 'id', label: 'Event ID' },
                    { key: 'matchNumber', label: 'Match Number' },
                    { key: 'stage', label: 'Stage' },
                    { key: 'groupLetter', label: 'Group Letter' },
                    { key: 'kickoffTime', label: 'Kickoff Time' },
                    { key: 'kickoffUtc', label: 'Kickoff UTC' },
                    { key: 'arenaName', label: 'Arena Name' },
                    { key: 'city', label: 'City' },
                    { key: 'status', label: 'Status' },
                    { key: 'isDraw', label: 'Is Draw' },
                    { key: 'hasExtraTime', label: 'Has Extra Time' },
                    { key: 'hasPenalties', label: 'Has Penalties' }
                  ] as const
                ).map(({ key, label }) => (
                  <div
                    key={key}
                    className="bg-surface-container-highest p-3 rounded border border-outline-variant/10"
                  >
                    <div className="text-[0.625rem] uppercase tracking-widest text-secondary mb-1">
                      {label}
                    </div>
                    <div
                      className="text-sm font-medium text-on-surface truncate"
                      title={event[key as keyof EventResponse]?.toString() ?? '-'}
                    >
                      {event[key as keyof EventResponse]?.toString() ?? '-'}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                Team Statistics Comparison
              </h3>
              <div className="bg-surface-container-highest rounded border border-outline-variant/10 p-4">
                <div className="grid grid-cols-3 gap-y-2 items-center text-sm">
                  {/* Headers */}
                  <div className="text-center font-bold uppercase tracking-wide text-on-surface truncate px-2">
                    {homeName}
                  </div>
                  <div className="text-center text-[0.625rem] uppercase tracking-widest text-secondary font-bold">
                    Stat
                  </div>
                  <div className="text-center font-bold uppercase tracking-wide text-on-surface truncate px-2">
                    {awayName}
                  </div>

                  {/* Stat Rows */}
                  {(
                    [
                      { key: 'matchesPlayed', label: 'Played' },
                      { key: 'wins', label: 'Wins' },
                      { key: 'draws', label: 'Draws' },
                      { key: 'losses', label: 'Losses' },
                      { key: 'goalsFor', label: 'GF' },
                      { key: 'goalsAgainst', label: 'GA' },
                      { key: 'goalDifference', label: 'GD' },
                      { key: 'groupPoints', label: 'Pts' }
                    ] as const
                  ).map(({ key, label }) => (
                    <React.Fragment key={key}>
                      <div className="text-center text-on-surface">
                        {event.homeTeam?.stats?.[key] ?? '-'}
                      </div>
                      <div className="text-center text-[0.625rem] uppercase tracking-widest text-secondary/70">
                        {label}
                      </div>
                      <div className="text-center text-on-surface">
                        {event.awayTeam?.stats?.[key] ?? '-'}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MatchCard;

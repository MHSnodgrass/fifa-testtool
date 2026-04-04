import type { EventResponse } from "../types/api"
import StatusBadge from "./StatusBadge"

interface MatchCardProps {
    event: EventResponse
}

function MatchCard({event}: MatchCardProps) {
    const homeName = event.homeTeam?.countryName ?? event.homeTeamPlaceholder ?? '?';
    const awayName = event.awayTeam?.countryName ?? event.awayTeamPlaceholder ?? '?'
    const homeFlag = event.homeTeam?.flagUrl ? `${event.homeTeam.flagUrl}` : null
    const awayFlag = event.awayTeam?.flagUrl ? `${event.awayTeam.flagUrl}` : null
    const scoreDisplay = event.homeScore !== null && event.awayScore !== null ? `${event.homeScore} - ${event.awayScore}` : '? - ?'

    console.log(homeFlag)

    return (
        // Main div controlling the columns: status, match data, inspect - Using relative and overflow-hidden to anchor hover strip of orange (and to make sure it doesnt bleed outside of the container)
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
                        {homeFlag
                            ? <img className="w-full h-full object-cover" src={homeFlag} alt={homeName} />
                            : <span className="text-secondary text-xs">{event.homeTeam?.countryCode ?? '?'}</span>
                        }
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide truncate block w-full text-center" title={homeName}>{homeName}</span>
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
                        {awayFlag
                            ? <img className="w-full h-full object-cover" src={awayFlag} alt={awayName} />
                            : <span className="text-secondary text-xs">{event.awayTeam?.countryCode ?? '?'}</span>
                        }
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide truncate block w-full text-center" title={awayName}>{awayName}</span>
                </div>
            </div>
            {/* Third column, basically just the inspect link to open a modal with match information*/}
            {/* TODO - Implement modal */}
            <div className="w-full md:w-32 shrink-0 text-center md:text-right">
                <a className="text-[0.6875rem] font-bold uppercase tracking-widest text-primary hover:text-primary-fixed border-b border-primary/30 pb-0.5 inline-flex items-center gap-1 hover:cursor-pointer">
                    Inspect
                </a>
            </div>
        </div>
    )
}

export default MatchCard
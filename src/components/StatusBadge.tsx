import type { MatchStatus } from "../types/api"

function StatusBadge({ status }: { status: MatchStatus }) {
    const statusStyles: Record<MatchStatus, string> = {
        'IN_PROGRESS': 'text-error',
        'FINISHED': 'text-secondary',
        'SCHEDULED': 'text-primary',
        'HALFTIME': 'text-warning',
        'POSTPONED': 'text-warning',
        'CANCELLED': 'text-error line-through',
    }

    return(
        <p className={statusStyles[status]}>{status}</p>
    )
}

export default StatusBadge
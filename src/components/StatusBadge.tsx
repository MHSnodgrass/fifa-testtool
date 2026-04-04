import type { MatchStatus } from '../types/api';

function StatusBadge({ status }: { status: MatchStatus }) {
  const baseStyle = 'text-[0.6875rem] uppercase tracking-[0.1em] ';
  const statusStyles: Record<MatchStatus, string> = {
    IN_PROGRESS: 'text-error',
    FINISHED: 'text-secondary',
    SCHEDULED: 'text-primary',
    HALFTIME: 'text-warning',
    POSTPONED: 'text-warning',
    CANCELLED: 'text-error line-through'
  };

  return (
    <p className={baseStyle + statusStyles[status]}>{status == 'IN_PROGRESS' ? 'LIVE' : status}</p>
  );
}

export default StatusBadge;

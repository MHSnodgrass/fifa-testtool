import { useState } from 'react';
import type { EventResponse, Stage } from '../types/api';
import { STAGE_LABELS } from '../types/api';
import { getAllEvents, getEventsByStage } from '../api/client';
import FilterBar from '../components/FilterBar';
import MatchCard from '../components/MatchCard';

function Events() {
  // Page States
  const [data, setData] = useState<EventResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter State
  const [selectedStage, setSelectedStage] = useState<Stage | 'ALL'>('ALL');
  const [appliedStage, setAppliedStage] = useState<Stage | 'ALL'>('ALL');

  // Even though the whole data set is small (104 events in total), I am handling the load assuming there are much more
  // So choosing not to load all events on load (requiring something from the user) and also not filtering locally even though it would be faster with current data set
  function handleSearch() {
    // Reset states for a new request
    setLoading(true);
    setError(null);

    // Decide which API call to make
    const fetchPromise = selectedStage === 'ALL' ? getAllEvents() : getEventsByStage(selectedStage);

    // Execute
    fetchPromise
      .then((result) => {
        setData(result);
        setAppliedStage(selectedStage);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <FilterBar
        selectedStage={selectedStage}
        onStageChange={setSelectedStage}
        onSearch={handleSearch}
      />
      <h1 className="text-3xl font-headline font-bold tracking-tighter text-on-surface my-8">
        Current Filter:
        <span className="text-primary uppercase ml-2">
          {data === null
            ? 'None'
            : appliedStage === 'ALL'
              ? 'All Stages'
              : STAGE_LABELS[appliedStage]}
        </span>
      </h1>
      {/* Idle - user hasn't search before */}
      {data === null && !loading && !error && (
        <div className="text-center py-12 text-secondary">
          <span className="material-symbols-outlined text-4xl mb-2 opacity-50">travel_explore</span>
          <p>Select your filters and click Search to load events.</p>
        </div>
      )}
      {/* Loading - only for the first search*/}
      {loading && data === null && (
        <div className="text-center py-12 text-primary animate-pulse">
          <p className="font-bold tracking-widest uppercase">Fetching Data...</p>
        </div>
      )}
      {/* Error */}
      {error && (
        <div className="bg-error-container text-on-error-container p-4 border-l-4 border-error">
          <p className="font-bold">System Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      {/* Success but no results */}
      {data !== null && data.length === 0 && (
        <div className="text-center py-12 text-secondary">
          <p>No events found for this filter combination.</p>
        </div>
      )}
      {/* Success with results */}
      {data !== null && data.length > 0 && (
        <div
          className={`space-y-4 transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
        >
          {data.map((event) => (
            <MatchCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </>
  );
}

export default Events;

import { useEffect, useState } from "react";
import type { EventResponse, Stage } from "../types/api";
import { getAllEvents } from "../api/client";
import FilterBar from "../components/FilterBar";

function Events() {
  // Page States
  const [data, setData] = useState<EventResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter State
  const [selectedStage, setSelectedStage] = useState<Stage | 'ALL'>('ALL');

  useEffect(() => {
    getAllEvents()
      .then(result => setData(result))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  console.log("Events data:", data, "Loading:", loading, "Error:", error);
  
  return (
    <>
      <FilterBar
        selectedStage={selectedStage}
        onStageChange={setSelectedStage}
        onSearch={() => {}} // TODO - ADD HANDLE SEARCH FUNCTION
      />
      <h1>Event Count: {data ? data.length : 0} | Current Filter: {selectedStage}</h1>
    </>
  )
}

export default Events

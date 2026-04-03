import type { Stage } from "../types/api";
import { STAGES, STAGE_LABELS } from "../types/api";

interface FilterBarProps {
    selectedStage: Stage | 'ALL',
    onStageChange: (stage: Stage | 'ALL') => void,
    onSearch: () => void
}

function FilterBar({ selectedStage, onStageChange, onSearch }: FilterBarProps) {
    return (
        // Main div (container) controlls gap between elements, uses items-end to line up button
        <div className="border-l-4 border-primary-container bg-surface-container-lowest w-full p-6 flex flex-wrap items-end gap-6">
            {/* Dropdown wrapper fix to hold label and select, flex-1 tells each to fill to available size after button */}
            <div className="flex-1 min-w-50">
                <label className="text-[0.6875rem] text-secondary mb-1 font-bold tracking-widest block uppercase">Filter</label>
                {/* Div wrapper for select and custom arrow icon, relative used so the arrow absolute knows what to anchor to */}
                <div className="relative">
                    {/* Select box, focus:ring-1 adds a ring (border) when focused, appearance-none strips default arrow so custom one can be used */}
                    <select
                        className="bg-surface-container-high w-full border-none text-on-surface py-3 px-4 text-sm focus:ring-1 focus:ring-primary appearance-none"
                        value={selectedStage} 
                        onChange = {(e) => onStageChange(e.target.value as Stage | 'ALL')}
                    >
                        {/* Add an "All Stages" option with value 'ALL' */}
                        <option value='ALL'>All Stages</option>
                        {
                            // Generated the rest of the options from the STAGES array, using STAGE_LABELS for the text
                            STAGES.map(stage => (
                                <option key={stage} value={stage}>{STAGE_LABELS[stage]}</option>
                            ))
                        }
                    </select>
                    {/* Custom arrow using google material icons (expand_more) */}
                    <div className="absolute right-3 top-0 bottom-0 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 min-w-50">
                <label className="text-[0.6875rem] text-secondary mb-1 font-bold tracking-widest block uppercase">Dates</label>
                {/* TODO - Add date filter, populate dates based on stage selection */}
                <div className="relative">
                    <select 
                        className="bg-surface-container-high w-full border-none text-on-surface py-3 px-4 text-sm focus:ring-1 focus:ring-primary appearance-none"
                        value="ALL"
                    >
                        <option value="ALL">All Dates</option>
                    </select>
                    <div className="absolute right-3 top-0 bottom-0 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                    </div>
                </div>
            </div>
            <button
                className="bg-primary-container text-on-primary-container px-10 py-3 font-bold text-sm uppercase tracking-widest hover:bg-primary-fixed transition-colors flex items-center gap-2 h-11.5 hover:cursor-pointer"
                onClick={onSearch}
            >
                <span className="material-symbols-outlined text-lg">search</span>Search
            </button>
        </div>
    )
}

export default FilterBar
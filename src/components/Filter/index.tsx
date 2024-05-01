import React, { Dispatch, SetStateAction } from 'react';

interface FilterComponentProps {
    nameFilter: string;
    setNameFilter: Dispatch<SetStateAction<string>>;
    priorityFilter: string;
    setPriorityFilter: Dispatch<SetStateAction<string>>;
    priorities: string[];
}


const FilterComponent: React.FC<FilterComponentProps> = ({ nameFilter, setNameFilter, priorityFilter, setPriorityFilter, priorities }) => {
    return (
        <div className="filter_header">
            <input
                type="text"
                placeholder="Search by name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
            />
            <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
            >
                <option value="All">All Priorities</option>
                {priorities.map((priority, index) => (
                    <option key={index} value={priority}>
                        {priority}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterComponent;
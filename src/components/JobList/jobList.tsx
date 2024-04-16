import React, { useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

const priorityColors = {
    "Urgent": "#c82333",
    "Regular": "#dfa800",
    "Trivial": "#0168d9"
};

function JobList() {
    const ctx = useContext(AppContext);

    const sortedJobs = ctx.jobs.sort((a, b) =>
        b.priority.localeCompare(a.priority)
    );

    const handleDelete = (name: string) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            ctx.deleteJob(name);
        }
    };

    return (
        <div className='table-wrapper'>
            <table className="job-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedJobs.map((job) => (
                        <tr className={job.priority.toLowerCase()} key={job.name}>
                            <td>{job.name}</td>
                            <td>
                                <button className={job.priority.toLowerCase()}>{job.priority}</button>
                            </td>
                            <td>
                                <button><GrEdit /></button>
                                <button onClick={() => handleDelete(job.name)}><RiDeleteBin6Line /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobList;

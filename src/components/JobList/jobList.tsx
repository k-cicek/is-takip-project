import React, { useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';

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
                            <td>{job.priority}</td>
                            <td>
                                <button onClick={() => handleDelete(job.name)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobList;

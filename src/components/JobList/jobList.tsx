import React, { useContext, useState } from 'react';
import { AppContext } from '@/contexts/AppContext';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { Job } from "@/lib/types";
import ModalComponent from '../Modal/modal';
import FilterComponent from '../Filter';
import ConfirmDialog from '../ConfirmDialog';


function JobList() {
    const ctx = useContext(AppContext);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [priorityFilter, setPriorityFilter] = useState<string>('All');
    const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean, message: string, onConfirm: () => void } | null>(null);

    const nameFilteredJobs = ctx.jobs
        .filter(job =>
            job.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
            job.priority.toLowerCase().includes(nameFilter.toLowerCase())
        );

    const sortedJobs = nameFilteredJobs
        .filter(job =>
            priorityFilter === 'All' ? true : job.priority === priorityFilter
        )
        .sort((a: Job, b: Job) => {
            const priorityComparison = ctx.priorities.indexOf(a.priority) - ctx.priorities.indexOf(b.priority);
            return priorityComparison !== 0 ? priorityComparison : a.name.localeCompare(b.name);
        });

    const handleDelete = (id: string) => {
        setConfirmDialog({
            isOpen: true,
            message: "Are you sure you want to delete it?",
            onConfirm: () => {
                ctx.deleteJob(id);
                setConfirmDialog(null);
            }
        });
    };

    const openModal = (job: Job) => {
        setSelectedJob(job);
        setSelectedPriority(job.priority);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onSave = () => {
        if (selectedJob && selectedPriority) {
            const updatedJob = { ...selectedJob, priority: selectedPriority };
            ctx.updateJob(updatedJob);
            setIsModalOpen(false);
            console.log(updatedJob)
        } else {
            console.error('selectedJob or selectedPriority is null');
        }
    };


    return (
        <div className='table-wrapper'>
            <FilterComponent
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                priorities={ctx.priorities}
            />
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
                        <tr className={job.priority.toLowerCase()} key={job.id}>
                            <td>{job.name}</td>
                            <td>
                                <button className={job.priority.toLowerCase()}>{job.priority}</button>
                            </td>
                            <td>
                                <button onClick={() => openModal(job)}><GrEdit /></button>
                                <button onClick={() => handleDelete(job.id)}><RiDeleteBin6Line /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalComponent
                isOpen={isModalOpen}
                closeModal={closeModal}
                job={selectedJob}
                priority={selectedPriority}
                setPriority={setSelectedPriority}
                onSave={onSave}
                priorities={ctx.priorities}
            />
            {confirmDialog && <ConfirmDialog message={confirmDialog.message} onConfirm={confirmDialog.onConfirm} onCancel={() => setConfirmDialog(null)} />}

        </div>
    );
}

export default JobList;

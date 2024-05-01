import { Job } from '@/lib/types';
import React from 'react';
import Modal from 'react-modal';
import Select from "react-select";
import Input from "../Input";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    job: Job | null;
    priority: string | null;
    setPriority: (priority: string | null) => void;
    onSave: () => void;
    priorities: string[];
}

const ModalComponent: React.FC<ModalProps> = ({
    isOpen,
    closeModal,
    job,
    priority,
    setPriority,
    onSave,
    priorities
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Job Modal"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2 className='modal-title'>New Job</h2>
            <div className='modal-container'>
                <div className='modal-input'>
                    <Input
                        label="Job Name"
                        value={job?.name || ''}
                        disabled={true}
                    />
                </div>
                <div className='modal-select'>
                    <span>Job Priority</span>
                    <Select
                        options={priorities.map((p) => ({ value: p, label: p }))}
                        className="job-priority-select"
                        placeholder="Choose"
                        value={{ value: priority, label: priority }}
                        onChange={(newValue) => {
                            setPriority(newValue?.value ?? null);
                        }}
                        styles={{
                            control: (baseStyles, state) => ({ ...baseStyles, height: 46 }),
                        }}
                    />
                </div>
                <div className='modal-buttons'>
                    <button onClick={onSave}>Save</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalComponent;
"use client";

import Select from "react-select";
import Input from "../Input";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewJob(): React.ReactElement {
  const ctx = useContext(AppContext);
  const [priority, setPriority] = useState<string | null>(null);
  const [jobName, setJobName] = useState("");
  const [idCounter, setIdCounter] = useState(0);

  const handleClick = () => {
    if (jobName && priority) {
      // Yeni iş kaydı oluşturma
      const newJob = { id: idCounter.toString(), name: jobName, priority: priority }

      //İş kaydı ekleme
      ctx.addJob(newJob)

      setIdCounter(idCounter + 1);

      setJobName("")
      setPriority(null)
    } else {
      toast.error("All fields are required.");
    }
  };

  return (
    <div className="new-job">
      <div className="title">Create New Job</div>
      <ToastContainer />
      <div className="job-wrapper">
        <div className="job-input">
          <Input
            label="Job Name"
            type="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
          />
        </div>

        <div className="job-priority">
          <div className="job-priority-title">Job Priority</div>
          <Select
            options={ctx.priorities.map((p) => ({ value: p, label: p }))}
            className="job-priority-select"
            placeholder="Choose"
            onChange={(newValue) => {
              setPriority(newValue?.value ?? null);
            }}
            styles={{
              control: (baseStyles, state) => ({ ...baseStyles, height: 46 }),
            }}
          />
        </div>
        <button className="job-create" onClick={handleClick}>Create</button>
      </div>
    </div>
  );
}

export default NewJob;

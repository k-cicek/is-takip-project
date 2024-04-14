"use client";

import Select from "react-select";
import Input from "../Input";
import { ChangeEvent, useContext, useState } from "react";
import { AppContext } from "@/contexts/AppContext";

function NewJob(): React.ReactElement {
  const ctx = useContext(AppContext);
  const [priority, setPriority] = useState<string | null>(null);
  const [jobName, setJobName] = useState("");

  const handleClick = () => {
    if (jobName && priority) {
      // Yeni iş kaydı oluşturma
      const newJob = { name: jobName, priority: priority }

      //İş kaydı ekleme
      ctx.addJob(newJob)

      setJobName("")
      setPriority(null)
    }
  };

  return (
    <div className="new-job">
      <div className="title">Create New Job</div>
      <div className="job-wrapper">
        <div className="job-input">
          <Input
            label="Job Name"
            value={jobName}
            onChange={(e) => {
              setJobName(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>

        <div className="job-priority">
          <div>Job Priority</div>
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

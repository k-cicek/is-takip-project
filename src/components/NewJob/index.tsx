"use client";

import Select from "react-select";
import Input from "../Input";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/AppContext";

function NewJob(): React.ReactElement {
  const ctx = useContext(AppContext);
  const [priority, setPriority] = useState<string | null>(null);

  return (
    <div className="new-job">
      <div className="title">Create New Job</div>
      <div className="job-wrapper">
        <div className="job-input">
          <Input label="Job Name" />
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

        <button className="job-create">Create</button>
      </div>
    </div>
  );
}

export default NewJob;

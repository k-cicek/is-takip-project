"use client";

import { Job } from "@/lib/types";
import { AppContext, defaultValues } from "./AppContext";
import { useEffect, useState } from "react";
import { addJob, deleteJob, readJobs } from "@/lib/storage";

interface AppContextProviderProps {
  children: React.ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [priorities, setPriorities] = useState<string[]>(
    defaultValues.priorities
  );
  const [jobs, setJobs] = useState<Job[]>(defaultValues.jobs)

  useEffect(() => {
    // Öncelikleri ve işleri yükle
    const loadPrioritiesAndJobs = async () => {
      const p = await getPriorities();
      setPriorities(p);
      const j = readJobs();
      setJobs(j);
    };

    loadPrioritiesAndJobs().catch(console.error);
  }, []);

  const addNewJob = (job: Job) => {
    setJobs([...jobs, job]);
    addJob(job); // LocalStorage'a da ekleyin
  };
  const removeJob = (name: string) => {
    const updatedJobs = jobs.filter(job => job.name !== name);
    setJobs(updatedJobs);
    deleteJob(name); // LocalStorage'dan da kaldırın
  };

  const updateJob = (updatedJob: Job) => {
    const updatedJobs = jobs.map(job => {
      if (job.name === updatedJob.name) {
        return updatedJob;
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  return (
    <AppContext.Provider
      value={{
        priorities,
        jobs,
        setPriorities,
        addJob: addNewJob,
        deleteJob: removeJob,
        updateJob: updateJob
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

async function getPriorities() {
  const res = await fetch("http://localhost:3000/priorities");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


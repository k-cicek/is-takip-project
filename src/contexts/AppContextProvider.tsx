"use client";

import { Job } from "@/lib/types";
import { AppContext, defaultValues } from "./AppContext";
import { useEffect, useState } from "react";
import { addJob, deleteJob, readJobs } from "@/lib/storage";
import { getPriorities } from "@/lib/priorities";

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

      const storedJobs = localStorage.getItem('jobs');
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      }
    };

    loadPrioritiesAndJobs().catch(console.error);
  }, []);


  const addNewJob = (job: Job) => {
    setJobs([...jobs, job]);
    addJob(job); // LocalStorage'a da ekleyin
  };

  const removeJob = (id: string) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    deleteJob(id); // LocalStorage'dan da kaldırın
  };

  const updateJob = (updatedJob: Job) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === updatedJob.id) {
        return updatedJob;
      }
      return job;
    });
    console.log(updatedJobs);
    setJobs(updatedJobs);

    // Local storage'a işleri kaydet
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  return (
    <AppContext.Provider
      value={{
        priorities,
        jobs,
        setPriorities,
        addJob: addNewJob,
        deleteJob: removeJob,
        updateJob: updateJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}


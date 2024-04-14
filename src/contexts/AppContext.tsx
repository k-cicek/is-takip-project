import { Job } from "@/lib/types";
import React from "react";


export type TAppContextState = {
  priorities: string[];
  jobs: Job[];
  setPriorities: React.Dispatch<React.SetStateAction<string[]>>;
  addJob: (job: Job) => void
  deleteJob: (name: string) => void;
  updateJob: (updatedJob: Job) => void;

};

export const defaultValues: TAppContextState = {
  priorities: [],
  jobs: [],
  setPriorities: () => { },
  addJob: () => { },
  deleteJob: () => { },
  updateJob: () => { },
};

export const AppContext = React.createContext(defaultValues);




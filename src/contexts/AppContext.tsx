import React from "react";

export type TAppContextState = {
  priorities: string[];
  setPriorities: React.Dispatch<React.SetStateAction<string[]>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

export const defaultValues: TAppContextState = {
  priorities: [],
  setPriorities: () => { },
  name: "",
  setName: () => { },
};

export const AppContext = React.createContext(defaultValues);

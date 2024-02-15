"use client";

import { AppContext, defaultValues } from "./AppContext";
import { useEffect, useState } from "react";

interface AppContextProviderProps {
  children: React.ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [priorities, setPriorities] = useState<string[]>(
    defaultValues.priorities
  );

  const [name, setName] = useState<string>(defaultValues.name)

  return (
    <AppContext.Provider
      value={{
        priorities,
        setPriorities,
        name,
        setName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

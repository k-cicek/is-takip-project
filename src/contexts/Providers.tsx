"use client";

import { AppContextProvider } from "./AppContextProvider";

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props): React.ReactElement {
  return <AppContextProvider>{children}</AppContextProvider>;
}

export default Providers;


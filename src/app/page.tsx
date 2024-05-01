"use client";

import Header from "@/components/Header";
import JobList from "@/components/JobList/jobList";
import NewJob from "@/components/NewJob";
import { AppContext } from "@/contexts/AppContext";
import { getPriorities } from "@/lib/priorities";
import { useContext, useEffect } from "react";

export default function Home() {
  const ctx = useContext(AppContext);

  useEffect(() => {
    const fn = async () => {
      const p = await getPriorities();
      ctx.setPriorities(p);
    };

    fn().catch(console.error);
  }, [ctx.setPriorities]);

  return (
    <div className="container">
      <Header />
      <main>
        <NewJob />
        <JobList />
      </main>
    </div>
  );
}

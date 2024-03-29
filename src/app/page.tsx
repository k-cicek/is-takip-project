"use client";

import Header from "@/components/Header";
import NewJob from "@/components/NewJob";
import { AppContext } from "@/contexts/AppContext";
import { useContext, useEffect } from "react";

async function getPriorities() {
  const res = await fetch("http://localhost:3000/priorities");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Home() {
  const ctx = useContext(AppContext);

  useEffect(() => {
    const fn = async () => {
      const p = await getPriorities();
      ctx.setPriorities(p);
    };

    fn().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.setPriorities]);

  return (
    <div className="container">
      <Header />
      <main>
        <NewJob />
      </main>
    </div>
  );
}

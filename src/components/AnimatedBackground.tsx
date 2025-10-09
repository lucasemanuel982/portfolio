"use client";
import { useEffect, useState } from "react";
import { Spotlight } from "@/components/ui/spotlight-new";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 w-full h-full antialiased -z-10 bg-black/[0.96] bg-grid-white/[0.02]">
        <div className="absolute inset-0 bg-black" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full antialiased -z-10 bg-black/[0.96] bg-grid-white/[0.02]">
      <Spotlight />
    </div>
  );
}

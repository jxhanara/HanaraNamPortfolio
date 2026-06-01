"use client";

import type { ReactNode } from "react";
import { LeaveAMark } from "./LeaveAMark";
import { LeaveAMarkNavProvider } from "./LeaveAMarkNavContext";
import { LeaveAMarkSessionProvider } from "./LeaveAMarkSessionContext";
import { ReplayOverlay } from "./ReplayOverlay";

export function LeaveAMarkRoot({ children }: { children: ReactNode }) {
  return (
    <LeaveAMarkNavProvider>
      <LeaveAMarkSessionProvider>
        {children}
        <LeaveAMark />
        <ReplayOverlay />
      </LeaveAMarkSessionProvider>
    </LeaveAMarkNavProvider>
  );
}

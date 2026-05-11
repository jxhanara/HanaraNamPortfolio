"use client";

import type { ReactNode } from "react";
import { LeaveAMark } from "./LeaveAMark";
import { LeaveAMarkNavProvider } from "./LeaveAMarkNavContext";
import { LeaveAMarkSessionProvider } from "./LeaveAMarkSessionContext";

export function LeaveAMarkRoot({ children }: { children: ReactNode }) {
  return (
    <LeaveAMarkNavProvider>
      <LeaveAMarkSessionProvider>
        {children}
        <LeaveAMark />
      </LeaveAMarkSessionProvider>
    </LeaveAMarkNavProvider>
  );
}

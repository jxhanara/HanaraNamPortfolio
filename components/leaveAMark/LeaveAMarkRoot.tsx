"use client";

import type { ReactNode } from "react";
import { LeaveAMark } from "./LeaveAMark";
import { LeaveAMarkNavProvider } from "./LeaveAMarkNavContext";

export function LeaveAMarkRoot({ children }: { children: ReactNode }) {
  return (
    <LeaveAMarkNavProvider>
      {children}
      <LeaveAMark />
    </LeaveAMarkNavProvider>
  );
}

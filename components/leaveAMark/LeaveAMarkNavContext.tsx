"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type LeaveAMarkNavSlot = {
  visitorName: string;
  gradientCSS: string;
};

type LeaveAMarkNavContextValue = {
  slot: LeaveAMarkNavSlot | null;
  setSlot: (next: LeaveAMarkNavSlot | null) => void;
  triggerPill: () => void;
  registerPillHandler: (fn: (() => void) | null) => void;
};

const LeaveAMarkNavContext = createContext<LeaveAMarkNavContextValue | null>(null);

export function LeaveAMarkNavProvider({ children }: { children: ReactNode }) {
  const [slot, setSlotState] = useState<LeaveAMarkNavSlot | null>(null);
  const pillHandler = useRef<(() => void) | null>(null);

  const setSlot = useCallback((next: LeaveAMarkNavSlot | null) => {
    setSlotState(next);
  }, []);

  const registerPillHandler = useCallback((fn: (() => void) | null) => {
    pillHandler.current = fn;
  }, []);

  const triggerPill = useCallback(() => {
    pillHandler.current?.();
  }, []);

  const value = useMemo(
    () => ({ slot, setSlot, triggerPill, registerPillHandler }),
    [slot, setSlot, triggerPill, registerPillHandler],
  );

  return <LeaveAMarkNavContext.Provider value={value}>{children}</LeaveAMarkNavContext.Provider>;
}

/** `null` when used outside `LeaveAMarkNavProvider` (e.g. Storybook). */
export function useLeaveAMarkNavOptional(): LeaveAMarkNavContextValue | null {
  return useContext(LeaveAMarkNavContext);
}

"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { CharacterPose } from "./Character";

export type LeaveAMarkPhase =
  | "idle"
  | "drawingGlow"
  | "centering"
  | "cardIn"
  | "card"
  | "editing"
  | "exiting";

type LeaveAMarkSessionContextValue = {
  phase: LeaveAMarkPhase;
  setPhase: Dispatch<SetStateAction<LeaveAMarkPhase>>;
  characterPos: "corner" | "center";
  setCharacterPos: Dispatch<SetStateAction<"corner" | "center">>;
  characterPose: CharacterPose;
  setCharacterPose: Dispatch<SetStateAction<CharacterPose>>;
  tool: string;
  setTool: Dispatch<SetStateAction<string>>;
  showVisitorEditor: boolean;
  setShowVisitorEditor: Dispatch<SetStateAction<boolean>>;
};

const LeaveAMarkSessionContext = createContext<LeaveAMarkSessionContextValue | null>(null);

export function LeaveAMarkSessionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<LeaveAMarkPhase>("idle");
  const [characterPos, setCharacterPos] = useState<"corner" | "center">("corner");
  const [characterPose, setCharacterPose] = useState<CharacterPose>("idle");
  const [tool, setTool] = useState<string>("pointer");
  const [showVisitorEditor, setShowVisitorEditor] = useState(false);

  const value = useMemo(
    () => ({
      phase,
      setPhase,
      characterPos,
      setCharacterPos,
      characterPose,
      setCharacterPose,
      tool,
      setTool,
      showVisitorEditor,
      setShowVisitorEditor,
    }),
    [phase, characterPos, characterPose, tool, showVisitorEditor],
  );

  return <LeaveAMarkSessionContext.Provider value={value}>{children}</LeaveAMarkSessionContext.Provider>;
}

export function useLeaveAMarkSession(): LeaveAMarkSessionContextValue {
  const ctx = useContext(LeaveAMarkSessionContext);
  if (!ctx) {
    throw new Error("useLeaveAMarkSession must be used within LeaveAMarkSessionProvider");
  }
  return ctx;
}

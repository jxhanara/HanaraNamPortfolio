import type { GradientId } from "./constants";

export type AnnotationKind = "sticky" | "text" | "comment";

export type AnnotationItem = {
  id: string;
  kind: AnnotationKind;
  x: number;
  y: number;
  text: string;
  author: string;
  _fresh?: boolean;
};

export type StrokeKind = "pen" | "highlight";

export type Stroke = {
  kind: StrokeKind;
  color: string;
  points: { x: number; y: number }[];
  _tmp?: boolean;
};

export type VisitorCard = {
  id: string;
  name: string;
  color: GradientId;
  no: string;
  createdAt: string;
  annotations: {
    items: AnnotationItem[];
    strokes: Stroke[];
  };
};

/** `dock`: vertical toolbar when snapped to left/right viewport edge. */
export type ToolbarDock = "none" | "left" | "right";

export type ToolbarPos = { x: number; y: number; dock?: ToolbarDock };

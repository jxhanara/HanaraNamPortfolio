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

/** Visitor identity + card fields (no embedded annotations in v2 storage). */
export type VisitorCardMeta = {
  id: string;
  name: string;
  color: GradientId;
  no: string;
  createdAt: string;
};

/** In-app alias; annotations live in storage per page, not on this object. */
export type VisitorCard = VisitorCardMeta;

export type PageAnnotations = {
  items: AnnotationItem[];
  strokes: Stroke[];
};

export type VisitorStoredDocument = {
  card: VisitorCardMeta;
  annotationsByPage: Record<string, PageAnnotations>;
};

/** `dock`: vertical toolbar when snapped to left/right viewport edge. */
export type ToolbarDock = "none" | "left" | "right";

export type ToolbarPos = { x: number; y: number; dock?: ToolbarDock };

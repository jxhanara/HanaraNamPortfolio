# PRD: Leave a Mark

(See the README for the full implementation spec — this file is the original product brief from Hanara, kept for reference.)

## Overview

A lightweight, opt-in annotation layer for a personal portfolio website. Visitors can enter an edit mode to leave sticky notes, highlights, pen drawings, and comments directly on portfolio pages — without creating a real account. Identity is handled through a fun, low-friction visitor card stored in localStorage. The feature is anchored by a small floating character that serves as the entry point and personality of the whole experience.

## Goals

- Let visitors leave meaningful feedback and reactions without friction
- Make the annotation experience feel playful and personal, not utilitarian
- Never interrupt visitors who just want to browse
- Persist annotations per visitor across return visits (same browser)
- Keep the entire feature frontend-only in v1 (no backend required except optional annotation storage)

## Non-Goals (v1)

- No real authentication or accounts
- No real-time multiplayer annotation
- No Q&A / response system
- No mobile annotation support (read-only on mobile is fine)

## Stack assumptions

- Next.js / React portfolio
- v1 storage: localStorage only — no backend required
- Canvas: Fabric.js or Konva.js if you want richer brush behavior
- Animation: Framer Motion for character and card transitions
- Glow: CSS `box-shadow` inset + `@keyframes` pulse on a fixed full-viewport div
- Toolbar drag: `@dnd-kit` or native pointer events (the prototype uses native)

## Open questions

1. Should annotations be visible to other visitors or only to the person who made them?
2. What happens when the page layout changes — anchor to elements or pixel positions?
3. Q&A / response system — how does Hanara get notified, where do responses live?
4. Should the character have a name?

export const GRADIENTS = [
  { id: "aurora", name: "Aurora", from: "#43CFA0", to: "#7B61FF", text: "#0a1820" },
  { id: "dusk", name: "Dusk", from: "#F78CA0", to: "#6B3FA0", text: "#1a0a1a" },
  { id: "ember", name: "Ember", from: "#FFAA5A", to: "#E040A0", text: "#1a0a0a" },
  { id: "frost", name: "Frost", from: "#89C5EA", to: "#C4A8F5", text: "#0a1020" },
  { id: "moss", name: "Moss", from: "#7EC8A0", to: "#3A9E8A", text: "#0a1a14" },
  { id: "midnight", name: "Midnight", from: "#1A1A3E", to: "#4B3F8A", text: "#e8e6ff" },
] as const;

export type GradientId = (typeof GRADIENTS)[number]["id"];
export type Gradient = (typeof GRADIENTS)[number];

export const STORAGE_KEY = "leaveAMark.v1";
export const TOOLBAR_POS_KEY = "leaveAMark.toolbarPos";

export const NAME_FIRST = [
  "Cedar",
  "Moss",
  "Ivory",
  "Juniper",
  "Marlow",
  "Linen",
  "Sage",
  "Hollis",
  "Wren",
  "Pippin",
  "Indigo",
  "Fennel",
  "Briar",
  "Otis",
  "Plum",
  "Solstice",
  "Birch",
  "Clove",
  "Thistle",
  "Ember",
  "Hazel",
  "Quill",
  "Rumi",
  "Tide",
];
export const NAME_LAST = [
  "Quill",
  "Fern",
  "Lark",
  "Brook",
  "Finch",
  "Drift",
  "Rook",
  "Pine",
  "Vale",
  "Mote",
  "Hush",
  "Glow",
  "Tern",
  "Thorne",
  "Cove",
  "Wisp",
  "Heath",
  "Bell",
  "Lune",
  "Sparrow",
];

export function gradById(id: string | undefined): Gradient {
  return GRADIENTS.find((g) => g.id === id) ?? GRADIENTS[0];
}

export function gradCSS(g: Gradient): string {
  return `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`;
}

export function randomName(): string {
  return (
    NAME_FIRST[Math.floor(Math.random() * NAME_FIRST.length)] +
    " " +
    NAME_LAST[Math.floor(Math.random() * NAME_LAST.length)]
  );
}

export function randomNo(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function todayLabel(): string {
  const d = new Date();
  return d
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .toUpperCase();
}

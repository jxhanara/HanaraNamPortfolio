import type { SVGProps } from "react";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  width: 18,
  height: 18,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ToolbarIcon = {
  pointer: (props: SVGProps<SVGSVGElement>) => (
    <svg {...ICON_PROPS} {...props}>
      <path d="M5 3 L5 18 L9 14 L11.5 20 L13.7 19 L11.2 13.3 L17 13 Z" />
    </svg>
  ),
  pen: (props: SVGProps<SVGSVGElement>) => (
    <svg {...ICON_PROPS} {...props}>
      <path d="M4 20 L4 17 L15 6 L18 9 L7 20 Z" />
      <path d="M13 8 L16 11" />
    </svg>
  ),
  highlight: (props: SVGProps<SVGSVGElement>) => (
    <svg {...ICON_PROPS} {...props}>
      <path d="M7 14 L13 8 L17 12 L11 18 L7 18 Z" />
      <path d="M13 8 L17 4 L20 7 L17 12" />
      <path d="M5 21 L11 21" />
    </svg>
  ),
  sticky: (props: SVGProps<SVGSVGElement>) => (
    <svg {...ICON_PROPS} {...props}>
      <path d="M5 4 L15 4 L19 8 L19 19 L5 19 Z" />
      <path d="M15 4 L15 8 L19 8" />
    </svg>
  ),
  text: (props: SVGProps<SVGSVGElement>) => (
    <svg {...ICON_PROPS} {...props}>
      <path d="M6 5 L18 5" />
      <path d="M12 5 L12 19" />
    </svg>
  ),
  comment: (props: SVGProps<SVGSVGElement>) => (
    <svg {...ICON_PROPS} {...props}>
      <path d="M4 5 L20 5 L20 16 L13 16 L9 20 L9 16 L4 16 Z" />
    </svg>
  ),
  done: (props: SVGProps<SVGSVGElement>) => (
    <svg {...ICON_PROPS} {...props}>
      <path d="M12 4 L13.2 10.8 L20 12 L13.2 13.2 L12 20 L10.8 13.2 L4 12 L10.8 10.8 Z" />
    </svg>
  ),
  undo: (props: SVGProps<SVGSVGElement>) => {
    const { style, ...rest } = props;
    return (
      <svg {...ICON_PROPS} {...rest} style={{ transform: "translateY(0.5px)", ...style }}>
        <path d="M8 9 L4 12 L8 15" />
        <path d="M4 12 H15.5 A4 4 0 0 1 15.5 20 H13" />
      </svg>
    );
  },
  eraser: (props: SVGProps<SVGSVGElement>) => (
    <svg {...ICON_PROPS} {...props}>
      <path d="M9 3 L20 14 L14 20 L3 9 L5 7 Z" />
      <path d="M3 20 L7 16" />
    </svg>
  ),
  caret: (props: SVGProps<SVGSVGElement>) => (
    <svg {...ICON_PROPS} width={14} height={14} {...props}>
      <path d="M6 9 L12 15 L18 9" />
    </svg>
  ),
};

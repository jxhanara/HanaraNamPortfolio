"use client";

import type { Gradient } from "./constants";
import styles from "./LeaveAMark.module.css";

type ToastProps = {
  text: string;
  gradient: Gradient;
};

export function Toast({ text, gradient }: ToastProps) {
  return (
    <div
      className={styles.toast}
      style={
        {
          "--from": gradient.from,
          "--to": gradient.to,
        } as React.CSSProperties
      }
    >
      <span className={styles.toastDot} />
      <span>{text}</span>
    </div>
  );
}

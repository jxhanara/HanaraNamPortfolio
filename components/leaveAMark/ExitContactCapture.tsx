"use client";

import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties } from "react";
import type { Gradient } from "./constants";
import styles from "./LeaveAMark.module.css";

type ExitContactCaptureProps = {
  visitorId: string;
  visitorName: string;
  gradient: Gradient;
  onDone: () => void;
};

export function ExitContactCapture({
  visitorId,
  visitorName,
  gradient,
  onDone,
}: ExitContactCaptureProps) {
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);
  const autoSkipRef = useRef<number | null>(null);

  useEffect(() => {
    autoSkipRef.current = window.setTimeout(() => {
      onDone();
    }, 5000);

    timerRef.current = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => {
      if (autoSkipRef.current !== null) window.clearTimeout(autoSkipRef.current);
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      window.clearTimeout(focusTimer);
    };
  }, [onDone]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
    if (e.target.value.length === 1) {
      if (autoSkipRef.current !== null) window.clearTimeout(autoSkipRef.current);
      autoSkipRef.current = null;
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      timerRef.current = null;
      setSecondsLeft(0);
    }
  };

  const handleSend = async () => {
    const val = contact.trim();
    if (!val) {
      onDone();
      return;
    }
    try {
      await fetch("/api/save-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, contactInfo: val }),
      });
    } catch {
      /* still show thanks UX */
    }
    setSent(true);
    window.setTimeout(() => onDone(), 1800);
  };

  const handleSkip = () => {
    if (autoSkipRef.current !== null) window.clearTimeout(autoSkipRef.current);
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    onDone();
  };

  return (
    <div
      className={styles.exitCapture}
      style={{ "--from": gradient.from, "--to": gradient.to } as CSSProperties}
      data-lam-ui
    >
      {sent ? (
        <div className={styles.exitCaptureSent}>
          <span
            className={styles.exitCaptureSparkle}
            style={
              { background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` } as CSSProperties
            }
          >
            ✦
          </span>
          <span className={styles.exitCaptureSentText}>thanks — Hanara will be in touch ✦</span>
        </div>
      ) : (
        <>
          <div className={styles.exitCaptureTop}>
            <p className={styles.exitCaptureHeading}>Thanks for leaving your mark, {visitorName} ✦</p>
            <p className={styles.exitCaptureSub}>Want Hanara to follow up? Totally optional.</p>
          </div>
          <div className={styles.exitCaptureRow}>
            <input
              ref={inputRef}
              type="text"
              className={styles.exitCaptureInput}
              placeholder="email or LinkedIn URL"
              value={contact}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleSend();
                if (e.key === "Escape") handleSkip();
              }}
            />
            <button
              type="button"
              className={styles.exitCaptureSendBtn}
              style={
                {
                  background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                } as CSSProperties
              }
              onClick={() => void handleSend()}
            >
              Send
            </button>
          </div>
          <button type="button" className={styles.exitCaptureSkip} onClick={handleSkip}>
            {secondsLeft > 0 ? `skip · closing in ${secondsLeft}s` : "skip →"}
          </button>
        </>
      )}
    </div>
  );
}

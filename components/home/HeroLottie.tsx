"use client";

import Lottie from "lottie-react";
import animationData from "@/assets/KikisDeliveryService.json";
import styles from "./styles.module.css";

export function HeroLottie() {
  return (
    <Lottie
      className={styles.heroLottie}
      animationData={animationData}
      loop
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}

import t from "./nasaThumbnail.module.css";

export function NasaThumbnail() {
  return (
    <div className={t.thumb}>
      <div className={t.glowA} aria-hidden />
      <div className={t.glowB} aria-hidden />
      <div className={t.stars} aria-hidden />
      <span className={t.label}>Coming soon...</span>
    </div>
  );
}

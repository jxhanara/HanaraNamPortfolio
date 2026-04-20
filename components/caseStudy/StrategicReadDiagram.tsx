import styles from "./StrategicReadDiagram.module.css";

export type StrategicConvergenceSide = {
  kicker: string;
  title: string;
  primary: string;
  supporting: string;
  refs: string;
};

export type StrategicConvergence = {
  opportunity: string;
  left: StrategicConvergenceSide;
  right: StrategicConvergenceSide;
};

type Props = {
  convergence: StrategicConvergence;
};

export function StrategicReadDiagram({ convergence }: Props) {
  const { left, right, opportunity } = convergence;

  return (
    <figure
      className={styles.figure}
      role="img"
      aria-label="Two research tensions converge on a single product opportunity at the intersection."
    >
      <div className={styles.stage}>
        <div className={styles.wingLeft} aria-label={`${left.kicker}: ${left.title}`}>
          <div className={styles.wingLeftPlate}>
            <div className={styles.wingLeftGlow} aria-hidden />
            <div className={styles.wingContent}>
              <span className={styles.kicker}>{left.kicker}</span>
              <p className={styles.wingTitle}>{left.title}</p>
              <p className={styles.wingPrimary}>{left.primary}</p>
              <p className={styles.wingSupporting}>{left.supporting}</p>
              <p className={styles.wingRefs}>{left.refs}</p>
            </div>
          </div>
        </div>

        <div className={styles.wingRight} aria-label={`${right.kicker}: ${right.title}`}>
          <div className={styles.wingRightPlate}>
            <div className={styles.wingRightGlow} aria-hidden />
            <div className={`${styles.wingContent} ${styles.wingContentRight}`}>
              <span className={styles.kicker}>{right.kicker}</span>
              <p className={styles.wingTitle}>{right.title}</p>
              <p className={styles.wingPrimary}>{right.primary}</p>
              <p className={styles.wingSupporting}>{right.supporting}</p>
              <p className={styles.wingRefs}>{right.refs}</p>
            </div>
          </div>
        </div>

        <div className={styles.centerColumn}>
          <div className={styles.centerHub}>
            <span className={styles.centerEyebrow}>Opportunity</span>
            <p className={styles.centerSentence}>{opportunity}</p>
          </div>
        </div>
      </div>
    </figure>
  );
}

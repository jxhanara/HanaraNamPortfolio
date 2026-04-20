import Image from "next/image";
import cs from "./caseStudy.module.css";

const STRATEGY_PIVOT_ARROW_SRC = "/assets/trippy/strategy-pivot-arrow.png";

export function CaseStudyStrategyPivotArrow() {
  return (
    <div className={cs.strategyPivotBridge} role="img" aria-label="Strategic pivot">
      <Image
        src={STRATEGY_PIVOT_ARROW_SRC}
        alt=""
        width={600}
        height={600}
        className={cs.strategyPivotImg}
        sizes="(max-width: 899px) 80px, 64px"
      />
    </div>
  );
}

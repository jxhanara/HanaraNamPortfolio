import { bumbleScenarios } from "@/content/bumbleFlowCaseStudy";
import cs from "../caseStudy.module.css";

export function BumbleScenariosSection() {
  return (
    <section id="scenarios" className={cs.section}>
      <p className={cs.sectionEyebrow}>{bumbleScenarios.eyebrow}</p>
      <h2 className={cs.h2}>{bumbleScenarios.title}</h2>
      <p className={cs.body}>{bumbleScenarios.lead}</p>
      <div className={cs.scenarioTierGrid}>
        {bumbleScenarios.tiers.map((t) => (
          <article key={t.id} className={cs.scenarioTierCard}>
            <p className={cs.scenarioTierLabel}>{t.label}</p>
            <p className={cs.scenarioTierBody}>{t.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

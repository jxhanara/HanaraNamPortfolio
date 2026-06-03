import { SiteNav } from "@/components/home/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import homeStyles from "@/components/home/styles.module.css";

export default function NasaCaseStudyPage() {
  return (
    <div className={homeStyles.page} data-site-rail="case-study">
      <SiteNav />
      {/* Intentionally empty for now — case study content coming soon. */}
      <main style={{ flex: 1 }} />
      <SiteFooter />
    </div>
  );
}

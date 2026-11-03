import { useEffect, useState } from 'react';
import { SiteFooter, SiteHeader, SmoothScrollToggle } from './SiteChrome.jsx';
import MainVisual from './sections/MainVisual.jsx';
import FutureSection from './sections/FutureSection.jsx';
import HistorySection from './sections/HistorySection.jsx';
import JobsSection from './sections/JobsSection.jsx';
import InnovationSection from './sections/InnovationSection.jsx';
import WelfareSection from './sections/WelfareSection.jsx';
import TasksSection from './sections/TasksSection.jsx';
import QualificationSection from './sections/QualificationSection.jsx';
import ExpositionSection from './sections/ExpositionSection.jsx';
import LinksSection from './sections/LinksSection.jsx';
import ApplicationSection from './sections/ApplicationSection.jsx';

export default function RecruitmentPage() {
  const [legacyError, setLegacyError] = useState('');

  useEffect(() => {
    let cancelled = false;
    import('../legacy/common.js')
      .then(() => import('../legacy/main.js'))
      .catch((error) => {
        if (cancelled) return;
        console.error('Recruitment page interactions failed to load.', error);
        setLegacyError('\uD398\uC774\uC9C0 \uC0C1\uD638\uC791\uC6A9\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC0C8\uB85C\uACE0\uCE68\uD574 \uC8FC\uC138\uC694.');
      });
    return () => {
      cancelled = true;
      cancelled = true;
    };
  }, []);

  return (
    <div className="recruitment-page">
      <SmoothScrollToggle />
      {legacyError && <p role="alert" className="tasks-empty">{legacyError}</p>}
      <SiteHeader />
      <main>
        <MainVisual />
        <FutureSection />
        <HistorySection />
        <JobsSection />
        <InnovationSection />
        <WelfareSection />
        <TasksSection />
        <QualificationSection />
        <ExpositionSection />
        <LinksSection />
        <ApplicationSection />
      </main>
      <SiteFooter />
    </div>
  );
}

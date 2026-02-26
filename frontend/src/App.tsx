import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { DiseaseDirectory } from './pages/DiseaseDirectory';
import { PharmacyFinder } from './pages/PharmacyFinder';

type Page = 'diseases' | 'pharmacy';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('diseases');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'diseases' ? (
        <DiseaseDirectory />
      ) : (
        <PharmacyFinder />
      )}
    </Layout>
  );
}

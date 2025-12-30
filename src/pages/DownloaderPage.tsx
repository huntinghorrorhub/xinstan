import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Steps from '../components/Steps';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { pageConfigs } from '../config/pages';

export default function DownloaderPage() {
  const location = useLocation();

  const config = Object.values(pageConfigs).find(
    (page) => page.path === location.pathname
  ) || pageConfigs.home;

  useEffect(() => {
    document.title = config.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.metaDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = config.metaDescription;
      document.head.appendChild(meta);
    }
  }, [config]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero
          heading={config.heading}
          subheading={config.subheading}
          placeholder={config.placeholder}
        />
        <Steps />
        <Features />
        <FAQ faqs={config.faqs} />
      </main>
      <Footer />
    </div>
  );
}

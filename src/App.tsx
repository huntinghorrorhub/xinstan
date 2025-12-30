import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DownloaderPage from './pages/DownloaderPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DownloaderPage />} />
        <Route path="/terms-conditions" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/instagram-video-download" element={<DownloaderPage />} />
        <Route path="/instagram-photo-download" element={<DownloaderPage />} />
        <Route path="/instagram-reels-download" element={<DownloaderPage />} />
        <Route path="/instagram-story-download" element={<DownloaderPage />} />
        <Route path="/instagram-carousel-download" element={<DownloaderPage />} />
        <Route path="/instagram-igtv-download" element={<DownloaderPage />} />
        <Route path="/instagram-profile-viewer" element={<DownloaderPage />} />
      </Routes>
    </Router>
  );
}

export default App;

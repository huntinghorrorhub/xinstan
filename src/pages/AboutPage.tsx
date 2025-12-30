import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Zap, 
  Shield, 
  Smartphone, 
  CheckCircle, 
  Video, 
  Image as ImageIcon, 
  Film, 
  Clock, 
  Eye, 
  Tv, 
  Users, 
  Download, 
  Globe, 
  Award 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              What is <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Xinstan?</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              Xinstan is a fast, secure, and user-first online tool built to help people save Instagram content effortlessly. 
              From videos and photos to Reels, Stories, carousels, IGTV, and audio — Xinstan lets you download content 
              in original quality with zero friction.
            </p>
            <div className="mt-10 flex justify-center gap-8 text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> No apps
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> No logins
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> No hidden limits
              </div>
            </div>
            <p className="mt-8 text-lg font-medium text-gray-900">
              Just paste a link and download in seconds — on any device, anywhere.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Xinstan by the Numbers</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl font-extrabold text-pink-600 mb-2">200K+</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Monthly active users</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl font-extrabold text-purple-600 mb-2">100K+</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Media files downloaded</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">500K+</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Public content views</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl font-extrabold text-green-600 mb-2">100%</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Free — no sign-up required</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Millions Are Switching to Xinstan</h2>
              <p className="text-gray-600 text-lg">
                Xinstan is designed for people who value speed, simplicity, and reliability. While most tools are bloated 
                with ads, pop-ups, or paywalls, Xinstan focuses on doing one thing extremely well — fast, clean Instagram downloads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Reliable</h3>
                <p className="text-gray-600">
                  Optimized servers ensure consistently quick downloads without waiting or throttling.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Original Quality</h3>
                <p className="text-gray-600">
                  No compression. No watermarks. Your content stays exactly as posted.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Works Everywhere</h3>
                <p className="text-gray-600">
                  Mobile, tablet, or desktop — Xinstan works smoothly in any modern browser.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy-First</h3>
                <p className="text-gray-600">
                  No account creation, no tracking, no storage of personal data. Your links stay private.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Download Smarter with Xinstan Tools</h2>
              <p className="text-gray-600 text-lg">
                Xinstan supports all major Instagram formats so you never need multiple tools again.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/instagram-video-download" className="group p-6 border border-gray-100 rounded-2xl hover:border-pink-200 hover:bg-pink-50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                    <Video className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">Video Downloader</h3>
                    <p className="text-sm text-gray-600">Download Instagram videos and carousel posts in high quality.</p>
                  </div>
                </div>
              </Link>

              <Link to="/instagram-photo-download" className="group p-6 border border-gray-100 rounded-2xl hover:border-pink-200 hover:bg-pink-50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                    <ImageIcon className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">Photo Downloader</h3>
                    <p className="text-sm text-gray-600">Save single or multiple images from posts and profiles.</p>
                  </div>
                </div>
              </Link>

              <Link to="/instagram-reels-download" className="group p-6 border border-gray-100 rounded-2xl hover:border-pink-200 hover:bg-pink-50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                    <Film className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">Reels Downloader</h3>
                    <p className="text-sm text-gray-600">Download Instagram Reels instantly for offline viewing or inspiration.</p>
                  </div>
                </div>
              </Link>

              <Link to="/instagram-story-download" className="group p-6 border border-gray-100 rounded-2xl hover:border-pink-200 hover:bg-pink-50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                    <Clock className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">Story Downloader</h3>
                    <p className="text-sm text-gray-600">Save Stories before they disappear — fast and anonymous.</p>
                  </div>
                </div>
              </Link>

              <div className="group p-6 border border-gray-100 rounded-2xl hover:border-pink-200 hover:bg-pink-50 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                    <Eye className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">Story Viewer</h3>
                    <p className="text-sm text-gray-600">View public Stories without logging in or leaving a trace.</p>
                  </div>
                </div>
              </div>

              <div className="group p-6 border border-gray-100 rounded-2xl hover:border-pink-200 hover:bg-pink-50 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                    <Tv className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">IGTV Downloader</h3>
                    <p className="text-sm text-gray-600">Download long-form IGTV videos and watch anytime.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Creators, Students & Professionals</h2>
              <p className="text-gray-600 text-lg">
                People use Xinstan daily for learning, inspiration, content creation, and reference — because it just works.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400 fill-current">★</div>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  “No ads, no tricks. Paste link → download. Xinstan is refreshingly simple.”
                </p>
                <div className="font-bold text-gray-900">— Digital Creator</div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400 fill-current">★</div>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  “I use it daily to save Reels for inspiration. Super fast and reliable.”
                </p>
                <div className="font-bold text-gray-900">— Video Editor</div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400 fill-current">★</div>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  “Finally a downloader that doesn’t force apps or sign-ups.”
                </p>
                <div className="font-bold text-gray-900">— Student</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Built for Speed. Designed for Simplicity.</h2>
            <p className="text-xl text-gray-600 mb-10">
              Xinstan is built to be lightweight, fast, and intuitive — whether you’re downloading one video or hundreds.
              <br />
              <br />
              Try Xinstan today and experience Instagram downloads the way they should be.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:from-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Downloading Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

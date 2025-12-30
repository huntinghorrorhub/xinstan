import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="logo h-6 w-6 rounded-full overflow-hidden">
                <img src="/android-chrome-192x192.png" alt="Xinstan" className="h-full w-full object-cover" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Xinstan
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Download Instagram content in high quality. Fast, free, and easy to use.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/instagram-video-download" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  Video Downloader
                </Link>
              </li>
              <li>
                <Link to="/instagram-photo-download" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  Photo Downloader
                </Link>
              </li>
              <li>
                <Link to="/instagram-reels-download" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  Reels Downloader
                </Link>
              </li>
              <li>
                <Link to="/instagram-story-download" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  Story Downloader
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Xinstan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

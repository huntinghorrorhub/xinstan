import { useState } from 'react';
import { Clipboard, Download, Loader2 } from 'lucide-react';

interface HeroProps {
  heading: string;
  subheading: string;
  placeholder: string;
}

export default function Hero({ heading, subheading, placeholder }: HeroProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleDownload = async () => {
    if (!url.trim()) {
      alert('Please enter an Instagram URL');
      return;
    }

    setLoading(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/instagram-download`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${anonKey}`,
          },
          body: JSON.stringify({ url: url.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert('Error: ' + (data.error || 'Failed to download'));
        return;
      }

      if (data.download_url || data.url) {
        const downloadUrl = data.download_url || data.url;
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'instagram_content';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {heading}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          {subheading}
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={placeholder}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-gray-700 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePaste}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
              >
                <Clipboard className="h-5 w-5" />
                <span className="hidden sm:inline">Paste</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-left">
            Paste any Instagram URL - works with posts, reels, stories, and more
          </p>
        </div>
      </div>
    </div>
  );
}

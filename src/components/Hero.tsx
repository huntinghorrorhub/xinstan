import { useState, useEffect } from 'react';
import { Clipboard, Download, Loader2, AlertCircle, Check } from 'lucide-react';
import { useDownload } from '../hooks/useDownload';

interface HeroProps {
  heading: string;
  subheading: string;
  placeholder: string;
}

export default function Hero({ heading, subheading, placeholder }: HeroProps) {
  const [url, setUrl] = useState('');
  const { download, verifyCaptcha, fetchSessionStatus, loading, error, requiresCaptcha, sessionStatus } = useDownload();
  const [captchaToken, setCaptchaToken] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchSessionStatus();
    const interval = setInterval(fetchSessionStatus, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchSessionStatus]);

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

    setShowSuccess(false);
    await download(url.trim());
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCaptchaSubmit = async () => {
    if (!captchaToken) {
      alert('Please enter a CAPTCHA token');
      return;
    }

    const verified = await verifyCaptcha(captchaToken);
    if (verified) {
      setCaptchaToken('');
      await download(url.trim());
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
          {requiresCaptcha ? (
            <div className="space-y-4">
              <p className="text-gray-700 font-medium">Security Verification Required</p>
              <input
                type="text"
                value={captchaToken}
                onChange={(e) => setCaptchaToken(e.target.value)}
                placeholder="Enter CAPTCHA token or solve the challenge..."
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-gray-700"
              />
              <button
                onClick={handleCaptchaSubmit}
                disabled={loading || !captchaToken}
                className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all disabled:opacity-50"
              >
                Verify & Continue
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {showSuccess && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">Download started successfully!</p>
            </div>
          )}

          {sessionStatus && (
            <div className="mt-4 pt-4 border-t text-xs text-gray-500 space-y-1">
              <p>Daily bandwidth: {sessionStatus.bandwidthUsed}/{sessionStatus.bandwidthLimit} MB</p>
              <p>Session security score: {sessionStatus.suspiciousScore}/100</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

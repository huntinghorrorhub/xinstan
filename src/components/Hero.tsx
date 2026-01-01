import { useState, useEffect } from 'react';
import { Clipboard, Download, Loader2, AlertCircle, Check, X, Play } from 'lucide-react';
import { useDownload } from '../hooks/useDownload';

interface HeroProps {
  heading: string;
  subheading: string;
  placeholder: string;
}

export default function Hero({ heading, subheading, placeholder }: HeroProps) {
  const [url, setUrl] = useState('');
  const { download, verifyCaptcha, fetchSessionStatus, downloadMedia, clearPreview, loading, error, requiresCaptcha, sessionStatus, mediaPreview } = useDownload();
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
    const success = await download(url.trim());
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleDirectDownload = () => {
    if (mediaPreview) {
      downloadMedia(mediaPreview.downloadUrl);
      clearPreview();
      setUrl('');
    }
  };

  const handleClosePreview = () => {
    clearPreview();
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

        {mediaPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={handleClosePreview}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Preview & Download</h3>

                <div className="mb-6 rounded-xl overflow-hidden bg-gray-100 relative">
                  {mediaPreview.mediaType === 'video' ? (
                    <div className="relative">
                      <video
                        src={mediaPreview.downloadUrl}
                        controls
                        className="w-full max-h-96 object-contain"
                        poster={mediaPreview.thumbnail}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Play className="h-16 w-16 text-white opacity-50" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={mediaPreview.thumbnail}
                      alt="Instagram content preview"
                      className="w-full max-h-96 object-contain"
                    />
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900 capitalize">{mediaPreview.mediaType}</span>
                  </div>
                  {mediaPreview.sizeMB > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium text-gray-900">{mediaPreview.sizeMB.toFixed(2)} MB</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleClosePreview}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDirectDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

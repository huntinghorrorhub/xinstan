import { useState } from 'react';

interface DownloadResponse {
  success?: boolean;
  download_url?: string;
  url?: string;
  thumbnail?: string;
  media_type?: string;
  size_mb?: number;
  error?: string;
  requiresCaptcha?: boolean;
  retryAfter?: number;
  unblockTime?: number;
}

interface MediaPreview {
  downloadUrl: string;
  thumbnail: string;
  mediaType: string;
  sizeMB: number;
}

export function useDownload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresCaptcha, setRequiresCaptcha] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<any>(null);
  const [mediaPreview, setMediaPreview] = useState<MediaPreview | null>(null);

  const download = async (url: string, captchaToken?: string) => {
    setLoading(true);
    setError(null);
    setRequiresCaptcha(false);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

      const response = await fetch(`${backendUrl}/api/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ url, captchaToken }),
      });

      const data: DownloadResponse = await response.json();

      if (!response.ok) {
        if (data.requiresCaptcha) {
          setRequiresCaptcha(true);
          setError('Please verify you are human');
          return;
        }

        if (data.unblockTime) {
          const timeUntilUnblock = Math.ceil(
            (data.unblockTime - Date.now()) / 1000 / 60
          );
          setError(
            `Your session has been temporarily blocked. Try again in ${timeUntilUnblock} minutes.`
          );
          return;
        }

        setError(data.error || 'Download failed');
        return;
      }

      if (data.download_url || data.url) {
        const downloadUrl = data.download_url || data.url;

        // Set media preview data
        setMediaPreview({
          downloadUrl: downloadUrl,
          thumbnail: data.thumbnail || downloadUrl,
          mediaType: data.media_type || 'image',
          sizeMB: data.size_mb || 0,
        });

        // Fetch updated session status
        await fetchSessionStatus();
        return true;
      }

      return false;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to process download'
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyCaptcha = async (token: string) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

      const response = await fetch(`${backendUrl}/api/verify-captcha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ captchaToken: token }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'CAPTCHA verification failed');
        return false;
      }

      setRequiresCaptcha(false);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'CAPTCHA verification failed'
      );
      return false;
    }
  };

  const fetchSessionStatus = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

      const response = await fetch(`${backendUrl}/status`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSessionStatus(data.session);
      }
    } catch (err) {
      console.error('Failed to fetch session status:', err);
    }
  };

  const clearPreview = () => {
    setMediaPreview(null);
  };

  const downloadMedia = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'instagram_content';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return {
    download,
    verifyCaptcha,
    fetchSessionStatus,
    downloadMedia,
    clearPreview,
    loading,
    error,
    requiresCaptcha,
    sessionStatus,
    mediaPreview,
  };
}

export interface PageConfig {
  path: string;
  title: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  placeholder: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const pageConfigs: Record<string, PageConfig> = {
  home: {
    path: '/',
    title: 'Instagram Downloader – Download Photos, Videos & Reels',
    metaDescription: 'Download Instagram photos, videos, reels, and stories in HD quality. Fast, free, and no login required.',
    heading: 'Instagram Downloader',
    subheading: 'Download Instagram photos, videos, reels, and stories in HD quality with one click',
    placeholder: 'Paste Instagram link here...',
    faqs: [
      {
        question: 'How do I download from Instagram?',
        answer: 'Simply copy the Instagram post link, paste it into the input box, and click Download. The file will be ready in seconds.'
      },
      {
        question: 'Is it free to use?',
        answer: 'Yes, our Instagram downloader is completely free with unlimited downloads and no registration required.'
      },
      {
        question: 'What formats are supported?',
        answer: 'We support downloading photos (JPG), videos (MP4), reels, stories, and carousel posts in their original quality.'
      },
      {
        question: 'Is it safe and private?',
        answer: 'Absolutely. We do not store any downloaded content or user data. Your privacy is our priority.'
      }
    ]
  },
  video: {
    path: '/instagram-video-download',
    title: 'Instagram Video Downloader – Download Videos in HD',
    metaDescription: 'Download Instagram videos in HD quality. Fast, simple, and free. No login required.',
    heading: 'Instagram Video Downloader',
    subheading: 'Download Instagram videos in full HD quality with one simple click',
    placeholder: 'Paste Instagram video link here...',
    faqs: [
      {
        question: 'Can I download Instagram videos in HD?',
        answer: 'Yes, our tool downloads Instagram videos in the highest quality available, including HD and Full HD.'
      },
      {
        question: 'Do I need to log in?',
        answer: 'No login required. Simply paste the video link and download instantly.'
      },
      {
        question: 'How long does it take?',
        answer: 'Most videos are processed and ready to download within 2-5 seconds.'
      },
      {
        question: 'Are there any limits?',
        answer: 'No limits. Download as many videos as you want, completely free.'
      }
    ]
  },
  photo: {
    path: '/instagram-photo-download',
    title: 'Instagram Photo Downloader – Save Photos in Full Quality',
    metaDescription: 'Download Instagram photos in original quality. Fast, easy, and free with no watermarks.',
    heading: 'Instagram Photo Downloader',
    subheading: 'Save Instagram photos in their original quality without any watermarks',
    placeholder: 'Paste Instagram photo link here...',
    faqs: [
      {
        question: 'Will the photo quality be affected?',
        answer: 'No, we download photos in their original resolution without any compression or quality loss.'
      },
      {
        question: 'Can I download multiple photos from a carousel?',
        answer: 'Yes, use our Carousel Downloader to save all photos from multi-image posts.'
      },
      {
        question: 'Are there watermarks?',
        answer: 'No watermarks. All photos are downloaded clean in their original format.'
      },
      {
        question: 'What format are photos saved in?',
        answer: 'Photos are saved in JPG format, maintaining the original quality and resolution.'
      }
    ]
  },
  reels: {
    path: '/instagram-reels-download',
    title: 'Instagram Reels Downloader – Download Reels in HD',
    metaDescription: 'Download Instagram Reels in HD quality with no watermark. Fast, free, and easy to use.',
    heading: 'Instagram Reels Downloader',
    subheading: 'Download Instagram Reels in HD quality without watermarks',
    placeholder: 'Paste Instagram Reels link here...',
    faqs: [
      {
        question: 'Can I download Reels without watermark?',
        answer: 'Our tool downloads Reels in their highest quality. Some Reels may have creator watermarks embedded in the original video.'
      },
      {
        question: 'What quality are Reels downloaded in?',
        answer: 'Reels are downloaded in the highest quality available, typically HD (720p) or Full HD (1080p).'
      },
      {
        question: 'Can I download Reels with audio?',
        answer: 'Yes, all Reels are downloaded with their original audio track intact.'
      },
      {
        question: 'How do I get the Reels link?',
        answer: 'Open the Reel in Instagram, tap the three dots, and select "Copy Link". Then paste it here.'
      }
    ]
  },
  story: {
    path: '/instagram-story-download',
    title: 'Instagram Story Downloader – Save Stories Anonymously',
    metaDescription: 'Download Instagram stories anonymously. Save photos and videos from stories without them knowing.',
    heading: 'Instagram Story Downloader',
    subheading: 'Download Instagram stories anonymously without leaving a trace',
    placeholder: 'Paste Instagram story link here...',
    faqs: [
      {
        question: 'Can I download stories anonymously?',
        answer: 'Yes, you can download stories without the poster knowing. We do not interact with Instagram on your behalf.'
      },
      {
        question: 'How do I get a story link?',
        answer: 'You can get story links by using Instagram\'s "Share" option or accessing them through a web browser.'
      },
      {
        question: 'Can I download expired stories?',
        answer: 'No, stories must be active on Instagram to be downloaded. Once expired, they are no longer accessible.'
      },
      {
        question: 'Does it work for highlights?',
        answer: 'Yes, our tool works for both regular stories and story highlights.'
      }
    ]
  },
  carousel: {
    path: '/instagram-carousel-download',
    title: 'Instagram Carousel Downloader – Download All Photos & Videos',
    metaDescription: 'Download all photos and videos from Instagram carousel posts. Get multiple images at once.',
    heading: 'Instagram Carousel Downloader',
    subheading: 'Download all photos and videos from multi-image carousel posts at once',
    placeholder: 'Paste Instagram carousel link here...',
    faqs: [
      {
        question: 'What is a carousel post?',
        answer: 'A carousel post is an Instagram post with multiple photos or videos that you can swipe through.'
      },
      {
        question: 'Can I download all images at once?',
        answer: 'Yes, our tool extracts and provides download links for all media in the carousel post.'
      },
      {
        question: 'Does it work with mixed content?',
        answer: 'Yes, carousels containing both photos and videos are fully supported.'
      },
      {
        question: 'How many items can a carousel have?',
        answer: 'Instagram carousels can have up to 10 photos or videos, and our tool supports all of them.'
      }
    ]
  },
  igtv: {
    path: '/instagram-igtv-download',
    title: 'Instagram IGTV Downloader – Download Long Videos',
    metaDescription: 'Download Instagram IGTV videos in high quality. Save long-form content easily and free.',
    heading: 'Instagram IGTV Downloader',
    subheading: 'Download IGTV long-form videos in high quality with ease',
    placeholder: 'Paste Instagram IGTV link here...',
    faqs: [
      {
        question: 'What is IGTV?',
        answer: 'IGTV (Instagram TV) is Instagram\'s platform for long-form vertical videos, now integrated as regular video posts.'
      },
      {
        question: 'Can I download long videos?',
        answer: 'Yes, our tool supports downloading videos of any length posted on Instagram.'
      },
      {
        question: 'What quality are IGTV videos downloaded in?',
        answer: 'IGTV videos are downloaded in their highest available quality, typically HD or Full HD.'
      },
      {
        question: 'Is there a file size limit?',
        answer: 'No, we can handle IGTV videos of any size without restrictions.'
      }
    ]
  },
  profile: {
    path: '/instagram-profile-viewer',
    title: 'Instagram Profile Viewer – View Profiles & Stories Anonymously',
    metaDescription: 'View Instagram profiles, photos, and stories anonymously without an account. Browse privately.',
    heading: 'Instagram Profile Viewer',
    subheading: 'View Instagram profiles, photos, and stories anonymously without logging in',
    placeholder: 'Enter Instagram username...',
    faqs: [
      {
        question: 'Can I view profiles without an account?',
        answer: 'Yes, our profile viewer allows you to browse public Instagram profiles without logging in.'
      },
      {
        question: 'Is it anonymous?',
        answer: 'Completely anonymous. The profile owner will not know you viewed their content.'
      },
      {
        question: 'Can I view private profiles?',
        answer: 'No, only public profiles can be viewed. Private accounts require following permission on Instagram.'
      },
      {
        question: 'What can I see?',
        answer: 'You can view profile photos, posts, post counts, follower counts, and available stories from public accounts.'
      }
    ]
  }
};

export const navigationItems = [
  { label: 'Video', path: '/instagram-video-download' },
  { label: 'Photo', path: '/instagram-photo-download' },
  { label: 'Reels', path: '/instagram-reels-download' },
  { label: 'Story', path: '/instagram-story-download' },
  { label: 'Carousel', path: '/instagram-carousel-download' },
  { label: 'IGTV', path: '/instagram-igtv-download' },
  { label: 'Viewer', path: '/instagram-profile-viewer' }
];

import { Copy, FileDown, Link2 } from 'lucide-react';

export default function Steps() {
  const steps = [
    {
      icon: Copy,
      title: 'Copy Link',
      description: 'Copy the Instagram post link from the app or website'
    },
    {
      icon: Link2,
      title: 'Paste Here',
      description: 'Paste the link into our downloader tool above'
    },
    {
      icon: FileDown,
      title: 'Download',
      description: 'Click download and save your content instantly'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          How It Works
        </h2>
        <p className="text-gray-600">
          Three simple steps to download Instagram content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg mb-4">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white font-bold flex items-center justify-center text-lg shadow-md">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-pink-300 to-purple-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

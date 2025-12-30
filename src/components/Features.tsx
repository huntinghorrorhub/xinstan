import { Shield, Zap, Infinity, Smartphone, Image, Lock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Lock,
      title: 'No Login Required',
      description: 'Download content without signing in or creating an account'
    },
    {
      icon: Infinity,
      title: 'Unlimited Downloads',
      description: 'No limits on the number of downloads. Use as much as you need'
    },
    {
      icon: Image,
      title: 'HD Quality',
      description: 'Download photos and videos in their original high quality'
    },
    {
      icon: Smartphone,
      title: 'All Devices',
      description: 'Works perfectly on desktop, mobile, and tablet devices'
    },
    {
      icon: Shield,
      title: 'Safe & Private',
      description: 'We do not store your data or downloaded content'
    },
    {
      icon: Zap,
      title: 'Super Fast',
      description: 'Lightning-fast downloads with no waiting or delays'
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Why Choose Us
          </h2>
          <p className="text-gray-600">
            The best Instagram downloader with premium features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 text-white mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

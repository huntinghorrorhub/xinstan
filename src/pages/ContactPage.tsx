import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact US</h1>
        <p className="text-gray-600 mb-6">
          Do you want to know more about how we could help you? Don’t hesitate to get in touch with us.
        </p>
        <div className="bg-gray-50 border rounded-xl p-6">
          <p className="text-gray-700">
            Contact us by email:
            <a href="mailto:support@fastdl.app" className="text-pink-600 hover:underline ml-1">support@fastdl.app</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

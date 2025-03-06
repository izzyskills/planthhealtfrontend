import { ArrowRight, Leaf, Check, Award } from "lucide-react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Identify Plant Diseases Instantly
              </h1>
              <p className="text-xl mb-6">
                Take a photo of your plants and get an accurate diagnosis using
                our advanced AI technology.
              </p>
              <Link
                to="/classify"
                className="bg-white text-green-700 px-6 py-3 rounded-md font-medium inline-flex items-center hover:bg-green-100 transition-colors"
              >
                Try it now <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src="/api/placeholder/400/300"
                  alt="Plant disease detection"
                  className="rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Leaf className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload a Photo</h3>
              <p className="text-gray-600">
                Take a clear photo of the affected plant leaf or stem and upload
                it to our platform.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Check className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get AI Diagnosis</h3>
              <p className="text-gray-600">
                Our advanced AI model will analyze the image and identify the
                disease affecting your plant.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Treatment Recommendations
              </h3>
              <p className="text-gray-600">
                Receive detailed information about the disease and specific
                treatment recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to diagnose your plants?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our platform supports over 50 plant species and can identify more
            than 100 different plant diseases with high accuracy.
          </p>
          <Link
            to="/classify"
            className="bg-white text-green-700 px-8 py-3 rounded-md font-medium text-lg hover:bg-green-100 transition-colors"
          >
            Start Classifying
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

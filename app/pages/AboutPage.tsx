const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About PlantHealth</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            At PlantHealth, we're committed to helping gardeners, farmers, and
            plant enthusiasts quickly identify and treat plant diseases. Our
            AI-powered platform makes professional plant pathology accessible to
            everyone, helping to reduce crop losses and save plants.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            Our plant disease classification system uses state-of-the-art deep
            learning models trained on thousands of images of diseased and
            healthy plants. The model can identify over 100 diseases across 50+
            plant species with an accuracy of over 90%.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            We continuously improve our algorithms by incorporating feedback
            from plant pathology experts and users like you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
            <p className="mb-2">
              <strong>Email:</strong> support@planthealth.example.com
            </p>
            <p>
              <strong>Address:</strong> 123 Green Street, Plantville, Nature
              98765
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

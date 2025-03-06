const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">PlantHealth</h3>
            <p className="text-gray-400">Identify plant diseases with AI</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p>
              &copy; {new Date().getFullYear()} PlantHealth. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

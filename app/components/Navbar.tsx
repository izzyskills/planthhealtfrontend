import { Link } from "react-router";
import { Leaf, History } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf size={24} />
          <span className="text-xl font-bold">PlantHealth</span>
        </Link>
        <div className="space-x-6  flex flex-row">
          <Link to="/" className="hover:text-green-200">
            Home
          </Link>
          <Link to="/classify" className="hover:text-green-200">
            Classifier
          </Link>
          <Link to="/predictions" className="hover:text-green-200">
            <div className="flex items-center">
              <History size={16} className="mr-1" />
              <span>History</span>
            </div>
          </Link>
          <Link to="/about" className="hover:text-green-200">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

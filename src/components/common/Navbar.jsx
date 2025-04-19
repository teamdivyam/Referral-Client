import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Divyam
        </Link>
      </div>

      {/* Middle: Navigation Links */}
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-gray-700 hover:text-blue-500 transition">
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          Contact
        </Link>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </nav>
  );
}

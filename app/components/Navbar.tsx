import { Link, useLocation } from "react-router";
import { Leaf, ChevronRight, Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useAuth } from "~/context/AuthContext";
import { useTheme } from "~/context/ThemeProvider";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "text-sm font-medium text-primary underline"
      : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="px-2 md:px-8 flex items-center gap-2 font-bold">
          <Leaf size={24} />
          <span>PlantHealth</span>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link to="/about" className={getLinkClass("/about")}>
            About
          </Link>

          {isLoggedIn && (
            <Link to="/predictions" className={getLinkClass("/predictions")}>
              Predictions
            </Link>
          )}
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          {isLoggedIn ? (
            <>
              <Link to="/classify" className={getLinkClass("/classify")}>
                Classify
              </Link>
              <Button variant={"destructive"} className="rounded-full">
                Log Out
                <LogOut className="ml-1 size-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className={getLinkClass("/login")}>
                Log in
              </Link>
              <Link to="/signup">
                <Button className="rounded-full">
                  Get Started
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
        >
          <div className="container py-4 flex flex-col gap-4">
            <Link
              to="/home"
              className={getLinkClass("/home")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={getLinkClass("/about")}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {isLoggedIn && (
              <Link
                to="/predictions"
                className={getLinkClass("/predictions")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Predictions
              </Link>
            )}
            <div className="flex flex-col gap-2 pt-2 border-t">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/classify"
                    className={getLinkClass("/classify")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Classify
                  </Link>
                  <Button
                    variant={"destructive"}
                    className="rounded-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log Out
                    <LogOut className="ml-1 size-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={getLinkClass("/login")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="rounded-full">
                      Get Started
                      <ChevronRight className="ml-1 size-4" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};
export default Navbar;

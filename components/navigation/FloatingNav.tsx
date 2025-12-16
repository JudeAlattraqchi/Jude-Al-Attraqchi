import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { User, X, Loader2 } from "lucide-react";
import { Logo } from "../ui/Logo";

interface FloatingNavProps {
  currentPage: 'home' | 'blog';
  setCurrentPage: (page: 'home' | 'blog') => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export default function FloatingNav({ currentPage, setCurrentPage, isAdmin, setIsAdmin }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate network delay
    setTimeout(() => {
      if (username === "team@velocityscript.nz" && password === "alattraqchi10") {
        setIsAdmin(true);
        setShowLoginModal(false);
        setUsername("");
        setPassword("");
      } else {
        setError("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentPage('home');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? "scale-95" : "scale-100"}`
        }>

        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[inset_0_2px_12px_rgba(255,255,255,0.9),inset_0_-2px_12px_rgba(0,0,0,0.03),0_8px_32px_rgba(51,153,153,0.15)] px-6 py-3">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
              <Logo className="h-8 w-auto" />
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => handleNavClick("home")}
                className={`transition-colors font-medium ${currentPage === 'home' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'}`}>
                Home
              </button>
              {/* Blog link removed from here and moved to footer */}
              <button
                onClick={() => handleNavClick("success-stories")}
                className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
                Success Stories
              </button>
              <button
                onClick={() => handleNavClick("services")}
                className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
                Services
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
                Contact
              </button>
            </div>

            {/* CTA Button & Hidden Admin Trigger */}
            <div className="flex items-center gap-2 relative group">
              {isAdmin ? (
                 <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-md border border-teal-200">Admin</span>
                    <Button 
                        size="sm" 
                        variant="outline"
                        onClick={handleLogout}
                        className="text-xs h-8"
                    >
                        Logout
                    </Button>
                 </div>
              ) : (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleNavClick("booking")}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl shadow-[0_4px_12px_rgba(51,153,153,0.3)] border-0 px-4 py-2 relative z-10">
                    Book Free Consultation
                  </Button>
                  
                  {/* Hidden Profile Icon Trigger */}
                  <div 
                    className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer duration-300"
                    onClick={() => setShowLoginModal(true)}
                    title="Staff Login"
                  >
                    <div className="p-1.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                        <User className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md overflow-hidden"
            >
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 text-center">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Staff Login</h3>
                <p className="text-sm text-slate-500">Access post generation tools</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Enter password"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center bg-red-50 py-1 rounded">{error}</p>
                )}

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-2 rounded-xl mt-2"
                >
                  {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                    </>
                  ) : "Login"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
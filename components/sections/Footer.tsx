import React from "react";
import { MapPin, Phone, Smartphone, BookOpen } from "lucide-react";
import { Logo } from "../ui/Logo";

interface FooterProps {
    setCurrentPage: (page: 'home' | 'blog') => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Logo className="h-10 w-auto" />
          </div>

          {/* Contact Information */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.05)]">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span className="text-slate-700 font-medium">Auckland, New Zealand</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.05)]">
              <Phone className="w-4 h-4 text-cyan-600" />
              <span className="text-slate-700 font-medium">(+64) 9 888 9282</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.05)]">
              <Smartphone className="w-4 h-4 text-lime-600" />
              <span className="text-slate-700 font-medium">(+64) 223 037 330</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <button 
                onClick={() => setCurrentPage('blog')}
                className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors font-medium bg-white/50 px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm"
            >
                <BookOpen className="w-4 h-4" />
                Latest Insights
            </button>
            <button className="text-slate-600 hover:text-teal-600 transition-colors font-medium underline">
              Terms and Conditions
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-200/50 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Velocity Script. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
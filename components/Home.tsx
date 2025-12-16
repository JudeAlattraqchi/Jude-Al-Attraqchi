import React, { useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "./ui/aurora-background";
import { Button } from "./ui/button";
import { Play, Mic, Zap, ArrowRight, Sparkles, Share2, Check } from "lucide-react";
import SuccessStories from "./sections/SuccessStories";
import Services from "./sections/Services";
import CalendarBooking from "./sections/CalendarBooking";
import ChatWidget from "./ChatWidget";
import LiveVoiceAgent from "./LiveVoiceAgent";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* FloatingNav is now in App.tsx */}
      
      <section id="home">
        <AuroraBackground className="relative overflow-hidden">
          {/* Custom Claymorphism Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-emerald-50 to-lime-50 opacity-80" />
          
          {/* Enhanced Floating Clay Elements with MORE bubbles and circles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-200/30 to-cyan-300/30 rounded-3xl shadow-[inset_0_2px_10px_rgba(255,255,255,0.7),inset_0_-2px_10px_rgba(0,0,0,0.1),0_4px_20px_rgba(51,153,153,0.2)] animate-pulse" />
          <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-lime-200/30 to-lime-300/30 rounded-2xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.7),inset_0_-2px_8px_rgba(0,0,0,0.1),0_3px_15px_rgba(153,204,51,0.2)] animate-bounce" />
          <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-teal-200/30 to-teal-300/30 rounded-full shadow-[inset_0_2px_6px_rgba(255,255,255,0.7),inset_0_-2px_6px_rgba(0,0,0,0.1),0_2px_10px_rgba(20,184,166,0.2)] animate-pulse" />
          <div className="absolute bottom-20 right-32 w-28 h-28 bg-gradient-to-br from-emerald-200/30 to-emerald-300/30 rounded-3xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.7),inset_0_-2px_8px_rgba(0,0,0,0.1),0_3px_15px_rgba(16,185,129,0.2)] animate-bounce" />
          
          {/* Additional animated shapes - MORE CIRCLES AND BUBBLES */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-200/20 to-purple-300/20 rounded-xl shadow-[inset_0_2px_6px_rgba(255,255,255,0.7),0_2px_10px_rgba(147,51,234,0.1)] animate-ping" style={{animationDuration: '3s'}} />
          <div className="absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-br from-orange-200/20 to-orange-300/20 rotate-45 shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),0_2px_8px_rgba(251,146,60,0.1)] animate-spin" style={{animationDuration: '8s'}} />
          <div className="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-br from-pink-200/20 to-pink-300/20 rotate-45 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),0_1px_6px_rgba(236,72,153,0.1)]" style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            animation: 'float 6s ease-in-out infinite'
          }} />
          <div className="absolute bottom-1/3 right-10 w-14 h-14 bg-gradient-to-br from-indigo-200/20 to-indigo-300/20 rounded-2xl shadow-[inset_0_2px_5px_rgba(255,255,255,0.7),0_2px_9px_rgba(99,102,241,0.1)] animate-bounce" style={{animationDelay: '2s'}} />

          {/* NEW ADDITIONAL CIRCLES AND BUBBLES */}
          <div className="absolute top-16 right-1/3 w-10 h-10 bg-gradient-to-br from-rose-200/25 to-rose-300/25 rounded-full shadow-[inset_0_1px_4px_rgba(255,255,255,0.7),0_1px_8px_rgba(244,63,94,0.1)] animate-pulse" style={{animationDelay: '1s', animationDuration: '2.5s'}} />
          <div className="absolute top-1/3 right-12 w-6 h-6 bg-gradient-to-br from-violet-200/25 to-violet-300/25 rounded-full shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),0_1px_6px_rgba(139,69,193,0.1)] animate-bounce" style={{animationDelay: '0.5s'}} />
          <div className="absolute bottom-1/4 left-1/3 w-18 h-18 bg-gradient-to-br from-sky-200/20 to-sky-300/20 rounded-full shadow-[inset_0_2px_7px_rgba(255,255,255,0.7),0_2px_12px_rgba(14,165,233,0.1)] animate-ping" style={{animationDuration: '4s'}} />
          <div className="absolute top-2/3 left-16 w-12 h-12 bg-gradient-to-br from-amber-200/20 to-amber-300/20 rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,0.7),0_2px_9px_rgba(245,158,11,0.1)] animate-pulse" style={{animationDelay: '1.5s'}} />
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-gradient-to-br from-emerald-200/25 to-emerald-300/25 rounded-full shadow-[inset_0_1px_4px_rgba(255,255,255,0.7),0_1px_7px_rgba(16,185,129,0.1)]" style={{animation: 'float 5s ease-in-out infinite', animationDelay: '2s'}} />
          <div className="absolute bottom-1/2 right-20 w-14 h-14 bg-gradient-to-br from-fuchsia-200/20 to-fuchsia-300/20 rounded-full shadow-[inset_0_2px_6px_rgba(255,255,255,0.7),0_2px_10px_rgba(217,70,239,0.1)] animate-bounce" style={{animationDelay: '3s', animationDuration: '3s'}} />
          <div className="absolute top-3/4 left-1/2 w-7 h-7 bg-gradient-to-br from-cyan-200/30 to-cyan-300/30 rounded-full shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),0_1px_6px_rgba(6,182,212,0.1)] animate-ping" style={{animationDuration: '3.5s', animationDelay: '1s'}} />
          <div className="absolute bottom-2/3 left-8 w-9 h-9 bg-gradient-to-br from-lime-200/25 to-lime-300/25 rounded-full shadow-[inset_0_1px_4px_rgba(255,255,255,0.7),0_1px_7px_rgba(132,204,22,0.1)] animate-pulse" style={{animationDelay: '2.5s'}} />

          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-8 items-center justify-center px-4 z-10 max-w-6xl mx-auto text-center"
          >
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-lime-600 bg-clip-text text-transparent leading-tight">
                AI Voice Solutions
                <br />
                <span className="text-3xl md:text-6xl">That Actually Work</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="font-light text-lg md:text-2xl text-slate-600 leading-relaxed">
                Transform your business with cutting-edge AI voice agents that handle calls, 
                <span className="font-medium text-teal-600"> book appointments</span>, and 
                <span className="font-medium text-lime-600"> close deals</span> while you sleep.
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mt-6"
            >
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-100 to-cyan-50 rounded-2xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.8),inset_0_-2px_8px_rgba(0,0,0,0.05),0_4px_16px_rgba(51,153,153,0.15)] border border-cyan-200/50">
                <Zap className="w-5 h-5 text-cyan-600" />
                <span className="text-cyan-700 font-medium">24/7 Availability</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-100 to-lime-50 rounded-2xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.8),inset_0_-2px_8px_rgba(0,0,0,0.05),0_4px_16px_rgba(153,204,51,0.15)] border border-lime-200/50">
                <Sparkles className="w-5 h-5 text-lime-600" />
                <span className="text-lime-700 font-medium">Human-Like Conversations</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-100 to-teal-50 rounded-2xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.8),inset_0_-2px_8px_rgba(0,0,0,0.05),0_4px_16px_rgba(20,184,166,0.15)] border border-teal-200/50">
                <Mic className="w-5 h-5 text-teal-600" />
                <span className="text-teal-700 font-medium">Custom Voice Training</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 mt-8 items-center"
            >
              {/* Added Live Voice Agent Button */}
              <LiveVoiceAgent />
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToBooking}
                className="group px-8 py-4 bg-gradient-to-r from-white to-gray-50 border-2 border-lime-200 hover:border-lime-300 text-lime-700 hover:text-lime-800 rounded-2xl shadow-[inset_0_2px_12px_rgba(255,255,255,0.9),inset_0_-2px_12px_rgba(0,0,0,0.03),0_6px_20px_rgba(153,204,51,0.15)] hover:shadow-[inset_0_2px_16px_rgba(255,255,255,0.9),inset_0_-2px_16px_rgba(0,0,0,0.05),0_8px_28px_rgba(153,204,51,0.2)] transition-all duration-300 text-lg font-semibold"
              >
                Book Free Call
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={handleShare}
                className="group px-6 py-4 text-slate-500 hover:text-teal-600 hover:bg-white/50 rounded-2xl transition-all duration-300 font-semibold"
              >
                {copied ? (
                    <>
                        <Check className="w-5 h-5 mr-2" />
                        Copied Link
                    </>
                ) : (
                    <>
                        <Share2 className="w-5 h-5 mr-2" />
                        Share
                    </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
        </AuroraBackground>
      </section>

      <SuccessStories />
      <Services />
      <CalendarBooking />
      {/* Footer removed from here, now in App.tsx */}
      <ChatWidget />

      {/* Add floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}

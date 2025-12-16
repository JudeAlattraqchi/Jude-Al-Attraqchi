import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Phone, DollarSign, Check, ArrowRight } from "lucide-react";

const successStories = [
  {
    company: "LUXE|WALK",
    logo: "LW",
    description: "Leads went cold after submitting the online form. We launched an AI Voice Agent that called every lead within seconds.",
    result: "150+ Extra Bookings Per Month",
    metric: "3x more leads",
    icon: TrendingUp,
    logoBg: "bg-cyan-400",
    gradient: "from-cyan-400 to-cyan-500",
    shadow: "shadow-cyan-200/50"
  },
  {
    company: "JB Properties",
    logo: "JB",
    description: "200+ manual callbacks were handled manually. Our Voice AI now responds, books & closes every call instantly.",
    result: "3 hours saved daily & faster lead handling",
    metric: "98% call automation",
    icon: Clock,
    logoBg: "bg-lime-500",
    gradient: "from-lime-400 to-lime-500",
    shadow: "shadow-lime-200/50"
  },
  {
    company: "PCW Solutions",
    logo: "P",
    description: "Support clients need to book the feedback during off hours. We deployed a voice agent that runs wireless 80% of calls automatically.",
    result: "Handles 200 calls/month",
    metric: "24/7 support",
    icon: Phone,
    logoBg: "bg-indigo-400",
    gradient: "from-indigo-400 to-indigo-500",
    shadow: "shadow-indigo-200/50"
  },
  {
    company: "LET'S FIX IT",
    logo: "FI",
    description: "200+ manual callbacks were handled manually. Our Voice AI now responds, books & closes every call instantly.",
    result: "$22,680 Total Annual Savings",
    metric: "ROI: 340%",
    icon: DollarSign,
    logoBg: "bg-orange-400",
    gradient: "from-orange-400 to-orange-500",
    shadow: "shadow-orange-200/50"
  }
];

export default function SuccessStories() {
  return (
    <section id="success-stories" className="py-20 px-4 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our success stories</h2>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
            See how we've transformed businesses with AI voice solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${story.logoBg} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {story.logo}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900">{story.company}</h3>
                    <p className="text-sm text-slate-400 font-medium mt-1">How We Helped:</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 mb-8 leading-relaxed text-[15px]">
                {story.description}
              </p>

              {/* Result Card */}
              <div className={`mt-auto bg-gradient-to-r ${story.gradient} rounded-2xl p-6 text-white shadow-lg ${story.shadow}`}>
                <div className="flex items-center gap-2 mb-3">
                    <story.icon className="w-5 h-5 opacity-90" />
                    <span className="font-semibold opacity-90 text-sm">Result:</span>
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-1">{story.result}</h4>
                <p className="text-sm font-medium opacity-80">{story.metric}</p>
              </div>

              {/* Footer Links */}
              <div className="flex items-center justify-between mt-6 pt-2 text-sm font-medium">
                <div className="flex items-center text-slate-400 gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Completed</span>
                </div>
                <button className="flex items-center text-slate-500 hover:text-slate-800 transition-colors gap-1 group">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
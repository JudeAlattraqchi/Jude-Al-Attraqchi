import React from "react";
import { motion } from "framer-motion";
import { Bot, Calendar, Phone, BarChart3, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Voice Agents",
    description: "Custom-trained AI agents that sound human and handle complex conversations",
    gradient: "from-teal-400 to-cyan-400",
    bgGradient: "from-teal-50 to-cyan-50"
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Automated scheduling that integrates with your calendar and CRM systems",
    gradient: "from-lime-400 to-emerald-400",
    bgGradient: "from-lime-50 to-emerald-50"
  },
  {
    icon: Phone,
    title: "Lead Qualification",
    description: "Smart lead scoring and qualification through natural conversations",
    gradient: "from-purple-400 to-indigo-400",
    bgGradient: "from-purple-50 to-indigo-50"
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Real-time reporting and conversation analytics to optimize performance",
    gradient: "from-orange-400 to-red-400",
    bgGradient: "from-orange-50 to-red-50"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with data protection regulations",
    gradient: "from-blue-400 to-indigo-400",
    bgGradient: "from-blue-50 to-indigo-50"
  },
  {
    icon: Zap,
    title: "24/7 Operation",
    description: "Never miss a call or opportunity with round-the-clock AI assistance",
    gradient: "from-pink-400 to-rose-400",
    bgGradient: "from-pink-50 to-rose-50"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }} // Added viewport for animation control
          className="text-center mb-16"
        >
          {/* The "Our Services" badge has been removed as per the instructions. */}
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Complete AI Voice Solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to automate and enhance your customer interactions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }} // Added viewport for animation control
              className={`bg-gradient-to-br ${service.bgGradient} rounded-3xl p-8 shadow-[inset_0_2px_16px_rgba(255,255,255,0.8),inset_0_-2px_16px_rgba(0,0,0,0.03),0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 hover:shadow-[inset_0_2px_20px_rgba(255,255,255,0.9),inset_0_-2px_20px_rgba(0,0,0,0.05),0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.7),0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center mb-6`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
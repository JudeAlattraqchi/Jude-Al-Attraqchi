import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Zap } from "lucide-react";

export default function CalendarBooking() {
  useEffect(() => {
    // Load Cal.com script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      (function (C, A, L) { 
        let p = function (a, ar) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          } 
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");
      
      Cal("init", "velocity-script", {origin:"https://app.cal.com"});
      
      Cal.ns["velocity-script"]("inline", {
        elementOrSelector:"#my-cal-inline-velocity-script",
        config: {"layout":"month_view"},
        calLink: "jude-al-attraqchi-jqzfyj/velocity-script",
      });
      
      Cal.ns["velocity-script"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const benefitVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="booking" className="py-20 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-lime-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* REMOVED Book a Call badge */}
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Schedule a free consultation to see how AI voice agents can revolutionize your customer interactions
          </p>
          
          {/* Benefits */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <motion.div
              variants={benefitVariants}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.05)]"
            >
              <Clock className="w-4 h-4 text-teal-600" />
              <span className="text-slate-700 font-medium">30 min consultation</span>
            </motion.div>
            <motion.div
              variants={benefitVariants}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.05)]"
            >
              <Zap className="w-4 h-4 text-lime-600" />
              <span className="text-slate-700 font-medium">Free demo included</span>
            </motion.div>
            <motion.div
              variants={benefitVariants}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.05)]"
            >
              <Calendar className="w-4 h-4 text-cyan-600" />
              <span className="text-slate-700 font-medium">No commitment required</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-[inset_0_2px_20px_rgba(255,255,255,0.9),inset_0_-2px_20px_rgba(0,0,0,0.03),0_12px_40px_rgba(51,153,153,0.08)] border border-white/50 p-6">
            <div 
              style={{width:"100%", height:"600px", overflow:"scroll"}} 
              id="my-cal-inline-velocity-script"
              className="rounded-2xl"
            ></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
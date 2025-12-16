import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const faqs = [
  { question: "How much does it cost?", answer: "Our pricing scales with your usage. We offer a free consultation to determine the best plan for your needs." },
  { question: "Can I customize the voice?", answer: "Yes! We offer distinct voice profiles and can even clone specific voices for enterprise clients." },
  { question: "Does it integrate with CRM?", answer: "Absolutely. We seamlessly integrate with Salesforce, HubSpot, Zoho, and many other major CRM platforms." },
  { question: "Is support available 24/7?", answer: "Our AI agents run 24/7. Our technical support team is available during business hours, with emergency support for enterprise plans." },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi there! 👋 How can I help you automate your calls today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), text, sender: "user" };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
        let botText = "Thanks for your message! Our team will get back to you shortly. In the meantime, you can book a free consultation above.";
        
        // Simple keyword matching for demo purposes
        const lowerText = text.toLowerCase();
        if (lowerText.includes("price") || lowerText.includes("cost")) botText = faqs[0].answer;
        else if (lowerText.includes("voice") || lowerText.includes("custom")) botText = faqs[1].answer;
        else if (lowerText.includes("crm") || lowerText.includes("integrate")) botText = faqs[2].answer;
        else if (lowerText.includes("support") || lowerText.includes("help")) botText = faqs[3].answer;
        
        const newBotMsg: Message = { id: (Date.now() + 1).toString(), text: botText, sender: "bot" };
        setMessages(prev => [...prev, newBotMsg]);
    }, 1000);
  };

  const handleFaqClick = (faq: { question: string, answer: string }) => {
    const newUserMsg: Message = { id: Date.now().toString(), text: faq.question, sender: "user" };
    setMessages(prev => [...prev, newUserMsg]);

    setTimeout(() => {
      const newBotMsg: Message = { id: (Date.now() + 1).toString(), text: faq.answer, sender: "bot" };
      setMessages(prev => [...prev, newBotMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Velocity AI Assistant</h3>
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-[300px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-teal-500 text-white rounded-tr-none shadow-md shadow-teal-500/10"
                        : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 overflow-x-auto">
                <p className="text-xs text-slate-400 mb-2 font-medium">Suggested Questions:</p>
                <div className="flex flex-wrap gap-2">
                    {faqs.map((faq, i) => (
                        <button
                            key={i}
                            onClick={() => handleFaqClick(faq)}
                            className="px-3 py-1.5 bg-white border border-teal-100 text-teal-700 text-xs rounded-full hover:bg-teal-50 hover:border-teal-200 transition-colors shadow-sm"
                        >
                            {faq.question}
                        </button>
                    ))}
                </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-slate-100">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center transition-all duration-300 border-2 border-white ${
            isOpen ? "bg-slate-800 text-white" : "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
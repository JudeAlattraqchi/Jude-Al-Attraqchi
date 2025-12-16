import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Image as ImageIcon, Copy, Loader2, Send, Trash2, X, ChevronRight, User, Calendar as CalendarIcon, Tag, Download } from "lucide-react";
import { BlogPost } from "../../App";

interface BlogPageProps {
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  isAdmin: boolean;
}

const faqs = [
    { q: "What is an AI Voice Agent?", a: "An AI Voice Agent is a digital assistant capable of holding natural, human-like conversations to handle calls, bookings, and inquiries." },
    { q: "Can it really replace a human receptionist?", a: "For routine tasks like scheduling and answering FAQs, yes. It frees up your human staff for more complex issues." },
    { q: "Does it sound robotic?", a: "Not at all. We use advanced voice synthesis that includes breath pauses and natural intonation." },
    { q: "How much does it cost?", a: "Costs vary by usage, but typically it saves 70% compared to hiring full-time staff." },
    { q: "Is it available 24/7?", a: "Yes, your AI agent never sleeps, takes breaks, or calls in sick." },
    { q: "Can I choose the voice?", a: "Absolutely. We have a library of accents and tones, or we can clone a specific voice." },
    { q: "Does it integrate with my Calendar?", a: "Yes, it syncs in real-time with Google Calendar, Outlook, and others." },
    { q: "What happens if it doesn't know the answer?", a: "It can gracefully transfer the call to a human or take a message for you." },
    { q: "Is my data secure?", a: "We use bank-level encryption and comply with all major privacy regulations." },
    { q: "How long does setup take?", a: "Basic setup takes less than 24 hours. Custom enterprise solutions take 3-5 days." },
    { q: "Can it handle multiple calls at once?", a: "Yes, it has infinite capacity and can handle hundreds of simultaneous calls." },
    { q: "Do I need new phone numbers?", a: "No, you can forward your existing lines to our system." },
    { q: "Does it work for outbound calling?", a: "Yes, it can perform lead qualification and appointment reminder calls." },
    { q: "What industries do you serve?", a: "Real estate, healthcare, automotive, legal, and home services are our specialties." },
    { q: "Can it speak other languages?", a: "Currently supports English, Spanish, French, German, and 20+ others." },
    { q: "Is there a contract?", a: "We offer month-to-month flexibility as well as annual discounts." },
    { q: "How do I see the call logs?", a: "You get a dashboard with recordings, transcripts, and analytics for every call." },
    { q: "Can it process payments?", a: "Yes, fully PCI-compliant payment processing over the phone." },
    { q: "Does it understand accents?", a: "Our models are trained on diverse datasets to understand various global accents." },
    { q: "Can I change the script?", a: "You have full control over the agent's knowledge base and instructions." },
    { q: "What if the internet goes down?", a: "We have redundant servers. If your internet fails, we can still take messages." },
    { q: "Do you offer a free trial?", a: "Yes, we offer a risk-free demo period to prove the value." },
    { q: "How does it handle angry customers?", a: "It stays calm and professional, and can de-escalate or transfer to a manager." },
    { q: "Can it send SMS follow-ups?", a: "Yes, it can send texts immediately after a call with links or confirmations." },
    { q: "Is it compatible with Salesforce?", a: "Native integrations available for Salesforce, HubSpot, Zoho, and Pipedrive." },
    { q: "Can it screen spam calls?", a: "It effectively filters out robocalls and spam so your phone only rings for business." },
    { q: "How customizable is the personality?", a: "You can set it to be professional, casual, empathetic, or sales-driven." },
    { q: "What is the latency?", a: "Our ultra-low latency infrastructure ensures near-instant responses." },
    { q: "Do you provide onboarding support?", a: "Every account gets a dedicated success manager for setup and optimization." },
    { q: "How do I get started?", a: "Book a free consultation call with us today!" },
];

export default function BlogPage({ posts, setPosts, isAdmin }: BlogPageProps) {
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Admin Generator State
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [customHashtags, setCustomHashtags] = useState("");
  const [includeImage, setIncludeImage] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const handleGenerate = async () => {
    if (!title || !keywords) return;
    setIsGenerating(true);
    setGeneratedContent(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 1. Generate Text - Professional Tone, No Stars
      const textResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Write a professional, insightful, and well-structured LinkedIn blog post (approx 200 words) about "${title}". 
        The tone should be authoritative yet accessible and engaging.
        Use these keywords naturally: ${keywords}. 
        ${customHashtags ? `Include these specific hashtags at the end: ${customHashtags}.` : 'Include 3-5 relevant hashtags at the end.'}
        Format nicely with paragraphs. Do NOT use markdown bold syntax (double asterisks) in the body text. Keep it clean and readable.`,
      });
      
      // Clean text just in case AI ignores the no-star instruction
      const text = textResponse.text?.replace(/\*\*/g, '') || "Error generating text.";
      setGeneratedContent(text);

      // 2. Generate Image (Optional)
      if (includeImage) {
        const imageResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { text: `Generate a high quality, photorealistic, professional header image for a business blog post about: "${title}". The style should be modern, clean, corporate tech, and well-composed.` }
                ]
            }
        });
        
        let imageUrl = null;
        if (imageResponse.candidates && imageResponse.candidates[0].content.parts) {
            for (const part of imageResponse.candidates[0].content.parts) {
                if (part.inlineData) {
                    imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                    break;
                }
            }
        }
        
        if (imageUrl) {
            setGeneratedImage(imageUrl);
        } else {
             setGeneratedImage("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop");
        }
      }

    } catch (error) {
      console.error("Generation failed:", error);
      setGeneratedContent("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    if (generatedContent) {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: title,
        excerpt: generatedContent.slice(0, 100) + "...",
        content: generatedContent,
        imageUrl: generatedImage || undefined,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        author: 'Velocity Team',
        keywords: keywords.split(',').map(k => k.trim())
      };
      
      setPosts([newPost, ...posts]);
      
      // Reset
      setTitle("");
      setKeywords("");
      setCustomHashtags("");
      setGeneratedContent(null);
      setGeneratedImage(null);
      setShowGenerator(false);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
        setPosts((prevPosts) => prevPosts.filter(p => p.id !== id));
        if (selectedPost?.id === id) setSelectedPost(null);
    }
  };

  const handleCopyForLinkedIn = () => {
    if (generatedContent) {
        // Copy text
        navigator.clipboard.writeText(generatedContent);
        
        // Download image if available
        if (generatedImage) {
            const link = document.createElement('a');
            link.href = generatedImage;
            link.download = `velocity-post-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert("Text copied to clipboard! Image is downloading for you to attach to your post.");
        } else {
             alert("Text copied to clipboard!");
        }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
          Velocity Insights
        </h1>
        <p className="text-xl text-slate-500">
          Latest news, updates, and expert advice on AI automation
        </p>
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="mb-12">
          {!showGenerator ? (
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowGenerator(true)}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Create New AI Post
              </Button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 max-w-3xl mx-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="text-teal-500" />
                    AI Post Generator
                </h2>
                <button onClick={() => setShowGenerator(false)} className="text-slate-400 hover:text-slate-600">Close</button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Post Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., The Future of Voice AI"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Keywords (comma separated)</label>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="e.g., ai, business, automation"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Hashtags (Optional)</label>
                    <input
                        type="text"
                        value={customHashtags}
                        onChange={(e) => setCustomHashtags(e.target.value)}
                        placeholder="e.g., #TechTrends #AI #Growth"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="includeImage" 
                        checked={includeImage} 
                        onChange={(e) => setIncludeImage(e.target.checked)}
                        className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                    />
                    <label htmlFor="includeImage" className="text-sm text-slate-700">Generate AI Image for this post</label>
                </div>

                <div className="flex justify-end">
                    <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !title}
                        className="bg-slate-900 text-white px-6 py-2 rounded-xl"
                    >
                        {isGenerating ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                        ) : (
                            <><Sparkles className="w-4 h-4 mr-2" /> Generate Content</>
                        )}
                    </Button>
                </div>

                {/* Results Preview */}
                {(generatedContent || generatedImage) && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 pt-8 border-t border-slate-100"
                    >
                        <h3 className="text-lg font-semibold text-slate-700 mb-4">Preview</h3>
                        
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
                             {generatedImage && (
                                <div className="mb-6 rounded-xl overflow-hidden shadow-sm">
                                    <img src={generatedImage} alt="Generated" className="w-full h-64 object-cover" />
                                </div>
                             )}
                             
                             <div className="prose prose-slate max-w-none">
                                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed font-normal">{generatedContent}</p>
                             </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <Button 
                                onClick={handlePublish}
                                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
                            >
                                <Send className="w-4 h-4 mr-2" /> Publish to Blog
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={handleCopyForLinkedIn}
                                className="flex-1 border-slate-200 hover:bg-slate-50"
                            >
                                <Copy className="w-4 h-4 mr-2" /> Copy for LinkedIn {generatedImage && "+ Image"}
                            </Button>
                        </div>
                    </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {posts.map((post, i) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
          >
            {/* Image */}
            <div className="h-56 overflow-hidden bg-slate-100 relative">
               {/* Delete Button (Admin Only) */}
               {isAdmin && (
                <button 
                    type="button"
                    onClick={(e) => handleDelete(post.id, e)}
                    className="absolute top-4 left-4 z-20 p-2 bg-white/90 text-red-500 rounded-full hover:bg-red-50 transition-colors shadow-sm backdrop-blur-sm border border-red-100"
                    title="Delete Post"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
               )}

              {post.imageUrl ? (
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50">
                    <ImageIcon className="w-12 h-12 text-teal-200" />
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-600 shadow-sm">
                {post.date}
              </div>
            </div>

            {/* Content Preview */}
            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.keywords.slice(0, 3).map((k, idx) => (
                        <span key={idx} className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                            #{k}
                        </span>
                    ))}
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                    {post.title}
                </h3>
                
                <p className="text-slate-500 mb-6 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-sm text-slate-400 font-medium">By {post.author}</span>
                    <span className="text-teal-600 text-sm font-semibold group-hover:underline flex items-center">
                        Read Article <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                </div>
            </div>
          </motion.article>
        ))}
      </div>

      {posts.length === 0 && (
          <div className="text-center py-20 text-slate-400">
              <p>No posts yet.</p>
          </div>
      )}

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedPost(null)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
                />
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 40 }}
                    className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                >
                    {/* Modal Header */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                        <div className="pointer-events-auto"></div>
                        <button 
                            onClick={() => setSelectedPost(null)}
                            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2 rounded-full transition-colors pointer-events-auto"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="overflow-y-auto flex-1 custom-scrollbar">
                        {/* Article Hero Image */}
                        <div className="h-64 md:h-96 w-full relative">
                            {selectedPost.imageUrl ? (
                                <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                                    <ImageIcon className="w-20 h-20 text-teal-300" />
                                </div>
                            )}
                        </div>

                        {/* Article Content */}
                        <div className="p-8 md:p-12">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                                <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                                    <CalendarIcon className="w-4 h-4" /> {selectedPost.date}
                                </span>
                                <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                                    <User className="w-4 h-4" /> {selectedPost.author}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                                {selectedPost.title}
                            </h1>

                            <div className="prose prose-lg prose-slate max-w-none">
                                <p className="whitespace-pre-wrap leading-loose text-slate-700 font-normal">
                                    {selectedPost.content}
                                </p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-100">
                                <div className="flex flex-wrap gap-2">
                                    {selectedPost.keywords.map((k, i) => (
                                        <span key={i} className="flex items-center gap-1 text-sm font-medium text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg">
                                            <Tag className="w-3 h-3" /> {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <section className="border-t border-slate-200 pt-20 mt-20">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about our AI solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-slate-800 mb-3 text-lg">{faq.q}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
import React, { useState } from 'react';
import Home from './components/Home';
import BlogPage from './components/sections/BlogPage';
import FloatingNav from './components/navigation/FloatingNav';
import Footer from './components/sections/Footer';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  date: string;
  author: string;
  keywords: string[];
}

const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI Voice Agents in Customer Service',
    excerpt: 'Discover how AI is revolutionizing the way businesses handle customer support calls...',
    content: 'Artificial Intelligence is rapidly transforming customer service. Voice agents are now capable of handling complex queries with human-like empathy and efficiency. In this post, we explore the top 5 benefits of integrating AI voice solutions into your support stack...',
    date: 'Oct 24, 2024',
    author: 'Velocity Team',
    keywords: ['AI', 'Customer Service', 'Voice Agents'],
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Why Your Business Misses 30% of Leads',
    excerpt: 'Missed calls mean missed revenue. Learn how automated booking systems can save your sales pipeline.',
    content: 'In a fast-paced digital world, speed to lead is everything. Statistics show that businesses miss up to 30% of potential leads simply by not answering the phone. Automated voice booking systems ensure you never miss an opportunity, operating 24/7 to capture every inquiry.',
    date: 'Nov 02, 2024',
    author: 'Velocity Team',
    keywords: ['Sales', 'Automation', 'Growth'],
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop'
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'blog'>('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen relative font-sans selection:bg-teal-100 selection:text-teal-900 flex flex-col">
      <FloatingNav 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      
      <div className="flex-grow">
        {currentPage === 'home' ? (
            <Home />
        ) : (
            <BlogPage 
            posts={posts} 
            setPosts={setPosts} 
            isAdmin={isAdmin} 
            />
        )}
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </main>
  );
};

export default App;
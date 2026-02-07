
import React, { useState, useEffect } from 'react';
import FloatingHearts from './components/FloatingHearts';
import LoveLetterAI from './components/LoveLetterAI';
import { VALENTINE_WEEK, MEMORIES } from './constants';

const App: React.FC = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date('2025-02-14T00:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pb-20 relative">
      <FloatingHearts />
      
      {/* Hero Section */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="z-10 space-y-4 animate-bounce-slow">
          <h1 className="text-6xl md:text-8xl font-romantic text-rose-600 drop-shadow-md">
            To My Favorite Person
          </h1>
          <p className="text-xl md:text-2xl text-rose-400 font-medium max-w-lg mx-auto">
            You are my best friend, my rock, and my heartbeat. 
            This week is all about celebrating US.
          </p>
          
          <div className="flex gap-4 justify-center pt-8">
            <div className="glass p-4 rounded-2xl w-20 md:w-24">
              <div className="text-3xl font-bold text-rose-600">{countdown.days}</div>
              <div className="text-xs uppercase text-rose-400">Days</div>
            </div>
            <div className="glass p-4 rounded-2xl w-20 md:w-24">
              <div className="text-3xl font-bold text-rose-600">{countdown.hours}</div>
              <div className="text-xs uppercase text-rose-400">Hours</div>
            </div>
            <div className="glass p-4 rounded-2xl w-20 md:w-24">
              <div className="text-3xl font-bold text-rose-600">{countdown.mins}</div>
              <div className="text-xs uppercase text-rose-400">Mins</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 animate-bounce text-rose-300">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </header>

      {/* Valentine Week Timeline */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-romantic text-center text-rose-600 mb-16">The Road to Valentine's</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALENTINE_WEEK.map((day) => (
            <div key={day.id} className="group glass p-6 rounded-3xl hover:shadow-xl transition-all duration-300 border-b-4 border-rose-300 transform hover:-translate-y-2">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{day.date}</span>
                <span className={`p-2 rounded-full text-2xl ${day.color}`}>{day.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{day.name}</h3>
              <p className="text-sm text-gray-600 italic">"{day.message}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Memory Gallery */}
      <section className="bg-rose-50 py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-romantic text-center text-rose-600 mb-12">Our Memory Lane</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MEMORIES.map((memory) => (
              <div key={memory.id} className="relative group overflow-hidden rounded-2xl shadow-lg aspect-square">
                <img 
                  src={memory.imageUrl} 
                  alt="Memory" 
                    className="w-64 h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-medium">{memory.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Love Letter Component */}
      <section className="py-20 px-4">
        <LoveLetterAI />
      </section>

      {/* Footer / Final Message */}
      <footer className="text-center py-20 space-y-6">
        <div className="text-5xl">💝</div>
        <p className="text-2xl font-romantic text-rose-600 max-w-2xl mx-auto px-4 leading-relaxed">
          Thank you for being my teammate, my confidant, and my home. 
          I love you more than words can express!
        </p>
        <div className="pt-10 text-rose-300 text-sm">
          Made with all my heart for my favorite human.
        </div>
      </footer>
    </div>
  );
};

export default App;

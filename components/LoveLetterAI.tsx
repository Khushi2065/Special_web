
import React, { useState } from 'react';
import { generateLoveLetter } from '../services/geminiService.ts';

const LoveLetterAI: React.FC = () => {
  const [name, setName] = useState('');
  const [trait, setTrait] = useState('');
  const [duration, setDuration] = useState('');
  const [letter, setLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!name || !trait) return;
    setIsLoading(true);
    const result = await generateLoveLetter(name, trait, duration);
    setLetter(result);
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 glass rounded-3xl shadow-2xl relative z-10">
      <h2 className="text-3xl font-romantic text-rose-600 mb-6 text-center">A Secret Message From My Heart</h2>
      
      {!letter ? (
        <div className="space-y-4">
          <p className="text-gray-600 text-center mb-6">Let's create a special message for your best friend & partner.</p>
          <div>
            <label className="block text-sm font-semibold text-rose-500 mb-1">His Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="e.g. Alex"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-rose-500 mb-1">Favorite thing about him</label>
            <input 
              type="text" 
              value={trait}
              onChange={(e) => setTrait(e.target.value)}
              className="w-full p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="e.g. your contagious laugh"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-rose-500 mb-1">How long have you been together?</label>
            <input 
              type="text" 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="e.g. 2 wonderful years"
            />
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isLoading || !name || !trait}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl transition-all disabled:bg-rose-300 flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <span className="animate-pulse">Pouring my heart out...</span>
            ) : (
              <><span>Generate Love Letter</span> ✨</>
            )}
          </button>
        </div>
      ) : (
        <div className="animate-fadeIn">
          <div className="bg-white/80 p-6 rounded-2xl border-l-4 border-rose-500 shadow-inner whitespace-pre-wrap leading-relaxed text-gray-800 font-medium">
            {letter}
          </div>
          <button 
            onClick={() => setLetter('')}
            className="mt-6 text-rose-500 hover:text-rose-700 font-semibold underline block mx-auto"
          >
            Create another message
          </button>
        </div>
      )}
    </div>
  );
};

export default LoveLetterAI;

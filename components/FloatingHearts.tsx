
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number, left: string, size: string, duration: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          left: Math.random() * 100 + '%',
          size: (Math.random() * 20 + 10) + 'px',
          duration: (Math.random() * 3 + 4) + 's'
        }
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-particle"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animation: `float ${heart.duration} linear forwards`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;

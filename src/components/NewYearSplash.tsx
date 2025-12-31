'use client';

import { useState, useEffect } from 'react';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
  size: number;
}

const colors = [
  '#ff0000', '#ff6600', '#ffff00', '#00ff00', '#00ffff', 
  '#0066ff', '#9900ff', '#ff00ff', '#ff3399', '#ffcc00',
  '#00ff99', '#ff9900', '#66ff00', '#00ccff', '#ff0066'
];

export function NewYearSplash({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  // Generate random fireworks
  useEffect(() => {
    if (!showSplash) return;

    const generateFirework = () => {
      const newFirework: Firework = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 60 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 150 + 100,
        delay: Math.random() * 0.5,
      };

      setFireworks(prev => [...prev.slice(-15), newFirework]);

      // Generate particles for explosion
      const newParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: Date.now() + Math.random() + i,
          x: newFirework.x,
          y: newFirework.y,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: (i / 20) * 360,
          speed: Math.random() * 3 + 2,
          size: Math.random() * 4 + 2,
        });
      }
      setParticles(prev => [...prev.slice(-100), ...newParticles]);
    };

    // Launch fireworks at intervals
    const interval = setInterval(generateFirework, 400);

    // Start fade out after 13 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 13000);

    // Hide splash after 15 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [showSplash]);

  if (!showSplash) {
    return <>{children}</>;
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black overflow-hidden transition-opacity duration-2000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Fireworks */}
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="absolute animate-firework-explode"
          style={{
            left: `${fw.x}%`,
            top: `${fw.y}%`,
            animationDelay: `${fw.delay}s`,
          }}
        >
          {/* Explosion rings */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-firework-ring"
              style={{
                width: `${fw.size * (i + 1) * 0.5}px`,
                height: `${fw.size * (i + 1) * 0.5}px`,
                border: `2px solid ${fw.color}`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.1}s`,
                boxShadow: `0 0 ${20 + i * 10}px ${fw.color}, 0 0 ${40 + i * 20}px ${fw.color}`,
              }}
            />
          ))}
          
          {/* Sparkle particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`spark-${i}`}
              className="absolute animate-firework-particle"
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: fw.color,
                borderRadius: '50%',
                left: '50%',
                top: '50%',
                boxShadow: `0 0 10px ${fw.color}, 0 0 20px ${fw.color}`,
                transform: `rotate(${i * 30}deg) translateY(-${fw.size / 2}px)`,
                animationDelay: `${fw.delay}s`,
              }}
            />
          ))}
        </div>
      ))}

      {/* Main text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {/* Year */}
        <div className="animate-bounce-slow mb-4">
          <span className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-2xl animate-gradient">
            2026
          </span>
        </div>

        {/* Main message */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Wish you All
          </span>
        </h1>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up animation-delay-300">
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text animate-pulse">
            Happy & Amazing
          </span>
        </h2>
        
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold animate-fade-in-up animation-delay-600">
          <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-transparent bg-clip-text">
            New Year!
          </span>
        </h3>

        {/* Decorative elements */}
        <div className="mt-8 flex gap-4 animate-fade-in-up animation-delay-900">
          <span className="text-4xl animate-bounce">🎉</span>
          <span className="text-4xl animate-bounce animation-delay-100">🎊</span>
          <span className="text-4xl animate-bounce animation-delay-200">✨</span>
          <span className="text-4xl animate-bounce animation-delay-300">🎆</span>
          <span className="text-4xl animate-bounce animation-delay-400">🥳</span>
        </div>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-xl text-gray-300 animate-fade-in-up animation-delay-1200">
          — Ashok Kumar Varma —
        </p>

        {/* Loading indicator */}
        <div className="mt-12 animate-fade-in-up animation-delay-1500">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Loading AshokWorld...</span>
          </div>
        </div>
      </div>

      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 to-transparent" />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes firework-explode {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes firework-ring {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        
        @keyframes firework-particle {
          0% { transform: rotate(var(--angle)) translateY(0) scale(1); opacity: 1; }
          100% { transform: rotate(var(--angle)) translateY(-100px) scale(0); opacity: 0; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-firework-explode {
          animation: firework-explode 1.5s ease-out forwards;
        }
        
        .animate-firework-ring {
          animation: firework-ring 1s ease-out forwards;
        }
        
        .animate-firework-particle {
          animation: firework-particle 1s ease-out forwards;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        
        .transition-opacity {
          transition: opacity 2s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default NewYearSplash;


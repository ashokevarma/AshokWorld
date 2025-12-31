'use client';

import { useState, useEffect, useCallback } from 'react';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

const colors = [
  '#ff0000', '#ff6600', '#ffff00', '#00ff00', '#00ffff', 
  '#0066ff', '#9900ff', '#ff00ff', '#ff3399', '#ffcc00'
];

export function NewYearSplash({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [stars, setStars] = useState<Array<{ left: string; top: string; size: number; delay: number; opacity: number }>>([]);
  const [mounted, setMounted] = useState(false);

  // Generate stars only on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const generatedStars = Array.from({ length: 80 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setStars(generatedStars);
  }, []);

  // Generate random fireworks
  useEffect(() => {
    if (!showSplash || !mounted) return;

    const generateFirework = () => {
      const newFirework: Firework = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 60 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 150 + 100,
        delay: Math.random() * 0.5,
      };

      setFireworks(prev => [...prev.slice(-12), newFirework]);
    };

    const interval = setInterval(generateFirework, 500);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 13000);

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [showSplash, mounted]);

  const handleSkip = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => setShowSplash(false), 500);
  }, []);

  if (!showSplash) {
    return <>{children}</>;
  }

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes firework-ring {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .star { animation: twinkle 2s ease-in-out infinite; }
        .gradient-text { 
          background-size: 200% 200%; 
          animation: gradient-shift 3s ease infinite; 
        }
        .float-anim { animation: float 3s ease-in-out infinite; }
        .fade-up { animation: fade-up 1s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.2s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.4s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.6s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.8s; opacity: 0; }
        .fade-up-5 { animation-delay: 1s; opacity: 0; }
      `}</style>
      
      <div 
        className="fixed inset-0 z-[9999] bg-gradient-to-b from-gray-900 via-purple-900/30 to-black overflow-hidden cursor-pointer"
        style={{
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 1s ease-in-out',
        }}
        onClick={handleSkip}
      >
        {/* Stars background */}
        {mounted && (
          <div className="absolute inset-0">
            {stars.map((star, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white star"
                style={{
                  left: star.left,
                  top: star.top,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                  opacity: star.opacity,
                }}
              />
            ))}
          </div>
        )}

        {/* Fireworks */}
        {mounted && fireworks.map((fw) => (
          <div
            key={fw.id}
            className="absolute"
            style={{
              left: `${fw.x}%`,
              top: `${fw.y}%`,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${fw.size * (i + 1) * 0.4}px`,
                  height: `${fw.size * (i + 1) * 0.4}px`,
                  border: `2px solid ${fw.color}`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: `firework-ring 1s ease-out ${i * 0.1}s forwards`,
                  boxShadow: `0 0 ${15 + i * 10}px ${fw.color}`,
                }}
              />
            ))}
          </div>
        ))}

        {/* Main text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {/* Year */}
          <div className="float-anim mb-4 sm:mb-6">
            <span 
              className="text-5xl sm:text-7xl md:text-9xl font-bold gradient-text bg-clip-text text-transparent"
              style={{ 
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #ef4444, #ec4899, #fbbf24)',
                WebkitBackgroundClip: 'text',
              }}
            >
              2026
            </span>
          </div>

          {/* Messages */}
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2 sm:mb-3 fade-up fade-up-1">
            Wish you All
          </h1>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 fade-up fade-up-2">
            <span 
              className="gradient-text bg-clip-text text-transparent"
              style={{ 
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #f97316, #ef4444)',
                WebkitBackgroundClip: 'text',
              }}
            >
              Happy & Amazing
            </span>
          </h2>
          
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold fade-up fade-up-3">
            <span 
              className="gradient-text bg-clip-text text-transparent"
              style={{ 
                backgroundImage: 'linear-gradient(90deg, #22c55e, #10b981, #14b8a6)',
                WebkitBackgroundClip: 'text',
              }}
            >
              New Year!
            </span>
          </h3>

          {/* Emojis */}
          <div className="mt-6 sm:mt-8 flex gap-2 sm:gap-4 fade-up fade-up-4">
            <span className="text-2xl sm:text-4xl">🎉</span>
            <span className="text-2xl sm:text-4xl">🎊</span>
            <span className="text-2xl sm:text-4xl">✨</span>
            <span className="text-2xl sm:text-4xl">🎆</span>
            <span className="text-2xl sm:text-4xl">🥳</span>
          </div>

          {/* Author */}
          <p className="mt-6 sm:mt-8 text-sm sm:text-lg text-gray-300 fade-up fade-up-5">
            — Ashok Kumar Varma —
          </p>

          {/* Skip hint */}
          <div className="mt-6 sm:mt-10 fade-up fade-up-5">
            <span className="text-gray-500 text-xs sm:text-sm animate-pulse">
              👆 Tap anywhere to continue
            </span>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 to-transparent" />
      </div>
    </>
  );
}

export default NewYearSplash;

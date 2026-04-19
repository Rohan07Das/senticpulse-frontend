'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

let interval: any;

type Review = {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
};

export const CardStack = ({
  items,
  offset = 15,
  scaleFactor = 0.05,
}: {
  items: Review[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const [cards, setCards] = useState<Review[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Review[]) => {
        const newArray = [...prevCards];
        // Take the top card and move it to the back
        const firstCard = newArray.shift();
        if (firstCard) newArray.push(firstCard);
        return newArray;
      });
    }, 5000); // Flips every 5 seconds
  };

  return (
    <div className="relative h-[350px] w-full md:w-[450px] lg:w-[500px]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-black/60 backdrop-blur-2xl border border-[#b3ffe2]/20 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full h-full flex flex-col justify-between"
            style={{ transformOrigin: "top center" }}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor, // Decreases scale for cards behind
              zIndex: cards.length - index, // Top card has highest z-index
              opacity: 1 - index * 0.2, // Slightly fades out background cards
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1], // Super smooth custom easing
            }}
          >
            <div>
              <div className="flex gap-1 mb-6">
                {[...Array(card.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#b3ffe2] fill-[#b3ffe2]" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                "{card.comment}"
              </p>
            </div>
            
            <div className="pt-6 border-t border-white/5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#b3ffe2]/20 to-black border border-[#b3ffe2]/30 flex items-center justify-center text-white font-bold text-sm">
                {card.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-bold text-xs">{card.name}</h4>
                <p className="text-[#b3ffe2]/60 text-[10px] uppercase tracking-widest mt-0.5">{card.role}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
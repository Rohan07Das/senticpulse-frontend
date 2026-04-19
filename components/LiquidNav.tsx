"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["Home", "Products", "Social Pulse", "Fact-Check"];

export default function LiquidNav() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="relative flex flex-col items-center justify-center pt-8">
      {/* 1. Improved Filter: Lower blur for smaller UI elements */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
              result="goo" 
            />
          </filter>
        </defs>
      </svg>

      {/* 2. Container: We remove the filter from the main nav to keep text sharp */}
      <nav className="relative flex items-center gap-1 p-2 bg-gray-100 rounded-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative z-10 px-6 py-2 text-sm font-bold transition-colors duration-300 ${
              activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            
            {/* 3. The Magic: Apply the filter ONLY to this motion div container */}
            {activeTab === tab && (
              <div 
                className="absolute inset-0 -z-10"
                style={{ filter: "url(#liquid-goo)" }} 
              >
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 bg-blue-600 rounded-full"
                  transition={{ 
                    type: "spring", 
                    bounce: 0.2, 
                    duration: 0.6 
                  }}
                />
              </div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
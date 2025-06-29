
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      {/* Main AI Brain Spinner */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
        
        {/* Middle pulsing ring */}
        <div className="absolute top-2 left-2 w-20 h-20 border-4 border-transparent border-t-cyan-400 border-l-pink-400 rounded-full animate-spin animate-pulse" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Inner core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse glow"></div>
        </div>
        
        {/* Neural connections */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 border border-blue-300/30 rounded-full animate-ping"></div>
          <div className="absolute w-12 h-12 border border-purple-300/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* AI Processing Text */}
      <div className="text-center space-y-3">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
          AI Analysis in Progress
        </h3>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Status message */}
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Our advanced AI is analyzing your code structure, identifying patterns, and generating comprehensive insights...
        </p>
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
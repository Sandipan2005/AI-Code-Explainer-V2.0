import React from 'react';

const SimpleApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">🚀 AI Code Explainer</h1>
        <p className="text-lg opacity-90">Advanced UI is loading...</p>
        <div className="mt-4 w-full bg-white/20 rounded-full h-2">
          <div className="bg-white rounded-full h-2 w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SimpleApp;

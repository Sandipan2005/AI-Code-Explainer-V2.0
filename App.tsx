import React, { useState, useCallback } from 'react';
import { CodeInput } from './components/CodeInput';
import AnalysisDisplay from './components/AnalysisDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { NotificationProvider, useNotifications } from './components/NotificationSystem';
import { analyzeCodeWithGemini } from './services/geminiService';
import type { FullAnalysisReport } from './types';

const AppContent: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<FullAnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  const handleAnalyzeCode = useCallback(async () => {
    if (!code.trim()) {
      setError("Please enter some code to analyze.");
      setAnalysisResult(null);
      addNotification({
        type: 'warning',
        title: 'No Code Provided',
        message: 'Please enter some code to analyze.'
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    
    addNotification({
      type: 'info',
      title: 'Analysis Started',
      message: 'AI is analyzing your code...',
      duration: 3000
    });

    try {
      const result = await analyzeCodeWithGemini(code);
      setAnalysisResult(result);
      addNotification({
        type: 'success',
        title: 'Analysis Complete',
        message: 'Your code has been successfully analyzed!'
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(`Analysis failed: ${err.message}`);
        addNotification({
          type: 'error',
          title: 'Analysis Failed',
          message: err.message
        });
      } else {
        setError("An unknown error occurred during analysis.");
        addNotification({
          type: 'error',
          title: 'Unknown Error',
          message: 'An unexpected error occurred during analysis.'
        });
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }  }, [code, addNotification]);

  return (
    <div className="min-h-screen relative">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900"></div>
      
      {/* Theme toggle */}
      <ThemeToggle />
      
      {/* Main content */}
      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Enhanced header */}
          <header className="text-center mb-12 sm:mb-16">
            <div className="relative inline-block">
              <h1 className="font-orbitron text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 animate-gradient pb-4">
                AI Code Explainer
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-20 blur-2xl -z-10 animate-pulse"></div>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Advanced AI-Powered Code Analysis & Debugging
            </h2>
            
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Harness the power of advanced AI to understand, debug, and optimize your code. 
              Get instant insights, line-by-line explanations, and intelligent fix suggestions.
            </p>              {/* Feature badges */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {['Real-time Analysis', 'Smart Debugging', 'Multi-language Support', 'Performance Insights'].map((feature) => (
                  <span key={feature} className="px-4 py-2 glass rounded-full text-sm font-medium text-gray-800 dark:text-white/90 backdrop-blur-sm">
                    {feature}
                  </span>
                ))}
              </div>
          </header>

          {/* Main content area */}
          <main className="space-y-8 lg:space-y-12">
            <div className="glass rounded-3xl p-8 lg:p-12">
              <CodeInput
                code={code}
                setCode={setCode}
                onAnalyze={handleAnalyzeCode}
                isLoading={isLoading}
              />
            </div>

            {isLoading && (
              <div className="glass rounded-3xl p-8">
                <LoadingSpinner />
              </div>
            )}
            
            {error && (
              <div className="glass rounded-3xl p-8">
                <ErrorMessage message={error} />
              </div>
            )}
            
            {analysisResult && !isLoading && !error && (
              <div className="glass rounded-3xl p-8 lg:p-12">
                <AnalysisDisplay analysisReport={analysisResult} />
              </div>
            )}
          </main>

          {/* Enhanced footer */}
          <footer className="mt-20 text-center">
            <div className="glass rounded-2xl p-6 mx-auto max-w-2xl">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} AI Code Explainer. Developed by <b><a href="https://linkedin.com/in/sandipan-majumder-772814323" target="_blank" rel="noopener noreferrer">Sandipan Majumder</a></b>.
              </p>
              <div className="flex justify-center space-x-6 mt-4 text-xs text-gray-500 dark:text-gray-500">
                <span>🚀 Next-Gen Analysis</span>
                <span>⚡ Lightning Fast</span>
                <span>🎯 Precision Debugging</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
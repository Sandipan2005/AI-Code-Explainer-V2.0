import React, { useState, useEffect } from 'react';
import { useNotifications } from './NotificationSystem';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, onAnalyze, isLoading }) => {
  const [language, setLanguage] = useState('auto');
  const [isDragging, setIsDragging] = useState(false);
  const [_dragCounter, setDragCounter] = useState(0);
  const { addNotification } = useNotifications();

  // Prevent default drag behavior on document to avoid browser trying to open files
  useEffect(() => {
    const preventDefault = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener('dragover', preventDefault);
    document.addEventListener('drop', preventDefault);

    return () => {
      document.removeEventListener('dragover', preventDefault);
      document.removeEventListener('drop', preventDefault);
    };
  }, []);

  // File input handler
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
      // Clear the input so the same file can be selected again
      e.target.value = '';
    }
  };

  // Common file reading logic
  const handleFileRead = (file: File) => {
    // Enhanced file type detection
    const isCodeFile = 
      // Check MIME type
      file.type.startsWith('text/') ||
      file.type === 'application/javascript' ||
      file.type === 'application/typescript' ||
      file.type === 'application/json' ||
      file.type === 'application/xml' ||
      // Check file extensions
      /\.(js|jsx|ts|tsx|py|java|cpp|c|cs|go|rs|php|html|css|scss|sass|less|json|xml|yaml|yml|md|txt|sql|sh|bat|ps1|rb|swift|kt|scala|clj|hs|elm|dart|vue|svelte)$/i.test(file.name);
    
    if (!isCodeFile) {
      const message = 'Please select a valid code file (.js, .ts, .py, .java, .cpp, .cs, .go, .rs, .php, etc.)';
      addNotification({
        type: 'error',
        title: 'Invalid File Type',
        message
      });
      return;
    }
    
    // Check file size (limit to 1MB for safety)
    if (file.size > 1024 * 1024) {
      const message = 'File is too large. Please select a file smaller than 1MB.';
      addNotification({
        type: 'error',
        title: 'File Too Large',
        message
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCode(content);
        
        // Auto-detect language from file extension
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (extension) {
          const langMap: { [key: string]: string } = {
            'js': 'javascript',
            'jsx': 'javascript',
            'ts': 'typescript',
            'tsx': 'typescript',
            'py': 'python',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'cpp',
            'cs': 'csharp',
            'go': 'go',
            'rs': 'rust',
            'php': 'php'
          };
          
          if (langMap[extension]) {
            setLanguage(langMap[extension]);
          }
        }
        
        addNotification({
          type: 'success',
          title: 'File Loaded Successfully',
          message: `Loaded ${file.name} (${Math.round(file.size / 1024)}KB)`
        });
      }
    };
    
    reader.onerror = () => {
      const message = 'Error reading file. Please try again.';
      addNotification({
        type: 'error',
        title: 'File Read Error',
        message
      });
    };
    
    reader.readAsText(file);
  };

  const languages = [
    { value: 'auto', label: '🤖 Auto-detect' },
    { value: 'javascript', label: '🟨 JavaScript' },
    { value: 'typescript', label: '🔷 TypeScript' },
    { value: 'python', label: '🐍 Python' },
    { value: 'java', label: '☕ Java' },
    { value: 'cpp', label: '⚙️ C++' },
    { value: 'csharp', label: '🔵 C#' },
    { value: 'go', label: '🐹 Go' },
    { value: 'rust', label: '🦀 Rust' },
    { value: 'php', label: '🐘 PHP' }
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragCounter(0);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) {
      addNotification({
        type: 'warning',
        title: 'No Files Detected',
        message: 'Please try dragging a file from your file system.'
      });
      return;
    }
    
    if (files.length > 1) {
      addNotification({
        type: 'warning',
        title: 'Multiple Files',
        message: 'Please drag only one file at a time. Using the first file.'
      });
    }
    
    const file = files[0];
    handleFileRead(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only allow drops if files are being dragged
    const hasFiles = Array.from(e.dataTransfer.types).includes('Files');
    if (hasFiles) {
      e.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only show drag UI if files are being dragged
    const hasFiles = Array.from(e.dataTransfer.types).includes('Files');
    if (hasFiles) {
      setDragCounter(prev => prev + 1);
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragging(false);
      }
      return newCounter;
    });
  };

  const lineCount = code.split('\n').length;
  const charCount = code.length;

  return (
    <div className="space-y-6">
      {/* Header with language selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Code Input</h2>
          <p className="text-gray-600 dark:text-gray-400">Paste your code or drag & drop a file</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <label htmlFor="language-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Language:
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 glass rounded-lg text-sm font-medium text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                {lang.label}
              </option>
            ))}
          </select>
          
          {/* File upload button */}
          <div className="relative">
            <input
              type="file"
              id="file-input"
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.go,.rs,.php,.html,.css,.scss,.sass,.less,.json,.xml,.yaml,.yml,.md,.txt,.sql,.sh,.bat,.ps1,.rb,.swift,.kt,.scala,.clj,.hs,.elm,.dart,.vue,.svelte"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label 
              htmlFor="file-input"
              className="px-3 py-2 glass rounded-lg text-sm font-medium text-gray-800 dark:text-white hover:scale-105 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>Upload</span>
            </label>
          </div>
        </div>
      </div>

      {/* Code input area */}
      <div 
        className={`relative transition-all duration-300 ${
          isDragging 
            ? 'scale-[1.02] shadow-2xl shadow-blue-500/25' 
            : 'hover:shadow-xl hover:shadow-purple-500/10'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your code here or drag & drop a file
function example() {
  console.log('Hello, AI!');
}

// The AI will analyze:
// ✓ Code structure and logic
// ✓ Potential bugs and issues  
// ✓ Performance optimizations
// ✓ Best practices recommendations"
            rows={16}
            className={`w-full p-6 font-jetbrains text-sm bg-gray-900/90 dark:bg-gray-900/90 text-green-400 dark:text-green-400 rounded-2xl border transition-all duration-300 resize-none backdrop-blur-sm ${
              isDragging 
                ? 'border-blue-400 ring-4 ring-blue-500/30 bg-gray-800/95' 
                : 'border-gray-700 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
            }`}
            disabled={isLoading}
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px),
                               linear-gradient(rgba(0,255,0,0.05) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />
          
          {/* Code statistics */}
          <div className="absolute bottom-4 right-4 flex space-x-4 text-xs text-gray-500">
            <span>Lines: {lineCount}</span>
            <span>Characters: {charCount}</span>
          </div>

          {/* Drag overlay */}
          {isDragging && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 border-2 border-dashed border-blue-400 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-pulse">
              <div className="text-center text-gray-800 dark:text-white p-8">
                <div className="animate-bounce mb-4">
                  <svg className="w-16 h-16 mx-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                </div>
                <p className="text-xl font-bold mb-2">Drop your code file here</p>
                <p className="text-sm opacity-75">Supports .js, .ts, .py, .java, .cpp, .cs, .go, .rs, .php and more</p>
                <p className="text-xs mt-2 bg-blue-500/20 px-3 py-1 rounded-full inline-block">
                  Max size: 1MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={onAnalyze}
        disabled={isLoading || !code.trim()}
        className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none glow animate-gradient"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>AI is analyzing your code...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Analyze Code with AI</span>
          </div>
        )}
      </button>

      {/* Quick examples */}
      {!code && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Bug Detection', code: 'function buggyCode() {\n  let arr = [1, 2, 3];\n  for (let i = 0; i <= arr.length; i++) {\n    console.log(arr[i]);\n  }\n}' },
            { title: 'Performance Issues', code: 'function slow() {\n  let result = "";\n  for (let i = 0; i < 1000; i++) {\n    result += "x";\n  }\n  return result;\n}' },
            { title: 'Best Practices', code: 'var globalVar = "bad";\nfunction messyCode() {\n  if (globalVar == "bad") {\n    return "fix me";\n  }\n}' }
          ].map((example) => (
            <button
              key={example.title}
              onClick={() => setCode(example.code)}
              className="p-4 glass rounded-xl text-left hover:scale-105 transition-all duration-300"
            >
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{example.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 opacity-75">Click to load example</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
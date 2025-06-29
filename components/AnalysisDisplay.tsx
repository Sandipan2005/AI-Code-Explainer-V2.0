import React from 'react';
import type { 
    FullAnalysisReport
    // ... other types from your original file
} from '../types';

interface AnalysisDisplayProps {
  analysisReport: FullAnalysisReport;
}

const SectionCard: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode; defaultOpen?: boolean, idSuffix?: string }> = ({ title, children, icon, defaultOpen = true, idSuffix }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const idBase = title.replace(/\s+/g, '-').toLowerCase();
  const controlsId = `section-${idBase}${idSuffix ? '-' + idSuffix : ''}`;

  return (
    <div 
        className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg shadow-xl dark:shadow-slate-900/50 rounded-xl overflow-hidden transition-all duration-300 transform-preserve-3d group hover:shadow-blue-400/40"
        style={{ transform: 'translateZ(0px)' }} // Promotes to its own layer
    >
      <button
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 transition-colors duration-200 group-hover:bg-slate-50/50 dark:group-hover:bg-slate-700/30"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={controlsId}
        style={{ transform: 'translateZ(5px)' }} // Button part slightly forward
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 flex items-center transition-transform duration-300 group-hover:scale-[1.02]">
          {icon && <span className="mr-3 text-blue-600 dark:text-sky-400 shrink-0 group-hover:text-indigo-500 dark:group-hover:text-sky-300 transition-colors duration-300">{icon}</span>}
          {title}
        </h2>
        <ChevronIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <div 
          id={controlsId} 
          className="p-4 sm:p-6 border-t border-slate-200/70 dark:border-slate-700/50"
          style={{ transform: 'translateZ(-5px) translateY(-2px)' }} // Content slightly recessed
        >
          {children}
        </div>
      )}
    </div>
  );
};

const ChevronIcon: React.FC<{isOpen: boolean}> = ({isOpen}) => (
    <svg className={`w-6 h-6 text-slate-500 dark:text-slate-400 transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''} group-hover:text-blue-600 dark:group-hover:text-sky-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

// --- Icons (Using existing ones, colors adjusted by parent classes or here if needed) ---
// Note: Icon colors are primarily handled by the `text-blue-600 dark:text-sky-400` in SectionCard or specific overrides.
const ErrorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */ <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /> </svg> );
const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /> </svg> );
const SummaryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /> </svg> );
const LanguageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" /> </svg> );
const OptimizationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.354a12.06 12.06 0 0 1-4.5 0m4.5 2.354a12.056 12.056 0 0 1-4.5 0M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.414-.04-.814-.11-1.204M12 3c-.414 0-.814.04-1.204.11M15 3a8.963 8.963 0 0 1 4.897 1.604M12 3v2.25m6.904 4.125a8.963 8.963 0 0 1-1.604 4.897M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9c0 .414.04.814.11 1.204M12 21c.414 0 .814-.04 1.204-.11M9 21a8.963 8.963 0 0 1-4.897-1.604M12 21v-2.25m-6.904-4.125a8.963 8.963 0 0 1 1.604-4.897" /> </svg> );
const SecurityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /> </svg> );
const ComplexityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12A2.25 2.25 0 0 0 20.25 14.25V8.25A2.25 2.25 0 0 0 18 6H6.75A2.25 2.25 0 0 1 4.5 3.75Z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3.75M10.5 9h3.75m4.5 0h.75M10.5 12h3.75m-3.75 3h.75M7.5 16.5V21M3 16.5V21" /> </svg> );
const QualityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> </svg> );
const CodeSmellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5c1.825 0 3.446.665 4.728 1.759a6 6 0 1 1-9.456 0A5.972 5.972 0 0 1 12 10.5Zm0 0V6m0 12.75a8.967 8.967 0 0 1-2.312-.348m2.312.348a8.967 8.967 0 0 0 2.312-.348m-4.624 0a8.967 8.967 0 0 1-2.312.348m6.936-4.348a2.252 2.252 0 0 1-.287.066A10.46 10.46 0 0 1 12 15.75c-1.139 0-2.233-.174-3.265-.502a2.252 2.252 0 0 1-.287-.066M9 12s.823 1.5 3 1.5 3-1.5 3-1.5M7.5 15h9" /> </svg> );
const TestabilityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.092 1.209-.138 2.43-.138 3.662s.046 2.453.138 3.662m19.324 0a4.006 4.006 0 0 0 3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c.092 1.209.138 2.43.138 3.662m-19.324 0c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.678 48.678 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.092-1.209.138-2.43.138-3.662M3.75 12h16.5m-16.5 0a4.5 4.5 0 1 1-1.884-3.527m1.884 3.527a4.5 4.5 0 1 0-1.884 3.527" /> </svg> );
const ConcurrencyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21v-6.75A6.75 6.75 0 0 1 10.5 7.5h3a6.75 6.75 0 0 1 6.75 6.75V21M3.75 14.25H20.25M5.25 7.5V3m13.5 4.5V3M8.25 7.5h7.5" /> </svg> );
const ApiDesignIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /> </svg> );
const ScalabilityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /> </svg> );
const PerformanceHintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /> </svg> );
const DependencyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372" /> </svg> );
const DocumentationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /> </svg> );
const ErrorHandlingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655L9.75 21.75l3.746-4.012M9.75 21.75H12m0 0h2.25m-2.25 0l1.84-6.095M12 21.75L14.25 12l-2.25-3-2.25 3L12 21.75Zm0 0L9.75 12l2.25-3 2.25 3L12 21.75Zm0 0L14.25 12M3 9l3.75 3L3 15m18-6l-3.75 3L21 15M9.75 2.25h4.5M12 6.75v1.5" /> </svg> );
const MagicValueIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.083c-.097.058-.19.122-.278.19l-6.5 5.417c-.76.633-1.222 1.61-1.222 2.65v2.3c0 1.484 1.206 2.69 2.69 2.69h.1c.341 0 .676-.065.992-.187m0 0c1.13-.424 2.002-1.309 2.464-2.464a4.487 4.487 0 0 0-.187-.992v-.1c0-1.484 1.206-2.69 2.69-2.69h2.3c1.04 0 2.017-.462 2.65-1.222l5.417-6.5c.068-.088.132-.18.19-.278m0 0a4.487 4.487 0 0 0-4.487-4.487h-2.3a4.487 4.487 0 0 0-4.487 4.487v2.3Z" /> </svg> );
const I18nIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21L13.5 16.5M10.5 21V16.5m0 0H15m-4.5 0H6A2.25 2.25 0 013.75 12V5.25A2.25 2.25 0 016 3h12a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0118 18.75h-1.5m-3.75-3.75c.621 0 1.125.504 1.125 1.125S13.371 18 12.75 18s-1.125-.504-1.125-1.125S12.129 15.75 12.75 15.75Z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12a8.955 8.955 0 011.856-5.404m15.788 0A8.955 8.955 0 0121.75 12M2.25 12c0 4.949 4.027 8.955 8.978 8.955s8.978-4.006 8.978-8.955M2.25 12h19.5" /> </svg> );
const A11yIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5Z" /> </svg> );
const MaintainabilityMetricsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( /* ... existing SVG ... */  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12H6.75V8.25C6.75 7.629 7.254 7.125 7.875 7.125H10.5m0 0V13.5m0-6.375c0 .621.504 1.125 1.125 1.125H13.5m0-1.125V7.125c0-.621.504-1.125 1.125-1.125h2.625c.621 0 1.125.504 1.125 1.125V13.5m0-6.375h.625c.621 0 1.125.504 1.125 1.125v2.625c0 .621-.504 1.125-1.125 1.125H19.5m1.5-1.125H18c-.621 0-1.125.504-1.125 1.125v2.625c0 .621.504 1.125 1.125 1.125h2.625c.621 0 1.125-.504 1.125-1.125V13.5m0-6.375V3.375c0-.621-.504-1.125-1.125-1.125H4.125C3.504 2.25 3 2.754 3 3.375v9.75Z" /> </svg> );


// --- Helper Components ---
const getSeverityClass = (severity?: string): string => {
    switch (severity?.toLowerCase()) {
        case 'critical': return 'border-red-500 bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/70';
        case 'high': return 'border-rose-500 bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/70';
        case 'medium': return 'border-amber-500 bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/70';
        case 'low': return 'border-yellow-400 bg-yellow-400/10 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300 dark:border-yellow-500/60';
        case 'informational': return 'border-sky-500 bg-sky-500/10 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/70';
        default: return 'border-slate-400 bg-slate-400/10 text-slate-700 dark:bg-slate-600/20 dark:text-slate-300 dark:border-slate-500/70';
    }
};

const DetailItem: React.FC<{label: string; children: React.ReactNode; className?: string; isCode?: boolean}> = ({label, children, className="", isCode = false}) => (
    <div className={`mb-2.5 text-sm ${className}`}>
        <strong className="text-slate-700 dark:text-slate-200 font-medium block sm:inline">{label}:</strong>{' '}
        {isCode ? (
            <code className="font-mono bg-slate-200/70 dark:bg-slate-700/70 px-2 py-1 rounded-md text-blue-700 dark:text-sky-400 shadow-sm">{children}</code>
        ) : (
            <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{children}</span>
        )}
    </div>
);

const ListItem: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className=""}) => (
    <li className={`p-4 border border-slate-200/80 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-800/30 rounded-lg shadow-md ${className}`}>
        {children}
    </li>
);

const NoDataMessage: React.FC<{message?: string}> = ({message = "No specific information available for this section."}) => (
     <p className="text-slate-500 dark:text-slate-400 italic p-4 text-center text-sm">{message}</p>
);

// --- Main Display Component ---
const AnalysisDisplayComponent: React.FC<AnalysisDisplayProps> = ({ analysisReport }) => {
  const { language, analysis } = analysisReport;

  if (!analysis) {
    return <p className="text-center text-slate-600 dark:text-slate-300 py-8">No analysis data available.</p>;
  }
  // Destructure all analysis fields for easier access
  const {
    bugs = [], line_by_line_explanation = [], overall_summary, optimization_suggestions = [], security_vulnerabilities = [],
    complexity_analysis, code_quality_assessment, code_smells = [], testability_feedback, concurrency_issues = [],
    api_design_critique, scalability_concerns = [], performance_hints = [], dependency_management_insights = [],
    documentation_quality_review, error_handling_robustness, magic_values_identification = [],
    internationalization_readiness = [], accessibility_hints = [], conceptual_maintainability_metrics
  } = analysis;


  return (
    <div className="space-y-6 sm:space-y-8 mt-8 transform-preserve-3d">
      <SectionCard title="Detected Language" icon={<LanguageIcon />} defaultOpen={true} idSuffix="lang">
        <p className="text-blue-700 dark:text-sky-300 bg-blue-100 dark:bg-sky-800/40 px-4 py-2 rounded-lg text-lg font-medium inline-block shadow">
          {language || "Not specified"}
        </p>
      </SectionCard>

      {overall_summary && (
        <SectionCard title="Overall Summary" icon={<SummaryIcon />} defaultOpen={true} idSuffix="summary">
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-base">
            {overall_summary}
          </p>
        </SectionCard>
      )}

      <SectionCard title="Bugs Found" icon={<ErrorIcon className={(bugs.length > 0) ? "text-red-500 dark:text-red-400" : "text-green-500 dark:text-green-400"} />} defaultOpen={true} idSuffix="bugs">
        {bugs.length > 0 ? (
          <ul className="space-y-6">
            {bugs.map((bug, index) => (
              <li key={index} className="p-4 border-l-4 border-red-500 dark:border-red-500/80 bg-red-500/10 dark:bg-red-700/20 rounded-r-lg shadow-lg">
                <p className="font-semibold text-red-700 dark:text-red-300 mb-2 text-md">
                  <span className="font-bold">Bug {bug.line_number && `(Line ${bug.line_number})`}:</span> {bug.description}
                </p>
                <div className="ml-0 sm:ml-2 space-y-2 text-sm">
                    <DetailItem label="Explanation">{bug.explanation}</DetailItem>
                    <DetailItem label="Suggestion"><span className="text-green-600 dark:text-green-400 font-medium">{bug.fix_suggestion}</span></DetailItem>
                </div>
              </li>
            ))}
          </ul>
        ) : (
            <p className="text-green-600 dark:text-green-400 font-medium p-2">No critical bugs found. Excellent!</p>
        )}
      </SectionCard>

      {line_by_line_explanation.length > 0 && (
        <SectionCard title="Line-by-Line Explanation" icon={<CodeIcon />} defaultOpen={false} idSuffix="lbl">
          <div className="space-y-4">
            {line_by_line_explanation.map((line, index) => (
              <div key={index} className="p-4 border border-slate-200/80 dark:border-slate-700/60 bg-slate-50/60 dark:bg-slate-800/40 rounded-lg shadow-md">
                <div className="flex items-start sm:items-center flex-col sm:flex-row mb-3">
                    <span className="text-xs font-semibold text-blue-600 dark:text-sky-400 bg-blue-100 dark:bg-sky-800/50 px-2.5 py-1 rounded-full mr-0 sm:mr-3 mb-2 sm:mb-0 shrink-0">
                    Lines {line.line_range}
                    </span>
                    <pre className="whitespace-pre-wrap bg-slate-200/80 dark:bg-slate-900/60 p-3 rounded-lg text-sm text-slate-800 dark:text-slate-100 flex-grow w-full overflow-x-auto shadow-inner">
                        <code className="font-mono">{line.code_snippet}</code>
                    </pre>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed ml-0 sm:ml-1">{line.explanation}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
      
      <SectionCard title="Optimization Suggestions" icon={<OptimizationIcon />} defaultOpen={optimization_suggestions.length > 0} idSuffix="opt">
        {optimization_suggestions.length > 0 ? (
          <ul className="space-y-5">
            {optimization_suggestions.map((opt, index) => (
              <ListItem key={index}>
                <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-1 text-md">{opt.description} <span className="text-xs bg-teal-100 dark:bg-teal-800/50 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded-full ml-2 font-normal">{opt.area}</span></h4>
                <div className="ml-0 sm:ml-1 space-y-1.5 text-sm">
                    <DetailItem label="Suggestion">{opt.suggestion}</DetailItem>
                    <DetailItem label="Reasoning">{opt.reasoning}</DetailItem>
                </div>
              </ListItem>
            ))}
          </ul>
        ) : ( <NoDataMessage message="No specific optimization suggestions found." /> )}
      </SectionCard>

      <SectionCard title="Security Vulnerabilities" icon={<SecurityIcon className={(security_vulnerabilities.length > 0) ? "text-orange-500 dark:text-orange-400" : "text-slate-500 dark:text-slate-400"} />} defaultOpen={security_vulnerabilities.length > 0} idSuffix="sec">
        {security_vulnerabilities.length > 0 ? (
          <ul className="space-y-5">
            {security_vulnerabilities.map((vuln, index) => (
              <li key={index} className={`p-4 border-l-4 rounded-r-md shadow-lg ${getSeverityClass(vuln.severity)}`}>
                <h4 className="font-semibold mb-1 text-md">{vuln.vulnerability_type} {vuln.line_number && `(Line: ${vuln.line_number})`}
                  {vuln.severity && <span className={`text-xs px-2 py-0.5 rounded-full ml-2 font-medium ${getSeverityClass(vuln.severity).replace(/border-\S+\s*/,'').replace(/bg-\S+\s*/,'bg-opacity-20')}`}>{vuln.severity}</span>}
                </h4>
                 <div className="ml-0 sm:ml-1 space-y-1.5 text-sm">
                    <DetailItem label="Description">{vuln.description}</DetailItem>
                    <DetailItem label="Potential Impact">{vuln.potential_impact}</DetailItem>
                    <DetailItem label="Mitigation">{vuln.mitigation_suggestion}</DetailItem>
                </div>
              </li>
            ))}
          </ul>
        ) : ( <NoDataMessage message="No specific security vulnerabilities identified." /> )}
      </SectionCard>

      {complexity_analysis && (
        <SectionCard title="Complexity Analysis" icon={<ComplexityIcon />} defaultOpen={true} idSuffix="comp">
          <div className="space-y-3 text-sm">
            <DetailItem label="Time Complexity" isCode>{complexity_analysis.time_complexity}</DetailItem>
            <DetailItem label="Space Complexity" isCode>{complexity_analysis.space_complexity}</DetailItem>
            <DetailItem label="Explanation">{complexity_analysis.explanation}</DetailItem>
          </div>
        </SectionCard>
      )}

      {code_quality_assessment && (
        <SectionCard title="Code Quality Assessment" icon={<QualityIcon />} defaultOpen={true} idSuffix="qual">
          <div className="space-y-4 text-sm">
            <DetailItem label="Readability">{code_quality_assessment.readability}</DetailItem>
            <DetailItem label="Maintainability">{code_quality_assessment.maintainability}</DetailItem>
            <DetailItem label="Best Practices Adherence">{code_quality_assessment.best_practices}</DetailItem>
            {code_quality_assessment.suggestions && code_quality_assessment.suggestions.length > 0 && (
              <div>
                <strong className="text-slate-700 dark:text-slate-200 font-medium block">Improvement Suggestions:</strong>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-600 dark:text-slate-300 pl-4">
                  {code_quality_assessment.suggestions.map((suggestion, i) => ( <li key={i}>{suggestion}</li> ))}
                </ul>
              </div>
            )}
             {(!code_quality_assessment.suggestions || code_quality_assessment.suggestions.length === 0) && (
                <NoDataMessage message="No specific improvement suggestions provided for code quality." />
             )}
          </div>
        </SectionCard>
      )}

      {/* --- Ultra-Advanced Analysis Sections --- */}
      {code_smells.length > 0 && (
        <SectionCard title="Code Smells" icon={<CodeSmellIcon />} defaultOpen={code_smells.length > 0} idSuffix="smells">
            <ul className="space-y-4">
              {code_smells.map((smell, i) => (
                <ListItem key={i}>
                  <h4 className="font-semibold text-amber-700 dark:text-amber-400 text-md">{smell.smell_type} {smell.line_number && `(Line: ${smell.line_number})`}</h4>
                  <DetailItem label="Description">{smell.description}</DetailItem>
                  <DetailItem label="Suggestion">{smell.suggestion}</DetailItem>
                </ListItem>
              ))}
            </ul>
        </SectionCard>
      )}

      {testability_feedback && (testability_feedback.overall_assessment || testability_feedback.suggestions?.length > 0) && (
        <SectionCard title="Testability Assessment" icon={<TestabilityIcon />} defaultOpen={!!testability_feedback.suggestions?.length} idSuffix="test">
            <DetailItem label="Overall Assessment">{testability_feedback.overall_assessment}</DetailItem>
            {testability_feedback.suggestions && testability_feedback.suggestions.length > 0 && (
                <div>
                    <strong className="text-slate-700 dark:text-slate-200 font-medium block mt-3">Suggestions:</strong>
                    <ul className="space-y-3 mt-2">
                        {testability_feedback.suggestions.map((s, i) =>(
                            <ListItem key={i} className="bg-slate-100/70 dark:bg-slate-700/40">
                                <h5 className="font-semibold text-indigo-700 dark:text-indigo-400 text-md">{s.area}</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{s.description}</p>
                            </ListItem>
                        ))}
                    </ul>
                </div>
            )}
            {(!testability_feedback.suggestions || testability_feedback.suggestions.length === 0) && (
                 <NoDataMessage message="No specific testability improvement suggestions." />
            )}
        </SectionCard>
      )}
      
      {concurrency_issues.length > 0 && (
        <SectionCard title="Concurrency Considerations" icon={<ConcurrencyIcon />} defaultOpen={concurrency_issues.length > 0} idSuffix="concur">
            <ul className="space-y-4">
              {concurrency_issues.map((issue, i) => (
                <ListItem key={i} className="border-orange-400 dark:border-orange-500/70">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-400 text-md">{issue.type} {issue.line_number && `(Line: ${issue.line_number})`}</h4>
                  <DetailItem label="Description">{issue.description}</DetailItem>
                  <DetailItem label="Mitigation">{issue.mitigation}</DetailItem>
                </ListItem>
              ))}
            </ul>
        </SectionCard>
      )}
      
      {api_design_critique && (api_design_critique.clarity || api_design_critique.suggestions?.length > 0) && (
        <SectionCard title="API Design Review" icon={<ApiDesignIcon />} defaultOpen={!!api_design_critique.suggestions?.length} idSuffix="api">
            <DetailItem label="Clarity">{api_design_critique.clarity}</DetailItem>
            <DetailItem label="Consistency">{api_design_critique.consistency}</DetailItem>
            {api_design_critique.restfulness_notes && <DetailItem label="RESTfulness">{api_design_critique.restfulness_notes}</DetailItem>}
            <DetailItem label="Error Handling Practices">{api_design_critique.error_handling_practices}</DetailItem>
            {api_design_critique.versioning_strategy_notes && <DetailItem label="Versioning Notes">{api_design_critique.versioning_strategy_notes}</DetailItem>}
            {api_design_critique.suggestions && api_design_critique.suggestions.length > 0 && (
                <div>
                    <strong className="text-slate-700 dark:text-slate-200 font-medium block mt-3">Suggestions:</strong>
                    <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-600 dark:text-slate-300 pl-4">
                        {api_design_critique.suggestions.map((s,i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
            )}
             {(!api_design_critique.suggestions || api_design_critique.suggestions.length === 0) && (
                <NoDataMessage message="No specific API design suggestions provided." />
             )}
        </SectionCard>
      )}

      {scalability_concerns.length > 0 && (
        <SectionCard title="Scalability Assessment" icon={<ScalabilityIcon />} defaultOpen={scalability_concerns.length > 0} idSuffix="scale">
            <ul className="space-y-4">
              {scalability_concerns.map((concern, i) => (
                <ListItem key={i}>
                  <h4 className="font-semibold text-purple-700 dark:text-purple-400 text-md">{concern.area}</h4>
                  <DetailItem label="Description">{concern.description}</DetailItem>
                  <DetailItem label="Suggestion">{concern.suggestion}</DetailItem>
                </ListItem>
              ))}
            </ul>
        </SectionCard>
      )}

      {performance_hints.length > 0 && (
        <SectionCard title="Performance Profile Hints" icon={<PerformanceHintIcon />} defaultOpen={performance_hints.length > 0} idSuffix="perf">
            <ul className="space-y-4">
              {performance_hints.map((hint, i) => (
                <ListItem key={i}>
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 text-md">{hint.description} {hint.line_number && `(Line: ${hint.line_number})`}</h4>
                  <DetailItem label="Suggestion">{hint.suggestion}</DetailItem>
                </ListItem>
              ))}
            </ul>
        </SectionCard>
      )}

      {dependency_management_insights.length > 0 && (
        <SectionCard title="Dependency Management Insights" icon={<DependencyIcon />} defaultOpen={dependency_management_insights.length > 0} idSuffix="deps">
            <ul className="space-y-4">
              {dependency_management_insights.map((dep, i) => (
                <ListItem key={i}>
                  <h4 className="font-semibold text-rose-700 dark:text-rose-400 text-md">{dep.type}</h4>
                  <DetailItem label="Description">{dep.description}</DetailItem>
                  {dep.details && <DetailItem label="Details">{dep.details}</DetailItem>}
                </ListItem>
              ))}
            </ul>
        </SectionCard>
      )}

      {documentation_quality_review && (documentation_quality_review.overall_quality || documentation_quality_review.suggestions?.length > 0 || documentation_quality_review.specific_areas?.length > 0) && (
        <SectionCard title="Documentation Quality Review" icon={<DocumentationIcon />} defaultOpen={!!documentation_quality_review.suggestions?.length || !!documentation_quality_review.specific_areas?.length} idSuffix="docs">
            <DetailItem label="Overall Quality">{documentation_quality_review.overall_quality}</DetailItem>
             {documentation_quality_review.specific_areas && documentation_quality_review.specific_areas.length > 0 && (
                <div>
                    <strong className="text-slate-700 dark:text-slate-200 font-medium block mt-3">Specific Area Comments:</strong>
                    <ul className="space-y-3 mt-2">
                        {documentation_quality_review.specific_areas.map((s, i) =>(
                            <ListItem key={i} className="bg-slate-100/70 dark:bg-slate-700/40">
                                <h5 className="font-semibold text-teal-700 dark:text-teal-400 text-md">{s.area}</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{s.comment}</p>
                            </ListItem>
                        ))}
                    </ul>
                </div>
            )}
            {documentation_quality_review.suggestions && documentation_quality_review.suggestions.length > 0 && (
                <div>
                    <strong className="text-slate-700 dark:text-slate-200 font-medium block mt-3">Improvement Suggestions:</strong>
                    <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-600 dark:text-slate-300 pl-4">
                        {documentation_quality_review.suggestions.map((s,i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
            )}
            {(!documentation_quality_review.specific_areas || documentation_quality_review.specific_areas.length === 0) && 
             (!documentation_quality_review.suggestions || documentation_quality_review.suggestions.length === 0) && (
                <NoDataMessage message="No specific documentation feedback or suggestions provided." />
             )}
        </SectionCard>
      )}

      {error_handling_robustness && (error_handling_robustness.coverage_assessment || error_handling_robustness.suggestions?.length > 0) && (
        <SectionCard title="Error Handling Robustness" icon={<ErrorHandlingIcon />} defaultOpen={!!error_handling_robustness.suggestions?.length} idSuffix="errhandle">
            <DetailItem label="Coverage Assessment">{error_handling_robustness.coverage_assessment}</DetailItem>
            <DetailItem label="Specificity of Catches">{error_handling_robustness.specificity_of_catches}</DetailItem>
            <DetailItem label="Resource Management Notes">{error_handling_robustness.resource_management_notes}</DetailItem>
            {error_handling_robustness.suggestions && error_handling_robustness.suggestions.length > 0 && (
                <div>
                    <strong className="text-slate-700 dark:text-slate-200 font-medium block mt-3">Suggestions:</strong>
                    <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-600 dark:text-slate-300 pl-4">
                        {error_handling_robustness.suggestions.map((s,i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
            )}
             {(!error_handling_robustness.suggestions || error_handling_robustness.suggestions.length === 0) && (
                <NoDataMessage message="No specific error handling suggestions provided." />
             )}
        </SectionCard>
      )}

      {magic_values_identification.length > 0 && (
        <SectionCard title="Magic Numbers/Strings" icon={<MagicValueIcon />} defaultOpen={magic_values_identification.length > 0} idSuffix="magic">
            <ul className="space-y-4">
              {magic_values_identification.map((mv, i) => (
                <ListItem key={i}>
                  <h4 className="font-semibold text-lime-700 dark:text-lime-400 text-md">Magic {mv.type}: <code className="font-mono text-sm bg-slate-200 dark:bg-slate-600/70 px-1.5 py-0.5 rounded shadow-sm">{mv.value}</code> {mv.line_number && `(Line: ${mv.line_number})`}</h4>
                  <DetailItem label="Suggestion">{mv.suggestion}</DetailItem>
                </ListItem>
              ))}
            </ul>
        </SectionCard>
      )}
      
      {internationalization_readiness.length > 0 && (
        <SectionCard title="I18n & L10n Readiness" icon={<I18nIcon />} defaultOpen={internationalization_readiness.length > 0} idSuffix="i18n">
            <ul className="space-y-4">
              {internationalization_readiness.map((i18n, i) => (
                <ListItem key={i}>
                  <DetailItem label="Hardcoded String" isCode>{i18n.hardcoded_string}</DetailItem>
                  {i18n.line_number && <DetailItem label="Line Number">{i18n.line_number}</DetailItem>}
                  <DetailItem label="Suggestion">{i18n.suggestion}</DetailItem>
                </ListItem>
              ))}
            </ul>
        </SectionCard>
      )}

      {accessibility_hints.length > 0 && (
        <SectionCard title="Accessibility (A11y) Hints" icon={<A11yIcon />} defaultOpen={accessibility_hints.length > 0} idSuffix="a11y">
            <ul className="space-y-4">
              {accessibility_hints.map((hint, i) => (
                <ListItem key={i}>
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-400 text-md">{hint.issue} {hint.line_number && `(Line: ${hint.line_number})`}</h4>
                  <DetailItem label="Suggestion">{hint.suggestion}</DetailItem>
                  {hint.wcag_reference && <DetailItem label="WCAG Reference" isCode>{hint.wcag_reference}</DetailItem>}
                </ListItem>
              ))}
            </ul>
        </SectionCard>
      )}
      
      {conceptual_maintainability_metrics && (
        <SectionCard title="Conceptual Maintainability Metrics" icon={<MaintainabilityMetricsIcon />} defaultOpen={false} idSuffix="metrics">
          <div className="space-y-3 text-sm">
            <DetailItem label="Qualitative Cyclomatic Complexity">{conceptual_maintainability_metrics.qualitative_cyclomatic_complexity}</DetailItem>
            <DetailItem label="Qualitative Halstead Difficulty">{conceptual_maintainability_metrics.qualitative_halstead_difficulty}</DetailItem>
            <DetailItem label="Code Cohesion Notes">{conceptual_maintainability_metrics.code_cohesion_notes}</DetailItem>
            <DetailItem label="Code Coupling Notes">{conceptual_maintainability_metrics.code_coupling_notes}</DetailItem>
            <DetailItem label="General Notes">{conceptual_maintainability_metrics.general_notes}</DetailItem>
          </div>
        </SectionCard>
      )}

    </div>
  );
};

export default AnalysisDisplayComponent;
// Ensure all imported types from '../types' are included in the type imports at the top if they were previously omitted for brevity.
// For example: AnalysisDetails, CodeBug, LineExplanationDetail, OptimizationSuggestion, SecurityVulnerability, ComplexityAnalysis, CodeQualityAssessment, CodeSmell, TestabilityFeedback, ConcurrencyIssue, ApiDesignCritique, ScalabilityConcern, PerformanceHint, DependencyNote, DocumentationFeedback, ErrorHandlingReviewDetail, MagicValue, I18nSuggestion, A11yHint, ConceptualMaintainabilityMetrics
// These were already present, so no changes needed there.

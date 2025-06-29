import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div 
      className="bg-red-100/80 dark:bg-red-700/50 backdrop-blur-sm border-l-4 border-red-600 dark:border-red-500 text-red-800 dark:text-red-200 p-5 rounded-lg shadow-2xl transform-preserve-3d hover:shadow-red-500/40"
      role="alert"
      style={{ transform: 'translateZ(5px) rotateX(1deg)' }} // Subtle 3D lift
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 py-1">
          <svg className="fill-current h-7 w-7 text-red-500 dark:text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold text-lg">Error Occurred</p>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};
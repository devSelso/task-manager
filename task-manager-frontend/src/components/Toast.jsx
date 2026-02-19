import React, { useEffect } from 'react';

const toastTypes = {
  success: {
    icon: '✅',
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-800'
  },
  error: {
    icon: '❌',
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-800'
  },
  warning: {
    icon: '⚠️',
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-800'
  },
  info: {
    icon: 'ℹ️',
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-800'
  },
  task: {
    icon: '📌',
    bg: 'bg-indigo-50',
    border: 'border-indigo-500',
    text: 'text-indigo-800'
  },
  congratulations: {
    icon: '🎉',
    bg: 'bg-purple-50',
    border: 'border-purple-500',
    text: 'text-purple-800'
  }
};

export function Toast({ message, type = 'info', duration = 5000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastType = toastTypes[type] || toastTypes.info;

  return (
    <div className={`
      ${toastType.bg} ${toastType.border} ${toastType.text}
      border-l-4 rounded-r-lg shadow-lg p-4 mb-3
      transform transition-all duration-300 ease-in-out
      hover:scale-102 hover:shadow-xl
      animate-slideIn
      max-w-md w-full
    `}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{toastType.icon}</span>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [inputValue, setInputValue] = useState('');

  const predefinedTechs = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
    'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
    'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
    'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop'];

  const handleAdd = (tech) => {
    if (tech && !technologies.includes(tech)) {
      onChange([...technologies, tech]);
      setInputValue('');
    }
  };

  const handleRemove = (techToRemove) => {
    onChange(technologies.filter(tech => tech !== techToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd(inputValue.trim());
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a technology and press Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-black placeholder-gray-500 ${
              error 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
          <button
            type="button"
            onClick={() => handleAdd(inputValue.trim())}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Add
          </button>
        </div>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mb-3 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}

      <div className="mb-6">
        <p className="text-sm font-semibold mb-3 text-black">Quick Add:</p>
        <div className="flex flex-wrap gap-2">
          {predefinedTechs.map(tech => (
            <button
              key={tech}
              type="button"
              onClick={() => handleAdd(tech)}
              disabled={technologies.includes(tech)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all text-black ${
                technologies.includes(tech)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-indigo-100 hover:text-blue-700 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 border border-gray-300'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {technologies.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-100">
          <p className="text-sm font-semibold mb-3 text-black">Selected Technologies:</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map(tech => (
              <span
                key={tech}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold shadow-md"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemove(tech)}
                  aria-label="Remove"
                  className="ml-2 text-white hover:text-red-200 transition-colors font-bold text-lg leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


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
      <div className="mb-2">
        <input
          type="text"
          placeholder="Type a technology"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`w-full px-3 py-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        <button
          type="button"
          onClick={() => handleAdd(inputValue.trim())}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Quick Add:</p>
        <div className="flex flex-wrap gap-2">
          {predefinedTechs.map(tech => (
            <button
              key={tech}
              type="button"
              onClick={() => handleAdd(tech)}
              disabled={technologies.includes(tech)}
              className={`px-3 py-1 rounded text-sm ${
                technologies.includes(tech)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.map(tech => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemove(tech)}
                aria-label="Remove"
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

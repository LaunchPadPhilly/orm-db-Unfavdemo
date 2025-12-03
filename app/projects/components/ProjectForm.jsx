'use client';

import { useState } from 'react';
import TechnologyInput from './TechnologyInput.jsx';

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const validateUrl = (url) => {
    if (!url) return true;
    return /^https?:\/\/.+\..+/.test(url);
  };

  const validate = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }
    
    if (imageUrl && !validateUrl(imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }
    
    if (projectUrl && !validateUrl(projectUrl)) {
      newErrors.projectUrl = 'Please enter a valid URL';
    }
    
    if (githubUrl && !validateUrl(githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim() || null,
        projectUrl: projectUrl.trim() || null,
        githubUrl: githubUrl.trim() || null,
        technologies
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setImageUrl('');
      setProjectUrl('');
      setGithubUrl('');
      setTechnologies([]);
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setProjectUrl('');
    setGithubUrl('');
    setTechnologies([]);
    setErrors({});
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
          <h2 className="text-3xl font-bold text-white">Add New Project</h2>
          <p className="text-blue-100 mt-1">Fill in the details below to add a new project</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Title - Required */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-semibold mb-2 text-black">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-black placeholder-gray-500 ${
                errors.title 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="Enter project title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.title}
              </p>
            )}
          </div>

          {/* Description - Required */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold mb-2 text-black">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none text-black placeholder-gray-500 ${
                errors.description 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="Describe your project..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.description}
              </p>
            )}
          </div>

          {/* Optional URL Fields */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Image URL - Optional */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-semibold mb-2 text-black">
                Image URL <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                id="imageUrl"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-black placeholder-gray-500 ${
                  errors.imageUrl 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.imageUrl}
                </p>
              )}
            </div>

            {/* Project URL - Optional */}
            <div>
              <label htmlFor="projectUrl" className="block text-sm font-semibold mb-2 text-black">
                Project URL <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                id="projectUrl"
                type="text"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-black placeholder-gray-500 ${
                  errors.projectUrl 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="https://your-project.com"
              />
              {errors.projectUrl && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.projectUrl}
                </p>
              )}
            </div>
          </div>

          {/* GitHub URL - Optional */}
          <div className="mb-6">
            <label htmlFor="githubUrl" className="block text-sm font-semibold mb-2 text-black">
              GitHub URL <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              id="githubUrl"
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-black placeholder-gray-500 ${
                errors.githubUrl 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="https://github.com/username/repo"
            />
            {errors.githubUrl && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.githubUrl}
              </p>
            )}
          </div>

          {/* Technologies - Required Array */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2 text-black">
              Technologies <span className="text-red-500">*</span>
            </label>
            <TechnologyInput
              technologies={technologies}
              onChange={setTechnologies}
              error={errors.technologies}
            />
            {errors.technologies && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.technologies}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Project...
                </span>
              ) : (
                'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


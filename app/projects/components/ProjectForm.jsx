'use client';

import { useState } from 'react';
import TechnologyInput from './TechnologyInput';

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
        imageUrl: imageUrl.trim(),
        projectUrl: projectUrl.trim(),
        githubUrl: githubUrl.trim(),
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Project Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="projectUrl" className="block text-sm font-medium mb-1">
              Project URL
            </label>
            <input
              id="projectUrl"
              type="text"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${errors.projectUrl ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.projectUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.projectUrl}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="githubUrl" className="block text-sm font-medium mb-1">
              GitHub URL
            </label>
            <input
              id="githubUrl"
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${errors.githubUrl ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.githubUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.githubUrl}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Technologies
            </label>
            <TechnologyInput
              technologies={technologies}
              onChange={setTechnologies}
              error={errors.technologies}
            />
            {errors.technologies && (
              <p className="text-red-500 text-sm mt-1">{errors.technologies}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Project...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectForm from './components/ProjectForm.jsx';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/projects');
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      // Limit to only 3 projects on the frontend as well
      setProjects(data.slice(0, 3));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (projectData) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      // Refresh projects list
      await fetchProjects();
      setShowForm(false);
    } catch (err) {
      console.error('Error creating project:', err);
      alert('Failed to create project. Please try again.');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-blue-50 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-2">
              My Projects
            </h1>
            <p className="text-black text-lg">
              A collection of my work and coding projects (Showing 3 most recent)
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg whitespace-nowrap"
          >
            + Add New Project
          </button>
        </div>

        {/* Project Form */}
        {showForm && (
          <ProjectForm
            isOpen={showForm}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-6 text-black text-xl">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-3">Error Loading Projects</h2>
            <p className="text-black mb-4">{error}</p>
            <button
              onClick={fetchProjects}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Projects Grid - Limited to 3 projects */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {projects.slice(0, 3).map((project, index) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in hover:-translate-y-0.5"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white text-center">
                      <div className="text-6xl mb-2">💻</div>
                      <p className="font-bold text-xl">No Image</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-black line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-black mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.technologies?.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-black px-3 py-1.5 rounded-full font-semibold border border-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="text-xs text-black px-3 py-1.5">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-center font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      View Details
                    </Link>
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 text-black px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-semibold shadow-md"
                      >
                        🌐
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="text-8xl mb-6">🚀</div>
              <h2 className="text-4xl font-bold mb-4 text-black">No projects yet</h2>
              <p className="text-black mb-8 text-xl">
                Get started by adding your first project!
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
              >
                + Add Your First Project
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 max-w-md mx-auto shadow-lg">
              <h3 className="font-bold text-black mb-4 text-xl">💡 Project Ideas:</h3>
              <ul className="text-black space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <span>•</span>
                  <span>Past school projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>•</span>
                  <span>Personal coding projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>•</span>
                  <span>Design work or creative projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>•</span>
                  <span>Future projects you want to build</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '../../../lib/db';

async function getProject(id) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: id },
    });
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) {
    notFound();
  }

  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-blue-50 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors font-semibold group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Back to Projects
        </Link>

        {/* Project header */}
        <div className="card p-8 md:p-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            {project.title}
          </h1>
          <div className="flex gap-3 mb-6 flex-wrap">
            {project.technologies?.map((tech, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-100 to-indigo-100 text-black px-5 py-2.5 rounded-full text-sm font-semibold shadow-md border border-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project image */}
        {project.imageUrl && (
          <div className="mb-8">
            <div className="card overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}

        {/* Project content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2">
            <div className="card p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6 text-black">About This Project</h2>
              <p className="text-lg text-black leading-relaxed mb-8 whitespace-pre-line">
                {project.description}
              </p>

              {/* Additional sections */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-blue-100">
                <h3 className="text-xl font-bold mb-4 text-black flex items-center gap-2">
                  <span className="text-2xl">⚙️</span>
                  Technical Details
                </h3>
                <p className="text-black leading-relaxed">
                  This project showcases modern web development practices and demonstrates
                  proficiency with the technologies listed above. It represents a commitment
                  to clean code, user experience, and scalable architecture.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project links */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-6 text-black">Project Links</h3>
              <div className="space-y-3">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center px-4 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    🌐 View Live Project
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center px-4 py-3 rounded-lg hover:from-gray-900 hover:to-black transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    💻 View on GitHub
                  </a>
                )}
                {!project.projectUrl && !project.githubUrl && (
                  <p className="text-black text-sm text-center py-4">No links available</p>
                )}
              </div>
            </div>

            {/* Project info */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-6 text-black">Project Info</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-semibold text-black">Created</p>
                    <p className="text-black">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <p className="font-semibold text-black">Last Updated</p>
                    <p className="text-black">
                      {new Date(project.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

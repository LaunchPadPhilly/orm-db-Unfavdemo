import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-blue-50 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-black text-center">
          About Me
        </h1>
        
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 md:p-12 mb-8 hover:-translate-y-0.5">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl ring-4 ring-blue-200 transform hover:scale-105 transition-transform duration-300">
                JD
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                Developer & Problem Solver
              </h2>
              <div className="space-y-4 text-black leading-relaxed text-lg">
                <p>
                  Hello! I&apos;m a passionate web developer with a love for creating
                  beautiful, functional applications. I enjoy turning complex problems
                  into simple, elegant solutions that make a real impact.
                </p>
                <p>
                  My journey in software development started with curiosity and has
                  evolved into a deep passion for building user-friendly applications
                  that make a difference. I&apos;m constantly learning new technologies
                  and improving my skills to stay at the forefront of web development.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new frameworks,
                  contributing to open-source projects, or sharing knowledge with the
                  developer community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 md:p-12 mb-8 hover:-translate-y-0.5">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black text-center">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                Frontend Development
              </h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'].map((skill) => (
                  <span
                    key={skill}
                    className="bg-gradient-to-r from-blue-100 to-indigo-100 text-black px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                Backend & Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Node.js', 'PostgreSQL', 'Prisma', 'Git', 'REST APIs', 'Vercel'].map((skill) => (
                  <span
                    key={skill}
                    className="bg-gradient-to-r from-indigo-100 to-purple-100 text-black px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 shadow-lg">
          <h3 className="font-bold text-black mb-6 text-2xl flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            Current Goals
          </h3>
          <ul className="text-black space-y-3 text-lg">
            <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
              <span className="text-blue-600 font-bold">→</span>
              <span>Expanding my knowledge of full-stack development and cloud technologies</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
              <span className="text-blue-600 font-bold">→</span>
              <span>Building more complex applications with modern frameworks and best practices</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
              <span className="text-blue-600 font-bold">→</span>
              <span>Contributing to open-source projects and giving back to the community</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
              <span className="text-blue-600 font-bold">→</span>
              <span>Learning cloud technologies and DevOps practices for scalable applications</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


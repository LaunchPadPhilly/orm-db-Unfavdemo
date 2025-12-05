import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-fade-in">
      <div className="max-w-5xl text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-black animate-fade-in">
            Welcome to My Portfolio
          </h1>
          
          <p className="text-xl md:text-2xl text-black mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            I&apos;m a developer passionate about building beautiful, functional web applications.
            Explore my projects and learn more about my journey in software development.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
          <Link
            href="/projects"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 text-lg inline-block text-center"
          >
            View My Projects
          </Link>
          <Link
            href="/about"
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-600 hover:text-white transform hover:-translate-y-0.5 text-lg inline-block text-center"
          >
            Learn About Me
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 animate-fade-in hover:-translate-y-0.5">
            <div className="text-5xl mb-6">💼</div>
            <h2 className="text-2xl font-bold mb-3 text-black">Projects</h2>
            <p className="text-black mb-6 leading-relaxed">
              Explore my portfolio of web applications and coding projects built with modern technologies
            </p>
            <Link
              href="/projects"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-2 transition-colors"
            >
              View Projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 animate-[fadeIn_0.6s_ease-out] hover:-translate-y-0.5" style={{ animationDelay: '0.1s' }}>
            <div className="text-5xl mb-6">👤</div>
            <h2 className="text-2xl font-bold mb-3 text-black">About</h2>
            <p className="text-black mb-6 leading-relaxed">
              Learn about my background, skills, and passion for creating innovative solutions
            </p>
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Learn More
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 animate-[fadeIn_0.6s_ease-out] hover:-translate-y-0.5" style={{ animationDelay: '0.2s' }}>
            <div className="text-5xl mb-6">📧</div>
            <h2 className="text-2xl font-bold mb-3 text-black">Contact</h2>
            <p className="text-black mb-6 leading-relaxed">
              Get in touch for collaborations, opportunities, or just to connect and share ideas
            </p>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Contact Me
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


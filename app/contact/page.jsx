import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-indigo-50 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-black text-center">
          Get In Touch
        </h1>
        
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 md:p-12 mb-8 hover:-translate-y-0.5">
          <p className="text-xl md:text-2xl text-black mb-12 leading-relaxed text-center">
            I&apos;d love to hear from you! Whether you have a question about my work,
            want to collaborate on a project, or just want to connect, feel free to
            reach out through any of these channels.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-200">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="font-bold text-black text-lg mb-2">Email</h3>
              <a
                href="mailto:your.email@example.com"
                className="text-blue-600 hover:text-blue-800 transition-colors font-semibold mb-2"
              >
                your.email@example.com
              </a>
              <p className="text-sm text-black">
                I typically respond within 24-48 hours
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-indigo-200">
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="font-bold text-black text-lg mb-2">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/yourname"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors font-semibold mb-2"
              >
                Connect with me
              </a>
              <p className="text-sm text-black">
                Professional networking and opportunities
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-200">
              <div className="text-5xl mb-4">💻</div>
              <h3 className="font-bold text-black text-lg mb-2">GitHub</h3>
              <a
                href="https://github.com/yourname"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors font-semibold mb-2"
              >
                View my code
              </a>
              <p className="text-sm text-black">
                Open-source contributions and projects
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 shadow-lg mb-8">
          <h3 className="font-bold text-black mb-6 text-2xl flex items-center gap-3">
            <span className="text-3xl">💡</span>
            What I&apos;m Looking For
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-black font-semibold">🤝 Collaboration</p>
              <p className="text-black text-sm mt-1">Interesting project opportunities</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-black font-semibold">💬 Feedback</p>
              <p className="text-black text-sm mt-1">Thoughts on my work and portfolio</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-black font-semibold">🌐 Networking</p>
              <p className="text-black text-sm mt-1">Connecting with fellow developers</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-black font-semibold">📚 Learning</p>
              <p className="text-black text-sm mt-1">New technologies and opportunities</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg inline-block"
          >
            View My Projects
          </Link>
        </div>
      </div>
    </div>
  );
}


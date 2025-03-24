import { Github, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0C0C12] py-8 border-t border-[#2A2A3A]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#E10600] rounded-full flex items-center justify-center mr-3">
                <img src="/images/f1-logo.png" alt="F1 Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-white font-bold text-lg">F1 Analytics Hub</span>
            </div>
            <p className="text-gray-400 text-sm mt-2">Real-time insights powered by fastf1</p>
          </div>

          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-4 mb-3">
              <a
                href="https://github.com/eng-mbuguaa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com/eng_mbuguaa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">&copy; {currentYear} eng.mbuguaa. All rights reserved.</p>
            <p className="text-gray-600 text-xs mt-1">
              Formula 1 and F1 logo are trademarks of Formula One Licensing BV
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


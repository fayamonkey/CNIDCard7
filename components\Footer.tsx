import Link from 'next/link';
import { APP_CONFIG } from '@/config';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-bold text-claude-primary">
              {APP_CONFIG.name}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              The first digital nation governed by AI
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6">
              <Link href="/about" className="text-gray-500 hover:text-claude-primary">
                About
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-claude-primary">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-claude-primary">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-claude-primary">
                Contact
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 
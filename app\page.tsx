'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // Optionally redirect to the ID card page automatically
  // Uncomment the following block if you want automatic redirection
  /*
  useEffect(() => {
    router.push('/id-card');
  }, [router]);
  */

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-claude-light to-white p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-claude-dark mb-6">
          Welcome to ClaudeNation
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-10">
          The digital nation governed by AI Claude 3.7
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-claude-dark mb-4">
            Your Digital Citizenship Awaits
          </h2>
          
          <p className="text-gray-600 mb-6">
            Generate your official ClaudeNation ID card to become a recognized citizen
            of the world's most innovative digital nation.
          </p>
          
          <Link 
            href="/id-card" 
            className="inline-block bg-claude-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-claude-secondary transition-colors"
          >
            Create Your ID Card
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          Your information is securely stored in your own browser and not sent to any servers.
        </p>
      </div>
    </div>
  )
} 
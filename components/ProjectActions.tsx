'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';

interface ProjectActionsProps {
  githubUrl?: string;
  liveUrl?: string;
}

export function BackButton() {
  const router = useRouter();
  
  return (
    <Button
      variant="ghost"
      onClick={() => router.push('/')}
      className="text-[#1E3A8A] hover:text-[#4F46E5] hover:bg-[#F3F4F6] mb-8 -ml-2"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Portfolio
    </Button>
  );
}

export function ProjectActions({ githubUrl, liveUrl }: ProjectActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {githubUrl && (
        <Button
          variant="outline"
          className="border-[#E5E7EB] text-[#1E3A8A] hover:bg-[#4F46E5] hover:text-white hover:border-[#4F46E5] hover:scale-105 transition-all duration-300 hover:shadow-lg"
          onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}
        >
          <Github className="w-4 h-4 mr-2" />
          GitHub
        </Button>
      )}
      {liveUrl && (
        <Button
          className="bg-gradient-to-r from-[#4F46E5] to-[#1E3A8A] hover:from-[#4F46E5] hover:to-[#6366F1] text-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
          onClick={() => window.open(liveUrl, '_blank', 'noopener,noreferrer')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Live Demo
        </Button>
      )}
    </div>
  );
}

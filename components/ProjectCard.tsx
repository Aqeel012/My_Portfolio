'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  imageUrl?: string; // Support both prop names
}

export default function ProjectCard({
  id,
  title,
  description,
  tags,
  githubUrl,
  liveUrl,
  image,
  imageUrl,
}: ProjectCardProps) {
  const projectImage = image || imageUrl;
  return (
    <div className="group relative h-full">
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 to-[#1E3A8A]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Card */}
      <Link href={`/projects/${id}`} className="block h-full">
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:border-[#4F46E5]/50 transition-all duration-300 flex flex-col gap-0 h-full shadow-sm hover:shadow-xl cursor-pointer">
          
          {/* Image Section */}
          <div className="relative w-full h-64 bg-gradient-to-br from-[#4F46E5]/20 to-[#1E3A8A]/20 overflow-hidden">
          {projectImage ? (
            <img
              src={projectImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-[#6B7280]">Project Image</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col gap-3 flex-grow">
          {/* Title and Description */}
          <div className="flex flex-col gap-2 flex-grow">
            <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#4F46E5] transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#E5E7EB] via-[#4F46E5]/20 to-[#E5E7EB]" />

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gradient-to-r from-[#F3F4F6] to-[#E5E7EB] text-[#1E3A8A] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#E5E7EB] group-hover:border-[#4F46E5]/30 group-hover:bg-[#EEF2FF] transition-all"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            {githubUrl && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-[#E5E7EB] text-[#1E3A8A] hover:bg-[#4F46E5] hover:text-white hover:border-[#4F46E5] hover:scale-105 transition-all duration-300 hover:shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(githubUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            )}
            
            {liveUrl && (
              <Button
                size="sm"
                className="flex items-center gap-2 bg-gradient-to-r from-[#4F46E5] to-[#1E3A8A] hover:from-[#4F46E5] hover:to-[#6366F1] text-white font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(liveUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
            )}
          </div>
        </div>
        </div>
      </Link>
    </div>
  );
}

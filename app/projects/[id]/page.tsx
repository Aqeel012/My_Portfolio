import { notFound } from 'next/navigation';
import { Github, ExternalLink } from 'lucide-react';
import { getProjectById } from '@/lib/firebase-services';
import { BackButton, ProjectActions } from '@/components/ProjectActions';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F9FAFB] to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <BackButton />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-6 leading-tight">
            {project.title}
          </h1>
          
          <p className="text-xl text-[#6B7280] leading-relaxed max-w-4xl mb-8">
            {project.fullDescription}
          </p>

          {/* Action Buttons */}
          <ProjectActions githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Features */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#111827] mb-6">Key Features</h2>
                <ul className="space-y-4">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#1E3A8A] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-[#6B7280] leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl border border-[#F59E0B]/20 p-8">
                <h2 className="text-2xl font-bold text-[#92400E] mb-4">Challenges & Solutions</h2>
                <p className="text-[#78350F] leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-[#111827] mb-6">Technologies Used</h3>
                <div className="space-y-4">
                  {project.technologies.map((tech: any) => (
                    <div key={tech.name} className="pb-4 border-b border-[#E5E7EB] last:border-0 last:pb-0">
                      <h4 className="font-semibold text-[#4F46E5] mb-1">{tech.name}</h4>
                      <p className="text-sm text-[#6B7280]">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

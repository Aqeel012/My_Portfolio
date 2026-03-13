import ProjectsGrid from './ProjectsGrid';
import { getAllProjects } from '@/lib/firebase-services';

export default async function ProjectsSection() {
  // Fetch projects from Firebase
  const projects = await getAllProjects();

  return (
    <section id="projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#4F46E5]/5 rounded-full blur-3xl -ml-48 -mt-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1E3A8A]/5 rounded-full blur-3xl -mr-48 -mb-48" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6 text-balance leading-tight">
            Featured Projects
          </h2>
          <p className="text-xl text-[#6B7280] text-balance">
            A selection of recent work showcasing my expertise in mobile development, architecture, and user experience design.
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}

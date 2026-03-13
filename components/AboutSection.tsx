import { getAboutMe, getAllProjects } from '@/lib/firebase-services';

export default async function AboutSection() {
  // Fetch about me data and projects from Firebase
  const aboutData = await getAboutMe();
  const projects = await getAllProjects();
  
  // Fallback data if Firebase returns null
  const skills = aboutData?.skills.map(s => s.name) || [
    'Flutter', 'Dart', 'Firebase', 'REST APIs', 'State Management', 
    'UI/UX Design', 'Git & Version Control', 'Agile Methodology',
    'Mobile Optimization', 'Testing & Debugging', 'Cloud Platforms', 'Database Design'
  ];
  
  const bio = aboutData?.bio || [
    "I hold a Bachelor's degree in Computer Science from [University Name]. Throughout my academic journey, I developed a strong foundation in software engineering principles, algorithms, and modern development practices, which I now apply to building production-grade mobile applications."
  ];
  
  // Extract experience years (e.g., "5+ years" -> "5+")
  const experienceYears = aboutData?.experience?.match(/\d+\+?/)?.[0] || '5+';
  const projectCount = projects.length || 8;
  const skillCount = skills.length || 12;

  return (
    <>
      {/* Skills Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F172A] to-[#1E3A8A] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#4F46E5]/5 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-balance leading-tight">
            Skills & Expertise
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="group relative"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 h-full flex items-center justify-center hover:border-white/40 transition-all duration-300 hover:bg-white/15">
                  <span className="text-white font-semibold text-center text-sm md:text-base">
                    {skill}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#A5B4FC] mb-2">{experienceYears}</p>
                <p className="text-white/80">Years of Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#A5B4FC] mb-2">{skillCount}+</p>
                <p className="text-white/80">Core Skills</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#A5B4FC] mb-2">{projectCount}+</p>
                <p className="text-white/80">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F4F6] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-8 text-balance leading-tight">
            About Me
          </h2>
          
          <div className="space-y-6">
            {bio.map((paragraph, index) => (
              <p key={index} className="text-lg text-[#6B7280] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

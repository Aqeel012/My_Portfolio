import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getAboutMe } from '@/lib/firebase-services';

export default async function HeroSection() {
  // Fetch data from Firestore
  const aboutData = await getAboutMe();
  const resumeUrl = aboutData?.resumeUrl || '/resume.pdf'; // Fallback to static file
  const profileImageUrl = aboutData?.profileImageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
  
  return (
    <section id="home" className="relative h-screen flex items-center py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-white to-[#F9FAFB] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#4F46E5]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#A5B4FC]/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] text-balance leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-[#4F46E5] to-[#1E3A8A] bg-clip-text text-transparent">Aqeel</span> – a Software Engineer specializing in Flutter.
              </h1>
            </div>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-[#6B7280] text-balance leading-relaxed max-w-lg">
              I create high-quality, scalable mobile apps with smooth performance and intuitive design. My focus is on building reliable products that users love.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                className="bg-gradient-to-r from-[#4F46E5] to-[#1E3A8A] hover:from-[#4F46E5]/90 hover:to-[#1E3A8A]/90 text-white font-bold py-7 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-base"
                asChild
              >
                <a href="#projects">View My Projects</a>
              </Button>
              
              <Button 
                variant="outline"
                className="border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white font-bold py-7 px-8 rounded-xl transition-all duration-300 text-base"
                asChild
              >
                <a 
                  href={resumeUrl} 
                  download="Aqeel_Ahmad_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Right side - Visual element */}
          <div className="hidden lg:flex justify-center items-center relative">
            {/* Outer glow effect */}
            <div className="absolute inset-0 blur-3xl opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#818CF8] rounded-full" />
            </div>
            
            {/* Main card container */}
            <div className="relative group">
              {/* Animated border gradient */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#818CF8] rounded-3xl opacity-75 group-hover:opacity-100 blur-sm transition duration-500 animate-pulse"></div>
              
              {/* Card background */}
              <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F172A] rounded-3xl p-8 shadow-2xl">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#6366F1] rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#6366F1] rounded-br-3xl"></div>
                
                {/* Inner content frame */}
                <div className="relative w-80 h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] border-2 border-white/10">
                  {/* Image placeholder with gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-[#6366F1]/20"></div>
                  
                  {/* Profile picture */}
                  <Image 
                    src={profileImageUrl}
                    alt="Aqeel Ahmad" 
                    className="w-full h-full object-cover"
                    fill
                    priority
                  />
                  
                  {/* Subtle grid pattern overlay */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                
                {/* Bottom accent bar */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent rounded-full"></div>
              </div>
              
              {/* Floating accent dots */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#6366F1] opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-[#4F46E5] opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

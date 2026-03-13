import { Github, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { getSocials } from '@/lib/firebase-services';

export default async function Footer() {
  const socials = await getSocials();
  
  // Extract email and phone for display
  const emailDisplay = socials?.email?.replace('mailto:', '') || '';
  const whatsappDisplay = socials?.whatsapp?.replace('https://wa.me/', '').replace('https://wa.me', '') || '';
  
  const socialLinks = [
    { icon: Github, url: socials?.github || 'https://github.com', label: 'GitHub', visible: !!socials?.github },
    { icon: Linkedin, url: socials?.linkedin || 'https://linkedin.com', label: 'LinkedIn', visible: !!socials?.linkedin },
    { icon: MessageCircle, url: socials?.whatsapp || 'https://wa.me/', label: 'WhatsApp', visible: !!socials?.whatsapp },
    { icon: Mail, url: socials?.email || 'mailto:hello@example.com', label: 'Email', visible: !!socials?.email },
  ].filter(link => link.visible);

  return (
    <footer id="contact" className="bg-gradient-to-b from-[#0F172A] to-[#1E3A8A] border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-white/80 text-sm">
            {emailDisplay && (
              <a href={socials?.email} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>{emailDisplay}</span>
              </a>
            )}
            {emailDisplay && whatsappDisplay && (
              <span className="hidden sm:block text-white/40">•</span>
            )}
            {whatsappDisplay && (
              <a href={socials?.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>+{whatsappDisplay}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

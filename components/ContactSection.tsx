import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { getSocials } from '@/lib/firebase-services';

export default async function ContactSection() {
  const socials = await getSocials();
  
  const socialLinks = [
    { icon: Github, url: socials?.github || 'https://github.com', label: 'GitHub', visible: !!socials?.github },
    { icon: Linkedin, url: socials?.linkedin || 'https://linkedin.com', label: 'LinkedIn', visible: !!socials?.linkedin },
    { icon: MessageCircle, url: socials?.whatsapp || 'https://wa.me/', label: 'WhatsApp', visible: !!socials?.whatsapp },
    { icon: Mail, url: socials?.email || 'mailto:hello@example.com', label: 'Email', visible: !!socials?.email },
  ].filter(link => link.visible);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F172A] to-[#1E3A8A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl -mr-48 -mt-48" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
      </div>
    </section>
  );
}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-white to-[#A5B4FC] hover:from-white hover:to-[#C7D2FC] text-[#1E3A8A] font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-base"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/firebase-services';

type RouteParams = { id: string };
type Technology = { name: string; description: string };

function isIdItem(value: unknown): value is { id: string | number } {
  if (!value || typeof value !== 'object') return false;
  if (!('id' in value)) return false;
  const id = (value as { id: unknown }).id;
  return typeof id === 'string' || typeof id === 'number';
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

function asTechnologies(value: unknown): Technology[] {
  if (!Array.isArray(value)) return [];

  const result: Technology[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const obj = item as Record<string, unknown>;
    const name = asString(obj.name);
    if (!name) continue;
    result.push({
      name,
      description: asString(obj.description),
    });
  }
  return result;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  try {
    const services = (await import('@/lib/firebase-services')) as {
      getProjects?: () => Promise<unknown>;
      getAllProjects?: () => Promise<unknown>;
    };

    const listFn = services.getProjects ?? services.getAllProjects;
    if (typeof listFn !== 'function') return [];

    const raw = await listFn();
    if (!Array.isArray(raw)) return [];

    return raw.filter(isIdItem).map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;
  const rawProject = (await getProjectById(id)) as Record<string, unknown> | null;

  if (!rawProject) notFound();

  const title = asString(rawProject.title, 'Project');
  const fullDescription = asString(rawProject.fullDescription);
  const githubUrl = asString(rawProject.githubUrl);
  const liveUrl = asString(rawProject.liveUrl);
  const challenges = asString(rawProject.challenges);
  const features = asStringArray(rawProject.features);
  const technologies = asTechnologies(rawProject.technologies);

  return (
     <div className="min-h-screen bg-gradient-to-b from-white via-[#F9FAFB] to-white">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm text-[#6B7280] hover:text-[#111827] mb-8">
            Back to Portfolio
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-xl text-[#6B7280] leading-relaxed max-w-4xl mb-8">
            {fullDescription}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB]"
              >
                GitHub
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-[#111827] text-white hover:opacity-90"
              >
                Live Demo
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#111827] mb-6">Key Features</h2>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={`${feature}-${index}`} className="text-[#6B7280] leading-relaxed">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl border border-[#F59E0B]/20 p-8">
                <h2 className="text-2xl font-bold text-[#92400E] mb-4">Challenges & Solutions</h2>
                <p className="text-[#78350F] leading-relaxed">{challenges}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-[#111827] mb-6">Technologies Used</h3>
                <div className="space-y-4">
                  {technologies.map((tech, index) => (
                    <div
                      key={`${tech.name}-${index}`}
                      className="pb-4 border-b border-[#E5E7EB] last:border-0 last:pb-0"
                    >
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

export interface PageSEOMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
  ogType?: string;
}

const PAGE_METADATA_MAP: Record<string, PageSEOMetadata> = {
  '/': {
    title: 'Zobly — Proof-Driven Career Building System',
    description: 'A practical, proof-driven learning and career progression system. Discover, Learn, Practice, Build, Prove, Launch, and Get Seen.',
    canonicalUrl: 'https://zobly.ai/',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogType: 'website'
  },
  '/terms': {
    title: 'Terms of Service — Zobly',
    description: "Read Zobly's Terms of Service for students, colleges, and training partners. Learn about platform agreements, project proofs, and user terms.",
    canonicalUrl: 'https://zobly.ai/terms',
    robots: 'index, follow',
    ogType: 'article'
  },
  '/privacy': {
    title: 'Privacy Policy — Zobly',
    description: 'Zobly Privacy Policy explains how student data, assessment inputs, and project submissions are secured and protected.',
    canonicalUrl: 'https://zobly.ai/privacy',
    robots: 'index, follow',
    ogType: 'article'
  },
  '/cookies': {
    title: 'Cookie Policy — Zobly',
    description: 'Details on how Zobly utilizes session cookies and local storage to personalize student assessment progression and track preferences.',
    canonicalUrl: 'https://zobly.ai/cookies',
    robots: 'index, follow',
    ogType: 'article'
  },
  '/login': {
    title: 'Student Login — Zobly',
    description: 'Sign in to your Zobly student workspace to manage your career roadmap, access repository projects, and view verified skill proofs.',
    canonicalUrl: 'https://zobly.ai/login',
    robots: 'index, follow',
    ogType: 'website'
  },
  '/signup': {
    title: 'Student Registration — Zobly',
    description: 'Apply for Zobly career readiness programs in AI & Automation, Software Development, or Data & BI. Build verified skills and proof.',
    canonicalUrl: 'https://zobly.ai/signup',
    robots: 'index, follow',
    ogType: 'website'
  },
  '/signup-success': {
    title: 'Application Submitted — Zobly',
    description: 'Your Zobly program application has been received. Our team will review your profile and contact you regarding next steps.',
    canonicalUrl: 'https://zobly.ai/signup-success',
    robots: 'noindex, nofollow',
    ogType: 'website'
  }
};

export function updatePageSEO(pathname: string): void {
  if (typeof document === 'undefined') return;

  const meta = PAGE_METADATA_MAP[pathname] || PAGE_METADATA_MAP['/'];

  // Update document title
  document.title = meta.title;

  // Update meta description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', meta.description);

  // Update canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonicalUrl);

  // Update robots meta
  let robotsMeta = document.querySelector('meta[name="robots"]');
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta');
    robotsMeta.setAttribute('name', 'robots');
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.setAttribute('content', meta.robots || 'index, follow');

  // Update OpenGraph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', meta.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', meta.canonicalUrl);

  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) ogType.setAttribute('content', meta.ogType || 'website');

  // Update Twitter tags
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', meta.title);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', meta.description);
}

import type { Category, CategoryId, Season, Title } from './types';

/*
 * All content below is placeholder copy. Swap in real case studies by editing
 * the entries in `TITLES` — every screen in the app is driven from this file.
 */

export const CATEGORIES: Category[] = [
  {
    id: 'product',
    name: 'Product Design (UX/UI)',
    shortName: 'Product Design',
    blurb: 'End-to-end product work — research, interaction design, and shipped interfaces.',
  },
  {
    id: 'brand',
    name: 'Brand & Art Direction',
    shortName: 'Brand & Art Direction',
    blurb: 'Identity systems, campaigns, and visual storytelling across every screen.',
  },
  {
    id: 'leadership',
    name: 'Design Leadership',
    shortName: 'Leadership',
    blurb: 'Building teams, shaping culture, and scaling design inside organizations.',
  },
  {
    id: 'documentary',
    name: 'Documentaries',
    shortName: 'Documentaries',
    blurb: 'The stories behind the work — the career, the craft, and the people along the way.',
  },
];

export const categoryById = (id: CategoryId): Category =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];

type ChapterSeed = [title: string, synopsis: string];

type SeasonSeed = { name: string; chapters: ChapterSeed[] };

// Default chapter outlines per category. Documentaries always supply their own.
const CHAPTER_TEMPLATES: Record<Exclude<CategoryId, 'documentary'>, SeasonSeed[]> = {
  product: [
    {
      name: 'Discovery',
      chapters: [
        ['The Brief', 'Stakeholders arrive with a problem statement, a deadline, and three conflicting definitions of success.'],
        ['Into the Field', 'Twenty-four interviews, two diary studies, and one very honest usability session change the direction of the project.'],
        ['The Synthesis Wall', 'Hundreds of sticky notes collapse into five insights and a single job-to-be-done the whole team can rally behind.'],
      ],
    },
    {
      name: 'Design & Delivery',
      chapters: [
        ['Rough Cuts', 'Low-fidelity flows are tested, torn apart, and rebuilt in a week of rapid prototyping.'],
        ['The System', 'Components, tokens, and interaction patterns are formalized so engineering can ship with confidence.'],
        ['Launch Day', 'The release goes live. Dashboards light up, support tickets drop, and the team finally sleeps.'],
        ['Epilogue: What We Learned', 'A candid retrospective on what worked, what did not, and what comes next.'],
      ],
    },
  ],
  brand: [
    {
      name: 'The Story',
      chapters: [
        ['Origins', 'Digging into the archive, the founders, and the feeling the brand was always meant to have.'],
        ['Moodboards & Mayhem', 'Three creative territories are explored, pitched, and pressure-tested with real audiences.'],
        ['The Mark', 'A logo is sketched hundreds of times before one simple idea clicks into place.'],
      ],
    },
    {
      name: 'The World',
      chapters: [
        ['Type, Color & Motion', 'The identity grows into a full system — typography, palette, photography, and motion principles.'],
        ['On Set', 'Art directing the campaign shoot: lighting tests, wardrobe calls, and one lucky golden hour.'],
        ['Out in the Wild', 'The brand rolls out across packaging, signage, social, and a very large billboard.'],
      ],
    },
  ],
  leadership: [
    {
      name: 'Building the Team',
      chapters: [
        ['Day One', 'Inheriting a team, a backlog, and a reputation. Listening before changing anything.'],
        ['The Hiring Bar', 'Designing an interview loop that is fair, rigorous, and actually predicts great work.'],
        ['Rituals', 'Critique, demos, and design reviews that people look forward to instead of dreading.'],
      ],
    },
    {
      name: 'Scaling Up',
      chapters: [
        ['Career Ladders', 'Defining what growth looks like for ICs and managers — and writing it down.'],
        ['A Seat at the Table', 'Partnering with product and engineering leadership to make design a strategic function.'],
        ['The Long Game', 'Measuring the impact of design on the business, and planning the next three years.'],
      ],
    },
  ],
};

const buildSeasons = (id: string, outline: SeasonSeed[]): Season[] => {
  let n = 0;
  return outline.map((season) => ({
    name: season.name,
    chapters: season.chapters.map(([title, synopsis], i) => {
      n += 1;
      return {
        number: i + 1,
        title,
        synopsis,
        minutes: 3 + ((n * 7 + id.length) % 9),
        imageSeed: `${id}-ch${n}`,
      };
    }),
  }));
};

type TitleInput =
  | (Omit<Title, 'seasons' | 'category'> & { category: Exclude<CategoryId, 'documentary'>; outline?: SeasonSeed[] })
  | (Omit<Title, 'seasons' | 'category'> & { category: 'documentary'; outline: SeasonSeed[] });

const define = ({ outline, ...t }: TitleInput): Title => ({
  ...t,
  seasons: buildSeasons(t.id, outline ?? CHAPTER_TEMPLATES[t.category as Exclude<CategoryId, 'documentary'>]),
});

export const TITLES: Title[] = [
  // ——— Product Design (UX/UI) ———
  define({
    id: 'northstar',
    title: 'Northstar',
    subtitle: 'A Design Transformation Series',
    tagline: 'Four million members. One app. Zero room for error.',
    category: 'product',
    client: 'Meridian Credit Union',
    role: 'Lead Product Designer',
    year: 2026,
    format: 'Series',
    genre: 'Fintech',
    rating: 'UX-13',
    advisories: ['research', 'prototyping', 'stakeholder drama'],
    description:
      'When a legacy banking app hits a one-star crisis, a small design team sets out to rebuild it from the ground up — without breaking anything for the four million members who rely on it every day.',
    team: ['Miles Hillier', 'Jordan Reyes', 'Priya Shah', 'Theo Nakamura'],
    disciplines: ['UX Research', 'Interaction Design', 'Design Systems'],
    tools: ['Figma', 'Maze', 'Dovetail', 'Framer'],
    moods: ['Ambitious', 'Data-Driven'],
    outcomes: [
      { value: '+1.9★', label: 'App store rating' },
      { value: '-38%', label: 'Support tickets' },
      { value: '4.1M', label: 'Monthly members' },
    ],
    imageSeed: 'northstar-hero',
    accent: '#3b82f6',
    logo: { font: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', uppercase: true },
    badge: 'New Chapter',
    match: 98,
  }),
  define({
    id: 'pulse',
    title: 'Pulse',
    subtitle: 'The Patient Portal Story',
    tagline: 'Healthcare, finally designed for the people it serves.',
    category: 'product',
    client: 'Harborview Health',
    role: 'Senior UX Designer',
    year: 2025,
    format: 'Limited Series',
    genre: 'Healthcare',
    rating: 'UX-PG',
    advisories: ['accessibility', 'compliance', 'empathy'],
    description:
      'A regional health network’s patient portal is confusing, inaccessible, and ignored. This is the story of redesigning it with patients, nurses, and a WCAG checklist at the table.',
    team: ['Miles Hillier', 'Dana Okafor', 'Sam Whitfield'],
    disciplines: ['Accessibility', 'Service Design', 'UI Design'],
    tools: ['Figma', 'Stark', 'UserTesting'],
    moods: ['Heartfelt', 'Human-Centered'],
    outcomes: [
      { value: '3×', label: 'Portal adoption' },
      { value: 'AA', label: 'WCAG 2.2 compliance' },
      { value: '-52%', label: 'Missed appointments' },
    ],
    imageSeed: 'pulse-health',
    accent: '#ef4444',
    logo: { font: "'Space Grotesk', sans-serif", weight: 700, letterSpacing: '-0.03em' },
    badge: 'Award Winner',
    match: 96,
  }),
  define({
    id: 'checkout-zero',
    title: 'Checkout Zero',
    tagline: 'Every click costs money. We removed eleven of them.',
    category: 'product',
    client: 'Loom & Ladder',
    role: 'Product Design Lead',
    year: 2024,
    format: 'Feature',
    genre: 'E-commerce',
    rating: 'UX-13',
    advisories: ['A/B testing', 'conversion', 'edge cases'],
    description:
      'A fast-paced optimization thriller. A home goods retailer is bleeding carts at checkout, and a cross-functional squad has one quarter to find out why.',
    team: ['Miles Hillier', 'Ava Lindqvist', 'Marcus Bell'],
    disciplines: ['Conversion Design', 'Experimentation', 'UI Design'],
    tools: ['Figma', 'Optimizely', 'Amplitude'],
    moods: ['Fast-Paced', 'Measurable'],
    outcomes: [
      { value: '+22%', label: 'Checkout conversion' },
      { value: '$8.4M', label: 'Annualized revenue' },
      { value: '11', label: 'Steps removed' },
    ],
    imageSeed: 'checkout-cart',
    accent: '#f59e0b',
    logo: { font: "'Anton', sans-serif", uppercase: true, letterSpacing: '0.01em' },
    badge: 'Top 10',
    match: 94,
  }),
  define({
    id: 'atlas',
    title: 'Flux',
    subtitle: 'Building a usable Design System',
    tagline: 'One source of truth for nine product teams.',
    category: 'product',
    client: 'Meltwater',
    role: 'Design Systems Lead',
    year: 2022,
    format: 'Series',
    genre: 'Design Systems',
    rating: 'UX-DS',
    advisories: ['tokens', 'governance', 'naming debates'],
    description:
      'Seven teams, several button styles, and zero consistency. Flux follows the creation of a design system that designers, product managers and engineers actually wanted to adopt and contribute to.',
    team: ['Miles Hillier', 'Sophie Gotshal', 'Jeremiah Hoyet'],
    disciplines: ['Design Systems', 'Documentation', 'Front-End Collaboration'],
    tools: ['Figma', 'CodePen', 'GitHub'],
    moods: ['Systematic', 'Collaborative'],
    outcomes: [
      { value: '92%', label: 'Component adoption' },
      { value: '-40%', label: 'UI build time' },
      { value: '4', label: 'Teams integrated' },
    ],
    imageSeed: 'atlas-grid',
    accent: '#1d9f9f',
    logo: { font: "'Helvetica Neue', Helvetica, Arial, sans-serif", weight: 500 },
    badge: 'Top 10',
    match: 97,
    outline: [
      {
        name: 'Discovery',
        chapters: [
          ['The Challenge', 'Stakeholders arrive with a problem statement, a deadline, and three conflicting definitions of success.'],
          ['Into the Field', 'Twenty-four interviews, two diary studies, and one very honest usability session change the direction of the project.'],
          ['The Synthesis Wall', 'Hundreds of sticky notes collapse into five insights and a single job-to-be-done the whole team can rally behind.'],
        ],
      },
      {
        name: 'Design & Delivery',
        chapters: [
          ['Rough Cuts', 'Low-fidelity flows are tested, torn apart, and rebuilt in a week of rapid prototyping.'],
          ['The System', 'Components, tokens, and interaction patterns are formalized so engineering can ship with confidence.'],
          ['Launch Day', 'The release goes live. Dashboards light up, support tickets drop, and the team finally sleeps.'],
          ['Epilogue: What We Learned', 'A candid retrospective on what worked, what did not, and what comes next.'],
        ],
      },
    ],
  }),
  define({
    id: 'fieldnotes',
    title: 'Fieldnotes',
    tagline: 'Designing for gloves, glare, and no signal.',
    category: 'product',
    client: 'Gridline Utilities',
    role: 'Senior Product Designer',
    year: 2023,
    format: 'Feature',
    genre: 'B2B SaaS',
    rating: 'UX-13',
    advisories: ['offline states', 'ride-alongs', 'weather'],
    description:
      'Field technicians were juggling paper forms and three apps. A ride-along research program led to a single rugged mobile tool built for the real world.',
    team: ['Miles Hillier', 'Grace Tanaka', 'Omar Castillo'],
    disciplines: ['Field Research', 'Mobile Design', 'Prototyping'],
    tools: ['Figma', 'ProtoPie', 'Notion'],
    moods: ['Gritty', 'Practical'],
    outcomes: [
      { value: '-31min', label: 'Per work order' },
      { value: '100%', label: 'Offline capable' },
      { value: '4.8★', label: 'Internal rating' },
    ],
    imageSeed: 'fieldnotes-outdoor',
    accent: '#10b981',
    logo: { font: "'Space Mono', monospace", weight: 700, letterSpacing: '-0.02em' },
    match: 91,
  }),
  define({
    id: 'wayfinder',
    title: 'Wayfinder',
    tagline: 'Trip planning that feels like the trip.',
    category: 'product',
    client: 'Roam Travel Co.',
    role: 'Product Designer',
    year: 2022,
    format: 'Short',
    genre: 'Travel',
    rating: 'UX-G',
    advisories: ['wanderlust', 'maps', 'microinteractions'],
    description:
      'A concept-to-launch travel companion that turns scattered bookings into one beautiful, shareable itinerary.',
    team: ['Miles Hillier', 'Isla Moreno'],
    disciplines: ['Mobile Design', 'Motion Design', 'Visual Design'],
    tools: ['Figma', 'After Effects', 'Rive'],
    moods: ['Joyful', 'Polished'],
    outcomes: [
      { value: '250K', label: 'Downloads in 90 days' },
      { value: '4.7★', label: 'App store rating' },
      { value: '#3', label: 'Travel chart' },
    ],
    imageSeed: 'wayfinder-travel',
    accent: '#06b6d4',
    logo: { font: "'Righteous', sans-serif", letterSpacing: '0.02em' },
    match: 89,
  }),

  // ——— Brand & Art Direction ———
  define({
    id: 'ember-and-oak',
    title: 'Ember & Oak',
    subtitle: 'A Rebrand in Two Acts',
    tagline: 'A century-old recipe. A brand new flame.',
    category: 'brand',
    client: 'Ember & Oak Hospitality',
    role: 'Creative Director',
    year: 2025,
    format: 'Series',
    genre: 'Hospitality',
    rating: 'BR-13',
    advisories: ['serif fonts', 'food photography', 'nostalgia'],
    description:
      'A family restaurant group with eight locations and no shared identity gets a warm, crafted brand that honors its past and is ready for its next chapter.',
    team: ['Miles Hillier', 'Rosa Delgado', 'Finn O’Connor'],
    disciplines: ['Brand Identity', 'Art Direction', 'Packaging'],
    tools: ['Illustrator', 'Photoshop', 'Glyphs'],
    moods: ['Warm', 'Crafted'],
    outcomes: [
      { value: '8', label: 'Locations rebranded' },
      { value: '+34%', label: 'Foot traffic' },
      { value: 'Gold', label: 'Regional ADDY' },
    ],
    imageSeed: 'ember-fire',
    accent: '#f97316',
    logo: { font: "'Playfair Display', serif", weight: 900, italic: true },
    badge: 'Award Winner',
    match: 97,
  }),
  define({
    id: 'signal-noise',
    title: 'Signal/Noise',
    tagline: 'Three days. Forty artists. One unforgettable identity.',
    category: 'brand',
    client: 'Signal/Noise Festival',
    role: 'Art Director',
    year: 2024,
    format: 'Limited Series',
    genre: 'Music & Events',
    rating: 'BR-MA',
    advisories: ['loud colors', 'motion', 'late nights'],
    description:
      'An independent music festival needed an identity as loud as its lineup. The result was a kinetic system of waveforms, glitch type, and fluorescent color.',
    team: ['Miles Hillier', 'Kai Robinson', 'Mei Chen'],
    disciplines: ['Campaign Design', 'Motion Graphics', 'Environmental Design'],
    tools: ['After Effects', 'Cinema 4D', 'TouchDesigner'],
    moods: ['Electric', 'Bold'],
    outcomes: [
      { value: 'Sold Out', label: 'All three days' },
      { value: '12M', label: 'Social impressions' },
      { value: '60+', label: 'Assets delivered' },
    ],
    imageSeed: 'signal-concert',
    accent: '#ec4899',
    logo: { font: "'Archivo Black', sans-serif", uppercase: true, letterSpacing: '-0.02em' },
    badge: 'Top 10',
    match: 95,
  }),
  define({
    id: 'driftwood',
    title: 'Driftwood',
    subtitle: 'Coffee Co.',
    tagline: 'Slow mornings, bottled.',
    category: 'brand',
    client: 'Driftwood Coffee Co.',
    role: 'Brand Designer',
    year: 2023,
    format: 'Feature',
    genre: 'Consumer Goods',
    rating: 'BR-G',
    advisories: ['caffeine', 'kraft paper', 'coastal vibes'],
    description:
      'A coastal roaster moves from farmers markets to grocery shelves, with packaging and a brand voice built to stand out in the aisle.',
    team: ['Miles Hillier', 'Hannah Brooks'],
    disciplines: ['Packaging', 'Brand Voice', 'Illustration'],
    tools: ['Illustrator', 'Procreate', 'Dimension'],
    moods: ['Calm', 'Handmade'],
    outcomes: [
      { value: '140', label: 'Retail doors' },
      { value: '2.5×', label: 'Wholesale revenue' },
      { value: '6', label: 'SKUs designed' },
    ],
    imageSeed: 'driftwood-coffee',
    accent: '#a16207',
    logo: { font: "'DM Serif Display', serif", italic: true },
    match: 90,
  }),
  define({
    id: 'neon-hymnal',
    title: 'Neon Hymnal',
    tagline: 'An album you can see.',
    category: 'brand',
    client: 'The Lanterns',
    role: 'Art Director',
    year: 2024,
    format: 'Short',
    genre: 'Music',
    rating: 'BR-13',
    advisories: ['neon', 'film grain', 'vinyl'],
    description:
      'Album art direction and visual world-building for an indie band’s sophomore record — from cover art to tour visuals and a limited vinyl run.',
    team: ['Miles Hillier', 'Jules Martin'],
    disciplines: ['Art Direction', 'Photography', 'Print'],
    tools: ['Photoshop', 'Capture One', 'InDesign'],
    moods: ['Moody', 'Cinematic'],
    outcomes: [
      { value: '5,000', label: 'Vinyl pressed' },
      { value: '22', label: 'Tour dates' },
      { value: '1', label: 'Very happy band' },
    ],
    imageSeed: 'neon-night',
    accent: '#22d3ee',
    logo: { font: "'Abril Fatface', serif", letterSpacing: '0.01em' },
    badge: 'Recently Added',
    match: 88,
  }),
  define({
    id: 'terra',
    title: 'TERRA',
    subtitle: 'Launch Campaign',
    tagline: 'Built for the long way around.',
    category: 'brand',
    client: 'Terra Outfitters',
    role: 'Creative Director',
    year: 2026,
    format: 'Series',
    genre: 'Outdoor Apparel',
    rating: 'BR-PG',
    advisories: ['mountains', 'drone shots', 'wind'],
    description:
      'A new outdoor apparel label launches with a multi-channel campaign shot across three national parks in eleven days.',
    team: ['Miles Hillier', 'Eli Brandt', 'Sofia Varga', 'Tomás Ruiz'],
    disciplines: ['Campaign Strategy', 'Art Direction', 'Film'],
    tools: ['Premiere Pro', 'Lightroom', 'Figma'],
    moods: ['Epic', 'Adventurous'],
    outcomes: [
      { value: '3', label: 'National parks' },
      { value: '48', label: 'Campaign assets' },
      { value: '+210%', label: 'Launch-week traffic' },
    ],
    imageSeed: 'terra-mountain',
    accent: '#65a30d',
    logo: { font: "'Bebas Neue', sans-serif", letterSpacing: '0.3em', uppercase: true },
    badge: 'New Chapter',
    match: 93,
  }),

  // ——— Design Leadership ———
  define({
    id: 'the-hiring-season',
    title: 'The Hiring Season',
    tagline: 'From three designers to twenty-five in eighteen months.',
    category: 'leadership',
    client: 'Vantage Cloud',
    role: 'Head of Design',
    year: 2025,
    format: 'Series',
    genre: 'Team Building',
    rating: 'LD-13',
    advisories: ['interviews', 'offers', 'org charts'],
    description:
      'A behind-the-scenes look at scaling a design organization — the hiring loop, the onboarding program, and the culture that held it all together.',
    team: ['Miles Hillier', 'People Ops', 'Design Leads'],
    disciplines: ['Hiring', 'Org Design', 'Mentorship'],
    tools: ['Greenhouse', 'Notion', 'Lattice'],
    moods: ['Inspiring', 'Candid'],
    outcomes: [
      { value: '25', label: 'Designers hired' },
      { value: '94%', label: 'Retention' },
      { value: '4.6/5', label: 'Candidate experience' },
    ],
    imageSeed: 'hiring-team',
    accent: '#eab308',
    logo: { font: "'Playfair Display', serif", weight: 700 },
    badge: 'Top 10',
    match: 96,
  }),
  define({
    id: 'ops-unlocked',
    title: 'Ops Unlocked',
    tagline: 'The unglamorous work that made everything faster.',
    category: 'leadership',
    client: 'Meridian Credit Union',
    role: 'Design Director',
    year: 2024,
    format: 'Feature',
    genre: 'DesignOps',
    rating: 'LD-PG',
    advisories: ['spreadsheets', 'process', 'quiet heroics'],
    description:
      'Standing up a DesignOps practice from scratch: intake, tooling, research ops, and the rituals that gave designers their time back.',
    team: ['Miles Hillier', 'Nadia Frost', 'Ben Oduya'],
    disciplines: ['DesignOps', 'Research Ops', 'Tooling'],
    tools: ['Jira', 'Figma', 'Airtable'],
    moods: ['Methodical', 'Clever'],
    outcomes: [
      { value: '6hrs', label: 'Saved per designer / week' },
      { value: '2×', label: 'Research throughput' },
      { value: '1', label: 'Intake process' },
    ],
    imageSeed: 'ops-desk',
    accent: '#14b8a6',
    logo: { font: "'Anton', sans-serif", uppercase: true, letterSpacing: '0.06em' },
    badge: 'Recently Added',
    match: 92,
  }),
  define({
    id: 'critique-club',
    title: 'Critique Club',
    tagline: 'The first rule of Critique Club: be kind, be specific.',
    category: 'leadership',
    client: 'Internal Program',
    role: 'Design Manager',
    year: 2023,
    format: 'Short',
    genre: 'Culture',
    rating: 'LD-G',
    advisories: ['honest feedback', 'whiteboards', 'snacks'],
    description:
      'Turning design critique from a dreaded meeting into the most valuable hour of the week — with a format now used across the company.',
    team: ['Miles Hillier', 'The Design Team'],
    disciplines: ['Facilitation', 'Coaching', 'Culture'],
    tools: ['FigJam', 'Loom', 'Slack'],
    moods: ['Witty', 'Warm'],
    outcomes: [
      { value: '98%', label: 'Would recommend' },
      { value: '120+', label: 'Sessions run' },
      { value: '5', label: 'Teams adopted it' },
    ],
    imageSeed: 'critique-studio',
    accent: '#f43f5e',
    logo: { font: "'Righteous', sans-serif", uppercase: true },
    match: 90,
  }),
  define({
    id: 'north-of-now',
    title: 'North of Now',
    subtitle: 'A Product Vision',
    tagline: 'Where the product goes next — and how we got everyone to agree.',
    category: 'leadership',
    client: 'Loom & Ladder',
    role: 'Design Director',
    year: 2026,
    format: 'Limited Series',
    genre: 'Strategy',
    rating: 'LD-13',
    advisories: ['vision decks', 'workshops', 'executive alignment'],
    description:
      'A three-year product vision built through workshops with executives, customers, and engineers — then turned into a roadmap the company actually followed.',
    team: ['Miles Hillier', 'VP Product', 'CTO', 'Strategy Team'],
    disciplines: ['Vision', 'Workshop Facilitation', 'Storytelling'],
    tools: ['Keynote', 'FigJam', 'Figma'],
    moods: ['Visionary', 'Strategic'],
    outcomes: [
      { value: '3yr', label: 'Roadmap' },
      { value: '14', label: 'Workshops' },
      { value: '100%', label: 'Exec sign-off' },
    ],
    imageSeed: 'vision-horizon',
    accent: '#6366f1',
    logo: { font: "'DM Serif Display', serif" },
    badge: 'New Chapter',
    match: 95,
  }),
  define({
    id: 'the-merger',
    title: 'The Merger',
    tagline: 'Two companies. Two design teams. One product.',
    category: 'leadership',
    client: 'Vantage Cloud × Stackwise',
    role: 'Head of Design',
    year: 2026,
    format: 'Series',
    genre: 'Org Change',
    rating: 'LD-MA',
    advisories: ['reorgs', 'change management', 'difficult conversations'],
    description:
      'After an acquisition, two design cultures collide. A season about trust, shared rituals, and merging two design systems without losing anyone along the way.',
    team: ['Miles Hillier', 'Leadership Team', 'Both Design Orgs'],
    disciplines: ['Change Management', 'Org Design', 'Design Systems'],
    tools: ['Notion', 'Figma', 'Culture Amp'],
    moods: ['Tense', 'Hopeful'],
    outcomes: [
      { value: '2→1', label: 'Design systems' },
      { value: '0', label: 'Regretted attrition' },
      { value: '+18pt', label: 'Team engagement' },
    ],
    imageSeed: 'merger-city',
    accent: '#0ea5e9',
    logo: { font: "'Archivo Black', sans-serif", uppercase: true, letterSpacing: '0.02em' },
    badge: 'Coming Soon',
    match: 94,
  }),

  // ——— Documentaries ———
  define({
    id: 'miles-to-go',
    title: 'Miles to Go',
    subtitle: 'An Unfinished Biography',
    tagline: 'A career so far — and plenty of road ahead.',
    category: 'documentary',
    client: 'Miles Hillier',
    role: 'Subject & Narrator',
    year: 2026,
    format: 'Series',
    genre: 'Biography',
    rating: 'DOC-PG',
    advisories: ['origin stories', 'career pivots', 'dad jokes'],
    description:
      'From sketchbooks and side projects to leading design teams, this documentary follows one designer’s winding road — the lucky breaks, the hard lessons, and why the best chapter hasn’t been written yet.',
    team: ['Miles Hillier', 'Family & Friends', 'Former Managers', 'Mentors'],
    disciplines: ['Product Design', 'Art Direction', 'Design Leadership'],
    tools: ['Pencils', 'Photoshop', 'Figma', 'Curiosity'],
    moods: ['Inspiring', 'Candid', 'Heartfelt'],
    outcomes: [
      { value: '20', label: 'Years in design' },
      { value: '3', label: 'Disciplines mastered' },
      { value: '∞', label: 'Miles to go' },
    ],
    imageSeed: 'miles-to-go-road',
    accent: '#02cbf9',
    logo: { font: "'Bebas Neue', sans-serif", letterSpacing: '0.06em', uppercase: true },
    badge: 'New Chapter',
    match: 99,
    outline: [
      {
        name: 'The Early Years',
        chapters: [
          ['Origin Story', 'A kid with a sketchbook, a borrowed computer, and an unreasonable interest in how things are made.'],
          ['First Pixels', 'Freelance logos, band posters, and the first time someone paid for a design.'],
          ['The Big Break', 'An in-house job, a real product, and the realization that design is a team sport.'],
        ],
      },
      {
        name: 'Finding the Craft',
        chapters: [
          ['Learning to Listen', 'Discovering user research — and how often the first idea is wrong.'],
          ['From Maker to Leader', 'Trading some time in Figma for one-on-ones, hiring loops, and roadmaps.'],
          ['What’s Next', 'Where the road leads from here, and the kind of work still worth doing.'],
        ],
      },
    ],
  }),
  define({
    id: 'behind-the-scroll',
    title: 'Behind the Scroll',
    subtitle: 'The Making of This Portfolio',
    tagline: 'Why build a portfolio when you can launch a streaming service?',
    category: 'documentary',
    client: 'Miles Hillier',
    role: 'Designer & Developer',
    year: 2026,
    format: 'Feature',
    genre: 'Making-Of',
    rating: 'DOC-G',
    advisories: ['meta humor', 'hover states', 'scope creep'],
    description:
      'A behind-the-scenes look at turning a design portfolio into a binge-worthy streaming experience — from the first sketch on a napkin to the last hover state, with a surprising amount of arguing about badge colors.',
    team: ['Miles Hillier', 'Claude', 'Beta Testers'],
    disciplines: ['Concept', 'UI Design', 'Front-End Development'],
    tools: ['Figma', 'React', 'Vite', 'GitHub Pages'],
    moods: ['Witty', 'Self-Aware', 'Crafted'],
    outcomes: [
      { value: '1', label: 'Portfolio, reimagined' },
      { value: '19', label: 'Titles streaming' },
      { value: '0', label: 'Subscriptions required' },
    ],
    imageSeed: 'behind-the-scroll-studio',
    accent: '#a855f7',
    logo: { font: "'Space Mono', monospace", weight: 700, letterSpacing: '-0.02em' },
    badge: 'Recently Added',
    match: 97,
    outline: [
      {
        name: 'Pre-Production',
        chapters: [
          ['The Pitch', 'Every portfolio looks the same. What if this one looked like a streaming service?'],
          ['Storyboards', 'Mapping case studies to titles, project phases to seasons, and process to chapters.'],
          ['Casting the Work', 'Choosing which projects make the cut — and which stay in the vault.'],
        ],
      },
      {
        name: 'Post-Production',
        chapters: [
          ['Building the Set', 'Rows, heroes, hover states, and a detail screen that feels like pressing play.'],
          ['Color Grading', 'Finding the right brand blue and making every badge readable.'],
          ['Premiere Night', 'Shipping to the web and hitting “share.”'],
        ],
      },
    ],
  }),
  define({
    id: 'the-supporting-cast',
    title: 'The Supporting Cast',
    subtitle: 'Every Great Career Has an Ensemble',
    tagline: 'No one ships alone.',
    category: 'documentary',
    client: 'Collaborators Everywhere',
    role: 'Grateful Colleague',
    year: 2025,
    format: 'Series',
    genre: 'Ensemble',
    rating: 'DOC-PG',
    advisories: ['gratitude', 'inside jokes', 'whiteboard sessions'],
    description:
      'A tribute to the designers, engineers, researchers, and product partners who made the work better — the mentors who opened doors, the teammates who pushed back, and the people who made hard projects fun.',
    team: ['Mentors', 'Designers', 'Engineers', 'Product Partners', 'Researchers'],
    disciplines: ['Collaboration', 'Mentorship', 'Teamwork'],
    tools: ['Whiteboards', 'Coffee', 'Slack', 'Trust'],
    moods: ['Heartfelt', 'Uplifting'],
    outcomes: [
      { value: '100+', label: 'Collaborators' },
      { value: '12', label: 'Teams' },
      { value: '1', label: 'Standing ovation' },
    ],
    imageSeed: 'supporting-cast-team',
    accent: '#f59e0b',
    logo: { font: "'Playfair Display', serif", weight: 900, italic: true },
    match: 96,
    outline: [
      {
        name: 'The Mentors',
        chapters: [
          ['The First Believer', 'The manager who took a chance on an unproven designer.'],
          ['Tough Love', 'The critique that stung — and changed everything.'],
          ['Open Doors', 'The people who made introductions, shared credit, and made room at the table.'],
        ],
      },
      {
        name: 'The Ensemble',
        chapters: [
          ['Partners in Crime', 'The engineers and PMs who turned sketches into shipped products.'],
          ['The Next Generation', 'Designers once mentored, now leading teams of their own.'],
          ['Curtain Call', 'A thank-you to everyone who made the work — and the journey — better.'],
        ],
      },
    ],
  }),
];

export const FEATURED_ID = 'northstar';

export const getTitle = (id: string | undefined): Title | undefined =>
  TITLES.find((t) => t.id === id);

export const titlesInCategory = (id: CategoryId): Title[] =>
  TITLES.filter((t) => t.category === id);

export const TOP_10_IDS = [
  'northstar',
  'signal-noise',
  'the-hiring-season',
  'checkout-zero',
  'ember-and-oak',
  'atlas',
  'north-of-now',
  'pulse',
  'terra',
  'the-merger',
];

export const chapterCount = (t: Title): number =>
  t.seasons.reduce((sum, s) => sum + s.chapters.length, 0);

/** Placeholder photography. Swap for real project imagery (e.g. `/images/${seed}.jpg`). */
export const imageUrl = (seed: string, w = 1280, h = 720): string =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const similarTitles = (t: Title, limit = 6): Title[] =>
  [
    ...TITLES.filter((o) => o.category === t.category && o.id !== t.id),
    ...TITLES.filter((o) => o.category !== t.category),
  ].slice(0, limit);

export const searchTitles = (query: string): Title[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return TITLES.filter((t) =>
    [t.title, t.client, t.genre, t.role, t.description, ...t.disciplines, ...t.moods, categoryById(t.category).name]
      .join(' ')
      .toLowerCase()
      .includes(q),
  );
};

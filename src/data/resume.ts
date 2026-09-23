/*
 * Résumé content, rendered as a page in the résumé modal. The downloadable PDF
 * lives at public/resume.pdf — update both when the résumé changes.
 */

export interface Role {
  title: string;
  company: string;
  dates: string;
  summary?: string;
  bullets?: string[];
  /** Sub-teams within one role, each with its own dates. */
  sections?: { name: string; dates: string; bullets: string[] }[];
}

export const RESUME = {
  name: 'Miles Hillier',
  headline: 'Product Designer',
  focus: ['UX/UI', 'Design Systems', 'Brand', 'Design Leadership'],
  contact: {
    email: 'mileshillier@gmail.com',
    linkedin: 'linkedin.com/in/mileshillier',
    website: 'mileshillier.com',
  },
  summary:
    'Product designer with 15+ years of experience across fintech, SaaS, education, and health tech, working at every level from hands-on UX/UI and front-end development to principal-level design system leadership. Equally at home as a startup’s sole designer or as a systems lead aligning multiple product teams. Brings a dual identity as both product and brand designer, a track record of measurable outcomes, and an AI-forward workflow that moves ideas from research to working prototype in days instead of weeks.',
  highlights: [
    { value: '$35–45M', label: 'Annual GMV lift' },
    { value: '67%', label: 'Faster completion' },
    { value: '82%', label: 'Less drop-off' },
    { value: '15+', label: 'Years in design' },
  ],
  skills: [
    {
      name: 'Design',
      items: [
        'Product strategy',
        'UX/UI',
        'Interaction design',
        'Design systems',
        'Accessibility',
        'Product discovery',
        'Design research',
        'Usability testing',
        'Workflow prototyping',
        'Brand and identity systems',
      ],
    },
    {
      name: 'Leadership',
      items: [
        'Cross-functional leadership',
        'Design mentoring and coaching',
        'Stakeholder alignment',
        'System governance and contribution models',
      ],
    },
    {
      name: 'Tools',
      items: [
        'Figma',
        'FigJam',
        'Figma Make',
        'Storybook',
        'Notion',
        'Airtable',
        'Jira',
        'Linear',
        'Claude',
        'Claude Code',
        'Cursor',
        'ChatGPT',
        'Perplexity',
        'Midjourney',
      ],
    },
    { name: 'Code literacy', items: ['HTML', 'CSS', 'React', 'Tailwind', 'TypeScript', 'Vite'] },
  ],
  experience: [
    {
      title: 'Product Design Lead',
      company: 'BurbleNeuro',
      dates: 'Sep 2024 – Present',
      summary:
        'Lead product, brand, marketing, and web as a cross-functional team of one for a regulation-infrastructure platform for neurodivergent children built on a patented methodology.',
      bullets: [
        'Designed a neurodivergent-friendly visual identity and full website rebrand, creating sensory-considerate experiences for children, families, and practitioners.',
        'Ran a platform audit and cost-reduction strategy, owned investor communications, and operate as an AI-augmented product org covering research and content gaps a full team would otherwise fill.',
      ],
    },
    {
      title: 'Principal Design Consultant',
      company: 'Independent',
      dates: 'Jan 2020 – Present',
      bullets: [
        'Subject matter expert for AI testing and certification within the education system.',
        'Acting experience lead for a physical and digital product for children.',
        'Contract support for design systems, UX strategy, product, and e-commerce projects.',
      ],
    },
    {
      title: 'Principal Product Designer',
      company: 'Seek',
      dates: 'Feb 2026 – Apr 2026',
      bullets: [
        'Designed for an AI product for cross-product insight discovery, helping customers turn data on hundreds of products into contextual reporting on product line performance and market position.',
      ],
    },
    {
      title: 'Contract Product Designer',
      company: 'Vega',
      dates: 'Aug 2025 – Sep 2025',
      bullets: [
        'Modernized the Vega Events design system: audited the component library and consolidated inconsistent styles into a unified, scalable system.',
        'Migrated the design workflow into Figma Make to streamline handoff and speed up production.',
      ],
    },
    {
      title: 'Principal Product, UX/UI Design System Designer',
      company: 'Hexure',
      dates: 'Feb 2024 – Jun 2025',
      bullets: [
        'Consolidated four quoting tools into one unified platform with a shared design system adopted by six product teams.',
        'Led end-to-end product design across multiple teams and departments for internal and customer-facing initiatives.',
        'Partnered with PMs to define user needs, with engineering on handoff, and with sales and leadership to align design direction with business goals.',
      ],
    },
    {
      title: 'Senior Product Designer',
      company: 'Progressive Leasing',
      dates: 'Sep 2020 – Jan 2024',
      sections: [
        {
          name: 'Merchant Platforms',
          dates: '2023 – 2024',
          bullets: [
            'Designed internal tools and services for 100+ merchants and internal teams, improving onboarding speed by 30%.',
            'Led the return policy redesign, cutting user task time 40% and support requests 25%.',
            'Standardized reusable components and patterns with engineering, reducing design debt.',
          ],
        },
        {
          name: 'Application & Customer Architecture',
          dates: '2020 – 2023',
          bullets: [
            'Reframed a single-flow fix into a universal loan application after finding 70–80% field overlap across the company, driving a $35M–$45M annual GMV increase.',
            'Cut completion time 67% and increased successful submissions 52%, validating every simplification with compliance and piloting before full rollout.',
            'Supported and managed a design team through a restructure, converting redundant features into shared enterprise practices.',
          ],
        },
      ],
    },
    {
      title: 'Principal Design System Lead',
      company: 'Meltwater',
      dates: 'Jan 2022 – Nov 2022',
      bullets: [
        'Redesigned design system architecture (component organization, naming, handoff documentation), reducing design-to-dev misalignment.',
        'Built a cross-functional contribution model so other departments could co-own and maintain the system.',
        'Coached product designers across teams on Figma best practices and improved adoption through documentation and onboarding, shortening new-hire ramp-up.',
      ],
    },
    {
      title: 'Product Designer & Brand Manager',
      company: 'Wooly Inc.',
      dates: 'Nov 2018 – Sep 2020',
      bullets: [
        'Increased brand speed-to-find ambassadors 70% through improved platform workflows.',
        'Defined product priorities for the core platform, led brand direction, and created pattern libraries aligning design and development.',
      ],
    },
    {
      title: 'Design Lead | Product Designer',
      company: 'Rentler',
      dates: 'Jul 2017 – Nov 2018',
      bullets: [
        'As sole designer, reduced account-creation drop-off 82% through research-driven onboarding and account flow redesigns.',
        'Simplified the landlord experience across listings, applications, screenings, messaging, and payments.',
        'Created the style guide, pattern library, sales decks, print collateral, and swag.',
      ],
    },
    {
      title: 'Senior UX/UI Designer',
      company: 'Imagine Learning',
      dates: 'Sep 2015 – May 2017',
      bullets: [
        'Designed management tools and reporting dashboards with instructional designers, teachers, and district admins to increase system use.',
        'Led a team of PMs, developers, and QA through the reporting tools rollout across multiple audiences.',
      ],
    },
    {
      title: 'UX Designer & Front End Developer',
      company: 'The Church of Jesus Christ of Latter-day Saints',
      dates: 'Jun 2012 – Sep 2015',
      bullets: [
        'Designed online tools for Mormon.org and led a moderation and admin tooling initiative.',
        'Built a fully responsive, internationalized front end for JustServe.org and Mormon.org, and consulted on campaign sites.',
      ],
    },
    {
      title: 'Earlier Experience',
      company: 'Various',
      dates: '2006 – 2012',
      bullets: [
        'The Active Network, UX/UI Developer: event-tech builds for HP, Bentley, RIM, RSA, and Symantec.',
        'Heritage Web Solutions, Designer-Developer to Team Lead: cut the active ticket queue 83% and increased enhancement sales 62%.',
        'StoresOnline / Crexendo and Utah Valley University: e-commerce, marketing, print, and web design.',
      ],
    },
  ] as Role[],
  independent: [
    {
      name: 'SpeckFashion',
      role: 'Co-Founder',
      dates: '2020 – Present',
      description:
        'Brand strategy, e-commerce design, and digital merchandising for a storytelling brand celebrating Pacific Island heritage.',
    },
    {
      name: 'AI-assisted prototyping',
      role: 'Independent',
      dates: 'Ongoing',
      description:
        'Build working coded prototypes independently to validate concepts before committing engineering resources, such as Tend, a relationship health tracker tested with a full usability test plan.',
    },
  ],
  education: [
    { name: 'B.S. Computer Science, Digital Media', school: 'Utah Valley University' },
    { name: 'E-Commerce', school: 'Tangible School' },
  ],
  certifications: [
    'Product Management Basics',
    'Human-Centered Leadership',
    'Crucial Conversations',
    'Crucial Accountability',
    'Giving and Receiving Feedback',
  ],
  languages: ['English (native)', 'Marshallese (limited working)'],
};

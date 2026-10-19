export const profile = {
  name: 'Chase Punia',
  fullName: 'Chase S. Punia',
  title: 'Software Engineer',
  tagline:
    'Software engineer and Computer Engineering student at Georgia Tech. I build autonomous robots, developer tooling, data platforms and AI agent systems.',
  location: 'Atlanta, GA',
  email: 'chase.punia@gmail.com',
  schoolEmail: 'cpunia3@gatech.edu',
  linkedin: 'https://linkedin.com/in/chase-punia',
  github: 'https://github.com/Chase-P',
  resume: 'resume.pdf',
  photo: 'img/me.jpg',
};

// Home page: who I am, in my own voice.
export const intro = [
  'I’m a Computer Engineering student at Georgia Tech who likes building things that have to work outside a slide deck: robots that find themselves on a competition field, scrapers that keep 21,000 job postings fresh every day, and AI agents that run unattended on my own GPU.',
  'I started programming robots in 2020 and haven’t stopped. Six years of VEX, FRC, VEXU and combat robotics taught me the whole stack: CAD and 3D-printed parts, wiring and soldering, embedded C++, PID loops, sensor fusion, and the autonomous routines that tie it all together. Along the way, teams I was on won 60+ awards, competed at the VEX World Championship, and won a state championship in FRC in our rookie year.',
  'This summer I worked as a software engineering intern at Adtran, where I built a refactoring CLI that modernized a legacy codebase and became the standard tool for other teams, and I re-architected a Jenkins build pipeline across eight optical networking modules. Outside of work I build full-stack platforms like TeamsDatabase, research tools like QuantTrader, and a 5-axis 3D-printing slicer.',
];

export const highlights = [
  { v: '60+', l: 'robotics awards across VEX, FRC and VEXU' },
  { v: '7×', l: 'VEX tournament champion at regional events' },
  { v: '21K+', l: 'open roles tracked by TeamsDatabase' },
  { v: '30+', l: 'students taught to program autonomous robots at Georgia Tech' },
];

export const timeline = [
  { year: '2018', text: 'Started volunteering and got my first taste of building things with a soldering iron.' },
  { year: '2020', text: 'Started competitive robotics. First C++ autonomous routines.' },
  { year: '2022', text: 'Team leader for GSMST VEX 675. Built the PID and odometry code we used for years.' },
  { year: '2023', text: 'Brought back FRC 3318 RoboDragons after it had disbanded. Rookie-year state champions and a World Championship qualifier.' },
  { year: '2024', text: 'Graduated GSMST and started Computer Engineering at Georgia Tech.' },
  { year: '2025', text: 'IEEE officer leading robotics. Started the True Walker combat robot and the GT Sumo team.' },
  { year: '2026', text: 'Software engineering intern at Adtran. Built TeamsDatabase, QuantTrader and CustomSlicer 5X.' },
];

export const education = {
  school: 'Georgia Institute of Technology',
  degree: 'B.S. Computer Engineering',
  grad: 'Expected May 2028',
  place: 'Atlanta, GA',
  image: 'img/photos/gt-tech-tower.jpg',
  threads: [
    { name: 'Distributed Systems & Software Design', note: 'How large software systems are designed, split across machines, and kept correct.' },
    { name: 'Information Internetworks', note: 'Networking, protocols, and how information moves between systems.' },
  ],
  activities: ['IEEE @ Georgia Tech, officer', 'RoboJackets', 'GT Sumo Robotics', 'Robotech 2026 hackathon co-host'],
  prior: {
    school: 'Gwinnett School of Mathematics, Science & Technology (GSMST)',
    note: 'Lawrenceville, GA · Graduated May 2024. STEM magnet high school, home of VEX 675 and FRC 3318.',
  },
};

export const awards = [
  {
    tier: 'International',
    items: [
      { name: 'Create Award', note: 'Recognizes creative engineering design at the international level.' },
      { name: 'Innovate Award', note: 'Novel engineering solution, won with OWL Robotics.' },
      { name: 'VEX World Championship', note: 'Competed with GSMST VEX 675.' },
    ],
  },
  {
    tier: 'Championship qualifying',
    items: [
      { name: 'Tournament Champion', note: '7× across regional events.' },
      { name: 'Skills Champion', note: '6× across regional events.' },
      { name: 'Tournament Finalist', note: '2×' },
      { name: 'Design Award', note: 'Engineering notebook and design process.' },
      { name: 'Think Award', note: 'Quality of autonomous programming.' },
    ],
  },
  {
    tier: 'Recognition',
    items: [
      { name: 'FRC Georgia State Champions', note: 'FRC 3318 RoboDragons, in our rookie year.' },
      { name: 'Outstanding Computer Science Award', note: 'GSMST.' },
      { name: 'Certificate of Recognition', note: 'Gwinnett County Board of Education, May 2024.' },
      { name: '$6,000 NASA grant', note: 'Funding secured for the GSMST FRC program.' },
    ],
  },
];

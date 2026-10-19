import type { Entry } from './types';

const P = (f: string) => `img/photos/${f}`;

// ───────────────────────────────────────────── Work
export const work: Entry[] = [
  {
    slug: 'adtran',
    title: 'Adtran',
    tagline:
      'Technical Intern II, Software Engineering. I built the refactoring CLI that modernized a legacy codebase, re-architected the Jenkins-to-WSL build pipeline across 8 ROADM modules, and wrote Robot Framework test suites.',
    category: 'Software Engineering Intern',
    year: 'May – Aug 2026',
    role: 'Technical Intern II · Norcross, GA',
    stack: ['Python', 'CLI tooling', 'Jenkins', 'WSL', 'Linux', 'Robot Framework', 'Gerrit', 'Polarion', 'Git'],
    cover: P('adtran-campus.jpg'),
    featured: true,
    metrics: [
      { v: '8', l: 'ROADM modules on the rebuilt pipeline' },
      { v: 'days → min', l: 'cleanup time per pass' },
    ],
    intro: [
      'Adtran builds the networking equipment that carries internet traffic for service providers. I interned on the software team behind its **ROADM** products (reconfigurable optical add-drop multiplexers). These are the boxes in a fiber network that add, drop and route individual wavelengths of light without converting them to electrical signals. The software that configures and monitors them has been around for years, and parts of it were showing their age.',
      'My summer had three threads. I automated a code-modernization job nobody wanted to do by hand. I fixed a build pipeline that had been failing on and off for a long time. And I wrote automated tests so regressions were caught before system integration testing instead of after.',
    ],
    overview: [
      { t: 'note', text: 'Adtran’s source code is internal, so nothing on this page is real company code. The terminal, pipeline and test views below are **replicas I rebuilt** to show what the tools did and looked like, with every name and path made generic.' },
    ],
    pages: [
      {
        slug: 'refactoring-cli',
        title: 'The refactoring CLI',
        summary: 'A rule-driven command-line tool that turned a multi-day manual cleanup into a repeatable run measured in minutes.',
        blocks: [
          { t: 'h', text: 'The problem' },
          { t: 'p', text: 'The codebase had years of outdated syntax and deprecated keywords spread across tens of thousands of lines. Every time a team touched an old file, someone had to modernize it by hand. That was slow, inconsistent between engineers, and easy to get subtly wrong. A full pass took days and had to be repeated as more code changed.' },
          { t: 'h', text: 'What I built' },
          { t: 'p', text: 'A Python CLI where each modernization is a small, self-contained **rule**: a pattern to detect and a transformation to apply. The core walks the source tree, applies the selected rules, and reports exactly what changed. Rules range from simple keyword swaps to multi-line structural rewrites.' },
          {
            t: 'terminal',
            title: 'replica · modernize CLI',
            caption: 'Replica of a dry run. Every change is shown as a diff before anything is written.',
            lines: [
              { k: 'cmd', text: '$ modernize scan ./module --rules all --dry-run' },
              { k: 'dim', text: 'loaded rules · scanning source tree' },
              { k: 'out', text: 'src/config/handler.ext' },
              { k: 'del', text: '-   legacy_keyword value = OLD_CALL(arg)' },
              { k: 'add', text: '+   modern_keyword value = new_call(arg)' },
              { k: 'out', text: 'src/ports/manager.ext' },
              { k: 'del', text: '-   deprecated_syntax { ... }' },
              { k: 'add', text: '+   current_syntax { ... }' },
              { k: 'dim', text: '...' },
              { k: 'ok', text: '✓ changes proposed (dry run, nothing written)' },
              { k: 'cmd', text: '$ modernize apply ./module --rules all' },
              { k: 'ok', text: '✓ applied · report written to modernize-report.md' },
            ],
          },
          {
            t: 'steps',
            items: [
              { title: 'Rules are data, not special cases', body: 'Adding a new modernization means adding one rule file. The engine never changes, so new rules can’t break old ones.' },
              { title: 'Dry run by default', body: 'The default mode only reports. Engineers see every proposed change as a diff, and the tool only writes when asked. It fit straight into the Gerrit code-review flow.' },
              { title: 'Idempotent', body: 'Running the tool twice changes nothing the second time, so it is safe to rerun on any branch at any point.' },
              { title: 'Reports for reviewers', body: 'Each run writes a summary of which rules fired where, which made large changes easy to review and approve.' },
              { title: 'Built for other people', body: 'Clear help text, sensible defaults and documentation meant other teams could pick it up without me. It became their standard tool for this cleanup.' },
            ],
          },
          { t: 'stats', items: [{ v: 'minutes', l: 'per full pass, down from days' }] },
        ],
      },
      {
        slug: 'build-pipeline',
        title: 'Jenkins-to-WSL build pipeline',
        summary: 'Root-causing long-standing deployment failures and re-architecting the pipeline across eight ROADM modules.',
        blocks: [
          { t: 'p', text: 'Builds for the ROADM modules ran through Jenkins into a Windows Subsystem for Linux (WSL) environment. Deployments failed intermittently, and the failures had been worked around for a long time instead of fixed. Every flaky build costs engineers time and erodes trust in CI.' },
          {
            t: 'pipeline',
            caption: 'Replica of the pipeline stages. The red stage was the intermittent failure point before the fix.',
            stages: [
              { name: 'Checkout', status: 'ok' },
              { name: 'Configure env', status: 'fixed', note: 'environment drift between agents' },
              { name: 'Build (WSL)', status: 'fixed', note: 'path + permission handling' },
              { name: 'Package', status: 'ok' },
              { name: 'Deploy', status: 'fixed', note: 'legacy step removed' },
              { name: 'Robot tests', status: 'ok' },
            ],
          },
          {
            t: 'steps',
            items: [
              { title: 'Reproduce', body: 'Collected failing build logs across modules and found the patterns: which stages failed, on which agents, and under which conditions.' },
              { title: 'Root cause', body: 'Traced the failures to legacy configuration and assumptions about the environment that no longer held, instead of patching symptoms.' },
              { title: 'Re-architect', body: 'Refactored and standardized the Jenkins-to-WSL configuration so all 8 modules build the same way, removing per-module special cases.' },
              { title: 'Verify', body: 'Ran repeated builds across every module to confirm the failure was gone, not just rarer.' },
            ],
          },
          { t: 'quote', text: 'The fix was not one clever line. It was making eight slightly different pipelines into one predictable one.' },
        ],
      },
      {
        slug: 'testing',
        title: 'Robot Framework test suites',
        summary: 'Automated tests that validated ROADM module behavior before system integration testing.',
        blocks: [
          { t: 'p', text: 'Robot Framework is a keyword-driven test framework widely used for hardware and network testing. I wrote and maintained suites that exercised ROADM module behavior and ran them before **SIT** (system integration testing), so integration regressions surfaced on the team’s side instead of during integration.' },
          {
            t: 'terminal',
            title: 'replica · robot run',
            caption: 'Replica of a Robot Framework run summary.',
            lines: [
              { k: 'cmd', text: '$ robot --outputdir results suites/module_regression' },
              { k: 'out', text: 'Module Regression :: Pre-SIT validation' },
              { k: 'ok', text: 'Configure Channel Plan                          | PASS |' },
              { k: 'ok', text: 'Verify Port Status After Provisioning           | PASS |' },
              { k: 'ok', text: 'Alarm Raised On Loss Of Signal                  | PASS |' },
              { k: 'warn', text: 'Restore Defaults After Reboot                   | FAIL |' },
              { k: 'dim', text: '  → regression caught before SIT, ticket filed' },
              { k: 'out', text: '24 tests, 23 passed, 1 failed' },
            ],
          },
          { t: 'list', items: ['Wrote reusable keywords so new tests read like specifications.', 'Tracked requirements and coverage in Polarion.', 'Integrated the suites into the rebuilt Jenkins pipeline, so tests run on every build.'] },
        ],
      },
      {
        slug: 'takeaways',
        title: 'What I took away',
        summary: 'Working in a large, long-lived production codebase.',
        blocks: [
          {
            t: 'cards',
            items: [
              { title: 'Automate the boring, risky work', body: 'The most valuable thing I built wasn’t flashy. It removed a tedious job that people did inconsistently.' },
              { title: 'Root causes over workarounds', body: 'The pipeline had been “fixed” many times. Understanding why it failed was what actually ended it.' },
              { title: 'Build for adoption', body: 'Other teams only used my tool because it was safe by default and documented. Usability is part of engineering.' },
              { title: 'Professional workflow', body: 'Gerrit reviews, Polarion traceability, and working with senior engineers on design and code review.' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'gt-camp',
    title: 'Georgia Tech Summer Camp',
    tagline:
      'CS Student Assistant. I taught 30+ pre-college students to program autonomous, AI-powered robots over a three-week camp, from zero to working autonomous navigation.',
    category: 'Instructor',
    year: 'May – Jun 2026',
    role: 'CS Student Assistant · Atlanta, GA',
    stack: ['Python', 'Computer vision', 'Graph algorithms', 'Robotics', 'Curriculum design'],
    cover: P('gt-klaus.jpg'),
    metrics: [
      { v: '30+', l: 'students' },
      { v: '3', l: 'weeks' },
      { v: '0 → auto', l: 'from first program to autonomous navigation' },
    ],
    intro: [
      'The College of Computing runs summer camps for middle and high school students. I worked as an instructor for a three-week program built around AI-powered robots: students start never having programmed, and finish with a robot that navigates on its own.',
    ],
    pages: [
      {
        slug: 'curriculum',
        title: 'Curriculum',
        summary: 'How three weeks took beginners to autonomous navigation.',
        blocks: [
          {
            t: 'table',
            head: ['Week', 'Focus', 'Students could…'],
            rows: [
              ['1', 'Programming basics and driving the robot', 'Write loops and functions to drive set paths'],
              ['2', 'Sensors, feedback loops and computer vision', 'React to obstacles, follow lines, recognize objects'],
              ['3', 'Planning: graphs and Dijkstra’s algorithm', 'Plan the shortest route on a map and drive it autonomously'],
            ],
          },
          { t: 'p', text: 'I designed lesson material that built each concept on the last, so feedback loops came before planning and planning came before full autonomy. Each day ended with a small demo so students could see their progress on the actual robot.' },
        ],
      },
      {
        slug: 'teaching',
        title: 'Teaching AI & algorithms',
        summary: 'Computer vision, feedback control, and graph search for a pre-college audience.',
        blocks: [
          {
            t: 'cards',
            items: [
              { title: 'Computer vision', body: 'How a camera image becomes numbers, and how a model decides what it is looking at.' },
              { title: 'Feedback loops', body: 'Proportional control explained by having students steer toward a line and watching the robot wobble less as they tuned it.' },
              { title: 'Dijkstra’s algorithm', body: 'Students ran it by hand on a paper grid first, then coded it and watched the robot follow the path.' },
              { title: 'Debugging', body: 'One-on-one help with the most valuable skill: reading what the robot actually did versus what you told it.' },
            ],
          },
          { t: 'p', text: 'Six years of mentoring robotics teams made this natural. The hardest part was pacing for a room where some students had never typed code and others were already ahead.' },
        ],
      },
    ],
  },
];

// ───────────────────────────────────────────── Leadership
export const leadership: Entry[] = [
  {
    slug: 'ieee-gt',
    title: 'IEEE @ Georgia Tech',
    tagline: 'Officer and Robotics & Programming Lead for the largest IEEE student branch in the world. I run robotics teams and the 3D-printing makerspace, and co-hosted the Robotech 2026 hackathon.',
    category: 'Officer',
    year: '2025 – Present',
    role: 'Officer · Robotics & Programming Lead',
    stack: ['Leadership', 'Event operations', 'Robotics', 'Makerspace', 'Training'],
    cover: 'img/shots/robotech.png',
    featured: true,
    links: [{ label: 'Robotech 2026 site', href: 'https://robotech2026.netlify.app' }],
    metrics: [
      { v: '#1', l: 'largest IEEE student branch worldwide' },
      { v: '30+', l: 'hackathon teams supported' },
    ],
    intro: [
      'IEEE at Georgia Tech is the largest IEEE student branch in the world. As an officer, I lead the hardware side: the competitive robotics teams, the 3D-printing makerspace, and the logistics that keep electrical, mechanical and software members working together.',
    ],
    pages: [
      {
        slug: 'robotics-operations',
        title: 'Robotics & makerspace',
        summary: 'Running teams, resources and training.',
        blocks: [
          {
            t: 'cards',
            items: [
              { title: 'Teams', body: 'Oversee multiple competitive robotics teams and technical projects, from planning through competition.' },
              { title: 'Makerspace', body: 'Run the branch’s 3D-printing makerspace and train members on printers, CAD and manufacturing.' },
              { title: 'Logistics', body: 'Budgets, parts, travel and competition logistics across electrical, mechanical and software sub-teams.' },
              { title: 'Onboarding', body: 'Recruit and train new members so they can contribute to real projects quickly.' },
            ],
          },
          { t: 'img', src: P('prusa-printing.jpg'), caption: 'FDM printers like this are the workhorses of the makerspace.' },
        ],
      },
      {
        slug: 'robotech-2026',
        title: 'Robotech 2026 hackathon',
        summary: 'Co-hosting IEEE@GT’s robotics hackathon, January 23–25, 2026.',
        blocks: [
          { t: 'img', src: 'img/shots/robotech.png', caption: 'robotech2026.netlify.app, the hackathon’s public site.' },
          { t: 'p', text: 'Robotech is IEEE@GT’s robotics hackathon: a weekend where teams design, build and program robots from scratch. As a co-host I worked on planning, sponsors, the schedule, and hardware logistics, and supported teams on the floor all weekend debugging electronics and code.' },
          { t: 'list', items: ['Hardware kits and parts logistics for every team.', 'Mentoring teams on wiring, motor control and autonomous code.', 'Judging coordination and the event schedule.'] },
        ],
      },
    ],
  },
  {
    slug: 'frc-3318',
    title: 'FRC 3318 RoboDragons',
    tagline: 'Brought GSMST’s FRC team back after it had disbanded years earlier. In our rookie year we won the Georgia state championship and qualified for the FIRST World Championship. I worked across software, electrical and CAD, and helped win a $6,000 NASA grant.',
    category: 'FIRST Robotics Competition',
    year: '2023 – 2024',
    role: 'Team member → Captain · Lawrenceville, GA',
    stack: ['Java', 'WPILib', 'Electrical', 'CAD', 'Grant writing', 'Team building'],
    cover: P('frc3318-z7Y8IYx.jpg'),
    featured: true,
    links: [{ label: 'Team 3318 on The Blue Alliance', href: 'https://www.thebluealliance.com/team/3318' }],
    metrics: [
      { v: 'State', l: 'champions in our rookie year' },
      { v: 'Worlds', l: 'qualified' },
      { v: '$6,000', l: 'NASA grant' },
      { v: '120 lb', l: 'robots' },
    ],
    intro: [
      'FIRST Robotics Competition is the big leagues of high school robotics: 120-pound robots, alliances of three teams, and roughly six weeks to design and build a machine for a brand-new game. FRC 3318, the RoboDragons at GSMST in Lawrenceville, had disbanded years before I got there, so we restarted it with no current robot, no returning members, and no institutional knowledge.',
      'That first season was effectively a **rookie year**, and we won the **Georgia state championship** and qualified for the **FIRST World Championship**.',
      'I worked across the robot: software, electrical and CAD. I also took on the organizational side, building the training and recruiting pipeline and helping write the proposal that won a **$6,000 NASA grant**.',
    ],
    overview: [
      {
        t: 'gallery',
        items: [
          { src: P('frc3318-RBsDvr4.jpg'), caption: 'The 3318 robot at speed during a match.' },
          { src: P('frc3318-z7Y8IYx.jpg'), caption: 'On the field. Note the NASA sponsor sticker on the frame.' },
        ],
      },
    ],
    pages: [
      {
        slug: 'season',
        title: 'The season',
        summary: 'From a disbanded team to rookie-year state champions and Worlds.',
        blocks: [
          {
            t: 'steps',
            items: [
              { title: 'Restarting the team', body: 'The program had been dormant for years, so the first job was rebuilding it: recruiting members, finding mentors and space, and relearning the FRC control system from scratch.' },
              { title: 'Kickoff & strategy', body: 'The game is revealed in January. We broke the rules down into scoring opportunities and chose a robot concept a rookie team could actually build well.' },
              { title: 'Design & build', body: 'CAD, fabrication and wiring under a hard deadline: a drivetrain, a game-piece intake, and a shooter-style scoring mechanism.' },
              { title: 'Programming', body: 'Teleop controls and autonomous routines, then hours of driver practice to tune everything.' },
              { title: 'Competition', body: 'District events, then the Georgia state championship win in our rookie year and qualification for the FIRST World Championship.' },
            ],
          },
          { t: 'img', src: P('frc-houston-2024.jpg'), caption: 'The FIRST Championship in Houston, 2024 (Crescendo), the level our rookie season qualified for.' },
        ],
      },
      {
        slug: 'robot',
        title: 'The robot',
        summary: 'What our machine did and how it was built.',
        blocks: [
          { t: 'img', src: P('frc3318-RBsDvr4.jpg'), caption: 'Roller intake up front, angled scoring ramp on top, and blue bumpers with the team number.' },
          {
            t: 'cards',
            items: [
              { title: 'Drivetrain', body: 'A fast, low-profile base built to take hits from 120-pound opponents.' },
              { title: 'Intake & scoring', body: 'Belt-driven compliant rollers pull game pieces in and feed them up an angled ramp to score.' },
              { title: 'Electrical', body: 'Power distribution, motor controllers and CAN wiring laid out for reliability and fast repairs in the pits.' },
              { title: 'Software', body: 'Command-based robot code, driver controls and autonomous routines.' },
            ],
          },
        ],
      },
      {
        slug: 'building-the-program',
        title: 'Building the program',
        summary: 'Training, recruiting, funding and sponsors.',
        blocks: [
          {
            t: 'list',
            items: [
              'Built a technical training pipeline so new members could contribute in their first season.',
              'Recruited members and organized sub-teams for software, electrical, mechanical and outreach.',
              'Helped write the proposal that won a **$6,000 NASA grant** to fund the program.',
              'Managed logistics, budgeting and sponsor relationships.',
            ],
          },
          { t: 'note', text: 'In May 2024, the Gwinnett County Board of Education recognized the team with a Certificate of Recognition for its rookie-year state performance.' },
        ],
      },
    ],
  },
  {
    slug: 'vex-675',
    title: 'GSMST VEX 675',
    tagline: 'Team leader and lead programmer for VEX team 675. We competed at the VEX World Championship, and the GSMST program won nearly 60 awards.',
    category: 'VEX Robotics Competition',
    year: '2022 – 2024',
    role: 'Team Leader · Lead Programmer · Mentor',
    stack: ['C++', 'PROS', 'PID', 'Odometry', 'Pure pursuit', 'Fusion 360', 'Onshape'],
    cover: 'img/renders/vex675.jpg',
    featured: true,
    metrics: [
      { v: 'Worlds', l: 'VEX World Championship' },
      { v: '~60', l: 'awards for the program' },
      { v: '20', l: 'competitors led' },
      { v: '7×', l: 'tournament champion' },
    ],
    intro: [
      'VEX 675 was my high school team at GSMST. As team leader and lead programmer, I ran a group of about 20 competitors, designed robots, and wrote the autonomous code: the PID controller, odometry and path following that let our robot score on its own in the autonomous period and the skills challenge.',
      'We qualified for and competed at the **VEX World Championship**. The program as a whole won nearly 60 awards, including two at the international level.',
    ],
    overview: [
      { t: 'gallery', items: [{ src: 'img/renders/odometry.jpg', caption: 'Simulation of the odometry + pure pursuit stack I wrote for 675.' }, { src: 'img/renders/pid.jpg', caption: 'Why tuning matters: simulated step responses of the PID controller.' }] },
    ],
    pages: [
      {
        slug: 'code',
        title: 'The code behind the robot',
        summary: 'PID, odometry and pure pursuit, written from scratch.',
        blocks: [
          { t: 'p', text: 'VEX matches start with an autonomous period, and the skills challenge rewards a full minute of autonomous scoring. That makes software a real competitive advantage. I wrote our motion stack from scratch in C++.' },
          {
            t: 'cards',
            items: [
              { title: 'PID controller', body: 'Closed-loop control for driving and turning to exact targets. [Read more](projects/pid-controller/)', tag: 'controls' },
              { title: 'Odometry', body: 'Tracking wheels and arc integration so the robot always knows where it is. [Read more](projects/odometry-pure-pursuit/)', tag: 'localization' },
              { title: 'Pure pursuit', body: 'Smooth curved paths instead of stop-and-turn routines.', tag: 'planning' },
              { title: 'Sensor fusion', body: 'IMU and distance sensors to correct drift. [Read more](projects/spatial-perception/)', tag: 'perception' },
            ],
          },
        ],
      },
      {
        slug: 'leading',
        title: 'Leading the team',
        summary: 'Running practices, mentoring, and competition logistics.',
        blocks: [
          {
            t: 'list',
            items: [
              'Led about 20 competitors across build, programming, CAD and the engineering notebook.',
              'Taught dozens of students C++, CAD and robot design.',
              'Coordinated practice schedules, competition travel and match strategy.',
              'Spearheaded robot design and mechanical systems with Fusion 360 and Onshape.',
            ],
          },
        ],
      },
      {
        slug: 'results',
        title: 'Results',
        summary: 'Worlds, skills rankings and awards.',
        blocks: [
          {
            t: 'table',
            head: ['Result', 'Detail'],
            rows: [
              ['VEX World Championship', 'Qualified and competed'],
              ['Tournament Champion', '7× at regional events'],
              ['Skills Champion', '6×'],
              ['Judged awards', 'Design Award, Think Award, Create Award'],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'gt-sumo',
    title: 'Georgia Tech Sumo Robotics',
    tagline: 'Member of Georgia Tech’s competitive sumo robotics team, a program that competes at the World Sumo Robot Championship. I work on sensors, custom PCBs and autonomous strategy firmware.',
    category: 'Competitive robotics',
    year: '2025 – Present',
    role: 'Firmware & PCB',
    stack: ['Embedded C++', 'PCB design', 'IR sensors', 'State machines'],
    cover: P('soldering.jpg'),
    intro: [
      'Robot sumo is autonomous combat compressed into seconds. Two robots start in a ring, and each has to find its opponent with sensors, avoid the edge, and push the other out, with no human control. Georgia Tech’s team competes at the highest level, including the World Sumo Robot Championship.',
    ],
    pages: [
      {
        slug: 'contributions',
        title: 'My contributions',
        summary: 'Sensors, PCB and strategy firmware.',
        blocks: [
          {
            t: 'steps',
            items: [
              { title: 'Platform study', body: 'Learned the existing robot inside out (hardware, sensor layout and firmware) before changing anything.' },
              { title: 'Sensor systems', body: 'IR opponent detection and edge (line) sensors. Detection has to react faster than any human, and a false positive loses the match.' },
              { title: 'Custom PCB', body: 'Layout work integrating motor drivers, sensor inputs and the microcontroller into a compact, competition-hardened board.' },
              { title: 'Strategy firmware', body: 'The decision logic for how the robot searches, responds to the edge, and attacks.' },
            ],
          },
          {
            t: 'cards',
            items: [
              { title: 'Worked', body: 'PCB integration experience, and a drive system with championship-level pushing force.' },
              { title: 'To improve', body: 'IR false positives from ring reflections, and a fixed decision tree that can’t adapt mid-match.' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'owl-robotics',
    title: 'OWL Robotics',
    tagline: 'Stepped up as a freshman to help lead the team to competitions, bringing PID, odometry and Monte Carlo localization. The team won an Innovate Award.',
    category: 'University robotics',
    year: '2024 – 2025',
    role: 'Technical lead',
    stack: ['C++', 'PID', 'Odometry', 'Monte Carlo localization'],
    cover: 'img/renders/owl.jpg',
    intro: ['As a first-year student, I helped lead OWL Robotics to competitions, teaching advanced building and programming techniques that contributed to the team’s **Innovate Award** for engineering design.'],
    pages: [
      {
        slug: 'contributions',
        title: 'Contributions',
        summary: 'Algorithms, strategy and onboarding.',
        blocks: [
          { t: 'list', items: ['Brought PID control, odometry and Monte Carlo localization to competition-ready robots.', 'Refined autonomous routines and match strategy with teammates.', 'Onboarded new members with CAD and embedded-programming mentorship.'] },
        ],
      },
    ],
  },
  {
    slug: 'georgia-mentor',
    title: 'Georgia Robotics Mentor',
    tagline: 'Traveled across Georgia teaching CAD, C++ and mechanical design to robotics teams at six schools, and helped build a low-cost community robot for new teams.',
    category: 'Mentor',
    year: '2023 – 2025',
    role: 'Volunteer mentor',
    stack: ['Teaching', 'Curriculum', 'CAD', 'C++'],
    cover: 'img/renders/mentor.jpg',
    metrics: [{ v: '6', l: 'schools' }],
    intro: ['I visited teams at **Jones, Seckinger, GSMST, Westminster, Brookwood and South Forsyth** to teach advanced robotics topics, and helped design a simple, affordable community robot so newer teams could get started.'],
    pages: [
      {
        slug: 'outreach',
        title: 'Outreach work',
        summary: 'Curriculum, hands-on teaching, and a community robot.',
        blocks: [
          { t: 'list', items: ['Taught CAD, C++ programming and mechanical building through hands-on demonstrations.', 'Developed instructional materials and guided teams through competition prep and troubleshooting.', 'Helped design and build a low-cost community robot for new teams.', 'Built long-term relationships with school programs across Georgia.'] },
        ],
      },
    ],
  },
];

export const allExperience = [...work, ...leadership];

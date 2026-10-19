export type Status = 'done' | 'progress' | 'planned';
export type Branch = 'Software' | 'Hardware' | 'Math' | 'Science' | 'Capstone' | 'Core';

export type Course = {
  id: string;
  code: string;
  name: string;
  short: string; // label under the bubble
  status: Status;
  branch: Branch;
  tier?: number; // force a row; otherwise row = longest prerequisite chain
  prereqs?: string[]; // simplified prerequisite paths
  about: string;
  topics: string[];
  skills: string[]; // what I can do because of it
  applied?: { label: string; href: string }[]; // where it shows up in my work
  takeaway?: string;
};

export const courses: Course[] = [
  // ── Software
  {
    id: '1301', code: 'CS 1301', name: 'Introduction to Computing', short: 'Intro Computing', status: 'done', branch: 'Software',
    about: 'Programming from first principles in Python: decomposing problems, writing clean functions, and working with real data.',
    topics: ['Variables, types & control flow', 'Functions & recursion', 'Lists, dicts, tuples', 'File I/O & CSV', 'APIs & JSON', 'Intro OOP'],
    skills: ['Write and debug Python programs', 'Break problems into functions', 'Process data files'],
    applied: [{ label: 'TeamsDatabase', href: 'projects/teamsdatabase/' }, { label: 'QuantTrader', href: 'projects/quanttrader/' }],
    takeaway: 'Programming is decomposition: once a problem is broken into small functions, almost anything is buildable.',
  },
  {
    id: '1331', code: 'CS 1331', name: 'Introduction to Object-Oriented Programming', short: 'OOP', status: 'done', branch: 'Software', prereqs: ['1301'],
    about: 'Java and object-oriented design: modeling programs as interacting objects with clear responsibilities.',
    topics: ['Classes & objects', 'Encapsulation', 'Inheritance & polymorphism', 'Interfaces & abstract classes', 'Exceptions', 'Generics', 'JavaFX GUIs', 'Unit testing', 'Lambdas & streams', 'File I/O & serialization', 'Event-driven programming'],
    skills: ['Design class hierarchies', 'Write testable, modular Java', 'Build event-driven GUIs'],
    applied: [{ label: 'VEX U firmware (C++ classes)', href: 'projects/vexu-vision-system/#brain-firmware' }],
    takeaway: 'Good object design is about ownership, meaning which class is responsible for what. That idea shaped every codebase I have written since.',
  },
  {
    id: '1332', code: 'CS 1332', name: 'Data Structures & Algorithms', short: 'Data Structures', status: 'done', branch: 'Software', prereqs: ['1331'],
    about: 'Implementing the core data structures from scratch and reasoning about their performance.',
    topics: ['Big-O analysis', 'ArrayLists, linked lists, stacks, queues', 'BSTs, AVL trees, 2-4 trees', 'Heaps & priority queues', 'Hash maps & collision handling', 'Sorting (merge, quick, radix, heap)', 'Pattern matching (KMP, Boyer-Moore)', 'Graphs: BFS, DFS, Dijkstra, Prim, Kruskal', 'Iterators & generics in Java', 'Recursion & backtracking'],
    skills: ['Choose the right structure for a workload', 'Analyze time and space complexity', 'Implement graph algorithms'],
    applied: [{ label: 'Taught Dijkstra at GT camp', href: 'experience/gt-camp/' }, { label: 'Pure pursuit path search', href: 'projects/odometry-pure-pursuit/' }],
    takeaway: 'Picking the right data structure is most of performance. TeamsDatabase de-duplicates hundreds of thousands of postings with hashing, not nested loops.',
  },
  {
    id: '2340', code: 'CS 2340', name: 'Objects & Design', short: 'Objects & Design', status: 'progress', branch: 'Software', prereqs: ['1332'],
    about: 'Software engineering as a team: requirements, design, patterns and delivering a working product in sprints.',
    topics: ['Agile / Scrum', 'Requirements & user stories', 'UML class & sequence diagrams', 'Design patterns (MVC, observer, factory…)', 'SOLID principles', 'Testing & CI', 'Team Git workflow'],
    skills: ['Ship a multi-person project', 'Apply design patterns deliberately', 'Communicate designs with diagrams'],
    applied: [{ label: 'CS2340Project1 on GitHub', href: 'https://github.com/Chase-P/CS2340Project1' }],
    takeaway: 'Software is a team sport. Process, reviews and design patterns matter as much as code once more than one person touches it.',
  },
  {
    id: '3510', code: 'CS 3510', name: 'Design & Analysis of Algorithms', short: 'Algorithms', status: 'progress', branch: 'Software', prereqs: ['1332', '2050'],
    about: 'Designing algorithms and proving they are correct and efficient, plus the limits of what can be solved efficiently.',
    topics: ['Divide & conquer, master theorem', 'Dynamic programming', 'Greedy algorithms', 'Graph algorithms & shortest paths', 'Max flow', 'Linear programming', 'NP-completeness & reductions'],
    skills: ['Prove algorithm correctness', 'Design DP and greedy solutions', 'Recognize intractable problems'],
    takeaway: 'Proving an algorithm correct changes how you write it. You start from the invariant instead of the code.',
  },
  {
    id: '4400', code: 'CS 4400', name: 'Introduction to Database Systems', short: 'Databases', status: 'done', branch: 'Software', prereqs: ['1332'],
    about: 'Relational databases end to end: modeling data, writing SQL, and building an application on top.',
    topics: ['ER modeling', 'Relational model & algebra', 'SQL: joins, aggregation, subqueries', 'Normalization (1NF–BCNF)', 'Indexes', 'Transactions', 'Stored procedures & views'],
    skills: ['Design normalized schemas', 'Write complex SQL', 'Back an app with a database'],
    applied: [{ label: 'TeamsDatabase schema', href: 'projects/teamsdatabase/#site-and-database' }, { label: 'QuantTrader SQLite store', href: 'projects/quanttrader/#data' }],
    takeaway: 'Model the data first and the application gets simpler. The TeamsDatabase schema came straight from this class.',
  },
  {
    id: 'aim', code: 'CS 4XXX', name: 'Advanced Information Management', short: 'Adv. Info Mgmt', status: 'planned', branch: 'Software', prereqs: ['4400'],
    about: 'Next step after databases: large-scale data systems.',
    topics: ['Query processing & optimization', 'Distributed databases', 'NoSQL & data warehousing'],
    skills: [],
  },
  {
    id: 'dsse', code: 'Thread electives', name: 'Distributed Systems & Software Design', short: 'Distributed Sys', status: 'planned', branch: 'Software', prereqs: ['2340', '3510'],
    about: 'My thread: building systems that run across many machines and stay correct.',
    topics: ['Concurrency & consensus', 'Replication & fault tolerance', 'Large-scale software architecture'],
    skills: [],
  },
  {
    id: 'net', code: 'ECE 3XXX', name: 'Computer Networking I', short: 'Networking', status: 'planned', branch: 'Software', prereqs: ['2035', '3770'],
    about: 'Information Internetworks thread: how data moves across networks.',
    topics: ['Layered architecture', 'TCP/IP', 'Routing', 'Network performance'],
    skills: [],
  },

  // ── Hardware
  {
    id: '1100', code: 'ECE 1100', name: 'ECE Discovery Studio', short: 'Discovery Studio', status: 'done', branch: 'Hardware',
    about: 'Hands-on introduction to electrical and computer engineering through small design projects.',
    topics: ['Breadboarding & basic circuits', 'Microcontroller programming', 'Sensors & actuators', 'Engineering design process'],
    skills: ['Prototype simple electronics', 'Program a microcontroller'],
    takeaway: 'My True Walker combat robot started as this class’s Discovery project.',
  },
  {
    id: '2020', code: 'ECE 2020', name: 'Fundamentals of Digital System Design', short: 'Digital Design', status: 'done', branch: 'Hardware', prereqs: ['1100'],
    about: 'How computers are built from logic gates up: combinational and sequential logic and the start of computer architecture.',
    topics: ['Binary & number systems', 'Boolean algebra & K-maps', 'Combinational logic (mux, decoders, adders)', 'Latches & flip-flops', 'Finite state machines', 'Registers & memory', 'Datapath basics'],
    skills: ['Design and minimize logic circuits', 'Build state machines', 'Read a simple datapath'],
    takeaway: 'Every abstraction bottoms out in gates and flip-flops, and knowing that makes embedded debugging far less mysterious.',
  },
  {
    id: '2040', code: 'ECE 2040', name: 'Circuit Analysis', short: 'Circuits', status: 'done', branch: 'Hardware', prereqs: ['2211', '1552'],
    about: 'Analyzing linear circuits in DC, transient and AC steady state.',
    topics: ['KVL / KCL, nodal & mesh analysis', 'Thevenin & Norton', 'Op-amps', 'RC / RL / RLC transients', 'Phasors & AC power', 'Frequency response'],
    skills: ['Analyze circuits with any method', 'Design op-amp stages', 'Reason about motor & sensor electronics'],
    applied: [{ label: 'True Walker ESC wiring', href: 'projects/true-walker/' }],
    takeaway: 'Circuits explain why motors brown out and sensors read noisy, the hardware side of every robot bug.',
  },
  {
    id: '2031', code: 'ECE 2031', name: 'Digital Design Laboratory', short: 'Digital Lab', status: 'progress', branch: 'Hardware', prereqs: ['2020', '2040'],
    about: 'Building and debugging real digital systems on an FPGA, ending with a team project.',
    topics: ['VHDL', 'FPGA synthesis', 'Simple computer architecture (SCOMP)', 'Assembly programming', 'Lab instruments & debugging', 'Team design project'],
    skills: ['Write synthesizable HDL', 'Debug hardware systematically', 'Integrate hardware with assembly'],
    takeaway: 'Debugging real hardware is methodical: isolate, measure, change one thing.',
  },
  {
    id: '2035', code: 'ECE 2035', name: 'Programming for Hardware/Software Systems', short: 'HW/SW Systems', status: 'progress', branch: 'Hardware', prereqs: ['2020', '1301'],
    about: 'Where software meets hardware: C, MIPS assembly, memory, and how programs actually execute.',
    topics: ['MIPS assembly', 'C pointers & memory layout', 'Stack frames & calling conventions', 'Dynamic memory & data structures in C', 'Embedded I/O', 'Game project on a microcontroller'],
    skills: ['Write and read assembly', 'Manage memory manually in C', 'Program embedded devices'],
    applied: [{ label: 'VEX Brain firmware', href: 'projects/vexu-vision-system/#brain-firmware' }],
    takeaway: 'Seeing C compile down to assembly made pointers, the stack and memory finally concrete.',
  },
  {
    id: 'arch', code: 'ECE 3XXX', name: 'Architecture, Systems, Concurrency & Energy in Computation', short: 'Architecture', status: 'planned', branch: 'Hardware', prereqs: ['2035', '2031'],
    about: 'Processor architecture, operating systems and concurrency.',
    topics: ['Pipelining & caches', 'Virtual memory', 'Threads & synchronization', 'Energy-efficient computing'],
    skills: [],
  },

  // ── Math
  {
    id: '1551', code: 'MATH 1551', name: 'Differential Calculus', short: 'Calc I', status: 'done', branch: 'Math',
    about: 'Limits, derivatives and their applications.',
    topics: ['Limits & continuity', 'Derivative rules', 'Related rates', 'Optimization', 'Linear approximation'],
    skills: ['Model rates of change', 'Optimize functions'],
    applied: [{ label: 'Derivative term in PID', href: 'projects/pid-controller/' }],
    takeaway: 'Derivatives are rates of change, which is exactly the D term in a PID controller.',
  },
  {
    id: '1552', code: 'MATH 1552', name: 'Integral Calculus', short: 'Calc II', status: 'done', branch: 'Math', prereqs: ['1551'],
    about: 'Integration techniques, applications and series.',
    topics: ['Integration techniques', 'Areas, volumes & work', 'Improper integrals', 'Sequences & series', 'Taylor series'],
    skills: ['Integrate analytically and numerically', 'Approximate functions with series'],
    applied: [{ label: 'Integral term in PID', href: 'projects/pid-controller/#control-law' }],
    takeaway: 'Integrals accumulate, which is exactly the I term in a PID controller. Series explain approximations everywhere.',
  },
  {
    id: '1554', code: 'MATH 1554', name: 'Linear Algebra', short: 'Linear Algebra', status: 'done', branch: 'Math', prereqs: ['1551'],
    about: 'Vectors, matrices and linear transformations: the math behind graphics, robotics and machine learning.',
    topics: ['Systems of equations & row reduction', 'Matrix operations & inverses', 'Vector spaces & bases', 'Determinants', 'Eigenvalues & eigenvectors', 'Orthogonality & least squares', 'SVD'],
    skills: ['Work with transforms & coordinate frames', 'Solve least-squares fits'],
    applied: [{ label: 'AprilTag transform chain', href: 'projects/vexu-vision-system/#localization-math' }, { label: '5-axis kinematics', href: 'projects/customslicer-5x/#kinematics' }],
    takeaway: 'Coordinate frames and transforms are just matrices. This is the math behind my AprilTag localization and 5-axis kinematics.',
  },
  {
    id: '2050', code: 'CS 2050', name: 'Introduction to Discrete Mathematics', short: 'Discrete Math', status: 'done', branch: 'Math',
    about: 'The mathematical language of computer science: logic, proof and counting.',
    topics: ['Propositional & predicate logic', 'Proof techniques & induction', 'Sets, functions & relations', 'Combinatorics', 'Graph theory', 'Modular arithmetic'],
    skills: ['Write rigorous proofs', 'Count and reason about structures'],
    takeaway: 'Proofs and induction are how you know code is correct, not just that it passed the tests you thought of.',
  },
  {
    id: '2x52', code: 'MATH 2552', name: 'Differential Equations', short: 'Diff Eq', status: 'done', branch: 'Math', prereqs: ['1552', '1554'],
    about: 'Modeling dynamic systems with differential equations.',
    topics: ['First-order ODEs', 'Second-order linear ODEs', 'Systems of ODEs & eigen-methods', 'Laplace transforms', 'Stability & phase portraits'],
    skills: ['Model and solve dynamic systems', 'Analyze stability'],
    applied: [{ label: 'PID response tuning', href: 'projects/pid-controller/#control-law' }],
    takeaway: 'Second-order systems explain overshoot and damping, the exact behavior I tune out of robot controllers.',
  },
  {
    id: '3770', code: 'ISYE 3770', name: 'Statistics & Applications', short: 'Prob & Stats', status: 'done', branch: 'Math', prereqs: ['1552'],
    about: 'Probability, random variables and statistical inference.',
    topics: ['Probability rules & Bayes', 'Discrete & continuous distributions', 'Expectation & variance', 'Central limit theorem', 'Confidence intervals', 'Hypothesis testing', 'Regression'],
    skills: ['Quantify uncertainty', 'Test hypotheses correctly'],
    applied: [{ label: 'QuantTrader scorecard', href: 'projects/quanttrader/#scorecard' }, { label: 'Kalman filtering', href: 'projects/spatial-perception/' }],
    takeaway: 'Statistics is the antidote to fooling yourself. The deflated Sharpe ratio in QuantTrader exists because of this class.',
  },
  {
    id: '2551', code: 'MATH 2551', name: 'Multivariable Calculus', short: 'Calc III', status: 'planned', branch: 'Math', prereqs: ['1552'],
    about: 'Calculus in several dimensions.',
    topics: ['Partial derivatives & gradients', 'Multiple integrals', 'Vector fields', 'Green’s, Stokes’ & divergence theorems'],
    skills: [],
  },

  // ── Science
  {
    id: '2211', code: 'PHYS 2211', name: 'Principles of Physics I', short: 'Physics I', status: 'done', branch: 'Science',
    about: 'Calculus-based mechanics.',
    topics: ['Kinematics', 'Newton’s laws', 'Energy & momentum', 'Rotational dynamics & torque', 'Oscillations'],
    skills: ['Model forces and motion', 'Reason about torque and inertia'],
    applied: [{ label: 'Robot drivetrain & arm design', href: 'experience/frc-3318/' }],
    takeaway: 'Torque, inertia and momentum are the physics of every drivetrain and arm I have built.',
  },
  {
    id: '2212', code: 'PHYS 2212', name: 'Principles of Physics II', short: 'Physics II', status: 'planned', branch: 'Science', prereqs: ['2211', '1552'],
    about: 'Electricity and magnetism.',
    topics: ['Electric fields & potential', 'Circuits', 'Magnetic fields', 'Induction'],
    skills: [],
  },
  {
    id: '1211', code: 'CHEM 1211K', name: 'General Chemistry', short: 'Chemistry', status: 'done', branch: 'Science',
    about: 'Chemical principles with lab.',
    topics: ['Atomic structure', 'Bonding', 'Stoichiometry', 'Thermochemistry', 'Lab technique'],
    skills: ['Run controlled experiments'],
    takeaway: 'Careful lab technique: control variables and record everything.',
  },

  // ── Capstone
  {
    id: 'comm', code: 'ECE 3005', name: 'Professional & Technical Communication', short: 'Tech Comm', status: 'planned', branch: 'Capstone', tier: 4,
    about: 'Writing and presenting engineering work.',
    topics: ['Technical writing', 'Presentations', 'Documentation'],
    skills: [],
  },
  {
    id: 'senior', code: 'ECE 4XXX', name: 'Culminating Senior Design', short: 'Senior Design', status: 'planned', branch: 'Capstone', prereqs: ['arch', 'comm', 'dsse'],
    about: 'Two-semester capstone: a team designs and builds a full engineering product.',
    topics: ['Requirements to prototype', 'Team project management', 'Final demo & report'],
    skills: [],
  },
  // ── Core curriculum (years 1–2)
  {
    id: 'engl1', code: 'ENGL 1101', name: 'English Composition I', short: 'English I', status: 'done', branch: 'Core', tier: -1,
    about: 'Rhetoric and writing across genres and media.',
    topics: ['Rhetorical analysis', 'Argument & evidence', 'Multimodal composition', 'Revision & peer review'],
    skills: ['Write a clear argument for a specific audience', 'Revise from feedback'],
    takeaway: 'Writing for an audience is the same skill as writing good documentation, which is half of what this site is.',
  },
  {
    id: 'engl2', code: 'ENGL 1102', name: 'English Composition II', short: 'English II', status: 'done', branch: 'Core', tier: -1,
    about: 'Research-driven writing and communication.',
    topics: ['Research methods', 'Source evaluation', 'Long-form argument', 'Presentations'],
    skills: ['Research and synthesize sources', 'Present findings'],
    takeaway: 'Structuring a long argument from research carried straight into my QuantTrader research notes.',
  },
  {
    id: 'lmc', code: 'LMC 3202/3511', name: 'Humanities: Literature, Media & Communication', short: 'Humanities', status: 'done', branch: 'Core', tier: -1,
    about: 'Two upper-level humanities courses in literature, media and communication.',
    topics: ['Media analysis', 'Critical reading', 'Communication theory'],
    skills: ['Analyze how media shapes a message'],
    takeaway: 'Thinking about how people read an interface or a page, not just whether it works.',
  },
  {
    id: 'econ', code: 'ECON 2105/2106', name: 'Macroeconomics & Microeconomics', short: 'Economics', status: 'done', branch: 'Core', tier: -1,
    about: 'Principles of macro- and microeconomics.',
    topics: ['Supply & demand', 'Market structures', 'Elasticity', 'GDP, inflation & monetary policy', 'Incentives & game theory'],
    skills: ['Reason about markets and incentives'],
    applied: [{ label: 'QuantTrader small-capital study', href: 'projects/quanttrader/#day-trading-research' }],
    takeaway: 'The market microstructure work in QuantTrader started from the supply-and-demand intuition in these courses.',
  },
  {
    id: 'hist', code: 'HIST 2112/POL 1101', name: 'US History & Government', short: 'History & Gov', status: 'done', branch: 'Core', tier: -1,
    about: 'Georgia legislative requirement: American history and government.',
    topics: ['US history since 1877', 'Constitutional government', 'Georgia government'],
    skills: ['Read primary sources critically'],
  },
  {
    id: 'apph', code: 'APPH 1050', name: 'Science of Physical Wellness', short: 'Wellness', status: 'done', branch: 'Core', tier: -1,
    about: 'Health, fitness and stress management for students.',
    topics: ['Exercise science', 'Nutrition', 'Sleep & stress'],
    skills: ['Manage workload and stress sustainably'],
  },
];


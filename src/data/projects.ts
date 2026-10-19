import type { Entry } from './types';

const S = (f: string) => `img/shots/${f}`;

export const projects: Entry[] = [
  // ───────────────────────────────────────────── TeamsDatabase
  {
    slug: 'teamsdatabase',
    title: 'TeamsDatabase',
    tagline:
      'A job-search platform for Georgia: it tracks 21,000+ open roles, shows which teams each company is hiring for, and keeps the data fresh with a fleet of 24/7 scraping bots.',
    category: 'Full-stack',
    year: '2026',
    role: 'Solo: design, scraping, backend, frontend, mobile',
    status: 'Active development',
    stack: ['Python', 'Django', 'SQLite', 'httpx', 'BeautifulSoup', 'Playwright', 'Leaflet', 'Expo / React Native', 'pytest'],
    cover: S('teams-home.png'),
    featured: true,
    links: [{ label: 'GitHub repository', href: 'https://github.com/Chase-P/TeamsDatabase' }],
    metrics: [
      { v: '21,641', l: 'open roles indexed' },
      { v: '2,259', l: 'Georgia companies profiled' },
      { v: '380', l: 'teams identified' },
      { v: '197,706', l: 'archived past roles' },
    ],
    intro: [
      'Applying for internships, I kept running into the same problems. Job boards show a posting but not the team behind it, pay is scattered, and good roles close before you see them. I built TeamsDatabase to fix that for myself: one place that lists every software role at Georgia companies, groups them by the team doing the hiring, shows pay when it is posted, and links every role back to the original posting.',
      'It grew into a full platform: a scraping pipeline that reads Greenhouse, Lever, Ashby and Workday boards directly, ten bots that run around the clock to keep postings fresh, a Django site with company profiles and a job map, a local-only Apply Assistant that tailors resumes per job, job alerts with phone push notifications, and an iPhone app.',
    ],
    overview: [
      { t: 'img', src: S('teams-jobs.png'), caption: 'The jobs page: 21,641 roles with level, work type, pay and recency filters. Every row links to the original posting.' },
      {
        t: 'flow',
        caption: 'How data moves through the system.',
        steps: [
          { title: 'Discover', sub: 'Common Crawl, SEC EDGAR, seed lists' },
          { title: 'Scrape', sub: 'Greenhouse · Lever · Ashby · Workday' },
          { title: 'Normalize', sub: 'level, team, pay, location' },
          { title: 'Store', sub: 'JSON in git → SQLite' },
          { title: 'Serve', sub: 'Django site · JSON API · app' },
        ],
      },
    ],
    pages: [
      {
        slug: 'data-pipeline',
        title: 'Data pipeline & scrapers',
        summary: 'How raw postings from five applicant-tracking systems become clean, comparable records with no LLM in the loop.',
        blocks: [
          {
            t: 'p',
            text: 'The pipeline is a design rule as much as code: **everything is produced by code, with no LLMs in the pipeline.** Every summary is built from rules and templates over scraped data, and every fact links back to its source. That keeps the output deterministic, cheap to run daily, and auditable.',
          },
          { t: 'h', text: 'Scrapers per applicant-tracking system' },
          {
            t: 'p',
            text: 'Most companies post through a handful of applicant-tracking systems, so instead of scraping thousands of career sites one by one, I wrote one adapter per ATS: `greenhouse.py`, `lever.py`, `ashby.py`, `workday.py`, plus a generic `website.py` that reads schema.org `JobPosting` data from company career pages.',
          },
          {
            t: 'table',
            head: ['Source', 'How it is read', 'Refresh'],
            rows: [
              ['Greenhouse / Lever / Ashby', 'Public JSON board APIs', 'every 90 min'],
              ['Workday', 'Board search API at a slower, safe pace', 'every 3 h'],
              ['Company sites', 'schema.org JobPosting markup', 'every 24 h'],
              ['The Muse', 'Public API, de-duplicated against employer boards', 'every 2 h'],
            ],
          },
          { t: 'h', text: 'The polite fetcher' },
          {
            t: 'p',
            text: 'All network access goes through one shared fetcher that sends a User-Agent with contact details, rate-limits each host, honors `robots.txt`, retries with back-off when a site says slow down, and caches to disk. Scraping at this scale only works long term if it is respectful.',
          },
          {
            t: 'code',
            lang: 'python',
            caption: 'scrapers/base.py: every request passes through the same guardrails.',
            text: `"""Polite shared fetcher: User-Agent with contact, per-host rate limit,
retries, robots.txt, disk cache."""

class Fetcher:
    def __init__(self, rate_limit_seconds: float = 1.0,
                 check_robots: bool = True, ...):
        ...
    def _throttle(self, host: str) -> None: ...
    def _allowed(self, url: str) -> bool: ...   # robots.txt
    def get(self, url: str, use_cache: bool = True) -> str: ...`,
          },
          { t: 'h', text: 'Normalization' },
          {
            t: 'steps',
            items: [
              { title: 'Location', body: 'A gazetteer of Georgia cities splits multi-location strings and keeps only Georgia segments, so "51 Locations; Georgia, USA" is matched correctly.' },
              { title: 'Field & level', body: 'Rule files classify titles into software or not, and into Intern, Entry, Mid, Senior, Staff, Principal, Manager or Director. Every internship and co-op is kept, because students search by "intern", not "software".' },
              { title: 'Teams', body: 'Team names come from the company’s own labels in its postings (department and team fields), so the Teams view reflects how the company actually organizes itself.' },
              { title: 'Lifecycle', body: 'Every posting records `first_seen` and `last_seen`. Closed postings move to an archive (197,706 so far), which gives each company a hiring history.' },
            ],
          },
          { t: 'h', text: 'Discovery: finding companies nobody listed' },
          {
            t: 'p',
            text: 'A discovery bot finds new employers from the Common Crawl index of job-board URLs, Georgia SEC EDGAR filers, BuiltIn Atlanta, and curated seed lists, then probes each unchecked board for Georgia roles. This is how the dataset grew from a hand-made list to 2,259 companies.',
          },
        ],
      },
      {
        slug: 'bots',
        title: '24/7 bot fleet',
        summary: 'Ten scheduled bots and a supervisor keep postings fresh, with a sync bot that mirrors changes into the database within seconds.',
        blocks: [
          {
            t: 'p',
            text: 'A single daily scrape is not enough: internships can open and fill within days. So the scraping work is split into small bots, each on its own schedule, under a supervisor with heartbeats. They all write the same `data/companies/*.json` files, and a `sync` bot copies every change into the site database within seconds.',
          },
          {
            t: 'table',
            head: ['Bot', 'Every', 'Job'],
            rows: [
              ['early-careers', '40 min', 'Re-reads every employer with an open Georgia internship or entry-level role'],
              ['boards', '90 min', 'Refreshes every known Greenhouse, Lever and Ashby board'],
              ['workday', '3 h', 'Refreshes Workday boards, the biggest source of Georgia internships'],
              ['feeds', '2 h', 'Aggregator API roles not already on employer boards'],
              ['discovery', '12 h', 'Finds new employers and probes their boards'],
              ['company-sites', '12 h', 'Reads company websites for description, size, founding year, address'],
              ['profiles', '3 h', 'Enriches companies from SEC filings'],
              ['sites', '24 h', 'Career pages that publish JobPosting data'],
              ['sync', 'continuous', 'Mirrors JSON changes into SQLite'],
              ['alerts', 'continuous', 'Notifies me when a new role matches my criteria'],
            ],
          },
          {
            t: 'note',
            text: 'Data lives as plain JSON in git, so every daily change is a readable diff, and GitHub is the source of truth. The production host never scrapes. It only pulls and rebuilds.',
          },
        ],
      },
      {
        slug: 'site-and-database',
        title: 'Website, database & company profiles',
        summary: 'A Django site with searchable companies, teams and roles, and a profile page for every employer that pulls together hiring, pay, technologies and filings.',
        blocks: [
          { t: 'img', src: S('teams-company.png'), caption: 'A company profile: open roles, hiring by level, technologies mentioned in postings, the teams hiring, and pay ranges.' },
          {
            t: 'p',
            text: 'The site started as a static generator (`build.py` writing plain HTML) and moved to Django with SQLite once I needed search, saved jobs and alerts. SQLite keeps hosting trivial: the database is rebuilt from the JSON in `data/` with two management commands, `import_seeds` and `import_data`.',
          },
          { t: 'img', src: S('teams-database.png'), caption: 'The database hub: companies, teams and professionals, each searchable.' },
          {
            t: 'list',
            items: [
              '**Company profiles**: headquarters, industry, size, founding year, ticker and SEC financials, hiring by level, technologies seen in postings, cities they hire in, teams, and every open role.',
              '**Teams view**: each team’s open roles, entry-level count, pay range and technologies.',
              '**Jobs page**: multi-select level filter (Intern to Director), work type, “pay listed only”, minimum pay, sort by highest pay.',
              '**Professionals**: a small, strictly limited directory of named leaders from public filings, with a working “remove my data” button.',
              '**JSON API** at `/api/v1/` that powers the mobile app.',
            ],
          },
        ],
      },
      {
        slug: 'job-map',
        title: 'Job map',
        summary: 'Open roles plotted by Georgia city on OpenStreetMap, with a private distance estimate from your location.',
        blocks: [
          { t: 'img', src: S('teams-map.png'), caption: 'Roles by city: bigger circles mean more roles. Built on Leaflet and OpenStreetMap.' },
          {
            t: 'p',
            text: 'The map groups roles by city using the same gazetteer as the pipeline and sizes circles by role count. You can set a home location to see straight-line distance and a rough drive time for each city. **Your location never leaves the browser**: it is computed client-side and never sent to the server.',
          },
          { t: 'p', text: 'It uses Leaflet with OpenStreetMap tiles, so there is no API key or account.' },
        ],
      },
      {
        slug: 'apply-assistant',
        title: 'Apply Assistant & Auto-apply',
        summary: 'A local-only assistant that tailors a resume to each job, fills applications in a real browser, and stops for review before anything is submitted.',
        blocks: [
          {
            t: 'p',
            text: 'The Apply Assistant runs **only on my own PC**. On the public host it is not installed, its URLs return 404, and even when enabled it refuses any request that does not come from 127.0.0.1.',
          },
          {
            t: 'steps',
            items: [
              { title: 'Encrypted profile', body: 'A passphrase-protected profile holds contact details, work history and master resumes, encrypted at rest with the `cryptography` library.' },
              { title: 'Tailored documents', body: 'For each job it builds a resume and cover letter from my own words, choosing the bullets that match the posting, and exports `.docx`.' },
              { title: 'Browser fill', body: 'Playwright opens the application and fills the form, then **stops for me to check it**. Open-and-fill never submits.' },
              { title: 'Auto-apply', body: 'Runs the same flow for every job my criteria select. It is dry-run by default and submits only after I switch it to live, through one guarded path with attempt records, rate limits and a duplicate guard.' },
            ],
          },
          {
            t: 'note',
            text: 'Security details I cared about: profile values are kept out of notifications, and Windows toast XML is passed as base64 so job text from a posting cannot inject PowerShell.',
          },
        ],
      },
      {
        slug: 'alerts-and-mobile',
        title: 'Alerts & mobile app',
        summary: 'Saved criteria trigger inbox, Windows and phone notifications. An Expo app brings the database to iPhone.',
        blocks: [
          {
            t: 'p',
            text: 'On the `/criteria/` page I save my field, level range and skills. The `alerts` bot checks every new posting against them and notifies me through an in-site inbox, a Windows notification, and optionally a phone push through ntfy, usually within the hour a role opens.',
          },
          {
            t: 'p',
            text: 'The `mobile/` folder is a TypeScript app built on Expo (SDK 57) for iPhone and the web. It reads the read-only JSON API, with its own tests and type checks (`npm test`, `npm run typecheck`).',
          },
        ],
      },
      {
        slug: 'engineering',
        title: 'Testing & deployment',
        summary: 'Hundreds of tests, a one-command deploy, and a data model that scales to new regions and fields through config.',
        blocks: [
          { t: 'stats', items: [{ v: '224+', l: 'automated tests' }, { v: '15K', l: 'lines of Python' }, { v: '73', l: 'commits' }] },
          {
            t: 'list',
            items: [
              '**Built to scale**: region and field are config files, and every record carries `region` and `field`. Adding Charlotte or data roles means adding a config file and re-running the pipeline.',
              '**Deploy**: `scripts/deploy.sh` installs requirements, migrates, rebuilds `db.sqlite3` from JSON and collects static files on PythonAnywhere.',
              '**Local dev**: `start_site.ps1` creates the venv, installs, builds the database and starts the server in one command.',
              '**Optional MySQL** through XAMPP, with Django pinned for MariaDB compatibility.',
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── CustomSlicer 5X
  {
    slug: 'customslicer-5x',
    title: 'CustomSlicer 5X',
    tagline:
      'A multi-axis 3D-printing slicer: it generates tilted and conical toolpaths for 5-axis printers, solves the inverse kinematics for any machine, and checks for collisions before you print.',
    category: 'Robotics & CAD',
    year: '2026',
    role: 'Solo',
    status: 'Prototype',
    stack: ['Python', 'NumPy', 'trimesh', 'shapely', 'Three.js', 'pywebview', 'G-code', 'OrcaSlicer (C++)'],
    cover: S('cs5x-tbracket.png'),
    featured: true,
    links: [{ label: 'GitHub repository', href: 'https://github.com/Chase-P/CustomSlicer' }],
    metrics: [
      { v: '5', l: 'axes: X Y Z + B tilt + C rotate' },
      { v: '4', l: 'slicing strategies' },
      { v: '3.9K', l: 'lines of Python' },
      { v: '0', l: 'unreachable points on the demo parts' },
    ],
    intro: [
      'Normal 3D printers stack flat layers, so overhangs need support material and parts are weak between layers. A 5-axis printer can tilt and rotate the part, printing a sideways arm as if it were vertical, or printing in cone-shaped layers so overhangs need no support. The hard part is the software: existing slicers assume flat layers.',
      'CustomSlicer 5X is my answer. It sits inside my fork of OrcaSlicer (`fiveaxis/`). It splits a part into chunks or reshapes the layers, slices them with a planar engine, maps the paths back, then runs a 5-axis post-processor that solves inverse kinematics for the specific machine and writes G-code.',
    ],
    overview: [
      {
        t: 'gallery',
        items: [
          { src: S('cs5x-machine.png'), caption: 'Machine view: the B/C table tilts the part while the nozzle stays vertical.' },
          { src: S('cs5x-mushroom.png'), caption: 'Conical slicing prints a 30° outward overhang with no supports.' },
        ],
      },
      {
        t: 'flow',
        caption: 'Slicing job pipeline (cs5x/job.py).',
        steps: [
          { title: 'Mesh', sub: 'STL / OBJ / 3MF' },
          { title: 'Strategy', sub: 'planar · 3+2 · conical' },
          { title: 'Planar engine', sub: 'built-in or Bambu Studio' },
          { title: 'Post-processor', sub: 'IK · interpolation · timing' },
          { title: 'Checks', sub: 'limits · reach · collisions' },
        ],
      },
    ],
    pages: [
      {
        slug: 'kinematics',
        title: 'Generic machine kinematics',
        summary: 'Any multi-axis printer described as two kinematic chains, using the product-of-exponentials model from robotics.',
        blocks: [
          {
            t: 'p',
            text: 'Instead of hard-coding one printer, a machine is described as **two kinematic chains that start at the machine frame**: a tool chain that carries the nozzle (for example X → Y → Z on a gantry, optionally followed by a tilting head) and a work chain that carries the build plate (for example a tilting B cradle followed by a rotating C platter).',
          },
          {
            t: 'p',
            text: 'Each axis is described by its direction (linear) or its rotation axis and a point on that axis (rotary), all measured in the machine frame with every G-code value at zero. This is the product-of-exponentials form used in robot arm kinematics. It covers table-table, head-head and mixed machines without special cases.',
          },
          { t: 'formula', text: 'T(θ) = e^[S₁]θ₁ · e^[S₂]θ₂ · … · e^[Sₙ]θₙ · M', caption: 'Forward kinematics as a product of exponentials of screw axes Sᵢ, applied to the home configuration M.' },
          { t: 'img', src: S('cs5x-tbracket.png'), caption: 'Jog panel: sliders drive every axis live to test a machine definition before slicing.' },
        ],
      },
      {
        slug: 'strategies',
        title: 'Slicing strategies',
        summary: 'Planar, multi-directional 3+2, conical non-planar, and imported toolpaths.',
        blocks: [
          {
            t: 'table',
            head: ['Strategy', 'Idea', 'Good for'],
            rows: [
              ['Planar (3-axis)', 'Classic flat layers', 'Baseline and comparison'],
              ['Multi-directional 3+2', 'Cut the mesh with planes, print each chunk in its own orientation', 'Sideways arms, bridges, T-brackets'],
              ['Conical non-planar', 'Shear the mesh, slice flat, shear the paths back into cones', 'Outward or inward overhangs without support'],
              ['Import toolpath', 'Read G-code from Bambu/Orca, Prusa or Cura', 'Reuse an existing slicer’s output'],
            ],
          },
          { t: 'h', text: 'Conical slicing' },
          {
            t: 'code',
            lang: 'python',
            caption: 'cs5x/strategies/conical.py',
            text: `"""The mesh is sheared with z' = z - s * tan(angle) * r, where r is the
distance from the cone axis, sliced flat by the planar engine, and every
toolpath point is sheared back. Flat layers in the sheared space become
cones in the real part.

With tool_orientation = normal the nozzle tilts to stay perpendicular to
the cone (true 5-axis; blended to vertical near the axis to avoid a flip).
Extrusion is scaled for the thinner layer measured along the cone normal."""`,
          },
          { t: 'img', src: S('cs5x-mushroom.png'), caption: 'Mushroom demo: 249 conical layers, 172,672 lines of G-code, 0 unreachable points.' },
          { t: 'h', text: 'Multi-directional 3+2' },
          { t: 'img', src: S('cs5x-arch.png'), caption: 'Arch demo, sliced as separate chunks that are each printed in their best orientation.' },
        ],
      },
      {
        slug: 'post-processor',
        title: '5-axis post-processor',
        summary: 'Turning workpiece-frame paths into machine G-code: inverse kinematics, rotary unwrapping, singularities and tip-accurate interpolation.',
        blocks: [
          {
            t: 'steps',
            items: [
              { title: 'Motion sequence', body: 'Build extrusion moves plus the travel moves they need (retract, lift along the tool axis, travel, lower, unretract) and safe reorientation sequences between 3+2 chunks.' },
              { title: 'Inverse kinematics', body: 'Solve joint values for every point using the machine model, with continuous branch choice, rotary unwrapping so C never spins the long way around, and singularity handling near vertical.' },
              { title: 'Tip-accurate interpolation', body: 'Where rotary axes move, split moves until linear joint interpolation keeps the nozzle tip within tolerance of the straight workpiece-frame path.' },
              { title: 'Timing & feed', body: 'Each move gets the duration that yields the requested tip speed, then feed is written in the firmware’s mode (XYZ or inverse time).' },
              { title: 'Validation', body: 'Checks axis limits, reach and collisions, and reports max orientation error, singular points and unreachable points.' },
            ],
          },
          {
            t: 'stats',
            items: [
              { v: '345', l: 'layers in the T-bracket demo' },
              { v: '13,671', l: 'G-code lines' },
              { v: '0.000°', l: 'max orientation error' },
              { v: '0.7 s', l: 'compute time' },
            ],
          },
        ],
      },
      {
        slug: 'bambu-integration',
        title: 'Bambu Studio integration & materials',
        summary: 'Using a mature slicer as the planar engine, and a material model that covers filament, pellets and paste.',
        blocks: [
          {
            t: 'p',
            text: '`bambu.py` reads an installed Bambu Studio or OrcaSlicer’s system profile library, resolving the `inherits`/`include` chains into flat dictionaries so every machine and filament it knows is available. It can then drive that slicer’s command line as the planar engine: each chunk or transformed mesh is sliced with the full feature set of a mature slicer, and the G-code is parsed back into paths.',
          },
          {
            t: 'p',
            text: 'The G-code importer understands the comment conventions of Bambu/Orca (`; FEATURE:`), PrusaSlicer (`;TYPE:`) and Cura (`;LAYER:`), so toolpaths from any of them can be post-processed for 5-axis.',
          },
          { t: 'h', text: '“Any material”' },
          {
            t: 'table',
            head: ['Feed model', 'E axis means', 'Examples'],
            rows: [
              ['filament', 'mm of filament', 'PLA, PETG, TPU'],
              ['pellet', 'firmware unit, from mm³', 'Screw extruders'],
              ['paste', 'firmware unit, from mm³', 'Clay, concrete, silicone, food'],
              ['volumetric', 'mm³', 'Volumetric firmware mode'],
            ],
          },
        ],
      },
      {
        slug: 'app',
        title: 'Desktop app',
        summary: 'A local web UI in a native window with a Three.js viewer, live machine simulation and G-code preview.',
        blocks: [
          { t: 'img', src: S('cs5x-tbracket.png'), caption: 'Part view after slicing: toolpaths colored by feature, a layer slider, simulation playback, results and checks.' },
          {
            t: 'list',
            items: [
              'Python standard-library HTTP backend bound to 127.0.0.1. Slicing runs on background threads and nothing touches the network.',
              'Three.js viewer with part and machine views, overhang highlighting, plane previews and travel toggles.',
              'Playback simulates the machine moving through the job at up to 20× speed.',
              'Runs in a native window through pywebview (Edge WebView2), falling back to an app window or the browser.',
              'URL automation (`?demo=t-bracket&slice=1&view=machine`) for repeatable demos and tests. I used it to capture these screenshots.',
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── QuantTrader
  {
    slug: 'quanttrader',
    title: 'QuantTrader',
    tagline:
      'A quantitative research platform that tests whether institutional trading leaves detectable footprints. It includes walk-forward backtests, a live paper-trading league of 39 strategies, and an analysis of 13F filings.',
    category: 'Data & Research',
    year: '2026',
    role: 'Solo',
    status: 'Research (paper money only)',
    stack: ['Python', 'pandas', 'NumPy', 'PySide6', 'pyqtgraph', 'yfinance', 'Alpaca data API', 'SEC EDGAR'],
    cover: S('quant-dashboard.png'),
    featured: true,
    links: [{ label: 'GitHub repository', href: 'https://github.com/Chase-P/QuantTrader' }],
    metrics: [
      { v: '503', l: 'S&P 500 tickers tracked' },
      { v: '39', l: 'strategies in the paper league' },
      { v: '130', l: 'automated tests' },
      { v: '14K', l: 'lines of Python' },
    ],
    intro: [
      'QuantTrader started with a question: **do large investors and algorithms leave recurring statistical patterns when they trade, and can those patterns predict price moves?** Public data never names who traded, but it might show the shape of their activity: unusual volume with little price movement, persistent buying pressure, repeated execution sizes.',
      'The project is built to answer that honestly rather than to find a strategy that looks good. Every result is out-of-sample, every strategy is compared to buy-and-hold and to random “monkey” traders, statistics are corrected for the number of strategies tried, and the network layer is physically unable to place an order.',
    ],
    overview: [
      { t: 'img', src: S('quant-league.png'), caption: 'Strategy league: every algorithm trades paper money daily with frozen rules, compared against SPY and random baselines.' },
      {
        t: 'flow',
        steps: [
          { title: 'Collect', sub: 'prices · filings · news · options' },
          { title: 'Features', sub: 'volume, order flow, cycles' },
          { title: 'Backtest', sub: 'walk-forward, after costs' },
          { title: 'Scorecard', sub: 'deflated Sharpe' },
          { title: 'Paper league', sub: 'frozen rules, live data' },
        ],
      },
    ],
    pages: [
      {
        slug: 'thesis',
        title: 'Research thesis',
        summary: 'Institutional activity detection and behavioral fingerprinting: what public data can and cannot reveal.',
        blocks: [
          {
            t: 'p',
            text: 'I wrote a long research plan before writing code. It covers what professional quant firms do, what trade, quote and off-exchange data actually reveal, what public institutional disclosures exist (13F, 13D/G, insider filings, CFTC Commitments of Traders), and their central limitation: they are delayed and aggregated.',
          },
          { t: 'h', text: 'Candidate anomalies' },
          {
            t: 'table',
            head: ['Anomaly', 'What it might indicate'],
            rows: [
              ['High volume, limited price movement', 'A large participant absorbing liquidity'],
              ['Persistent buyer-initiated trading', 'Accumulation over days'],
              ['Repeated execution patterns', 'An algorithm slicing a large order'],
              ['Liquidity replenishment', 'Hidden size refilling the book'],
              ['Cross-asset synchronization', 'Basket or sector trades'],
              ['Abnormal activity → delayed move', 'Information not yet priced in'],
            ],
          },
          {
            t: 'p',
            text: 'Detection methods include relative volume, order-flow imbalance, price-impact estimates, change-point detection and clustering. The plan explicitly calls exact investor attribution infeasible, so the platform reports **associations only**.',
          },
        ],
      },
      {
        slug: 'data',
        title: 'Data collection',
        summary: 'Collectors for prices, fundamentals, SEC filings, options, news, macro data and institutional holdings, behind an inbound-only network guard.',
        blocks: [
          {
            t: 'p',
            text: 'Collectors cover daily and intraday prices, the S&P 500 universe, fundamentals, analyst data, SEC filings, options, news, macro series, attention data and events. The institutions module adds 13F holdings, CFTC Commitments of Traders, FINRA short volume and congressional trade disclosures.',
          },
          { t: 'h', text: 'A network guard that cannot trade' },
          {
            t: 'code',
            lang: 'python',
            caption: 'quanttrader/net_guard.py: installed automatically on import.',
            text: `"""Inbound-only network policy.

Allowed: HTTPS GET/HEAD with no request body, to the public data hosts below.
Blocked: every other method (POST/PUT/PATCH/DELETE...), any body/json/file
upload, Authorization headers, plain http, and every other host.

Alpaca's trading hosts are NOT on the list, and every non-GET method is
refused anyway, so no order can be placed through this project."""`,
          },
          { t: 'img', src: S('quant-dashboard.png'), caption: 'Overview: 503-ticker universe, data freshness, and the best out-of-sample strategy so far.' },
        ],
      },
      {
        slug: 'scorecard',
        title: 'Walk-forward scorecard',
        summary: 'Out-of-sample testing of 30 strategies with costs and a deflated Sharpe ratio that corrects for multiple testing.',
        blocks: [
          {
            t: 'p',
            text: 'Strategies (trend, mean reversion, volatility, calendar effects, cross-sectional momentum, intraday) are tested walk-forward: train on 5 years, test on the next year, roll forward, with 5 basis points of cost per side. The result labels are deliberately blunt. Most say **“insufficient evidence”**.',
          },
          { t: 'img', src: S('quant-strategies.png'), caption: 'The scorecard: out-of-sample Sharpe vs buy-and-hold, CAGR, max drawdown, deflated Sharpe and Bonferroni p-values.' },
          {
            t: 'p',
            text: 'Testing many strategies guarantees some look good by luck. The deflated Sharpe ratio (Bailey & López de Prado) estimates the best Sharpe you would expect from N trials of pure noise and asks whether the real result beats it.',
          },
          {
            t: 'code',
            lang: 'python',
            caption: 'quanttrader/strategies/scorecard.py',
            text: `def deflated_sharpe(r, n_trials, sr_var=None):
    r = r.dropna(); T = len(r)
    sr = r.mean() / r.std()
    sk, ku = float(r.skew()), float(r.kurt()) + 3.0
    var_est = max((1 - sk*sr + (ku - 1)/4 * sr**2) / (T - 1), 1e-12)
    N = max(int(n_trials), 1); g = 0.5772156649
    sr0 = sqrt(v) * ((1-g)*N.inv_cdf(1 - 1/N) + g*N.inv_cdf(1 - 1/(N*e)))
    return N.cdf((sr - sr0) / sqrt(var_est)), sr`,
          },
        ],
      },
      {
        slug: 'league',
        title: 'Paper-trading league',
        summary: 'Every strategy trades 100,000 paper dollars with frozen rules after each session, ranked against SPY and random traders.',
        blocks: [
          { t: 'img', src: S('quant-league.png'), caption: 'League leaderboard after the first sessions.' },
          {
            t: 'list',
            items: [
              'Each entrant starts with 100,000 paper dollars and **frozen rules**: decisions use only bars up to that close, so there is no look-ahead.',
              'Costs of 5 bps per side are charged on every trade.',
              'Entrants that lose money after a 20-session grace period, or drop 10% at any time, are shelved but keep running so their data can inform a better version.',
              '“Monkey” entrants trade at random. A strategy that cannot beat the monkeys has shown nothing.',
            ],
          },
        ],
      },
      {
        slug: 'big-players',
        title: 'Big players: 13F & disclosures',
        summary: 'Profiles of the largest fund managers from 13F filings: concentration, turnover and filing speed.',
        blocks: [
          { t: 'img', src: S('quant-players.png'), caption: 'Manager profiles from 13F filings: positions, portfolio size, top-10 concentration, turnover and days to file.' },
          {
            t: 'p',
            text: 'The Big Players page parses SEC 13F filings to profile managers such as Berkshire Hathaway, Renaissance, Citadel and Jane Street: how concentrated they are, how much they turn over each quarter, and how late they file. Other tabs show manager moves from the last quarter, congressional trades and FINRA short-volume spikes. All of these are leads to test, not proof of who traded.',
          },
        ],
      },
      {
        slug: 'day-trading-research',
        title: 'Day-trading bot & small-capital study',
        summary: 'A staged, paper-only day-trading pipeline and a written study on whether $100 can become $1,000.',
        blocks: [
          { t: 'img', src: S('quant-daytrade.png'), caption: 'Day-trading progress gates: development, validation and holdout tests, then 63+ forward paper sessions before any claim.' },
          {
            t: 'p',
            text: 'The day-trading module is built around gates that a strategy must pass in order: development test (2016–2021), validation (2022–2023), a one-time holdout (2024 onward), then at least 63 forward paper sessions that match the backtest. Rules are frozen in a hashed spec so they cannot be quietly tuned after the fact.',
          },
          { t: 'h', text: 'Research write-up' },
          {
            t: 'p',
            text: 'I also wrote a research note on the microeconomics of trading tiny accounts: **can $100 become $1,000 in 2–3 months?** Simulating every route I could measure, the answer was no for any low-risk path. The routes with a real chance needed leverage and edges a small cash account cannot have, with a 10–45% chance of halving the account along the way.',
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── VEX U Vision
  {
    slug: 'vexu-vision-system',
    cover: 'img/photos/raspberry-pi.jpg',
    title: 'VEX U Vision & Autonomy System',
    tagline:
      'A Raspberry Pi co-processor that fuses AprilTag detections from four ESP32 cameras into a field position for the robot, with an onboard web dashboard for planning paths and auto-scoring.',
    category: 'Robotics',
    year: '2026',
    role: 'Software lead',
    status: 'In development for the 2026–27 season',
    stack: ['Python', 'C++', 'PROS', 'Raspberry Pi', 'ESP32-CAM', 'AprilTags', 'NumPy', 'Flask', 'Serial'],
    featured: true,
    viz: 'fusion',
    metrics: [
      { v: '4', l: 'cameras fused' },
      { v: '100 Hz', l: 'odometry & comms loop' },
      { v: '10 ms', l: 'vision tick' },
      { v: '9', l: 'tagged goals tracked' },
    ],
    intro: [
      'The VEX V5 Brain is a capable microcontroller, but it cannot run computer vision. For our 2026–27 VEX U robot, I designed a split architecture: a Raspberry Pi handles vision and localization, and the Brain handles real-time motor control. The two talk over a serial link.',
      'Four ESP32-CAM modules stream MJPEG to the Pi. It detects AprilTags on the field goals, turns each detection into a robot pose using known tag positions, fuses the estimates across cameras, and sends the pose to the Brain at 100 Hz. The Pi also hosts a dashboard for planning paths and triggering autonomous scoring.',
    ],
    overview: [
      { t: 'gallery', items: [{ src: 'img/photos/esp32-cam.jpg', caption: 'ESP32-CAM: four of these stream video to the Pi.' }, { src: 'img/photos/raspberry-pi.jpg', caption: 'The Raspberry Pi co-processor runs detection and fusion.' }] },
      {
        t: 'flow',
        caption: 'System architecture.',
        steps: [
          { title: '4× ESP32-CAM', sub: 'MJPEG over Wi-Fi' },
          { title: 'AprilTag detect', sub: 'pupil_apriltags' },
          { title: 'Localizer', sub: 'multi-camera fusion' },
          { title: 'Serial link', sub: 'POSE · GOAL · CMD' },
          { title: 'V5 Brain', sub: 'PROS tasks, PID' },
        ],
      },
    ],
    pages: [
      {
        slug: 'localization-math',
        title: 'AprilTag localization math',
        summary: 'Chaining homogeneous transforms from camera to tag to field to robot.',
        blocks: [
          {
            t: 'p',
            text: 'The detector returns each tag’s rotation and translation in the camera frame. Because every tag’s position on the field is known, the camera’s pose in the field follows by inverting and chaining transforms. The camera’s mounting offset then gives the robot’s pose.',
          },
          { t: 'formula', text: 'T_field_cam = T_field_tag · (T_cam_tag)⁻¹', caption: 'Step 1: the camera pose in the field frame.' },
          { t: 'formula', text: 'T_field_robot = T_field_cam · (T_cam_robot)⁻¹', caption: 'Step 2: the robot pose, from the camera’s mounting offset and yaw.' },
          { t: 'formula', text: 'heading = atan2(R₁₀, R₀₀)', caption: 'Step 3: x and y come from the translation column, and heading from the rotation matrix.' },
          {
            t: 'p',
            text: 'Field coordinates use a 144-inch square with the origin at the bottom-left. The config file holds a goal table with each tag’s position, goal height and scoring target height for the arm.',
          },
        ],
      },
      {
        slug: 'sensor-fusion',
        title: 'Multi-camera fusion',
        summary: 'A recency-weighted average with a circular mean for heading.',
        blocks: [
          {
            t: 'p',
            text: 'Each camera produces pose estimates at its own rate. The localizer keeps a short buffer, discards anything older than 500 ms, and averages the rest with exponential recency weights (τ = 0.2 s). Heading is averaged as a circular mean of sine and cosine, so 359° and 1° average to 0°, not 180°.',
          },
          { t: 'formula', text: 'wᵢ = e^(−ageᵢ / τ)     θ̄ = atan2(Σ wᵢ sin θᵢ, Σ wᵢ cos θᵢ)' },
          {
            t: 'code',
            lang: 'python',
            caption: 'raspi/localizer.py',
            text: `for ts, x, y, heading in snapshot:
    age = now - ts
    w = math.exp(-age / _WEIGHT_TAU)
    total_weight += w
    wx += w * x
    wy += w * y
    # circular mean of heading
    wsin += w * math.sin(heading)
    wcos += w * math.cos(heading)`,
          },
          { t: 'viz', kind: 'fusion', caption: 'Noisy per-camera estimates (dots) against the fused estimate (line).' },
        ],
      },
      {
        slug: 'brain-firmware',
        title: 'V5 Brain firmware',
        summary: 'A PROS C++ project with fixed-rate tasks for odometry, arm PID, comms and auto-scoring.',
        blocks: [
          {
            t: 'table',
            head: ['Task', 'Rate', 'Job'],
            rows: [
              ['odometry_task', '100 Hz', 'Encoder + IMU integration'],
              ['arm_task', '50 Hz', 'Arm PID toward target joint angles'],
              ['serial_task', '100 Hz', 'Pi ↔ Brain communication'],
              ['auto_score_task', '20 Hz', 'Watches for Pi-requested auto-score'],
            ],
          },
          {
            t: 'p',
            text: 'The firmware accounts for VEX U rule differences: a 30-second autonomous period, modified win-point and match-load rules, and an endgame height limit in midfield. Live goal positions sent by the Pi update the scoring targets during the match.',
          },
          {
            t: 'code',
            lang: 'cpp',
            caption: 'include/drive.hpp',
            text: `class PID {
  public:
    PID(double kp, double ki, double kd) : kp_(kp), ki_(ki), kd_(kd) {}
    double update(double error, double dt);
    void   reset();
  private:
    double kp_, ki_, kd_;
    double integral_ = 0, prev_err_ = 0;
};`,
          },
        ],
      },
      {
        slug: 'protocol-and-dashboard',
        title: 'Serial protocol & field planner',
        summary: 'A line-based protocol between the Pi and Brain, and a Flask dashboard for planning paths.',
        blocks: [
          {
            t: 'p',
            text: 'The Pi and Brain exchange short text lines over serial: `POSE x y heading`, `GOAL id x y z` and `CMD name arg` from the Pi, and state reports from the Brain (arm angles, whether it holds an object). A background reader thread parses incoming lines, and writes are guarded so a dropped cable reconnects cleanly.',
          },
          {
            t: 'list',
            items: [
              '**Field planner**: click the field to place waypoints, drag to reposition, then upload the path to the robot.',
              '**Robot status**: live x, y, heading, turret, shoulder and elbow angles.',
              '**Goals**: every tagged goal with its alliance color.',
              '**Controls**: score autonomously and emergency stop.',
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── Multi-agent AI
  {
    slug: 'multi-agent-ai-platform',
    cover: 'img/renders/agents.jpg',
    title: 'Local Multi-Agent AI Platform',
    tagline:
      'Hybrid agent infrastructure: frontier models plan, a 30B local model on my GPU does the bulk coding, and a hardened harness keeps local agents working unattended for hours.',
    category: 'AI Systems',
    year: '2026',
    role: 'Solo',
    stack: ['Python', 'Ollama', 'Qwen3-Coder 30B', 'MCP', 'Claude Code', 'Tkinter', 'PowerShell', 'Git'],
    viz: 'agents',
    featured: true,
    metrics: [
      { v: '30B', l: 'parameter model, fully local' },
      { v: '24 h+', l: 'unattended runs' },
      { v: '47+', l: 'features built autonomously in one app' },
      { v: '$0', l: 'per token for local work' },
    ],
    intro: [
      'Frontier models are excellent planners but expensive for bulk code generation. Local models are free but get lost on long tasks. I built the infrastructure to use both: an MCP server so Claude can hand grunt work to a local model, and an autonomous harness that lets a local model work through a broad task for hours, then stop and ask for help instead of spinning in place.',
      'The project went through three versions, and the most useful lessons came from watching it fail.',
    ],
    pages: [
      {
        slug: 'mcp-server',
        title: 'MCP local-LLM worker',
        summary: 'An MCP server that lets Claude delegate self-contained tasks to any Ollama model.',
        blocks: [
          {
            t: 'p',
            text: 'The pattern is **Claude orchestrates and the local model does the grunt work.** The MCP server exposes two tools: `list_local_models()` discovers installed models and aliases live from Ollama, and `local_llm(prompt, model?, system?, temperature?)` runs a self-contained task on a local model.',
          },
          {
            t: 'list',
            items: [
              'The local model has no file or tool access. Claude passes everything it needs in the prompt, which keeps the delegation safe and predictable.',
              'Adding a model takes no code: `ollama pull <model>` makes it usable immediately, and aliases like `coder` or `fast` live in `config.json`.',
              'A standalone Tkinter desktop chat app (packaged as an `.exe` with PyInstaller) talks to local models directly with zero frontier tokens.',
            ],
          },
          {
            t: 'flow',
            steps: [
              { title: 'Claude Code', sub: 'plans, reviews' },
              { title: 'MCP server', sub: 'local_llm tool' },
              { title: 'Ollama', sub: 'qwen3-coder:30b' },
              { title: 'Result', sub: 'back to Claude' },
            ],
          },
        ],
      },
      {
        slug: 'autonomous-harness',
        title: 'Autonomous harness',
        summary: 'A loop where the model returns one JSON action per turn, hardened with loop detection, persistent memory, milestones and escalation.',
        blocks: [
          {
            t: 'p',
            text: 'The harness gives a local model a broad task in `task.md` and lets it work, confined to a `workspace/` folder with a git checkpoint after every change. Each turn the model returns exactly one JSON action:',
          },
          {
            t: 'code',
            lang: 'json',
            text: `{"action":"shell",    "command":"<powershell>"}
{"action":"read",     "path":"relative/path"}
{"action":"write",    "path":"relative/path", "content":"..."}
{"action":"search",   "query":"regex", "glob":"*.json"}
{"action":"milestone","id":3, "status":"done"}
{"action":"done",     "summary":"..."}`,
          },
          { t: 'h', text: 'What broke, and the fix' },
          {
            t: 'p',
            text: 'The first long run worked mechanically: a PowerShell watchdog restarted the agent and it ran overnight. But it got stuck repeating the same directory listing **300+ times** without progress, a classic small-model failure on long runs. The second version added:',
          },
          {
            t: 'steps',
            items: [
              { title: 'Loop detection', body: 'Identical or near-identical actions are blocked after a threshold. The model is told it is stuck and pushed toward the next milestone.' },
              { title: 'Persistent progress memory', body: '`progress.md` is read at the start of every step and updated after it, so progress survives watchdog restarts.' },
              { title: 'Milestone tracking', body: 'Milestones are parsed from the task, and completed ones are never re-run.' },
              { title: 'Escalation', body: 'When genuinely stuck, the agent writes `HELP_NEEDED.md` and pauses instead of burning hours.' },
              { title: 'Safety', body: 'Destructive commands are blocked, and every mutating step is a git commit, so any bad step can be rolled back.' },
            ],
          },
        ],
      },
      {
        slug: 'converter-app-case-study',
        title: 'Case study: an image editor built by agents',
        summary: 'A PyQt6 image editor with 47+ features, built mostly by autonomous agents in a build–verify loop.',
        blocks: [
          {
            t: 'p',
            text: 'To stress-test the approach, I pointed agents at a large target: a Photoshop-style image editor in PyQt6. Early runs produced stub files, marked tasks done instantly and broke imports. I redesigned the loop around **verification**: each task had to import cleanly and show it worked before it could be marked done.',
          },
          {
            t: 'stats',
            items: [
              { v: '47+', l: 'features completed' },
              { v: '6K', l: 'lines of Python' },
              { v: '4', l: 'phases' },
            ],
          },
          {
            t: 'table',
            head: ['Phase', 'Features'],
            rows: [
              ['MVP core', 'Paint, layers, undo/redo, properties, PNG export, selections'],
              ['Selection & fill', 'Lasso, bucket fill, filters, gradients, curves, levels, clone stamp, smudge, dodge/burn'],
              ['Transform & distort', 'Perspective, content-aware fill, batch export, quick masks, motion blur'],
              ['Color & workflow', 'Adjustment layers, blend modes, layer groups, macro recorder, shortcuts'],
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── Adtran CLI
  {
    slug: 'legacy-refactoring-cli',
    cover: 'img/photos/adtran-campus.jpg',
    title: 'Legacy Code Modernization CLI',
    tagline: 'An automated refactoring tool that modernized 50,000+ lines of legacy code at Adtran and became the standard tool for other teams.',
    category: 'Developer Tools',
    year: '2026',
    role: 'Adtran internship',
    stack: ['Python', 'CLI', 'Scripting', 'Git', 'Gerrit'],
    viz: 'cli',
    metrics: [
      { v: '50K+', l: 'lines modernized' },
      { v: 'days → min', l: 'cleanup time' },
    ],
    intro: [
      'A large legacy codebase was full of outdated syntax and deprecated keywords. Cleaning it by hand took days per pass, was error-prone, and had to be repeated as more code was touched. I built a command-line tool that does it automatically and repeatably.',
    ],
    pages: [
      {
        slug: 'design',
        title: 'Design & rollout',
        summary: 'Rule-driven transforms, dry runs, and packaging for other teams.',
        blocks: [
          {
            t: 'steps',
            items: [
              { title: 'Rule-driven transforms', body: 'Each modernization is a discrete, testable rule, so fixes are consistent and new rules can be added without touching the core.' },
              { title: 'Safe by default', body: 'Dry-run and diff output show exactly what will change before anything is written, which fits the Gerrit review workflow.' },
              { title: 'Built for other teams', body: 'Packaged as a simple CLI with clear documentation, so engineers outside my team could adopt it without hand-holding. It is now the standard tool for this cleanup.' },
            ],
          },
          { t: 'viz', kind: 'cli' },
          { t: 'note', text: 'Internal code, so no source is shown here. Happy to talk through the design in an interview.' },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── Pure pursuit
  {
    slug: 'odometry-pure-pursuit',
    cover: 'img/renders/odometry.jpg',
    title: 'Odometry & Pure Pursuit',
    tagline: 'Custom 3D-printed tracking wheels and a pure pursuit controller for smooth, chained autonomous movement.',
    category: 'Robotics',
    year: '2023–25',
    role: 'Programmer & designer',
    stack: ['C++', 'Fusion 360', 'Kinematics', 'Path planning', 'Bambu Lab P1S'],
    viz: 'pursuit',
    metrics: [
      { v: '100 Hz', l: 'pose updates' },
      { v: 'κ = 2x/L²', l: 'steering law' },
    ],
    intro: [
      'Autonomous routines driven by timing or raw encoder counts drift quickly. The robot needs to know where it is at all times and follow curved paths smoothly instead of stopping to turn. The live simulation on this site’s home page uses this exact algorithm.',
    ],
    pages: [
      {
        slug: 'odometry',
        title: 'Tracking-wheel odometry',
        summary: 'Hardware designed in Fusion 360 and an arc-based pose integrator.',
        blocks: [
          {
            t: 'p',
            text: 'Drive wheels slip, so I designed unpowered tracking-wheel pods in Fusion 360 and printed them on a Bambu Lab P1S. Each loop, encoder deltas are integrated with an arc model. A robot moving with left and right arc lengths Δl and Δr turns Δθ, and its local displacement follows from the chord of that arc.',
          },
          { t: 'formula', text: 'Δθ = (Δl − Δr) / (sₗ + sᵣ)     Δy_local = 2·sin(Δθ/2)·(Δr/Δθ + sᵣ)' },
          { t: 'p', text: 'The local displacement is rotated into the field frame by the average heading over the step, giving continuous x, y and θ.' },
        ],
      },
      {
        slug: 'pure-pursuit',
        title: 'Pure pursuit controller',
        summary: 'Chasing a lookahead point along the path, producing smooth continuous curves.',
        blocks: [
          {
            t: 'p',
            text: 'Each step, find the point on the path one lookahead distance L away, transform it into the robot frame, and steer along the circular arc that passes through it. Larger L gives smoother but looser tracking, and smaller L gives tighter but twitchier tracking.',
          },
          { t: 'formula', text: 'κ = 2x / L²', caption: 'Curvature of the arc to a goal point at lateral offset x in the robot frame.' },
          { t: 'viz', kind: 'pursuit' },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── PID
  {
    slug: 'pid-controller',
    cover: 'img/renders/pid.jpg',
    title: 'PID Motion Controller',
    tagline: 'Closed-loop control that cuts drivetrain drift, positional error and overshoot across competition fields.',
    category: 'Robotics',
    year: '2022–25',
    stack: ['C++', 'Control theory', 'Embedded', 'Motor control'],
    viz: 'pid',
    intro: [
      'Open-loop motor commands overshoot, drift, and behave differently as batteries drain and field surfaces change. I implemented and tuned a PID controller that became the base of every autonomous movement on my teams’ robots.',
    ],
    pages: [
      {
        slug: 'control-law',
        title: 'Control law & tuning',
        summary: 'The math, windup protection, and how I tuned it.',
        blocks: [
          { t: 'formula', text: 'u(t) = Kp·e(t) + Ki·∫e(τ)dτ + Kd·de/dt' },
          {
            t: 'steps',
            items: [
              { title: 'Proportional', body: 'Pushes harder the further the robot is from the target.' },
              { title: 'Integral', body: 'Removes steady-state error from friction and load, with windup clamping so it cannot build up during long moves.' },
              { title: 'Derivative', body: 'Damps the approach to prevent overshoot.' },
              { title: 'Settle logic', body: 'A move ends when error and velocity stay inside a band for a set time, so chained moves start crisply.' },
            ],
          },
          { t: 'viz', kind: 'pid', caption: 'An under-damped step response, the kind of curve I tuned out.' },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── Spatial perception
  {
    slug: 'spatial-perception',
    cover: 'img/renders/fusion.jpg',
    title: 'AI Spatial Perception',
    tagline: 'IMU and lidar fusion with Kalman filtering for drift-free robot localization during long autonomous routines.',
    category: 'Robotics',
    year: '2024–25',
    stack: ['C++', 'IMU', 'Lidar', 'Kalman filter', 'Monte Carlo localization'],
    viz: 'fusion',
    intro: [
      'Odometry accumulates error over a match. I fused IMU heading with lidar distance readings against known field walls, using Kalman filtering and Monte Carlo localization, to correct drift mid-routine.',
    ],
    pages: [
      {
        slug: 'filtering',
        title: 'Filtering & correction',
        summary: 'Kalman prediction and update, and Monte Carlo localization against the field walls.',
        blocks: [
          { t: 'formula', text: 'x̂ₖ = x̂ₖ⁻ + Kₖ (zₖ − H x̂ₖ⁻)     Kₖ = Pₖ⁻Hᵀ(HPₖ⁻Hᵀ + R)⁻¹', caption: 'The Kalman update weights each measurement by its confidence.' },
          {
            t: 'list',
            items: [
              'Odometry predicts, and lidar distances to the walls correct.',
              'Monte Carlo localization keeps a cloud of pose hypotheses and reweights them against expected wall distances. This recovers from bumps that break single-hypothesis filters.',
              'Corrected poses reset accumulated drift, so late-routine movements stay accurate.',
            ],
          },
          { t: 'viz', kind: 'fusion' },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── True Walker
  {
    slug: 'true-walker',
    title: 'True Walker Combat Robot',
    tagline:
      'A four-legged walking combat robot with a full-body shell spinner for NHRL. Each foot is driven by two lead screws through a differential and a scissor lift, and the frame is carbon fiber I resin-cast myself. Currently in development.',
    category: 'Robotics & CAD',
    year: '2025 – Present',
    role: 'Designer & builder · began as my ECE 1100 project',
    status: 'In development',
    stack: ['C++', 'ESP32', 'Fusion 360', 'Lead screws', 'Differential', 'Scissor lift', 'Carbon fiber casting', 'Brushless motors', 'Wi-Fi control'],
    cover: 'img/photos/chonkiv-feb-2025.jpg',
    featured: true,
    metrics: [
      { v: '27–8', l: 'precursor Chonkiv’s NHRL record' },
      { v: '4', l: 'legs, no wheels' },
      { v: '250+ mph', l: 'shell tip speed target' },
      { v: '2', l: 'lead screws + a differential per foot' },
      { v: 'CF', l: 'resin-cast carbon fiber frame' },
    ],
    intro: [
      'Combat robots almost always roll. A **true walker** moves only on legs: no wheels, no skids, no shuffling cams. Walking is so hard to make robust that NHRL rules give walkers a weight bonus, yet very few competitive true walkers exist. I want to build one that can actually fight.',
      'The robot pairs a four-legged walking chassis with a full-body **shell spinner**, a heavy rotating ring around the whole robot that hits at over 250 mph at the tip. It grows out of **Chonkiv**, RoboJackets’ 30 lb shuffling shell spinner and one of the more successful robots in its class at NHRL. It started as my ECE 1100 Discovery Studio project at Georgia Tech and turned into something I’m determined to finish and bring to competition.',
      'The photos on this page are of Chonkiv, the precursor. **The new walker is intentionally not pictured.** I’m keeping its look under wraps until it debuts, so the mechanism is described in words only.',
    ],
    overview: [
      { t: 'gallery', items: [{ src: 'img/photos/chonkiv-dec-2024.jpg', caption: 'Chonkiv at NHRL, December 2024.' }, { src: 'img/photos/chonkiv-cutout.jpg', caption: 'Chonkiv, April 2024: the event it won.' }] },
      {
        t: 'flow',
        caption: 'How a step happens.',
        steps: [
          { title: 'Controller', sub: 'custom Wi-Fi remote' },
          { title: 'ESP32', sub: 'gait + weapon firmware' },
          { title: 'Lead screws ×2', sub: 'per foot' },
          { title: 'Differential', sub: 'lift + stride from 2 inputs' },
          { title: 'Scissor lift', sub: 'foot up / down' },
        ],
      },
    ],
    pages: [
      {
        slug: 'chonkiv',
        title: 'Chonkiv: the precursor',
        summary: 'RoboJackets’ 30 lb shuffling shell spinner, and what the walker takes from it.',
        blocks: [
          { t: 'p', text: 'Chonkiv is the fourth iteration of the **Chonk** line from Georgia Tech’s RoboJackets: a 30 lb full-body shell spinner that walks on **cam-driven shufflers** instead of wheels. Shufflers earn a walker weight bonus at NHRL, which lets the robot carry an unusually heavy shell. It competed as Chonkiii in 2023 and as Chonkiv from 2024.' },
          {
            t: 'stats',
            items: [
              { v: '27–8', l: 'career record at NHRL (30 lb)' },
              { v: '19', l: 'knockouts' },
              { v: '2×', l: 'event wins (Apr 2024, Feb 2025)' },
              { v: '#10', l: 'all-time 30 lb ranking' },
            ],
          },
          {
            t: 'table',
            head: ['Event', 'Result', 'Record'],
            rows: [
              ['Apr 2024', '1st place', '5–1'],
              ['Dec 2024', '2nd place', '5–1'],
              ['Feb 2025', '1st place', '4–0'],
              ['Dec 2025', 'Semifinals', '3–1'],
            ],
          },
          { t: 'h', text: 'What the walker keeps, and what it changes' },
          {
            t: 'cards',
            items: [
              { title: 'Keeps: the shell', body: 'A full-body shell spinner proved itself: no weak side, huge stored energy, and wins through attrition.' },
              { title: 'Keeps: the walker bonus', body: 'Walking locomotion earns a weight bonus that goes straight into the weapon.' },
              { title: 'Changes: true walking', body: 'Cam shufflers are only semi-walking. The new robot walks on real legs that lift and stride.' },
              { title: 'Changes: the drive', body: 'Screw-driven legs with a differential replace the cams: stronger, self-locking, and steerable.' },
            ],
          },
          { t: 'note', text: 'Record from the [NHRL wiki](https://wiki.nhrl.io/wiki/index.php/Chonkiv). Chonkiv is a RoboJackets team robot. The True Walker is my own next-generation design built from what it taught us.' },
        ],
      },
      {
        slug: 'leg-mechanism',
        title: 'The leg mechanism',
        summary: 'Two lead screws, a differential and a scissor lift per foot.',
        blocks: [
          { t: 'note', text: 'Described in words only. Images of the new design are being held back until it competes.' },
          { t: 'p', text: 'The hard problem in a walking robot is making every foot do two things, **lift** and **stride**, with enough force to carry the robot and survive hits. Joint servos are light but fragile, and they stall under combat loads. My design moves the work into screws.' },
          {
            t: 'steps',
            items: [
              { title: 'Two lead screws per foot', body: 'A lead screw turns motor rotation into strong, precise linear motion, and it is **self-locking**: when the motor stops, the screw holds position. The robot can stand without burning power, and a hit can’t back-drive the leg.' },
              { title: 'A differential to mix them', body: 'Both screws feed a differential. Turning them the same way moves the foot along one axis (lift), and turning them in opposite directions moves it along the other (stride). Two linear inputs become two independent degrees of freedom, and both motors share the load in each direction.' },
              { title: 'A scissor lift for travel', body: 'An X-shaped scissor linkage on each foot multiplies screw travel into a large vertical stroke in a compact package. The foot clears the floor on each step and folds flat when it is down.' },
              { title: 'Statically stable gait', body: 'With four legs, at least three feet are always planted, so the robot doesn’t need active balance to stay upright.' },
            ],
          },
          { t: 'formula', text: 'lift ∝ (θ₁ + θ₂) / 2     stride ∝ (θ₁ − θ₂) / 2', caption: 'Differential mixing: the sum of the two screw rotations drives one axis, and the difference drives the other.' },
        ],
      },
      {
        slug: 'carbon-fiber',
        title: 'Resin-cast carbon fiber frame',
        summary: 'Making my own carbon fiber parts to survive hits at weight.',
        blocks: [
          { t: 'p', text: 'Every gram saved in the frame can go into the weapon or armor. Printed plastic is too weak for the load paths in the legs, and machined carbon gets expensive while the design is still changing. So I cast my own.' },
          {
            t: 'steps',
            items: [
              { title: 'Design the part and mold', body: 'Model each part in Fusion 360, then design the mold around it.' },
              { title: 'Lay up', body: 'Cut carbon fiber cloth and lay it into the mold in layers, with the weave oriented along the load directions.' },
              { title: 'Cast in resin', body: 'Wet out the fiber with epoxy, compress and cure it, then trim and drill the part.' },
              { title: 'Test and iterate', body: 'Fit-check against the printed prototypes, load-test, and adjust the layup.' },
            ],
          },
          { t: 'note', text: 'Casting my own composites means I can change a part’s geometry and stiffness between iterations for the cost of cloth and resin.' },
        ],
      },
      {
        slug: 'weapon-and-electronics',
        title: 'Shell spinner & electronics',
        summary: 'The full-body weapon, brushless motors, hand-soldered ESCs and ESP32 Wi-Fi control.',
        blocks: [
          {
            t: 'cards',
            items: [
              { title: 'Shell spinner', body: 'A ring around the whole robot that stores huge rotational energy. The ramp-up logic spins it up smoothly without tripping over-current limits.' },
              { title: 'Brushless upgrade', body: 'The first prototype’s brushed DC motors lacked torque and overheated. I redesigned the mounts and moved to brushless motors with reconfigured ESCs.' },
              { title: 'ESP32 firmware', body: 'C++ on the ESP32 runs gait sequencing, weapon control and Wi-Fi commands concurrently without an OS.' },
              { title: 'Custom controller', body: 'A Wi-Fi controller I built sends drive and weapon commands with low latency.' },
            ],
          },
        ],
      },
      {
        slug: 'build-log',
        title: 'Build log',
        summary: 'From the first CAD sketch to where the robot is now.',
        blocks: [
          {
            t: 'table',
            head: ['Stage', 'What happened'],
            rows: [
              ['00 · Chonkiv', 'Learned from RoboJackets’ shuffling shell spinner: the shell concept and walker bonus work, but cams limit mobility.'],
              ['01 · Concept & CAD', 'Modeled the frame, leg kinematics and shell housing in Fusion 360, making sure the weapon clears the legs.'],
              ['02 · Brushed prototype', 'Four small DC motors on a test bench proved the gait concept, but torque and reliability fell short.'],
              ['03 · Electronics', 'Hand-soldered the ESCs and power distribution, set up the ESP32, and built the Wi-Fi controller.'],
              ['04 · Brushless upgrade', 'New motor mounts, brushless motors and updated firmware timing.'],
              ['05 · Screw-driven legs', 'Redesigned the legs around twin lead screws, a differential and scissor lifts.'],
              ['06 · Carbon fiber', 'Began resin-casting carbon fiber frame and leg parts.'],
              ['07 · Now', 'Gait tuning, isolating weapon vibration, and preparing for NHRL.'],
            ],
          },
          {
            t: 'cards',
            items: [
              { title: 'Worked', body: 'The brushless upgrade, reliable Wi-Fi control, and the shell reaching its target speed.' },
              { title: 'Still hard', body: 'Keeping the gait stable while the weapon spins, the high center of gravity from the shell, and high-current solder joint reliability.' },
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── 3D printer
  {
    slug: 'custom-3d-printer',
    title: 'Custom 3D Printer',
    tagline: 'A Cartesian FDM printer I designed, wired, soldered and tuned from scratch, running modified Marlin firmware.',
    category: 'Robotics & CAD',
    year: '2024',
    role: 'Solo build',
    stack: ['Marlin firmware', 'C++', 'Soldering', 'Stepper motion', 'PID tuning', 'CAD'],
    cover: 'img/photos/prusa-printing.jpg',
    intro: [
      'This was not a kit. I designed the frame, chose and wired every component, hand-soldered the electronics, and configured the firmware myself. A 3D printer touches mechanical design, electronics, embedded firmware and precision motion control all at once, and it has made parts for every project I’ve built since.',
    ],
    pages: [
      {
        slug: 'build',
        title: 'Build & firmware',
        summary: 'Frame, electronics, Marlin configuration and calibration.',
        blocks: [
          {
            t: 'steps',
            items: [
              { title: 'Frame', body: 'Designed a Cartesian frame in CAD, then cut, assembled and squared it before adding any motion parts.' },
              { title: 'Custom mounts', body: 'Designed mounts for the control board, stepper drivers and power supply around the frame geometry.' },
              { title: 'Electronics', body: 'Hand-soldered the stepper, thermistor, heater, endstop and power wiring, with attention to wire gauge and strain relief on high-current runs.' },
              { title: 'Marlin firmware', body: 'Set steps/mm, endstops and thermal protection, and **PID-tuned** the hotend and bed, compiling and flashing every iteration.' },
              { title: 'Calibration', body: 'Bed leveling, first layer, extrusion multiplier and retraction, validated with dimensional test prints.' },
            ],
          },
          { t: 'img', src: 'img/photos/soldering.jpg' },
          {
            t: 'cards',
            items: [
              { title: 'Lesson: rigidity', body: 'Frame flex caused ghosting at speed. Diagonal bracing fixed it, but it should have been designed in from the start.' },
              { title: 'Lesson: thermal runaway', body: 'Overly aggressive protection settings caused false trips until I autotuned the PID and widened the window.' },
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── Movie store
  {
    slug: 'movies-store',
    title: 'Movies Store',
    tagline:
      'My first website: a Django movie store with accounts, a shopping cart, orders, and reviews you can edit, delete and report. It’s where I learned how a web app actually works, from URL routing to the database.',
    category: 'Full-stack',
    year: '2026',
    role: 'CS 2340 · Objects & Design',
    stack: ['Python', 'Django', 'MySQL', 'SQLite', 'HTML', 'Bootstrap', 'Django templates'],
    cover: 'img/shots/movies-list.png',
    links: [{ label: 'GitHub repository', href: 'https://github.com/Chase-P/CS2340Project1' }],
    metrics: [
      { v: '4', l: 'Django apps: home, movies, accounts, cart' },
      { v: '4', l: 'data models' },
      { v: '1st', l: 'website I ever built' },
    ],
    intro: [
      'Before TeamsDatabase, I had never built a website. This project in CS 2340 is where I learned: an online movie store where users browse and search movies, read and write reviews, add movies to a cart, and check out into an order history.',
      'It taught me the fundamentals I now use everywhere: the request → URL → view → template cycle, modeling data with an ORM, user authentication, sessions, and migrations. A few months later I used that same stack to build the much larger TeamsDatabase.',
    ],
    overview: [
      { t: 'gallery', items: [{ src: 'img/shots/movies-home.png', caption: 'Home page.' }, { src: 'img/shots/movies-detail.png', caption: 'Movie page: details, price, add to cart, and reviews.' }] },
    ],
    pages: [
      {
        slug: 'architecture',
        title: 'Architecture',
        summary: 'Four Django apps and how a request flows through them.',
        blocks: [
          {
            t: 'flow',
            steps: [
              { title: 'URL', sub: 'moviesstore/urls.py' },
              { title: 'App router', sub: 'movies/ · cart/ · accounts/' },
              { title: 'View', sub: 'query models' },
              { title: 'Template', sub: 'Bootstrap + base.html' },
              { title: 'Response', sub: 'HTML page' },
            ],
          },
          {
            t: 'table',
            head: ['App', 'Routes', 'Responsibility'],
            rows: [
              ['home', '`/`, `/about`', 'Landing and about pages'],
              ['movies', '`/movies/`, `/movies/<id>/`, review create/edit/delete/report', 'Catalog, search, movie detail and reviews'],
              ['accounts', '`signup`, `login`, `logout`, `orders`', 'Authentication and order history'],
              ['cart', '`/cart/`, `add`, `clear`, `purchase`', 'Session cart and checkout'],
            ],
          },
        ],
      },
      {
        slug: 'data-model',
        title: 'Data model',
        summary: 'Movies, reviews, orders and order items.',
        blocks: [
          {
            t: 'code',
            lang: 'python',
            caption: 'movies/models.py and cart/models.py',
            text: `class Movie(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='movie_images/')

class Review(models.Model):
    comment = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reported = models.BooleanField(default=False)

class Order(models.Model):
    total = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Item(models.Model):
    price = models.IntegerField()
    quantity = models.IntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)`,
          },
          { t: 'p', text: '`Item` stores the price at purchase time, so an old order keeps its total even if the movie’s price changes later. That small modeling decision was one of my first lessons in how data outlives code.' },
        ],
      },
      {
        slug: 'features',
        title: 'Features',
        summary: 'Search, reviews with moderation, cart and checkout.',
        blocks: [
          { t: 'img', src: 'img/shots/movies-list.png', caption: 'Catalog with search.' },
          {
            t: 'cards',
            items: [
              { title: 'Search', body: 'Filter the catalog by title from the movies page.' },
              { title: 'Reviews', body: 'Logged-in users can write, edit and delete their own reviews.' },
              { title: 'Report a review', body: 'Any user can flag a review, and reported reviews are hidden, a simple moderation flow I added.' },
              { title: 'Cart & orders', body: 'A session-based cart with quantities, then checkout into an order with line items, viewable under My Orders.' },
              { title: 'Auth', body: 'Sign up, log in and log out with Django’s auth system and custom forms.' },
              { title: 'Database', body: 'Developed on MySQL through XAMPP with PyMySQL, and it also runs on SQLite.' },
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── Job board
  {
    slug: 'job-board',
    title: 'Job Board (Group 7)',
    tagline:
      'A team-built job-seeker platform in the spirit of LinkedIn and Workday: candidates build resume profiles, recruiters post roles, and both sides search and match.',
    category: 'Full-stack',
    year: '2026',
    role: 'CS 2340 team project · Group 7',
    status: 'In progress',
    stack: ['Python', 'Django', 'SQL', 'HTML/CSS', 'Git', 'Agile / Scrum'],
    viz: 'agents',
    intro: [
      'For the CS 2340 team project, my group (Group 7) is building a resume board and job-seeker site, a smaller cousin of LinkedIn or Workday. Job seekers create a profile from their resume, recruiters post openings, and each side can search for the other.',
      'Unlike my solo projects, this one is about building software as a team: user stories, sprint planning, code review, design patterns, and keeping a shared codebase healthy.',
    ],
    pages: [
      {
        slug: 'features',
        title: 'Features',
        summary: 'The two sides of the marketplace.',
        blocks: [
          {
            t: 'cards',
            items: [
              { title: 'Job seekers', body: 'Profiles with headline, skills, education and experience. Browse and search postings, apply, and track applications.' },
              { title: 'Recruiters', body: 'Post jobs with requirements, location and pay. Search candidates by skill, and review applicants.' },
              { title: 'Search & filters', body: 'Filter roles and candidates by skills, location, and remote or on-site.' },
              { title: 'Accounts & roles', body: 'Separate seeker and recruiter accounts with role-based permissions.' },
            ],
          },
          { t: 'note', text: 'Overlaps with my own [TeamsDatabase](projects/teamsdatabase/), which tackles the same problem from the data side by scraping real postings.' },
        ],
      },
      {
        slug: 'process',
        title: 'Team process',
        summary: 'How Group 7 builds it.',
        blocks: [
          {
            t: 'steps',
            items: [
              { title: 'User stories', body: 'Requirements written as user stories with acceptance criteria, prioritized into a backlog.' },
              { title: 'Sprints', body: 'Work planned in sprints, with demos at the end of each one.' },
              { title: 'Design', body: 'UML class and sequence diagrams before building major features, and MVC structure throughout.' },
              { title: 'Git workflow', body: 'Feature branches and pull requests with review before merging.' },
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── Chess
  {
    slug: 'chess-ai',
    title: 'Chess with AI',
    tagline: 'A browser chess game in vanilla JavaScript with legal move generation, an AI opponent and a 3D board mode.',
    category: 'Web',
    year: '2025',
    stack: ['JavaScript', 'HTML', 'CSS'],
    viz: 'chess',
    intro: ['A small weekend build to practice game-state modeling: board representation, legal move generation per piece, turn handling, an AI opponent, and a CSS 3D mode for viewing the board from different angles.'],
    pages: [],
  },
];

export const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

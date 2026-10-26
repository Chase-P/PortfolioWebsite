# Portfolio Website Overhaul
## Implementation Specification and Development Roadmap

**Project:** Chase Punia Portfolio Website  
**Live site:** https://chase-p.github.io/PortfolioWebsite/  
**Deployment:** GitHub Pages  
**Primary objective:** Improve the website's visual identity, usability, project discovery, and professional presentation without rebuilding the entire site or breaking existing functionality.

---

# 0. Development Principles

These rules apply to every phase of the overhaul.

## 0.1 Preserve the existing website

Before making changes, inspect the repository and understand how the site currently works.

- Identify the framework, language, build system, routing, stylesheets, reusable components, and asset structure.
- Determine how the website is deployed to GitHub Pages.
- Identify existing interactive features, especially the Skills popup, project filtering, navigation, and interactive demonstrations.
- Record the current behavior of these features before changing anything.
- Reuse the existing architecture wherever practical.

Do not replace the website with a new framework, template, or design system simply because it would be easier to generate new code.

Do not introduce a backend, database, authentication system, or external service unless an existing feature genuinely requires it.

## 0.2 Work incrementally

Implement the overhaul in small, independently testable stages.

For each stage:

1. Inspect the relevant code.
2. Identify the smallest appropriate changes.
3. Implement the changes.
4. Run the available build, lint, and test commands.
5. Test the affected functionality.
6. Review the changes for regressions.
7. Record any unfinished work before moving on.

Do not combine unrelated redesigns and refactors into one large change.

## 0.3 Protect existing functionality

The following must continue to work unless explicitly redesigned:

- All existing project links and individual project pages.
- Navigation between sections and pages.
- The Skills popup and existing selection options.
- Existing project and skill filtering.
- Interactive algorithm demonstrations.
- Resume downloads.
- External repository and demonstration links.
- Direct access to nested pages.
- Browser refresh on individual project pages.

Avoid changing existing URL paths unnecessarily. If a URL must change, provide a redirect or compatibility solution appropriate for the current hosting setup.

## 0.4 Avoid unnecessary dependencies

Prefer the existing CSS, JavaScript, and component structure.

Before adding a library, determine whether the functionality can be implemented reliably with the current stack.

Avoid adding large animation libraries, UI frameworks, icon packages, analytics tools, or dependencies just for minor visual improvements.

## 0.5 Treat accuracy as a requirement

Do not invent project metrics, test results, user counts, performance claims, download availability, or professional accomplishments.

If information is missing, mark it as requiring verification instead of filling it with a guess.

Do not expose proprietary ADTRAN information, credentials, private data, or internal implementation details.

---

# Phase 1: Repository Audit and Baseline

**Priority: Critical**

**Goal:** Understand the current implementation before changing it.

## 1.1 Inspect the repository

Identify:

- Entry points and page structure.
- Main homepage component or document.
- Project data and project-page templates.
- Navigation implementation.
- Skills data and filtering logic.
- Stylesheets, design tokens, and responsive breakpoints.
- Images, fonts, icons, and other assets.
- Build and deployment configuration.
- Existing automated tests and validation scripts.

Determine whether the site uses a centralized project-data structure or defines each project independently.

Do not restructure project data during this phase unless necessary to understand the current implementation.

## 1.2 Establish a baseline

Record the current state before making modifications.

Check:

- Whether the project builds successfully.
- Whether existing pages load correctly.
- Whether navigation and project links work.
- Whether the Skills popup opens and filters results.
- Whether the interactive demos operate correctly.
- Whether the resume downloads.
- Whether the layout works on desktop and mobile.
- Whether the browser console reports errors.
- Whether the deployed site matches the repository.

Capture screenshots of the current homepage and important sections at desktop and mobile widths.

If browser automation is available, record a basic set of interaction tests. Otherwise, document a manual test procedure.

## 1.3 Establish a regression checklist

Create a checklist of existing features that must be retested after each major change.

Do not claim the website passes tests that have not actually been run.

### Deliverable

A concise audit report identifying:

- Existing architecture.
- Important files and components.
- Current functionality.
- Existing problems.
- Available test commands.
- Risks associated with the proposed changes.

### Acceptance criteria

- The implementation approach is based on the actual repository.
- The existing site can be built or its current build failure is documented.
- Critical existing functionality has a recorded baseline.
- No unnecessary framework migration is proposed.

---

# Phase 2: Homepage and Hero

**Priority: Critical**

**Goal:** Make the site immediately understandable and direct visitors toward Projects and Experience.

## 2.1 Introduction copy

Use the following as the initial version:

**Hi, I'm Chase. I'm a software developer.**

Take a look at my projects and experience. I'll let the work speak for itself.

Primary actions:

- Projects
- Experience
- Resume

Do not add a second slogan, a paragraph of generic professional claims, or a long explanation of the technologies used.

The introduction should sound like a person introducing their work, not a marketing campaign.

## 2.2 Layout

The homepage should establish this hierarchy:

1. Name and introduction.
2. Primary navigation actions.
3. A concise summary of professional background.
4. Featured projects or a clear path to Projects.
5. Experience.
6. Supplementary information.

The exact ordering should respect the existing page architecture and visual identity.

Do not force every section above the fold. The objective is clear prioritization, not fitting the entire portfolio into one screen.

## 2.3 Background and education

Remove About as a primary navigation destination.

Summarize the essential background information on Home:

- Computer Engineering student at Georgia Tech.
- Expected graduation date, if still accurate.
- Relevant professional experience.
- Brief description of technical interests.

Avoid adding a long biography or listing every class, award, and technology in the introduction.

Detailed experience and project information should remain in their respective sections.

## 2.4 Primary actions

Each action must have a real, tested destination.

- Projects scrolls to the Projects section or navigates to the correct project listing.
- Experience navigates to the Experience section.
- Resume opens or downloads the intended resume file.

Use semantic links for navigation. Do not use JavaScript click handlers where ordinary anchor links are sufficient.

For same-page navigation, account for sticky headers so headings are not hidden when the visitor arrives at the target section.

## 2.5 Responsive behavior

The hero must work on mobile without:

- Text overflowing its container.
- Buttons becoming difficult to tap.
- Excessive empty space.
- Overlapping navigation.
- Important content being hidden.
- Horizontal scrolling caused by the layout.

### Acceptance criteria

- The introduction is short and readable.
- Projects, Experience, and Resume are immediately discoverable.
- The homepage does not depend on animations to communicate its purpose.
- All actions work with a mouse, touch input, and keyboard.
- Background information remains concise.

---

# Phase 3: Visual Identity and Design System

**Priority: High**

**Goal:** Refine the existing technical, programmer-oriented appearance rather than replacing it with a generic portfolio template.

## 3.1 Preserve the existing character

The site should still feel like it belongs to a programmer who builds real applications.

Keep the technical aesthetic in Projects and Skills, including the existing interactive features and visual language where appropriate.

Do not turn the site into a generic corporate landing page or remove useful technical details simply to make the interface minimal.

## 3.2 Establish consistent design tokens

Inspect the current design and centralize reusable values where practical.

Define or standardize:

- Primary background and surface colors.
- Primary text and secondary text colors.
- Accent color.
- Border colors.
- Font families and weights.
- Heading sizes.
- Body text sizes.
- Spacing scale.
- Border radii.
- Content width.
- Responsive breakpoints.
- Focus and hover styles.

Use the existing styling mechanism. If the project uses CSS variables, extend them rather than introducing a separate styling system.

Do not change every color or font at once. Make the most important inconsistencies visible and resolve those first.

## 3.3 Typography

Create a clear distinction between:

- Main page headings.
- Section headings.
- Project titles.
- Body descriptions.
- Secondary metadata.
- Small interactive labels.

Use readable line lengths and appropriate line spacing.

Avoid using bold text, uppercase text, or accent colors for everything. Emphasis works only when some content remains visually quieter.

## 3.4 Spacing and alignment

Standardize the spacing between:

- Section headings and their content.
- Project cards.
- Card titles and descriptions.
- Skill boxes.
- Navigation elements.
- Buttons and surrounding text.

Use a consistent content container and responsive padding.

The page should feel deliberate rather than composed of independently styled elements.

## 3.5 Interaction states

Provide consistent visual states for interactive elements:

- Default.
- Hover.
- Keyboard focus.
- Active or selected.
- Disabled, where applicable.

Use visible focus indicators. Do not remove browser focus outlines without providing an accessible replacement.

Do not communicate important state changes through color alone.

## 3.6 Motion

Keep existing useful interactions, but avoid adding animation for decoration alone.

- Respect the reduced-motion preference.
- Avoid layout-shifting entrance animations.
- Do not delay access to content until an animation finishes.
- Avoid scroll hijacking and animated cursor effects.
- Ensure interactive elements remain usable if animation is disabled.

### Acceptance criteria

- The design remains recognizable as the existing portfolio.
- Spacing, typography, and colors are more consistent.
- Interactive states are clear.
- The interface works without animation.
- No unnecessary styling or animation dependency is introduced.

---

# Phase 4: Projects Section and Disclaimer

**Priority: Critical**

**Goal:** Make Projects the centerpiece of the portfolio and communicate the role of AI-assisted development confidently and transparently.

## 4.1 Section heading

Use:

**Projects**

Keep the heading straightforward. Do not replace it with a slogan.

## 4.2 Disclaimer label

Place a rectangular label near the Projects heading.

Text:

**DISCLAIMER**

Visual requirements:

- Red text.
- Red rectangular outline.
- Transparent or existing section background.
- Consistent padding.
- Clear contrast.
- No excessive glow, animation, or oversized badge styling.

Use a semantic element appropriate to the content. The label should remain readable by assistive technology.

The label is decorative emphasis, not a button. Do not make it interactive unless it has a genuine purpose.

## 4.3 Disclaimer copy

Use this initial version:

> These aren't just demos. They're full-fledged applications built to solve real problems.
>
> I use AI tools where they help me work more efficiently, but the goal is always the same: turn an idea into software that actually works.
>
> Modern development isn't just about writing code. It's about knowing what to build, making the right engineering decisions, and refining the result until it's something worth using.
>
> Explore the projects, try the applications, and see for yourself. That's the work I'd bring to your team.

Preserve the confident, direct tone.

Do not make claims about the quality or completeness of applications that cannot be substantiated. If a project is experimental or unfinished, its project page must say so.

The disclaimer should be concise enough not to push the project collection unnecessarily far down the page.

## 4.4 Project-card requirements

Each card should make the following information easy to find:

- Project name.
- Concise explanation of the problem or purpose.
- Main technologies, limited to the most relevant ones.
- Project status when relevant.
- Real screenshot or representative visual when available.
- Link to the project details.
- Working demo or download action, if available.

Do not add every possible technology to every card.

Avoid repeating the same description in the card, project page, and README without adapting it to each context.

Use authentic screenshots and actual application output. Do not use stock images as substitutes for screenshots of working software.

## 4.5 Project ordering

Use this initial order for the general SWE portfolio:

1. AI Multi-Agent Platform.
2. Legacy Code Remediation.
3. TeamsDatabase.
4. AIcompressionTool, once sufficiently implemented.
5. QuantTrader.
6. PID and robotics projects.
7. Remaining projects.

The AI platform should lead because it demonstrates the kind of ambitious software development you want to highlight.

The legacy-code project must be described carefully. Do not disclose proprietary ADTRAN code, internal architecture, confidential workflows, or employer-sensitive details. Use a public-safe explanation of the work and distinguish professional experience from independent projects.

TeamsDatabase should follow as a substantial data-driven application.

AIcompressionTool must remain a planned or in-progress project until it has enough functionality to justify a featured position. Do not present a planned project as completed.

For robotics-focused applications, allow the robotics work to move higher in the ordering without duplicating the entire site.

## 4.6 Project data

If the existing site already uses centralized project data, preserve and extend that structure.

If project details are duplicated across components, consider consolidating them only after understanding the current implementation.

A project record should support fields such as:

- Stable project identifier.
- Display name.
- Short description.
- Detailed description.
- Technology list.
- Status.
- Thumbnail or screenshot references.
- Project-page route.
- Repository URL.
- Demo URL.
- Download URL.
- Featured status.

Optional fields should remain optional. Do not display empty links or placeholder actions.

Do not invent a new data schema if the existing one already serves these purposes.

### Acceptance criteria

- Projects has a clear heading and disclaimer.
- Cards are consistent and easy to scan.
- Every visible action has a valid destination.
- Project order reflects the intended priorities.
- Existing project pages and routes continue to work.
- Unfinished projects are not presented as completed products.

---

# Phase 5: Experience Section

**Priority: High**

**Goal:** Show that the developer has worked on real engineering problems and can contribute within a professional team.

## 5.1 Structure

Each experience entry should contain:

- Organization or team.
- Role title.
- Dates.
- Concise description of the work.
- Individual contributions.
- Results, when verifiable.
- Relevant technologies.

Use a consistent layout across professional experience, robotics leadership, and other relevant technical roles.

Professional employment should remain visually distinct from personal projects and extracurricular achievements.

## 5.2 ADTRAN internship

Give the internship prominent placement.

Use only accurate, publicly shareable details. Emphasize the nature of the work, engineering decisions, and impact without exposing proprietary implementation details.

Where verified and permitted, the experience can reference:

- Automation involving more than 100 scripts.
- Remediation of more than 30,000 lines of legacy code.
- CI/CD deployment work involving eight infrastructure modules.
- Troubleshooting and fixing deployment failures.

Confirm the wording and attribution for every metric before publishing.

Do not reproduce confidential code, internal documentation, credentials, private infrastructure diagrams, or sensitive deployment procedures.

## 5.3 Writing format

Prefer concise descriptions that answer:

1. What problem existed?
2. What did you personally build or change?
3. What was the result?

Avoid paragraphs that list responsibilities without explaining their value.

Do not duplicate every resume bullet verbatim. The website can provide additional context while the resume remains concise.

## 5.4 Robotics and leadership

Show robotics experience as evidence of practical engineering, leadership, collaboration, and technical ownership.

Distinguish:

- Awards personally received.
- Awards earned by a team.
- Teams mentored.
- Projects personally implemented.
- Work completed collaboratively.

Avoid presenting aggregate team accomplishments as individual awards.

### Acceptance criteria

- Experience is accessible directly from navigation.
- Professional work is clearly distinguished from personal projects.
- Contributions and outcomes are easy to identify.
- All claims are accurate and safe to publish.

---

# Phase 6: Skills Search and Discovery

**Priority: High**

**Goal:** Retain the existing interactive popup and make it easier for recruiters to discover relevant projects and experience based on the skills they need.

## 6.1 Section introduction

Use:

**Looking for something specific?**

Search my projects and experience by what you're looking for. Add skills to narrow the results and find examples of how I've used them.

The introduction should explain the feature without requiring visitors to discover it by accident.

## 6.2 Preserve the current popup

Before changing the interface, inspect the current popup and document its behavior.

Preserve existing functionality, including:

- Current filter options.
- Skill selection.
- Search or filtering behavior.
- Result links.
- Dismissal and reopening.
- Keyboard behavior, where supported.

Do not replace a working feature with a simpler static list.

## 6.3 Search behavior

Inspect how filtering currently works before changing it.

Where compatible with the existing implementation:

- Support multiple selected skills.
- Make it clear whether multiple skills use AND or OR matching.
- Show the number of matching results when useful.
- Provide a clear way to reset filters.
- Handle zero results with a helpful message.
- Avoid duplicate results when a project matches several selected skills.
- Preserve relevant experience and project links.

Do not silently change established filtering semantics. If the current behavior is ambiguous, document it and implement a consistent, understandable rule.

## 6.4 Skill-box links

Add a small, underlined link at the bottom-left of each skill box.

Label:

**View usage**

The link should:

- Be visually secondary to the skill name.
- Have consistent placement.
- Open or reveal relevant projects and experience.
- Work with mouse, touch, and keyboard.
- Have a visible focus state.
- Navigate to actual evidence of the skill.

If no relevant project or experience exists, do not fabricate an example.

If the existing design makes it impractical to put the link inside the card, use a consistent layout that maintains the bottom-left alignment without overlapping other content.

## 6.5 Accessibility and performance

- Use semantic controls.
- Give the popup an accessible name.
- Support Escape to close where appropriate.
- Ensure focus is managed correctly when opening and closing the popup.
- Avoid unnecessarily rerendering the entire page for each filter interaction.
- Keep the feature responsive on mobile.
- Do not require a remote API for filtering a small, locally available dataset.

### Acceptance criteria

- The popup remains functional.
- Visitors understand how to search before opening it.
- View usage links lead to meaningful evidence.
- Filtering produces consistent results.
- The experience remains usable on mobile and with a keyboard.

---

# Phase 7: Navigation and Information Architecture

**Priority: High**

**Goal:** Make the most important sections accessible without burying the work under secondary content.

## 7.1 Primary navigation

Use:

- Home.
- Projects.
- Experience.
- Skills.
- Resume.

Remove About as a primary navigation destination.

Move essential background information to Home. Keep detailed project information within Projects and career details within Experience.

Coursework and other supplementary information may remain available, but should not compete with the primary destinations.

## 7.2 Navigation behavior

Inspect the existing routing before implementation.

- Use real links for navigation.
- Keep routes stable.
- Support direct access to project pages.
- Ensure browser back and forward work as expected.
- Indicate the current section or page.
- Ensure the navigation remains usable at small screen widths.
- Avoid duplicate navigation bars or conflicting active states.

If the existing website uses same-page sections, maintain those sections rather than introducing unnecessary new routes.

## 7.3 Resume behavior

Verify the actual resume file and its location.

Ensure the Resume action leads to a working file or an intentional preview.

Do not assume a file exists based solely on a link label. Check the destination and test it after deployment.

### Acceptance criteria

- The five primary destinations are clear.
- About is no longer a prominent navigation item.
- Existing project URLs remain functional.
- Resume access works from desktop and mobile.

---

# Phase 8: Project-Content Inventory

**Priority: Medium**

**Goal:** Create a separate Markdown document that makes the later project-page overhaul manageable.

Recommended filename:

`PROJECT_CONTENT_TODO.md`

Do not rebuild individual project pages during the initial redesign unless a change is required to maintain compatibility.

## 8.1 Inventory structure

Create one entry for every existing project.

Track:

- Project name.
- Current route.
- Project status.
- Repository URL.
- Live-demo URL.
- Download availability.
- Screenshot requirements.
- Missing technical documentation.
- Required verification.
- Confidentiality considerations.
- Completion status.

Example template:

```markdown
## Project Name

- [ ] Verify current project description
- [ ] Verify repository URL
- [ ] Verify demo URL
- [ ] Capture real application screenshots
- [ ] Write technical architecture overview
- [ ] Document key engineering decisions
- [ ] Add testing and validation evidence
- [ ] Review project status and limitations
- [ ] Verify downloadable application availability
- [ ] Add Download Now action if applicable
- [ ] Update README
- [ ] Test all links

Notes:
- Current status:
- Main technical challenges:
- Missing evidence:
- Confidentiality restrictions:
```

Use this as a tracking template, not as a replacement for the existing project content.

## 8.2 Screenshot management

For every project, identify the screenshots that would provide the strongest evidence.

Prioritize:

1. Main application interface.
2. Important workflow.
3. Technical output or visualization.
4. A difficult edge case or meaningful result.

Use actual screenshots whenever possible.

Keep image files organized and use descriptive filenames. Follow the existing asset conventions where practical.

Avoid committing large, redundant screenshots or video files that unnecessarily increase repository size.

## 8.3 Content quality

Every project page should eventually explain:

- The problem.
- The approach.
- The architecture.
- Important engineering decisions.
- Testing and validation.
- Results.
- Limitations.
- How to try the application.

Do not require every project to have an identical amount of documentation. Allocate the most effort to flagship projects.

### Acceptance criteria

- Every project has an inventory entry.
- Missing content is explicitly tracked.
- Image and download requirements are recorded.
- Confidentiality risks are identified before publication.

---

# Phase 9: Individual Project-Page Overhaul

**Priority: Later**

**Goal:** Turn selected project pages into credible engineering case studies with real visual evidence and working application downloads.

## 9.1 Recommended order

Start with:

1. AI Multi-Agent Platform.
2. Legacy Code Remediation, within disclosure restrictions.
3. TeamsDatabase.
4. CustomSlicer 5X or another technically distinctive project.
5. QuantTrader.
6. Robotics projects.
7. Remaining projects.

This list can be adjusted to reflect the projects actually present in the repository and the roles being targeted.

## 9.2 Standard project-page structure

Where appropriate, use the following structure:

1. Project title and short summary.
2. Project status.
3. Main screenshot or demonstration.
4. Problem and motivation.
5. Key features.
6. Technical architecture.
7. Engineering decisions and challenges.
8. Testing and validation.
9. Results and limitations.
10. Links to the repository, demo, and download.
11. Setup instructions, where applicable.

Avoid forcing unnecessary sections onto small projects.

## 9.3 Download Now functionality

Only add a Download Now button when a real, usable downloadable application exists.

Before publishing the button:

- Confirm that the file exists.
- Verify the destination URL.
- Test the download from the deployed website.
- Identify the supported operating systems.
- Include the application version where applicable.
- Provide installation instructions.
- Document known limitations.
- Include a checksum or signature when appropriate and available.

Do not label source code, an unfinished prototype, or a project repository as a ready-to-use application download.

For larger releases, use an appropriate release mechanism such as GitHub Releases rather than placing large binaries directly in the website repository.

Do not introduce executable downloads simply to make the portfolio appear more complete.

## 9.4 Architecture and engineering evidence

Use diagrams and examples that communicate real technical decisions.

Possible evidence includes:

- System architecture.
- Data flow.
- Database schema.
- Agent execution flow.
- Error-handling strategy.
- Algorithm visualization.
- Test results.
- Performance measurements.

Every diagram and metric must correspond to the actual implementation.

### Acceptance criteria

- Flagship project pages explain the engineering behind the product.
- Screenshots represent real application behavior.
- Downloads work and are accurately described.
- Technical claims are supported by evidence.
- Existing project URLs remain valid.

---

# Phase 10: Performance, Accessibility, and Quality Assurance

**Priority: High**

**Goal:** Ensure the redesigned site is reliable, accessible, responsive, and fast.

## 10.1 Responsive testing

Test at representative viewport widths, including:

- 320 px.
- 375–390 px.
- 768 px.
- 1024 px.
- 1440 px and wider.

These are test targets, not mandatory CSS breakpoints.

Check:

- Horizontal overflow.
- Text wrapping.
- Project-card layouts.
- Navigation collapse.
- Popup sizing.
- Image scaling.
- Button spacing.
- Footer behavior.
- Interactive demo usability.

Test both portrait and landscape orientations where relevant.

## 10.2 Accessibility

Check:

- Semantic heading hierarchy.
- Descriptive link text.
- Image alternative text.
- Keyboard access to every interactive control.
- Visible focus indicators.
- Appropriate contrast.
- Reduced-motion support.
- Accessible popup behavior.
- Form labels and error states, if applicable.

Do not rely exclusively on automated accessibility tools. Manually test important interactions.

## 10.3 Performance

Measure before optimizing.

Inspect:

- Image sizes and formats.
- Font loading.
- JavaScript bundle size, where relevant.
- Render-blocking assets.
- Layout shifts.
- Long-running scripts.
- Interactive demo startup time.
- Unnecessary third-party requests.

Use responsive images where supported by the existing implementation.

Provide intrinsic image dimensions or aspect ratios to reduce layout shifts.

Lazy-load below-the-fold images where appropriate, but do not lazy-load the main above-the-fold image if doing so delays the initial visual presentation.

Avoid adding large background videos, unnecessary animation frameworks, or third-party widgets that provide little value.

## 10.4 Testing strategy

Use the tools already available in the repository.

Where practical, automate:

- Build verification.
- Link validation.
- Critical navigation tests.
- Project-filter tests.
- Basic accessibility checks.
- Browser-console error detection.

Manually verify external links and downloadable files because external destinations can change independently.

Run tests against the built website where possible, not only against development mode.

## 10.5 GitHub Pages deployment

Verify:

- The build output is correct.
- Asset paths work under `/PortfolioWebsite/`.
- Internal links do not accidentally point to the domain root.
- Deep links load correctly.
- Relative asset paths remain valid.
- The deployed website reflects the latest committed changes.

Do not assume that a path working on a local development server will work under the GitHub Pages project-site path.

### Acceptance criteria

- The site builds successfully.
- No critical navigation or interactive regressions remain.
- Mobile layouts are usable.
- Major accessibility problems have been addressed.
- Performance has been measured and unnecessary bottlenecks removed.
- The deployed site works under its actual GitHub Pages URL.

---

# Phase 11: Implementation Workflow and Change Control

**Priority: Critical**

**Goal:** Make the plan practical to execute with a coding agent or through manual development.

## 11.1 Before each change

The implementer must:

1. Read the relevant files.
2. Identify dependencies and existing behavior.
3. State which files need modification.
4. Avoid unrelated refactoring.
5. Identify likely regression risks.

Do not make assumptions about the codebase based on filenames alone.

## 11.2 During implementation

- Keep changes focused.
- Reuse existing components where practical.
- Avoid duplicated styles and duplicated project data.
- Avoid unnecessary dependencies.
- Preserve accessible HTML semantics.
- Use stable identifiers for project records and routes.
- Do not replace working features with placeholders.
- Do not remove content without checking its existing purpose.

## 11.3 After implementation

Run the relevant tests and inspect the resulting changes.

Check for:

- Broken imports.
- Console errors.
- Broken links.
- Missing images.
- Incorrect asset paths.
- Mobile overflow.
- Inconsistent styling.
- Unintended content removal.
- Broken interactive states.
- Sensitive information accidentally exposed.

Document any tests that could not be run.

## 11.4 Git workflow

Use focused commits or changesets for logically separate stages.

Suggested sequence:

1. Baseline audit.
2. Homepage and navigation.
3. Design refinement.
4. Projects section and ordering.
5. Skills discovery.
6. Quality fixes.
7. Later project-page upgrades.

Do not commit secrets, local build artifacts, temporary screenshots, or unrelated changes.

Do not push or publish a change that has not been reviewed and tested according to the available workflow.

---

# Phase 12: Final Definition of Done

The initial overhaul is complete when all of the following are true:

## Homepage
- [ ] The introduction uses the approved copy.
- [ ] Projects, Experience, and Resume are easy to find.
- [ ] Background information is concise.
- [ ] The design retains its programmer-oriented identity.

## Projects
- [ ] The Projects heading and disclaimer are implemented.
- [ ] Featured projects follow the approved ordering.
- [ ] Project descriptions are concise and accurate.
- [ ] Existing project pages remain accessible.
- [ ] No nonfunctional actions are displayed.

## Experience
- [ ] Professional experience is prominent.
- [ ] Contributions and outcomes are clearly described.
- [ ] Metrics and confidentiality-sensitive details have been verified.

## Skills
- [ ] The existing popup still works.
- [ ] The new introduction explains the search feature.
- [ ] View usage links work and point to relevant evidence.
- [ ] Filtering remains predictable and accessible.

## Navigation
- [ ] The primary navigation contains Home, Projects, Experience, Skills, and Resume.
- [ ] About is no longer a primary destination.
- [ ] Existing routes and direct links continue to work.

## Quality
- [ ] The website builds successfully.
- [ ] Critical interactions have been tested.
- [ ] Responsive layouts have been checked.
- [ ] Accessibility issues have been reviewed.
- [ ] Performance has been measured.
- [ ] GitHub Pages deployment paths work correctly.

## Future project work
- [ ] `PROJECT_CONTENT_TODO.md` exists and tracks all projects.
- [ ] Missing screenshots, documentation, and downloads are recorded.
- [ ] Individual project-page redesigns remain a separate phase.

---

# Recommended Execution Order

1. Audit the existing repository and establish a baseline.
2. Implement the homepage copy and navigation changes.
3. Refine the visual system without replacing the existing identity.
4. Update Projects, the disclaimer, and featured project ordering.
5. Improve the Skills introduction and View usage links.
6. Test the entire site for regressions.
7. Create `PROJECT_CONTENT_TODO.md`.
8. Deploy the initial overhaul only after reviewing the build and critical functionality.
9. Upgrade individual project pages in separate, focused iterations.

**Final principle:** Optimize for credible engineering evidence and ease of evaluation. The website should make it easy for a recruiter to find the work and easy for an engineer to understand how it was built. Every design decision should support one of those goals.
s
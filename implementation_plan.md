# Premium UI Overhaul: Resume, Projects, and Contact

The goal is to eliminate any "cheap" or generic web design feels. We are fully leaning into an ultra-premium, dark-mode, glassmorphic "Deep Space & Gold" aesthetic with high-fidelity components.

## User Review Required

> [!IMPORTANT]
> The target aesthetic is highly customized. Please review the plan below. If there are any specific styles (e.g. you perfectly want a specific color like Cyberpunk Yellow vs Royal Gold), let me know!

## Proposed Changes

### 1. Resume Section Refinement

We will improve the Resume button to make it "sexy and wow" without taking up too much vertical space. It will look like a literal piece of cyber-hardware. 
- Reduce the padding and icon sizing so it's compact.
- Make the button container perfectly pill-shaped or angled, with a harsh glowing ring.
- Streamline the surrounding `.resume-datapad` to ensure it feels refined.

#### [MODIFY] `css/home.css` (Resume Button tweaks)

### 2. Projects Page Enhancement

The current project cards hover on "standard". We want them to look like floating glass modules.
- Upgrade `.project-card-inner` with `backdrop-filter: blur(25px)` over a deeply translucent dark background.
- Apply a dynamic gradient border glow that shifts color when you hover over the card.
- Clean up the Typography: Make the project category tags neon, and the tool badges (`.project-tech span`) look like glowing illuminated displays.

#### [MODIFY] `css/pages/projects.css`

### 3. Contact Page Upgrade

The contact page needs to match the new high-tech standard.
- Convert `.info-card` elements to holographic status boxes.
- Upgrade the main `.form-card` to resemble an encrypted terminal or a premium glass interface. Form inputs will get a glowing gold/cyan underline when focused.
- Upgrade the `Send Message` button to use the same highly premium, compact cyber-button style from the Resume section.

#### [MODIFY] `contact.html` (to apply cyber button classes to the submit button)
#### [MODIFY] `css/pages/contact.css` (for contact specific glassmorphism)

## Verification Plan

### Manual Verification
- Once changes are deployed, I will use the browser subagent to snapshot the button sizes and card aesthetics, confirming the premium glass-tech look.

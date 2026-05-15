# Design System Specification: The Academic Precision Framework

## 1. Overview & Creative North Star: "The Digital Curator"
This design system rejects the cluttered, "dashboard-heavy" legacy of traditional Learning Management Systems. Instead, it adopts the persona of **The Digital Curator**. The experience should feel like an elite technical journal or a high-end architectural portfolio: authoritative, spacious, and meticulously organized.

To move beyond "standard UI," we utilize **Editorial Asymmetry**. By pairing a rigid mathematical grid with large-scale typography and intentional white space, we create a hierarchy that guides a student’s focus toward deep work rather than administrative noise. We treat information as a premium asset, using tonal depth and "frosted" layers to signify importance without the need for dated borders or heavy shadows.

---

## 2. Colors: Tonal Architecture
The palette is rooted in a spectrum of "Deep Intellectual Blues" and "Technical Greys." We use these not just as decoration, but as a map for the user’s cognitive load.

### The Color Logic
- **Primary (`#0040a1`) & Primary Container (`#0056d2`):** Reserved for "Momentum Actions" (e.g., submitting an assignment, starting a lecture).
- **Secondary (`#515f74`):** Used for metadata and navigational utility.
- **Tertiary (`#00514a`):** Our "Engineering Green." Use this exclusively for technical success states, coding blocks, or completed milestones.

### The "No-Line" Rule
**Standard 1px solid borders are strictly prohibited for sectioning.** 
Structure is achieved through background shifts. A `surface-container-low` section sitting on a `surface` background creates a clear boundary that feels modern and architectural. If you feel the urge to draw a line, use a `2rem` spacing gap instead.

### The "Glass & Gradient" Rule
To add "soul" to the technical aesthetic:
- **Hero Backgrounds:** Use a subtle linear gradient from `primary` to `primary_container` (at a 135-degree angle) to create depth.
- **Glassmorphism:** Floating navigation bars or mobile overlays must use `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur. This ensures the academic content "bleeds" through the UI, maintaining context.

---

## 3. Typography: The Editorial Scale
We pair **Manrope** (Display/Headlines) for a technical, modern edge with **Inter** (Body/Labels) for maximum legibility during long-form reading.

*   **Display (Manrope):** Large, bold, and authoritative. Use `display-lg` (3.5rem) only for empty states or major dashboard welcomes.
*   **Headlines (Manrope):** `headline-md` (1.75rem) should be used for course titles. It creates a "journalistic" feel.
*   **Body (Inter):** `body-lg` (1rem) is the workhorse. Ensure a line height of at least 1.6 to prevent student eye fatigue during long readings.
*   **Labels (Inter):** `label-md` (0.75rem) in `on_surface_variant` is used for technical metadata (e.g., "Due in 4 hours" or "Weight: 20%").

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to represent "elevation" in the traditional sense. We use **Tonal Layering** to represent "Focus."

### The Layering Principle
1.  **Level 0 (Base):** `surface` (#f9f9ff) – The main canvas.
2.  **Level 1 (Sectioning):** `surface_container_low` – Large content blocks (e.g., a list of modules).
3.  **Level 2 (Interaction):** `surface_container_lowest` (#ffffff) – Individual cards or input fields. This creates a "lift" through contrast, not shadows.

### Ambient Shadows & Ghost Borders
- **Floating Elements:** If an element must float (like a Mobile Fab), use a shadow: `color: rgba(17, 28, 45, 0.06)`, `blur: 24px`, `y: 8px`. It should feel like ambient light, not a drop shadow.
- **The Ghost Border:** For accessibility in high-glare environments, use a `1px` border using `outline_variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Precision Primitives

### Buttons: The Technical CTA
- **Primary:** Filled with `primary`, text in `on_primary`. Use `rounded-md` (0.375rem). Avoid fully rounded "pill" buttons to maintain a more professional, technical profile.
- **Secondary:** `surface_container_high` background with `primary` text. This feels integrated into the page.

### Cards & Lists: The Separation Rule
**Forbid the use of divider lines.**
- Use **Vertical Spacing** (`spacing-6` or `1.5rem`) to separate list items.
- For high-density data, alternate backgrounds between `surface` and `surface_container_low`.

### Input Fields: Technical Clarity
- **State:** Active inputs use a `2px` bottom-bar of `primary`, rather than a full box stroke.
- **Error:** Use `error` (#ba1a1a) for the helper text and a `surface_container_high` background to make the field "vibrate" against the white canvas.

### Progress Indicators: The Engineering Accent
- Use a `tertiary` (#00514a) progress bar for "Course Completion." The green-to-blue contrast provides a psychological "technical win" for the student.

---

## 6. Do’s and Don’ts

### Do
- **Do** use `surface_bright` to highlight active navigation states.
- **Do** embrace asymmetry. Align a headline to the left and a CTA to the far right with significant negative space between them.
- **Do** prioritize mobile-first hit targets (minimum 44x44px) even if the UI looks "minimalist."

### Don’t
- **Don’t** use pure black (#000000). Use `on_surface` (#111c2d) for all text to maintain a premium, ink-on-paper feel.
- **Don’t** use standard "Material Design" cards with heavy shadows. Use the Tonal Layering Principle.
- **Don’t** overcrowd the screen. If a page feels "busy," increase the spacing between containers using `spacing-12` (3rem).

### Accessibility Note
Ensure that all `primary` on `surface` combinations maintain a 4.5:1 contrast ratio. When using `surface_container` tiers, ensure that text remains on the correct `on_surface` token to guarantee readability for students with visual impairments.
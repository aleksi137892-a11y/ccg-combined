# Banned AI Aesthetic Patterns

**Purpose:** This document codifies visual, typographic, and linguistic patterns that signal "AI-generated" to users. These patterns undermine the projection of institutional competence and are **banned** throughout CCG properties.

---

## The 32 Tells

### Visual / UI (1-12)

1. **Purple/pink gradients** — The universal AI color palette. Any gradient trending toward violet or magenta.

2. **Sparkle icons** — The ✨ or any variation suggesting "magic."

3. **Decorative icon sets** — Lucide/Heroicons/Feather used as decoration (shield next to "Protected"). Functional icons (close button, menu) are permitted.

4. **Glassmorphism** — Frosted glass cards, backdrop-blur, translucent panels with colored tints.

5. **Rounded corners > 8px** — Pills, lozenges, and overly soft shapes. Legal documents have sharp corners.

6. **Bouncy animations** — Spring physics, overshoot, elastic easing. Use 0.5s ease-out.

7. **Three-column feature grids** — The "three boxes with icons" layout.

8. **Numbered step indicators** — "Step 1 of 4" with circles. Users don't need the count.

9. **Skeleton loading with shimmer** — Pulsing gray shapes. Show nothing or show content.

10. **Card hover shadows** — Cards that "lift" on hover with shadow-xl. Static shadows only.

11. **Gradient borders** — Borders that fade between colors.

12. **Toast notifications for success** — "Saved successfully!" popups. Page change = confirmation.

---

### Typography (13-16)

13. **Inter, Poppins, Montserrat** — Default fonts of every AI template. We use serif for headings.

14. **Excessive font weight variation** — Mixing thin (200) with black (900). Pick two weights maximum.

15. **Small caps for labels** — Looks like a design system tutorial. Use sentence case or uppercase.

16. **Animated text reveals** — Words appearing one by one. Text should be instant.

---

### Language - Phrases (17-26)

17. **"In today's [X]"** — "In today's fast-paced world," "In today's digital landscape." The ultimate AI opener.

18. **"Navigate the [X]"** — "Navigate the complexities," "Navigate the landscape." Corporate filler.

19. **"It's not X—it's Y"** — The signature ChatGPT contrast structure.

20. **"Let's [verb]"** — "Let's dive in," "Let's get started," "Let's explore." Performative informality.

21. **"Imagine [scenario]"** — "Imagine a world where..." Cheap engagement bait.

22. **"Here's the kicker"** — Forced casualness.

23. **"In an era characterized by"** — Academic AI padding.

24. **"As we [verb]"** — "As we move forward," "As we navigate." Empty transitions.

25. **"A testament to"** — "This is a testament to our commitment." Hollow praise.

26. **"At the heart of"** — "At the heart of our mission." Cliché positioning.

---

### Language - Words (27-30)

27. **"Delve," "delves," "delving"** — The most statistically overrepresented LLM word.

28. **"Crucial," "essential," "vital," "pivotal"** — Filler intensifiers. If important, the content shows it.

29. **"Landscape"** — As metaphor for any domain. "The regulatory landscape."

30. **"Leverage"** — As verb meaning "use." Just say "use."

---

### Punctuation & Structure (31-32)

31. **Em dashes without spaces** — LLMs write `word—word`. Use commas, colons, or periods.

32. **Exclamation points** — Never in professional UI. "Welcome!" is AI. "Welcome" is human.

---

## Replacement Standards

| AI Pattern | CCG Standard |
|------------|--------------|
| Purple gradient | Navy solid (#1a202c) |
| Sparkle icon | No icon |
| Pill button | Square button |
| Inter font | Serif heading, sans body |
| "Let's get started" | "Begin" |
| "In today's fast-paced world" | (delete entire sentence) |
| "Navigate the complexities" | "Address" or "Handle" |
| "It's not X—it's Y" | "X does not apply. Y applies." |
| "delves into" | "examines" or "addresses" |
| "crucial" | (delete) |
| "leverage" | "use" |
| "landscape" | "environment" or "context" |
| Step 1 of 4 | Single progress line |
| 3-column grid | Single column |
| Exclamation point | Period |
| Em dash | Comma, period, or colon |
| Skeleton shimmer | Blank or content |
| Toast notification | Inline confirmation |

---

## Pre-Ship Checklist

Before any UI or content is committed:

### Visual
- [ ] No decorative icons
- [ ] No purple, pink, or gradient
- [ ] No bounce/spring animations
- [ ] No rounded corners > 8px
- [ ] No skeleton shimmer loaders
- [ ] No hover shadow effects on cards
- [ ] No numbered progress steps
- [ ] No toast/popup notifications

### Typography
- [ ] Serif for headings
- [ ] Maximum 2 font weights
- [ ] No animated text reveals

### Language
- [ ] No "delve," "crucial," "landscape," "leverage"
- [ ] No "Let's," "Imagine," "In today's"
- [ ] No "navigate the," "at the heart of," "a testament to"
- [ ] No em dashes
- [ ] No exclamation points
- [ ] No lists of exactly 3 or 5 items

---

## The Test

> Would a prosecutor show this to a judge?

If the answer is no, revise until yes.

---

*Authority: Internal Audit Board*  
*Last updated: 2026-01-28*

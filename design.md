---
version: alpha
name: CodeAir Modern
description: A minimal, high-contrast agency system with editorial typography, soft gray surfaces, and bold pill-shaped calls to action.
colors:
  primary: "#010101"
  secondary: "#f55c1a"
  tertiary: "#ffffff"
  neutral: "#f3f4f6"
  surface: "#ffffff"
  on-surface: "#010101"
  muted: "#e9eaef"
  border: "#e5e7eb"
  success: "#22c55e"
  error: "#ef4444"
  accent-ink: "#111827"
typography:
  headline-display:
    fontFamily: "Neue Montreal"
    fontSize: 64px
    fontWeight: 500
    lineHeight: 70.4px
    letterSpacing: -1.25px
  headline-lg:
    fontFamily: "Neue Montreal"
    fontSize: 52px
    fontWeight: 500
    lineHeight: 57.2px
    letterSpacing: -0.32px
  headline-md:
    fontFamily: "Neue Montreal"
    fontSize: 30px
    fontWeight: 500
    lineHeight: 37.2px
    letterSpacing: -0.52px
  headline-sm:
    fontFamily: "Neue Montreal"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 22px
    letterSpacing: 0px
  body-lg:
    fontFamily: "Neue Montreal"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: 0px
  body-md:
    fontFamily: "Neue Montreal"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 23px
    letterSpacing: 0px
  body-sm:
    fontFamily: "Neue Montreal"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:
    fontFamily: "Neue Montreal"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  label-md:
    fontFamily: "Neue Montreal"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 23px
    letterSpacing: 0px
  label-sm:
    fontFamily: "Neue Montreal"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: "Neue Montreal"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.08em
  display-accent:
    fontFamily: "Ivyoradisplay"
    fontSize: 64px
    fontWeight: 400
    lineHeight: 70px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 10px
  lg: 18px
  xl: 28px
  full: 9999px
spacing:
  xs: 10px
  sm: 20px
  md: 30px
  lg: 70px
  xl: 90px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: "19px 28px"
    height: "56px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: "19px 28px"
    height: "56px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "25px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "16px 20px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "8px 12px"
---

# CodeAir Modern

## Overview
CodeAir presents itself as a sharp, premium B2B agency brand: confident, minimal, and highly legible. The visual tone is airy and spacious, with a strong editorial headline treatment balanced by restrained utility UI. It feels professional and modern rather than playful, with just enough contrast and shadow to make CTAs feel tactile and important.

## Colors
- **Primary (#010101):** A near-black ink used for core text, the dark CTA button, nav labels, and high-contrast emphasis. It gives the interface a serious, premium feel.
- **Secondary (#f55c1a):** A vivid orange accent used sparingly for energy and momentum. It works best for highlights, badges, or small brand accents rather than large fills.
- **Surface (#ffffff):** Clean white surfaces support the minimal layout and keep the content area open and bright.
- **Neutral (#f3f4f6):** A cool light gray background that softens the page and creates a subtle framed canvas for the hero section.
- **On-surface (#010101):** The default readable foreground color for text and icons on light backgrounds.
- **Muted (#e9eaef):** A delicate divider/border tone used for button edges and low-contrast UI boundaries.
- **Border (#e5e7eb):** A slightly cooler border color for cards and inputs, helping components read without heavy outlines.
- **Success (#22c55e):** A trusted green suitable for WhatsApp or positive status indicators.
- **Error (#ef4444):** A clear alert color reserved for validation, destructive actions, or error messaging.

## Typography
The system is built on **Neue Montreal**, a clean grotesk sans serif that handles nearly all UI and editorial text. Headings use a 500 weight and tight negative letter spacing, which keeps large titles compact and premium without feeling overly stylized. Body copy stays light and approachable at 15px, while labels and buttons use slightly larger 18px text for strong readability in CTAs.

The hero uses a refined type contrast with **Ivyoradisplay** for the italicized accent phrase, creating an elegant editorial break inside the main headline. Uppercase is not a primary convention; instead, the system relies on spacing, size, and weight to create hierarchy. Small label text can use subtle tracking, especially for compact utility text and microcopy.

## Layout
The layout is centered and fixed-feeling, with generous whitespace around the hero and a clear vertical rhythm. Sections breathe with large gaps between navigation, headline, proof points, and logo tiles, using the 10px / 20px / 30px / 70px / 90px spacing scale as the governing rhythm. Content is visually aligned to a central axis, which reinforces the polished agency presentation.

Cards and logo panels sit on a light background with modest internal padding rather than dense boxed layouts. Primary CTAs are placed side by side and sized consistently, with 56px-tall pills that feel balanced in the open hero space. The system favors spacious margins and controlled content width over a dense grid.

## Elevation & Depth
Depth is subtle but intentional. The interface is mostly flat, using light borders and tonal contrast for structure, but buttons introduce soft layered shadows to create the feeling of floating above the page. The shadow treatment is strongest on CTAs and light cards, while most other surfaces remain quiet and restrained.

Hierarchy is achieved more through contrast and scale than through heavy elevation. Dark-on-light text, black CTA fills, and pale dividers provide clearer separation than dramatic shadows would. This keeps the design crisp and avoids overpowering the typography.

## Shapes
The shape language is soft and rounded, especially on buttons and interactive elements. The dominant form is the pill: rounded full-radius CTAs with smooth ends, which makes the brand feel friendly and premium at the same time. Cards use a milder 10px radius so they remain structured without becoming boxy.

Use `rounded.full` for primary and secondary action buttons, and `rounded.md` for content containers. Avoid sharp corners on major interaction points unless a component is intentionally meant to feel utilitarian or low-emphasis.

## Components
Buttons are the most expressive component in the system. `button-primary` is a black pill with white text, used for the main conversion action such as booking a call. `button-secondary` mirrors the same pill geometry but flips to a white surface with dark text and a subtle border, making it suitable for alternate actions like chat. `button-link` is a bare text treatment for low-priority navigation or inline actions.

Button sizing should stay generous: 56px height, around 19px vertical padding, and 28px horizontal padding. Buttons should feel substantial and tactile, not compact or cramped. Hover states should keep the same geometry but can slightly deepen contrast or increase shadow softness.

Cards should remain light, minimally bordered, and quietly elevated. Use white surfaces, a 1px border, and 25px padding for logo tiles, feature cards, or testimonials. Keep shadow usage restrained; cards should not compete with the CTA buttons for attention.

Inputs should follow the same pill-shaped language as buttons when they are prominent, or use a simple rounded container when embedded in forms. Borders should be subtle, with clear focus states driven by contrast rather than ornament. Labels should remain small, legible, and consistent with `label-sm` or `body-sm`.

Chips and badges should be compact, rounded, and low-noise. They can use the surface color with dark text and small padding, reserving the orange accent for special status or emphasis. Icon-and-text combinations should stay aligned on a single baseline and maintain plenty of breathing room.

Navigation items are clean text links rather than heavy tabs. The header should remain minimal, with plenty of space between items and no decorative chrome beyond a tiny icon or subtle hover cue. Social proof blocks and rating summaries should use small icons, compact text, and moderate spacing.

## Do's and Don'ts
- Do keep the page spacious and centered, with generous whitespace around the hero and CTAs.
- Do use Neue Montreal for most text and reserve the serif display face for editorial accents only.
- Do make primary actions feel pill-shaped, large, and tactile.
- Do keep borders light and shadows soft; hierarchy should come from contrast and scale, not heavy chrome.
- Do pair black and white for the core interface, and use the orange accent sparingly.
- Don't introduce busy gradients, loud colors, or dense card grids.
- Don't switch to square buttons or sharp-cornered UI for key actions.
- Don't overuse the display serif or exaggerate decorative typography effects.
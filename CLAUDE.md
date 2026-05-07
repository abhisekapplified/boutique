# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**अन्नपूर्णा फैशन बुटीक** — A production-ready, mobile-first single-page website for an Indian women's fashion tailoring business in Lucknow. No build tool, no framework, no package manager. Open `index.html` directly in a browser.

## Running the Site

No build or install step needed. Open the file directly:

```
# Windows
start index.html

# Or drag index.html into Chrome/Edge
```

For live-reload during development, use any static server:

```
# Python
python -m http.server 8080

# Node (if available)
npx serve .
```

## Architecture

**Single-page application** — all content lives in `index.html`. Three files total:

- `index.html` — all HTML sections, Bootstrap 5 via CDN, Font Awesome 6 via CDN, Google Fonts (Playfair Display, Poppins, Noto Sans Devanagari)
- `css/style.css` — all styles using CSS custom properties; no preprocessor
- `js/main.js` — all interactivity; vanilla JS, no dependencies

**CSS custom properties** (defined at `:root` in `style.css`) control the entire color palette:
- `--maroon`, `--gold`, `--cream`, `--deep-pink` are the four brand colors
- All component colors reference these variables — change them here to retheme the site

**Images** are Unsplash URLs embedded directly — no local image files. If replacing images, use `<img src="URL">` or CSS `background-image`.

## Page Sections (in DOM order)

`#hero` → `#about` → `#services` → `#gallery` → `#why-us` → `#testimonials` → `#contact` → `#footer`

Plus: `#loading-screen`, `.whatsapp-float`, `#backToTop`, `#appointmentModal` (Bootstrap modal), `#lightbox` (custom).

## Key JS Behaviors

- **Scroll animations**: `.animate-fade-up` elements become visible via `IntersectionObserver` when they enter the viewport. Add this class + optional `.animate-delay-N` to any new element to get the fade-up effect.
- **Counters**: `.why-counter` elements with `data-target` and `data-suffix` attributes are animated by a second `IntersectionObserver`.
- **Gallery lightbox**: Reads all `.gallery-item img` into an array at init; clicking any opens the custom `#lightbox` with prev/next/keyboard navigation.
- **Gallery filter**: `.filter-btn` elements with `data-filter` toggle visibility of `.gallery-item[data-category]`.
- **Forms** (`#contactForm`, `#appointmentForm`): Both redirect to `https://wa.me/919450968443` with a pre-filled message on submit. They use Bootstrap's `was-validated` class for client-side validation UI.
- **Navbar**: Adds `.scrolled` class after 80px scroll, switching from transparent to solid maroon background.

## Contact / Business Details

- Phone 1: `+91 94509 68443` (`tel:+919450968443`)
- Phone 2: `+91 94541 72900` (`tel:+919454172900`)
- WhatsApp: `https://wa.me/919450968443`
- Address: न्यू पावर हाउस हरिहरपुर, चित्रांश गेस्ट हाउस, मेदांता रोड, लखनऊ

## Branch Strategy

- `main` — stable, production-ready
- `dev` — active development branch; merge to `main` when ready

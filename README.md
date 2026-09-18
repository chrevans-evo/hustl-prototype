# Hustl prototype ("Soft OS" design)

Clickable prototype of Hustl, a job-booking app for teens aged 13 to 17 on Sydney's Northern Beaches, built to the "Soft OS" handoff: Sora type, lavender-to-mint gradient, glassy cards, violet prices, green trust cues, map-first browse, timeline for jobs, money jars, and a trust-ring profile.

Static site, no build step: `index.html`, `styles.css`, `app.js`.

## Run locally

```bash
npx serve .
```

## Deploy to Vercel

From this folder:

```bash
npx vercel --prod
```

Log in when prompted, accept the defaults (no framework, no build command). Vercel serves it as a static site.

## What works

- Teen flow: welcome, three-step sign-up with parent link, map browse with price pins, filters and a map/list toggle, job details with save and offer, My jobs timeline where an offer starts as "Waiting on Mum" and flips to "Mum approved" after a few seconds, check-out that unlocks the rating, money jars you can add a payout to, cash-out request, trust-ring profile.
- Poster flow: post a job with a pay stepper and three required safety checks, then choose one of three teens.
- State is shared across screens and persists in `localStorage`. Use "Reset prototype" in the side panel to start over.

## Notes

- Map backgrounds are stylised placeholders, as in the handoff. Swap for a real map SDK with a pastel style in production.
- Category and jar icons are inline stroke SVG on pastel tiles, replacing the handoff's emoji placeholders.

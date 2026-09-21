# Hustl prototype ("Soft OS" design)

Clickable prototype of Hustl, a job-booking app for teens aged 13 to 17 on Sydney's Northern Beaches. Teens only ever see jobs posted by adults inside a **circle**: a group of parents who know each other, where one parent starts the circle, invites parents they trust, and each links their own kids. There is no public marketplace. Built to the "Soft OS" handoff: Sora type, lavender-to-mint gradient, glassy cards, violet prices, green trust cues, map-first browse, timeline for jobs, money jars, and a trust-ring profile.

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

## The circle model

- A parent starts a circle and gets an invite code. They invite parents they know; anyone let in can post jobs to every teen in the circle.
- Teens join with their parent's code. Their browse screen is scoped to their parent's circles, with a circle switcher.
- Every job shows who posted it, how they're known ("Ava's mum"), which circle it's in and who invited them.
- The parent hub shows the invite code, members, join requests to approve, and the teen's pending offers to approve.
- Posters choose which circles can see a job.

## What works

- Teen flow: welcome, three-step sign-up with parent link, map browse with price pins, filters and a map/list toggle, job details with save and offer, My jobs timeline where an offer starts as "Waiting on Mum" and flips to "Mum approved" after a few seconds, check-out that unlocks the rating, money jars you can add a payout to, cash-out request, trust-ring profile.
- Parent flow: run a circle (invite code, approve a join request, approve your teen's offer), post a job to chosen circles with a pay stepper and three required safety checks, then choose one of three teens.
- Teen circles screen: every adult who can post to you, how they're known, and who invited them.
- State is shared across screens and persists in `localStorage`. Use "Reset prototype" in the side panel to start over.

## Notes

- Map backgrounds are stylised placeholders, as in the handoff. Swap for a real map SDK with a pastel style in production.
- Category and jar icons are inline stroke SVG on pastel tiles, replacing the handoff's emoji placeholders.

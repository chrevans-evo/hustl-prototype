# Hustl prototype ("Circles" concept)

Clickable prototype of Hustl, a job-booking app for teens aged 13 to 17 on Sydney's Northern Beaches, rebuilt around **circles** to address the child-protection problem in an open marketplace.

A circle is a small group of parents who already know each other. The circle admin invites people in, and records how they know each other. Only members of a circle can post jobs to it, and only the teens of those members can see and offer on them. Teens cannot sign up on their own; a parent brings them in and approves every booking.

Static site, no build step: `index.html`, `styles.css`, `app.js`. "Soft OS" design: Sora type, lavender-to-mint gradient, glassy cards, violet prices, green trust cues.

## Run locally

```bash
npx serve .
```

## Deploy to Vercel

The GitHub repo is linked to the `hustl-prototype` Vercel project, so every push deploys. From this folder you can also run:

```bash
npx vercel --prod
```

## What works

- **Parent flow (Kate):** welcome, start a circle (name, what brings you together, who can invite), invite parents you know with a "how I know them" record, a share code, join another circle with a code, circle home with members and pending invites, post a job scoped to a circle, choose a teen (with the vouch chain shown), approve or decline Zoe's offers.
- **Teen flow (Zoe):** join via Mum's invite (no self sign-up), jobs grouped by circle instead of by map radius, job details showing how Mum knows the poster, offer, My jobs timeline where an offer waits on Mum, check-out, rating, money jars, cash-out, profile scoped to circles.
- Invited parents "accept" after a few seconds. An offer flips to approved when Kate taps approve on the Approvals screen, or on its own after a few seconds if you stay on the teen side.
- State is shared across screens and persists in `localStorage`. Use "Reset prototype" in the side panel to start over.

## Notes

- Category and jar icons are inline stroke SVG on pastel tiles.
- The map from the first prototype is gone on purpose. Discovery is by trust, not distance.

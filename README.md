# parhamkhoshsolat.com

Source for my portfolio site: nine data science and ML projects, each with a write-up, live demos where they exist, and a chat agent that answers questions about the work.

<p>
  <a href="https://www.parhamkhoshsolat.com"><img src="https://img.shields.io/badge/Live_site-parhamkhoshsolat.com-5dc6ff?style=flat-square&labelColor=0a1422" alt="Live site: parhamkhoshsolat.com"></a>
  <img src="https://img.shields.io/badge/Stack-Next.js_14_%C2%B7_Tailwind-5dc6ff?style=flat-square&labelColor=0a1422" alt="Stack: Next.js 14 · Tailwind">
</p>

## Overview

A Next.js 14 (App Router) site with Tailwind CSS, Framer Motion and Recharts, deployed on Vercel. Project facts live in `src/lib/` and every page reads from there, so a correction is made once.

## Run it

```bash
npm install
cp .env.local.example .env.local   # optional: ANTHROPIC_API_KEY for the chat agent, RESEND_API_KEY for messages
npm run dev
```

Without the API key the chat agent falls back to built-in answers.

## Project layout

```
src/app/            pages, one folder per project, plus sitemap and robots
src/components/     UI: hero, project cards, charts, chat bubble
src/lib/            project data, credentials, site config, agent prompt
public/             brand marks, project charts and screenshots, certificates
```

---

Part of my portfolio: [parhamkhoshsolat.com](https://www.parhamkhoshsolat.com)

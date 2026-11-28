# rihardszeila.com

Rihards Zeila's site: the consulting homepage, /about, /work-with-me, /blog, /newsletter, /apply and the unlisted
/retreats page. Vite + React + TypeScript + Tailwind, served by SiteGround. The details live in `CLAUDE.md`.

```sh
npm ci
npm run dev        # the site on http://localhost:8080
npm run api        # the form endpoints (PHP) on :8090; the dev server proxies /api to it
npm run build      # -> dist/
php tests/api.test.php && node src/lib/blog-core.test.ts && node src/lib/apply-core.test.ts
```

A push to `main` deploys: `.github/workflows/deploy.yml` builds, runs the checks and rsyncs `dist/` to SiteGround.
The forms post to `public/api/*.php` on the same server; the only secret, `SENDER_API_TOKEN`, is a GitHub Actions secret.

# tomcugc.com

Static, no-backend website for Tom Carlson's UGC (user-generated content) business — plain HTML/CSS/JS, hosted free on GitHub Pages with a custom domain.

## Structure

- `index.html`, `work.html`, `about.html`, `services.html`, `testimonials.html`, `contact.html`, `404.html` — the site's pages
- `styles.css`, `script.js` — shared styles/behavior across all pages
- `assets/` — portrait photo, self-hosted reel videos (`reel-*.mp4`, compressed to ~1.4 Mbps 720p with faststart) and their poster images
- `robots.txt`, `sitemap.xml`, `llms.txt` — crawler/SEO/AI-search discoverability files
- `CNAME` — custom domain for GitHub Pages (`tomcugc.com`)
- `favicon.svg` — site icon

## Editing testimonials

Testimonials live in a `.testi-carousel` on `testimonials.html` (and a shorter one on `index.html`). To add one, add another slide to `.testi-track`:

```html
<div class="testi-slide">
  <p class="q">"The actual client quote goes here."</p>
  <span class="who">Role, Brand</span>
</div>
```

## Deploying (GitHub Pages)

1. Push this repo to GitHub (already connected to `tomcarlsonugc-sys/tomcugc-portfolio-`).
2. In the repo, go to **Settings → Pages**, set Source to the `main` branch, root folder.
3. Under **Custom domain**, enter `tomcugc.com` and save (this matches the `CNAME` file already in the repo).
4. At your domain registrar, add these DNS records:
   - `A` records for the apex (`tomcugc.com`) pointing to GitHub Pages' IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` pointing to `tomcarlsonugc-sys.github.io`
5. Back in **Settings → Pages**, check **Enforce HTTPS** once DNS has propagated (can take up to ~24h).

## Note on the old Cloudflare Workers deploy

This repo was originally deployed to `tomcugc-portfolio.tomcugc.workers.dev` via `wrangler deploy` (see `wrangler.jsonc`). That deployment is independent of GitHub Pages and won't change unless you run `wrangler deploy` again from this folder.

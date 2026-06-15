# EBCG Post-Launch SEO Checklist

Complete these steps after deploying the refurbished site to production at https://ebcg.in/

## 1. Google Search Console

- [ ] Add and verify the `ebcg.in` property in [Google Search Console](https://search.google.com/search-console)
- [ ] Submit `https://ebcg.in/sitemap.xml` via the Sitemaps report
- [ ] Request indexing for key pages: home, about, contact, and all four service pages
- [ ] Monitor the Coverage report for crawl errors over the first two weeks
- [ ] Set up email alerts for critical indexing issues

## 2. Formspree Setup

- [ ] Create a Formspree account at [formspree.io](https://formspree.io)
- [ ] Create a new form and copy the form ID
- [ ] Replace `YOUR_FORM_ID` in `js/main.js` (line: `const FORMSPREE_ID`)
- [ ] Update the `action` attribute on all `<form>` elements in:
  - `index.html`
  - `contact.html`
- [ ] Send a test submission from the contact page and confirm:
  - Email notification is received
  - Redirect to `/thank-you.html` works
  - Honeypot field (`_gotcha`) blocks bot submissions
- [ ] Configure Formspree spam filtering and notification email addresses

## 3. Google Business Profile (GBP)

- [ ] Claim or create the Google Business Profile for EBCG
- [ ] Set business name: **Ex Banker Consulting Group**
- [ ] Add Mumbai office address (update from placeholder BKC address if needed)
- [ ] Set phone number: +91 98765 43210 (update with real number)
- [ ] Add website URL: https://ebcg.in/
- [ ] Select categories: Financial Consultant, Loan Agency
- [ ] Upload logo (`assets/EBCG.png`) and office/exterior photos
- [ ] Add business hours: Mon–Sat, 9:00 AM – 6:00 PM
- [ ] Write a business description aligned with site meta descriptions
- [ ] Enable messaging and add WhatsApp link

## 4. Analytics & Tracking

- [ ] Install Google Analytics 4 (GA4) on all pages
- [ ] Set up conversion events for form submissions and WhatsApp clicks
- [ ] Verify GA4 is receiving pageview data after deployment

## 5. Social & Brand Consistency

- [ ] Update placeholder social URLs with real profiles:
  - LinkedIn: `https://www.linkedin.com/company/ebcg`
  - Twitter: `https://twitter.com/ebcg`
  - Facebook: `https://www.facebook.com/ebcg`
  - Instagram: `https://www.instagram.com/ebcg`
- [ ] Update `sameAs` URLs in `index.html` JSON-LD to match
- [ ] Update WhatsApp number from placeholder `919876543210` across all pages

## 6. Technical SEO Verification

- [ ] Confirm `robots.txt` is accessible at https://ebcg.in/robots.txt
- [ ] Confirm `sitemap.xml` is accessible at https://ebcg.in/sitemap.xml
- [ ] Validate all pages pass [Google Rich Results Test](https://search.google.com/test/rich-results) for JSON-LD
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on home and service pages
- [ ] Check mobile responsiveness on real devices
- [ ] Verify canonical URLs resolve correctly (no www/non-www conflicts)
- [ ] Ensure HTTPS is enforced (GitHub Pages + CNAME)

## 7. Content & Ongoing SEO

- [ ] Replace placeholder testimonials with real client quotes (with permission)
- [ ] Update trust bar statistics with verified figures
- [ ] Add real office address and phone across JSON-LD and contact page
- [ ] Consider adding a blog section for loan market updates and SEO content
- [ ] Build local citations (JustDial, Sulekha, IndiaMART) with consistent NAP data
- [ ] Monitor keyword rankings for target terms:
  - loan consultant India
  - home loan advisor Mumbai
  - business loan consultant
  - DSA loan consulting

## 8. Legal & Compliance

- [ ] Review privacy policy with legal counsel
- [ ] Ensure RBI/DSA registration details are displayed if required
- [ ] Add terms of service page if needed

---

**Deployment note:** This site is configured for GitHub Pages with `CNAME` set to `ebcg.in`. Push the `feature/ebcg-refurbish` branch and merge via PR — do not push directly to `main` without review.

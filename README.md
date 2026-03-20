# francine-t-ozereko — Site Files

Static site. Deploy to GitHub Pages, serve through Cloudflare (same stack as Frank's site).

---

## File Structure

```
/
├── index.html
├── style.css
├── main.js
├── gallery-data.js          ← ALL content editing happens here
└── images/
    ├── ceramics/
    │   ├── mugs/            ← mug-01.jpg, mug-02.jpg ...
    │   ├── bowls/           ← bowl-01.jpg, plate-01.jpg ...
    │   └── birds/           ← bird-01.jpg, bird-wall-01.jpg ...
    ├── collaborative/       ← collab-01.jpg ...
    └── sky/                 ← sky-2026-03-14.jpg (date-named)
```

---

## Adding / Editing Work

Open `gallery-data.js`. All content lives there.

### Ceramics

Add an entry to `GD.ceramics`:

```js
{
  id: "mug-06",                          // unique, no spaces
  title: "Bird Mug — Kingfisher",
  year: "2025",
  medium: "Sgraffito porcelain",
  dimensions: "4 × 3.5 in",
  category: "mugs",                      // mugs | bowls | birds
  price: "$125",                         // set null for sculptural/birds → shows "Inquire"
  availability: "available",             // available | sold | nfs
  img: "images/ceramics/mugs/mug-06.jpg"
}
```

**Pricing rule:**
- `mugs` and `bowls` → set a price string like `"$120"`
- `birds` and sculptural → set `price: null` → site shows "Inquire"

### Collaborative Works

Add to `GD.collaborative`. Always set `price: null` → these show "Inquire".

### Sky Journal

Add to `GD.skyJournal` at the **top** (most recent first):

```js
{ date: "March 20, 2026", note: "Clear. The kind of cold that has a colour.", img: "images/sky/sky-2026-03-20.jpg" }
```

`note` can be an empty string `""` — caption just won't appear.

---

## Home Grid

`GD.homeWorks` at the bottom of gallery-data.js auto-builds from available ceramics + collaborative works.
To hand-pick specific works for the home grid instead, replace the auto-build with:

```js
GD.homeWorks = [
  GD.ceramics.find(w => w.id === "bird-01"),
  GD.ceramics.find(w => w.id === "mug-01"),
  // etc
];
```

---

## Image Compression

Before upload, compress all images:
- **Ceramics/collaborative**: target ~150–200kb per image at 1200px wide
- **Sky journal**: target ~80–120kb per image (these are smaller in the grid)

Use the same compression script from Frank's site, or `ffmpeg`/`squoosh`.

---

## Deployment

Same as Frank's site:
1. Push changes to `main` branch on GitHub
2. Purge Cloudflare cache (Caching → Purge Everything)
3. Hard refresh to verify

Domain: `francinetozereko.com` → GitHub Pages → Cloudflare

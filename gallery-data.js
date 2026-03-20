// ═══════════════════════════════════════════
// gallery-data.js  —  Francine T. Ozereko
// ═══════════════════════════════════════════
// 
// CATEGORIES: mugs | bowls | birds | collaborative
// PRICING:
//   - mugs, bowls: set price (e.g. "$120")
//   - birds, collaborative: set price to null → shows "Inquire"
// AVAILABILITY: "available" | "sold" | "nfs"
//
// IMAGE PATHS: images/ceramics/mugs/mug-01.jpg etc.
// SKY JOURNAL:  images/sky/sky-2024-03-15.jpg etc.
//
// ═══════════════════════════════════════════

const GD = {

  // ── CERAMICS ────────────────────────────
  ceramics: [

    // MUGS & CUPS
    {
      id: "mug-01",
      title: "Bird Mug — Heron",
      year: "2024",
      medium: "Sgraffito porcelain",
      dimensions: "4 × 3.5 in",
      category: "mugs",
      price: "$120",
      availability: "available",
      img: "images/ceramics/mugs/mug-01.jpg",
      note: ""
    },
    {
      id: "mug-02",
      title: "Bird Mug — Swallow",
      year: "2024",
      medium: "Sgraffito porcelain",
      dimensions: "4 × 3.5 in",
      category: "mugs",
      price: "$120",
      availability: "available",
      img: "images/ceramics/mugs/mug-02.jpg"
    },
    {
      id: "mug-03",
      title: "Bird Mug — Crow",
      year: "2023",
      medium: "Sgraffito porcelain",
      dimensions: "4.5 × 3.5 in",
      category: "mugs",
      price: "$130",
      availability: "available",
      img: "images/ceramics/mugs/mug-03.jpg"
    },
    {
      id: "mug-04",
      title: "Tall Cylinder — Branches",
      year: "2024",
      medium: "Sgraffito porcelain",
      dimensions: "5 × 3 in",
      category: "mugs",
      price: "$140",
      availability: "available",
      img: "images/ceramics/mugs/mug-04.jpg"
    },
    {
      id: "mug-05",
      title: "Bird Mug — Wren",
      year: "2023",
      medium: "Sgraffito porcelain",
      dimensions: "4 × 3.5 in",
      category: "mugs",
      price: "$120",
      availability: "sold",
      img: "images/ceramics/mugs/mug-05.jpg"
    },

    // BOWLS & PLATES
    {
      id: "bowl-01",
      title: "Bird Bowl — Large",
      year: "2024",
      medium: "Sgraffito porcelain",
      dimensions: "5 × 10 in diameter",
      category: "bowls",
      price: "$280",
      availability: "available",
      img: "images/ceramics/bowls/bowl-01.jpg"
    },
    {
      id: "bowl-02",
      title: "Serving Bowl — Reeds",
      year: "2023",
      medium: "Sgraffito porcelain",
      dimensions: "4 × 12 in diameter",
      category: "bowls",
      price: "$320",
      availability: "available",
      img: "images/ceramics/bowls/bowl-02.jpg"
    },
    {
      id: "plate-01",
      title: "Dinner Plate — Marsh Birds",
      year: "2024",
      medium: "Sgraffito porcelain",
      dimensions: "11 in diameter",
      category: "bowls",
      price: "$180",
      availability: "available",
      img: "images/ceramics/bowls/plate-01.jpg"
    },
    {
      id: "plate-02",
      title: "Salad Plate — Flight",
      year: "2024",
      medium: "Sgraffito porcelain",
      dimensions: "8 in diameter",
      category: "bowls",
      price: "$140",
      availability: "available",
      img: "images/ceramics/bowls/plate-02.jpg"
    },

    // BIRDS & SCULPTURAL
    {
      id: "bird-01",
      title: "Three Birds — Driftwood Bar",
      year: "2022",
      medium: "Ceramic, wire, found wood",
      dimensions: "14 × 24 in",
      category: "birds",
      price: null,
      availability: "available",
      img: "images/ceramics/birds/bird-wall-01.jpg"
    },
    {
      id: "bird-02",
      title: "Perched Heron",
      year: "2023",
      medium: "Sgraffito porcelain, wire",
      dimensions: "12 × 5 in",
      category: "birds",
      price: null,
      availability: "available",
      img: "images/ceramics/birds/bird-02.jpg"
    },
    {
      id: "bird-03",
      title: "Crow — Wall Piece",
      year: "2023",
      medium: "Ceramic, found branch",
      dimensions: "8 × 16 in",
      category: "birds",
      price: null,
      availability: "available",
      img: "images/ceramics/birds/bird-03.jpg"
    },
  ],

  // ── COLLABORATIVE ────────────────────────
  collaborative: [
    {
      id: "collab-01",
      title: "Imaginary Vase Mug — No. 1",
      year: "2024",
      medium: "Sgraffito porcelain with relief print by Frank Ozereko",
      dimensions: "4.5 × 3.5 in",
      category: "collaborative",
      price: null,
      availability: "available",
      img: "images/collaborative/collab-01.jpg",
      note: "Collaborative work: Francine's sgraffito porcelain mug with Frank Ozereko's Imaginary Vase imagery."
    },
    {
      id: "collab-02",
      title: "Imaginary Vase Mug — No. 2",
      year: "2024",
      medium: "Sgraffito porcelain with relief print by Frank Ozereko",
      dimensions: "4.5 × 3.5 in",
      category: "collaborative",
      price: null,
      availability: "available",
      img: "images/collaborative/collab-02.jpg"
    },
    {
      id: "collab-03",
      title: "Imaginary Vase Bowl",
      year: "2023",
      medium: "Sgraffito porcelain with drawings by Frank Ozereko",
      dimensions: "4 × 9 in diameter",
      category: "collaborative",
      price: null,
      availability: "available",
      img: "images/collaborative/collab-03.jpg"
    },
  ],

  // ── SKY JOURNAL ──────────────────────────
  // Add entries as: { date, note, img }
  // Date format: "Month D, YYYY"  (displayed as shown)
  // note: one line of observation (can be empty string)
  skyJournal: [
    { date: "March 14, 2026", note: "Low cloud. The grey that isn't grey.", img: "images/sky/sky-2026-03-14.jpg" },
    { date: "March 10, 2026", note: "Clear after rain. Everything washed.", img: "images/sky/sky-2026-03-10.jpg" },
    { date: "March 6, 2026",  note: "",                                      img: "images/sky/sky-2026-03-06.jpg" },
    { date: "March 1, 2026",  note: "The first real light of the month.",     img: "images/sky/sky-2026-03-01.jpg" },
    { date: "Feb 24, 2026",   note: "A pale yellow at the horizon, then gone.", img: "images/sky/sky-2026-02-24.jpg" },
    { date: "Feb 18, 2026",   note: "Snow light. Difficult to paint.",        img: "images/sky/sky-2026-02-18.jpg" },
    { date: "Feb 12, 2026",   note: "",                                      img: "images/sky/sky-2026-02-12.jpg" },
    { date: "Feb 6, 2026",    note: "Overcast, but something moving in it.", img: "images/sky/sky-2026-02-06.jpg" },
    { date: "Jan 30, 2026",   note: "Last light at 4:45.",                   img: "images/sky/sky-2026-01-30.jpg" },
    { date: "Jan 22, 2026",   note: "",                                      img: "images/sky/sky-2026-01-22.jpg" },
    { date: "Jan 15, 2026",   note: "Cirrus, then nothing.",                 img: "images/sky/sky-2026-01-15.jpg" },
    { date: "Jan 8, 2026",    note: "A break in the clouds at noon.",        img: "images/sky/sky-2026-01-08.jpg" },
    // Add more entries here — oldest at the bottom
  ],

};

// HOME GRID: flatten all ceramics + collaborative for the home page
GD.homeWorks = [
  ...GD.ceramics,
  ...GD.collaborative,
].filter(w => w.availability !== "sold").slice(0, 9);

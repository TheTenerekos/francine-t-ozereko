// ═══════════════════════════════════════════
// main.js  —  Francine T. Ozereko
// ═══════════════════════════════════════════

(function () {
  'use strict';

  // ── STATE ────────────────────────────────
  let currentPage    = 'home';
  let currentCat     = 'all';
  let lightboxItems  = [];
  let lightboxIndex  = 0;
  let skyPage        = 0;
  const SKY_PER_PAGE = 12;

  // ── ELEMENTS ─────────────────────────────
  const $ = id => document.getElementById(id);

  const pages = {
    home:    $('page-home'),
    work:    $('page-work'),
    sky:     $('page-sky'),
    about:   $('page-about'),
    contact: $('page-contact'),
  };

  // ── NAV ──────────────────────────────────
  function showPage(name) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[name].classList.add('active');
    currentPage = name;

    // Update nav active states
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const btnMap = { work: 'work-btn', sky: 'sky-btn', about: 'about-btn', contact: 'contact-btn' };
    if (btnMap[name]) $(btnMap[name]).classList.add('active');

    window.scrollTo(0, 0);

    if (name === 'work') renderWorkGrid();
    if (name === 'sky')  renderSkyGrid();
  }

  $('home-link').addEventListener('click', () => showPage('home'));
  $('work-btn').addEventListener('click',    () => { showPage('work'); });
  $('sky-btn').addEventListener('click',     () => showPage('sky'));
  $('about-btn').addEventListener('click',   () => showPage('about'));
  $('contact-btn').addEventListener('click', () => showPage('contact'));

  // ── HAMBURGER / DRAWER ───────────────────
  const hamburger  = $('hamburger');
  const drawer     = $('drawer');
  const backdrop   = $('drawer-backdrop');
  const drawerClose = $('drawer-close');

  function openDrawer()  { drawer.classList.add('open'); backdrop.classList.add('open'); }
  function closeDrawer() { drawer.classList.remove('open'); backdrop.classList.remove('open'); }

  hamburger.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Mobile drawer work submenu
  const mobWorkHeading = $('mob-work-heading');
  const mobWorkSub     = $('mob-work-sub');
  mobWorkHeading.addEventListener('click', () => {
    mobWorkSub.classList.toggle('open');
    const arrow = mobWorkHeading.querySelector('.drawer-arrow');
    arrow.textContent = mobWorkSub.classList.contains('open') ? '−' : '+';
  });

  // Mobile drawer sub-items → work page
  document.querySelectorAll('.drawer-sub-item[data-cat]').forEach(item => {
    item.addEventListener('click', () => {
      const cat = item.dataset.cat;
      currentCat = cat;
      showPage('work');
      updateSidebarActive(cat);
      closeDrawer();
    });
  });

  // Mobile direct links
  $('mob-sky-direct').addEventListener('click',     () => { showPage('sky');     closeDrawer(); });
  $('mob-about-direct').addEventListener('click',   () => { showPage('about');   closeDrawer(); });
  $('mob-contact-direct').addEventListener('click', () => { showPage('contact'); closeDrawer(); });

  // ── SIDEBAR ──────────────────────────────
  function initSidebar() {
    // Toggle sections open/closed
    [
      ['sidebar-ceramics-heading', 'sidebar-ceramics-items'],
      ['sidebar-collab-heading',   'sidebar-collab-items'],
    ].forEach(([headId, itemsId]) => {
      const head  = $(headId);
      const items = $(itemsId);
      // Start open
      head.classList.add('open');
      items.classList.add('open');
      head.addEventListener('click', () => {
        head.classList.toggle('open');
        items.classList.toggle('open');
      });
    });

    // Category click
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        const cat = item.dataset.cat;
        currentCat = cat;
        updateSidebarActive(cat);
        renderWorkGrid();
        window.scrollTo(0, 0);
      });
    });
  }

  function updateSidebarActive(cat) {
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.toggle('active', item.dataset.cat === cat);
    });
  }

  // ── HOME GRID ─────────────────────────────
  function renderHomeGrid() {
    const grid = $('home-grid');
    grid.innerHTML = '';
    GD.homeWorks.forEach((work, i) => {
      const div = document.createElement('div');
      div.className = 'home-grid-item';
      div.innerHTML = `<img data-src="${work.img}" alt="${work.title}" loading="lazy" />`;
      div.addEventListener('click', () => {
        lightboxItems = GD.homeWorks;
        openLightbox(i);
      });
      grid.appendChild(div);
    });
    initLazyLoad();
  }

  // ── WORK GRID ─────────────────────────────
  function renderWorkGrid() {
    const grid = $('work-grid');
    grid.innerHTML = '';

    const allWorks = [...GD.ceramics, ...GD.collaborative];
    const filtered = currentCat === 'all'
      ? allWorks
      : currentCat === 'collaborative'
        ? GD.collaborative
        : GD.ceramics.filter(w => w.category === currentCat);

    lightboxItems = filtered;

    filtered.forEach((work, i) => {
      const card = document.createElement('div');
      card.className = 'work-card';

      const priceHtml = work.price
        ? `<div class="work-card-price">${work.price}${work.availability === 'sold' ? ' — <em>Sold</em>' : ''}</div>`
        : `<div class="work-card-price work-card-price--inquire">Inquire</div>`;

      card.innerHTML = `
        <img class="work-card-img" data-src="${work.img}" alt="${work.title}" loading="lazy" />
        <div class="work-card-info">
          <div class="work-card-title">${work.title}</div>
          <div class="work-card-meta">${work.year} · ${work.medium}</div>
          ${priceHtml}
        </div>
      `;
      card.addEventListener('click', () => openLightbox(i));
      grid.appendChild(card);
    });

    initLazyLoad();
  }

  // ── SKY JOURNAL ──────────────────────────
  function renderSkyGrid(append = false) {
    const grid = $('sky-grid');
    if (!append) {
      grid.innerHTML = '';
      skyPage = 0;
    }

    const entries = GD.skyJournal;
    const start   = skyPage * SKY_PER_PAGE;
    const slice   = entries.slice(start, start + SKY_PER_PAGE);

    slice.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'sky-entry';
      div.innerHTML = `
        <img class="sky-entry-img" data-src="${entry.img}" alt="${entry.date}" loading="lazy" />
        <div class="sky-entry-caption">
          <div class="sky-entry-date">${entry.date}</div>
          ${entry.note ? `<div class="sky-entry-note">${entry.note}</div>` : ''}
        </div>
      `;
      grid.appendChild(div);
    });

    skyPage++;
    initLazyLoad();

    // Show/hide load more button
    const loadBtn = $('sky-load-more');
    if (skyPage * SKY_PER_PAGE >= entries.length) {
      loadBtn.classList.add('hidden');
    } else {
      loadBtn.classList.remove('hidden');
    }
  }

  $('sky-load-more').addEventListener('click', () => renderSkyGrid(true));

  // ── LIGHTBOX ─────────────────────────────
  const lightbox         = $('lightbox');
  const lbImg            = $('lightbox-img');
  const lbTitle          = $('lightbox-title');
  const lbMeta           = $('lightbox-meta');
  const lbPrice          = $('lightbox-price');
  const lbActions        = $('lightbox-actions');
  const lbBackdrop       = $('lightbox-backdrop');

  function openLightbox(index) {
    lightboxIndex = index;
    populateLightbox(lightboxItems[index]);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function populateLightbox(work) {
    lbImg.src   = work.img;
    lbImg.alt   = work.title;
    lbTitle.textContent = work.title;

    const metaParts = [work.year, work.medium];
    if (work.dimensions) metaParts.push(work.dimensions);
    lbMeta.textContent = metaParts.join(' · ');

    // Price / inquire
    if (work.price) {
      if (work.availability === 'sold') {
        lbPrice.className = 'lightbox-price';
        lbPrice.innerHTML = `${work.price} &mdash; <em style="font-weight:300;font-style:italic;">Sold</em>`;
        lbActions.innerHTML = '';
      } else {
        lbPrice.className = 'lightbox-price';
        lbPrice.textContent = work.price;
        lbActions.innerHTML = `<a href="mailto:francine@francinetozereko.com?subject=Purchase inquiry: ${encodeURIComponent(work.title)}" class="btn-purchase">Purchase inquiry</a>`;
      }
    } else {
      lbPrice.className = 'lightbox-price lightbox-price--inquire';
      lbPrice.textContent = 'Inquire for price';
      lbActions.innerHTML = `<a href="mailto:francine@francinetozereko.com?subject=Inquiry: ${encodeURIComponent(work.title)}" class="btn-inquire">Inquire</a>`;
    }

    if (work.note) {
      lbMeta.innerHTML += `<br/><span style="font-style:italic;color:var(--ink-mid);margin-top:6px;display:block;">${work.note}</span>`;
    }
  }

  $('lightbox-close').addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);

  $('lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    populateLightbox(lightboxItems[lightboxIndex]);
  });

  $('lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
    populateLightbox(lightboxItems[lightboxIndex]);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  { lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length; populateLightbox(lightboxItems[lightboxIndex]); }
    if (e.key === 'ArrowRight') { lightboxIndex = (lightboxIndex + 1) % lightboxItems.length; populateLightbox(lightboxItems[lightboxIndex]); }
  });

  // ── LAZY LOAD ─────────────────────────────
  function initLazyLoad() {
    const imgs = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      imgs.forEach(img => observer.observe(img));
    } else {
      imgs.forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
    }
  }

  // ── INIT ──────────────────────────────────
  initSidebar();
  renderHomeGrid();

})();

(() => {
  'use strict';

  const WA_NUMBER = '917558995100';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  document.documentElement.classList.add('js');

  /* --------------------------------------------------------------------------
     1. Live Opening Status (Asia/Kolkata Timezone)
     Schedule: 09:00 AM - 09:30 PM IST (Daily)
     -------------------------------------------------------------------------- */
  function initStatus() {
    const dot = $('#status-dot') || $('.status-indicator');
    const text = $('#status-text');
    if (!text) return;

    function update() {
      let minutes = 720;
      try {
        const parts = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hourCycle: 'h23'
        }).formatToParts(new Date());

        const h = Number(parts.find(p => p.type === 'hour').value);
        const m = Number(parts.find(p => p.type === 'minute').value);
        minutes = h * 60 + m;
      } catch (e) {
        // Fallback default
      }

      // 09:00 is 540 min, 21:30 is 1290 min
      const open = minutes >= 540 && minutes < 1290;
      if (dot) dot.classList.toggle('is-closed', !open);
      text.textContent = open
        ? 'Open now until 9:30 PM'
        : 'Closed now. Opens daily at 9:00 AM';
    }

    update();
    setInterval(update, 60000);
  }

  /* --------------------------------------------------------------------------
     2. Responsive Navigation, Scroll-Spy & Smooth Anchor Scrolling
     -------------------------------------------------------------------------- */
  function initNav() {
    const toggle = $('#menu-toggle');
    const nav = $('#site-nav') || $('#nav');
    if (!toggle || !nav) return;

    const setOpen = open => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    $$('a', nav).forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    window.matchMedia('(min-width: 769px)').addEventListener('change', e => { if (e.matches) setOpen(false); });

    // Smooth anchor navigation with sticky header offset
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href*="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;

      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const pathPart = href.substring(0, hashIndex);
      const hashPart = href.substring(hashIndex);

      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      const cleanPathPart = pathPart.replace(/\/$/, '').replace('.html', '') || '/';

      const isSamePage = pathPart === '' ||
                         pathPart === '#' ||
                         cleanPathPart === currentPath ||
                         (currentPath === '/' && (pathPart === 'index.html' || pathPart === '/')) ||
                         (currentPath === '/index.html' && (pathPart === 'index.html' || pathPart === ''));

      if (isSamePage && hashPart.length > 1) {
        const target = $(hashPart);
        if (target) {
          e.preventDefault();
          const navH = 80;
          const bodyTop = document.body.getBoundingClientRect().top;
          const targetTop = target.getBoundingClientRect().top;
          const targetPos = targetTop - bodyTop - navH;

          window.scrollTo({
            top: Math.max(0, targetPos),
            behavior: 'smooth'
          });

          if (history.pushState) {
            history.pushState(null, null, hashPart);
          }
          setOpen(false);
        }
      }
    });

    // Active link Scroll-Spy on continuous page
    const sections = $$('main > section[id], header[id]');
    const navLinks = $$('.site-nav__link', nav);

    if (sections.length > 1 && navLinks.length) {
      function onScroll() {
        const scrollPos = window.scrollY + 130;
        let activeId = '';
        sections.forEach(sec => {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            activeId = sec.getAttribute('id');
          }
        });

        if (activeId) {
          navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            const isMatch = href === `#${activeId}` || href.endsWith(`#${activeId}`);
            link.classList.toggle('is-active', isMatch);
          });
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    } else {
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const cleanHref = href.replace(/\/$/, '').replace('.html', '') || '/';
        const isCurrent = (currentPath === cleanHref) ||
                          (currentPath === '/' && (href === '/' || href === 'index.html')) ||
                          (currentPath.endsWith(cleanHref) && cleanHref !== '/');
        if (isCurrent) {
          link.classList.add('is-active');
        }
      });
    }

    // Scroll to initial hash on load if present
    if (window.location.hash) {
      setTimeout(() => {
        const target = $(window.location.hash);
        if (target) {
          const navH = 80;
          const bodyTop = document.body.getBoundingClientRect().top;
          const targetTop = target.getBoundingClientRect().top;
          window.scrollTo({
            top: Math.max(0, targetTop - bodyTop - navH),
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  }

  /* --------------------------------------------------------------------------
     3. Floating Multi-Item Order Tray Engine (Commerce Utility)
     -------------------------------------------------------------------------- */
  const tray = [];

  function updateTrayUI() {
    const pill = $('#order-tray-pill');
    const countEl = $('#order-tray-count');
    const mobileBadge = $('#mobile-dock-badge');
    const listEl = $('#tray-items-list');
    const totalCount = tray.reduce((sum, item) => sum + item.qty, 0);

    if (countEl) countEl.textContent = totalCount;
    if (mobileBadge) {
      mobileBadge.textContent = totalCount;
      mobileBadge.classList.toggle('is-visible', totalCount > 0);
    }

    if (pill) {
      pill.classList.toggle('is-visible', totalCount > 0);
    }

    if (listEl) {
      if (tray.length === 0) {
        listEl.innerHTML = '<p class="tray-empty">Your tray is empty. Tap "+ Add to Tray" on any menu item.</p>';
      } else {
        listEl.innerHTML = tray.map(item => `
          <div class="tray-item" data-id="${item.id}">
            <div class="tray-item__info">
              <h4>${item.name}</h4>
              <p>${item.tag || 'Bakery Selection'}</p>
            </div>
            <div class="tray-qty-ctrl">
              <button class="tray-qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">-</button>
              <span class="tray-qty-num">${item.qty}</span>
              <button class="tray-qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
        `).join('');
      }
    }
  }

  function addToTray(name, tag = '') {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = tray.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      tray.push({ id, name, tag, qty: 1 });
    }
    updateTrayUI();
  }

  function initOrderTray() {
    // Add to tray delegate
    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn-add-tray, .btn-tray-add, .btn--tray-small');
      if (btn) {
        const name = btn.dataset.name;
        const tag = btn.dataset.tag || '';
        if (name) {
          addToTray(name, tag);
          const originalText = btn.innerHTML;
          btn.classList.add('is-added');
          btn.innerHTML = '<span>Added &#10003;</span>';
          setTimeout(() => {
            btn.classList.remove('is-added');
            btn.innerHTML = originalText;
          }, 1200);
        }
      }
    });

    const pill = $('#order-tray-pill');
    const mobileTrayBtn = $('#mobile-dock-tray-btn');
    const drawer = $('#tray-drawer');
    const backdrop = $('#tray-backdrop');
    const closeBtn = $('#tray-close-btn');

    function openTray() {
      if (drawer && backdrop) {
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
      }
    }
    function closeTray() {
      if (drawer && backdrop) {
        drawer.classList.remove('is-open');
        backdrop.classList.remove('is-open');
      }
    }

    if (pill) pill.addEventListener('click', openTray);
    if (mobileTrayBtn) mobileTrayBtn.addEventListener('click', openTray);
    if (backdrop) backdrop.addEventListener('click', closeTray);
    if (closeBtn) closeBtn.addEventListener('click', closeTray);

    const listEl = $('#tray-items-list');
    if (listEl) {
      listEl.addEventListener('click', e => {
        const btn = e.target.closest('.tray-qty-btn');
        if (!btn) return;
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const item = tray.find(i => i.id === id);
        if (!item) return;

        if (action === 'increase') {
          item.qty++;
        } else if (action === 'decrease') {
          item.qty--;
          if (item.qty <= 0) {
            const index = tray.indexOf(item);
            tray.splice(index, 1);
          }
        }
        updateTrayUI();
      });
    }

    // Submit Tray to WhatsApp (Sanitized Plain-Text Output)
    const orderBtn = $('#tray-order-btn');
    if (orderBtn) {
      orderBtn.addEventListener('click', () => {
        if (tray.length === 0) return;

        const lines = [
          '*ORDER TRAY INQUIRY - TOPPINS BAKE & CAFE*',
          '----------------------------------------',
          'Hello Toppins! I would like to order the following items:',
          ''
        ];

        tray.forEach(item => {
          lines.push(`• ${item.name} (Qty: ${item.qty})`);
        });

        lines.push('');
        lines.push('Please confirm availability and total price. Thank you!');

        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
        const w = window.open(url, '_blank', 'noopener');
        if (!w) window.location.href = url;
        closeTray();
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. Category Filter Tabs (Menu & Gallery Pages)
     -------------------------------------------------------------------------- */
  function initFilters() {
    const filterTabs = $$('.filter-tab, .filter');
    const cards = $$('.product-card, .card, .gallery-item');
    const emptyMsg = $('#menu-empty') || $('#gallery-empty');
    if (!filterTabs.length || !cards.length) return;

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-pressed', String(active));
        });

        const filterVal = tab.dataset.filter;
        let count = 0;

        cards.forEach(card => {
          const cat = card.dataset.category;
          const show = filterVal === 'all' || cat === filterVal;
          card.style.display = show ? '' : 'none';
          if (show) count++;
        });

        if (emptyMsg) {
          emptyMsg.hidden = count > 0;
        }

        const productGrid = $('#menu-product-grid');
        if (productGrid) {
          productGrid.scrollTo({ left: 0, behavior: 'smooth' });
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Custom Cakes Studio (Interactive Real Flavour Switcher & Brief Generator)
     -------------------------------------------------------------------------- */
  function initCakeStudio() {
    const previewImg = $('#cake-preview-img');
    const previewTitle = $('#preview-cake-name');
    const flavorSelect = $('#cake-flavor');
    const thumbButtons = $$('.flavour-thumb, .cake-thumb-btn');
    const form = $('#cake-form');
    if (!form && !flavorSelect && !thumbButtons.length) return;

    const flavorImageMap = {
      'Decadent Chocolate Cake': 'images/chocolate-cake.jpeg',
      'Lotus Biscoff Cheesecake': 'images/lotus-cheese-cake.jpeg',
      'Signature Red Velvet': 'images/red-velvet.jpeg',
      'Rich Ripe Mango': 'images/mango-cake.jpg',
      'Pistachio Tres Leches': 'images/pistachio-tres-leches.jpg',
      'Celebration Theme / Wedding Cake': 'images/celebration-cake.jpg',
      'Butterscotch Caramel Cake': 'images/butterscotch-cake.jpg',
      'Black Forest Classic': 'images/black-forest-cake.jpg',
      'Fresh Cream Pineapple': 'images/pineapple-cake.jpg'
    };

    function setFlavor(flavor) {
      if (flavorSelect && flavorSelect.value !== flavor) {
        flavorSelect.value = flavor;
      }
      if (previewTitle) previewTitle.textContent = flavor;
      const displayFlavor = $('#form-selected-flavor');
      if (displayFlavor) displayFlavor.textContent = flavor;

      thumbButtons.forEach(btn => {
        const active = btn.dataset.flavor === flavor;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-checked', String(active));
      });

      if (previewImg && flavorImageMap[flavor]) {
        previewImg.style.opacity = '0.35';
        setTimeout(() => {
          previewImg.src = flavorImageMap[flavor];
          previewImg.style.opacity = '1';
        }, 120);
      }
    }

    if (flavorSelect) {
      flavorSelect.addEventListener('change', () => setFlavor(flavorSelect.value));
    }

    thumbButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.flavor;
        if (f) setFlavor(f);
      });
    });

    // Weight/size pill selection
    const weightPills = $$('.pill-option, .pill-opt');
    const weightSelect = $('#cake-weight');
    weightPills.forEach(pill => {
      pill.addEventListener('click', () => {
        weightPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        if (weightSelect) {
          weightSelect.value = pill.dataset.val;
        }
      });
    });

    // Date picker minimum date (today)
    const dateInput = $('#cake-date');
    if (dateInput) {
      const today = new Date();
      const pad = n => String(n).padStart(2, '0');
      dateInput.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    }

    // Form submission -> Plain-Text WhatsApp Enquiry
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const requiredFields = $$('input[required], select[required]', form);
        let valid = true;

        requiredFields.forEach(f => {
          const bad = !f.value.trim();
          f.classList.toggle('is-invalid', bad);
          if (bad) valid = false;
        });

        const errorEl = $('#form-error');
        if (errorEl) errorEl.hidden = valid;

        if (!valid) {
          const firstBad = requiredFields.find(f => f.classList.contains('is-invalid'));
          if (firstBad) firstBad.focus();
          return;
        }

        const v = id => {
          const el = $('#' + id);
          return el ? el.value.trim() : '';
        };

        const lines = [
          '*CUSTOM CAKE ORDER ENQUIRY - TOPPINS BAKE & CAFE*',
          '------------------------------------------------',
          `• Name: ${v('cake-name')}`,
          `• Phone: ${v('cake-phone') || 'Included in WhatsApp'}`,
          `• Preferred Pickup: ${v('cake-outlet') || 'Althara (Punnayoorkulam)'}`,
          `• Occasion: ${v('cake-occasion')}`,
          `• Flavour: ${v('cake-flavor') || (flavorSelect ? flavorSelect.value : 'Chef Special')}`,
          `• Weight/Size: ${v('cake-weight') || '1 kg'}`,
          `• Date Needed: ${v('cake-date')}`
        ];

        if (v('cake-message')) {
          lines.push(`• Inscription: "${v('cake-message')}"`);
        }
        if (v('cake-notes')) {
          lines.push(`• Theme/Notes: ${v('cake-notes')}`);
        }
        lines.push('');
        lines.push('Please confirm availability and price quote. Thank you!');

        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
        const w = window.open(url, '_blank', 'noopener');
        if (!w) window.location.href = url;
      });

      form.addEventListener('input', e => {
        if (e.target.classList.contains('is-invalid') && e.target.value.trim()) {
          e.target.classList.remove('is-invalid');
        }
      });
    }

    // Set initial flavor if elements exist
    if (flavorSelect && flavorSelect.value) {
      setFlavor(flavorSelect.value);
    }
  }

  /* --------------------------------------------------------------------------
     6. Accessible Lightbox Modal (Gallery Page)
     -------------------------------------------------------------------------- */
  function initGalleryLightbox() {
    const items = $$('.gallery-item');
    const modal = $('#lightbox-modal');
    if (!items.length || !modal) return;

    const imgEl = $('#lightbox-img');
    const captionEl = $('#lightbox-caption');
    const closeBtn = $('#lightbox-close');

    function openLightbox(src, caption) {
      if (imgEl) imgEl.src = src;
      if (captionEl) captionEl.textContent = caption || '';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      if (imgEl) imgEl.src = '';
    }

    items.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const cap = item.querySelector('.gallery-item__caption');
        if (img) openLightbox(img.src, cap ? cap.textContent : img.alt);
      });
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. Card 3D Tilt (Gated by Pointer and Reduced Motion)
     -------------------------------------------------------------------------- */
  function initCardTilt() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const cards = $$('.specialty-card, .product-card, .value-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. Dual-Outlet Interactive Map Switcher
     -------------------------------------------------------------------------- */
  function initMapOutletSwitcher() {
    const btns = $$('.map-tab-btn');
    const iframe = $('#contact-map-iframe');
    const titleEl = $('#map-active-title');
    const linkEl = $('#map-active-link');
    if (!btns.length || !iframe) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const src = btn.getAttribute('data-map-src');
        const dir = btn.getAttribute('data-dir-link');
        const outletName = btn.getAttribute('data-outlet-name');

        if (src) iframe.src = src;
        if (dir && linkEl) linkEl.href = dir;
        if (outletName && titleEl) titleEl.textContent = `Currently Viewing: ${outletName}`;
      });
    });
  }

  // Self-initialization
  initStatus();
  initNav();
  initOrderTray();
  initFilters();
  initCakeStudio();
  initGalleryLightbox();
  initCardTilt();
  initMapOutletSwitcher();
})();

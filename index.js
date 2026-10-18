(() => {
  'use strict';

  const WA_NUMBER = '919995095100';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  document.documentElement.classList.add('js');

  /* Open/closed status in India Standard Time */
  function initStatus() {
    const dot = $('#status-dot');
    const text = $('#status-text');
    if (!dot || !text) return;

    function update() {
      let minutes = 720;
      try {
        const parts = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
        }).formatToParts(new Date());
        const h = Number(parts.find(p => p.type === 'hour').value);
        const m = Number(parts.find(p => p.type === 'minute').value);
        minutes = h * 60 + m;
      } catch (e) {
        // keep static text
      }

      const open = minutes >= 9 * 60 && minutes < 21 * 60 + 30;
      dot.classList.toggle('is-closed', !open);
      text.textContent = open
        ? 'Open now until 9:30 PM'
        : 'Closed now. Opens daily at 9:00 AM';
    }
    update();
    setInterval(update, 60000);
  }

  /* Mobile navigation */
  function initNav() {
    const toggle = $('#menu-toggle');
    const nav = $('#nav');
    if (!toggle || !nav) return;

    const set = open => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => set(!nav.classList.contains('is-open')));
    $$('a', nav).forEach(a => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
    window.matchMedia('(min-width: 861px)').addEventListener('change', e => { if (e.matches) set(false); });

    // Highlight the current section in the nav
    const links = $$('a', nav);
    const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
          }
        });
      }, { rootMargin: '-35% 0px -50% 0px' });
      sections.forEach(s => io.observe(s));
    }
  }

  /* Scroll-Pop Reveal for Iconic Items */
  function initIconicPop() {
    const items = $$('.iconic-item');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(el => el.classList.add('is-popped'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-popped');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -60px 0px'
    });

    items.forEach(el => observer.observe(el));
  }

  /* Interactive 3D Perspective Tilt & Specular Glare on Iconic Cards */
  function initCardTilt() {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const frames = $$('.iconic-frame');
    frames.forEach(frame => {
      const glare = frame.querySelector('.iconic-glare');
      let rect = null;

      frame.addEventListener('mouseenter', () => {
        rect = frame.getBoundingClientRect();
      });

      frame.addEventListener('mousemove', e => {
        if (!rect) rect = frame.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (y - 0.5) * -12;
        const tiltY = (x - 0.5) * 12;

        frame.style.transform = `perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
          glare.style.background = `radial-gradient(circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(255, 209, 0, 0.25) 0%, transparent 65%)`;
          glare.style.opacity = '1';
        }
      });

      frame.addEventListener('mouseleave', () => {
        frame.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        if (glare) glare.style.opacity = '0';
        rect = null;
      });
    });
  }

  /* Confetti Celebration on WhatsApp Click */
  function triggerConfetti(originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let canvas = $('#confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#D9232A', '#FFD100', '#D69A4C', '#3D1E10', '#FFFFFF'];
    const particles = [];
    const count = 48;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = 4 + Math.random() * 8;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 5 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 14,
        alpha: 1
      });
    }

    let animId;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.vx *= 0.98;
        p.rotation += p.rSpeed;
        p.alpha *= 0.96;

        if (p.alpha > 0.05) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
          ctx.restore();
        }
      });

      if (alive) {
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    render();
  }

  function initConfettiTriggers() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.iconic-cta, .navbar__cta, #cake-submit, #tray-order-btn');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });
  }

  /* ========================================================
     CUSTOM CAKES SECTION (Real Gourmet Food Photography)
     ======================================================== */
  function initCakeStudio() {
    const previewImg = $('#cake-preview-img');
    const previewTitle = $('#preview-cake-name');
    const flavorSelect = $('#cake-flavor');
    const thumbButtons = $$('.cake-thumb-btn');
    const form = $('#cake-form');
    if (!flavorSelect) return;

    // Real photos map for each flavor
    const flavorImageMap = {
      'Decadent Chocolate Cake': 'images/chocolate-cake.jpeg',
      'Lotus Biscoff Cheesecake': 'images/lotus-cheese-cake.jpeg',
      'Signature Red Velvet': 'images/red-velvet.jpeg',
      'Rich Ripe Mango': 'images/mango-cake.jpg',
      'Pistachio Tres Leches': 'images/pistachio-tres-leches.jpg',
      'Celebration Theme / Wedding Cake': 'images/celebration-cake.jpg'
    };

    // Update real gourmet cake photo and synchronize UI
    function setFlavor(flavor, syncDropdown = true) {
      if (syncDropdown && flavorSelect.value !== flavor) {
        flavorSelect.value = flavor;
      }
      if (previewTitle) previewTitle.textContent = flavor;

      // Update active thumbnail
      thumbButtons.forEach(btn => {
        const active = btn.dataset.flavor === flavor;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-checked', String(active));
        if (active && syncDropdown) {
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });

      if (previewImg && flavorImageMap[flavor]) {
        previewImg.style.opacity = '0.35';
        setTimeout(() => {
          previewImg.src = flavorImageMap[flavor];
          previewImg.style.opacity = '1';
        }, 140);
      }
    }

    flavorSelect.addEventListener('change', () => {
      setFlavor(flavorSelect.value, false);
    });

    thumbButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.flavor;
        if (f) setFlavor(f, true);
      });
    });


    // Date picker minimum date (today)
    const date = $('#cake-date');
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    if (date) date.min = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    // Submit Custom Cake to WhatsApp
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const fields = $$('input[required], select[required]', form);
        let valid = true;
        fields.forEach(f => {
          const bad = !f.value.trim();
          f.classList.toggle('is-invalid', bad);
          if (bad) valid = false;
        });
        const error = $('#form-error');
        if (error) error.hidden = valid;
        if (!valid) {
          const firstBad = fields.find(f => f.classList.contains('is-invalid'));
          if (firstBad) firstBad.focus();
          return;
        }

        const v = id => {
          const el = $('#' + id);
          return el ? el.value.trim() : '';
        };

        const lines = [
          '🎂 *CUSTOM CAKE ORDER REQUEST - TOPPINS BAKE & CAFE*',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          `👤 *Name:* ${v('cake-name')}`,
          `🎉 *Occasion:* ${v('cake-occasion')}`,
          `🍰 *Flavour:* ${v('cake-flavor')}`,
          `⚖️ *Weight:* ${v('cake-weight')}`,
          `📅 *Date Needed:* ${v('cake-date')}`
        ];
        if (v('cake-message')) {
          lines.push(`✍️ *Piped Cake Inscription:* "${v('cake-message')}"`);
        }
        if (v('cake-notes')) {
          lines.push(`📝 *Design Brief:* ${v('cake-notes')}`);
        }
        lines.push('', 'Please confirm availability and final quote. Thank you!');

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

    // Initialize defaults
    setFlavor(flavorSelect.value, false);
  }

  /* ========================================================
     FLOATING ORDER TRAY (Multi-Item WhatsApp Cart Engine)
     ======================================================== */
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
      if (totalCount > 0) {
        mobileBadge.classList.add('is-bumped');
        setTimeout(() => mobileBadge.classList.remove('is-bumped'), 280);
      }
    }

    if (pill) {
      pill.classList.toggle('is-visible', totalCount > 0);
    }

    if (listEl) {
      if (tray.length === 0) {
        listEl.innerHTML = '<p class="tray-empty">Your tray is empty. Tap "+ Add to Tray" on any item.</p>';
      } else {
        listEl.innerHTML = tray.map(item => `
          <div class="tray-item" data-id="${item.id}">
            <div class="tray-item__info">
              <h4>${item.name}</h4>
              <p>${item.tag || 'Fresh Bake'}</p>
            </div>
            <div class="tray-qty-ctrl">
              <button class="tray-qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
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
    // Add to tray button clicks
    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn-tray-add, .btn--tray-small');
      if (btn) {
        const name = btn.dataset.name;
        const tag = btn.dataset.tag || '';
        addToTray(name, tag);

        // Feedback
        const originalHtml = btn.innerHTML;
        btn.classList.add('is-added');
        btn.innerHTML = '<span>Added ✓</span>';
        setTimeout(() => {
          btn.classList.remove('is-added');
          btn.innerHTML = originalHtml;
        }, 1200);
      }
    });

    // Tray Pill & Mobile Dock Tray click -> Open Drawer
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

    // Quantity buttons inside tray drawer
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

    // Send Tray to WhatsApp
    const orderBtn = $('#tray-order-btn');
    if (orderBtn) {
      orderBtn.addEventListener('click', () => {
        if (tray.length === 0) return;

        const lines = [
          '🛍️ *NEW TRAY ORDER - TOPPINS BAKE & CAFE*',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          'Hello Toppins! I would like to place an order for the following items:',
          ''
        ];

        tray.forEach(item => {
          lines.push(`• *${item.name}* × ${item.qty}`);
        });

        lines.push('');
        lines.push('Please confirm availability and the total amount. Thank you!');

        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
        const w = window.open(url, '_blank', 'noopener');
        if (!w) window.location.href = url;
        closeTray();
      });
    }
  }

  /* Menu filter (Animated FLIP transitions) */
  function initFilters() {
    const buttons = $$('.filter');
    const cards = $$('.card');
    const empty = $('#menu-empty');
    let animating = false;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (animating) return;
        buttons.forEach(b => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        const f = btn.dataset.filter;

        // Animate out current visible cards
        const visibleCards = cards.filter(c => !c.hidden);
        animating = true;

        visibleCards.forEach(c => c.classList.add('is-hiding'));

        setTimeout(() => {
          let shown = 0;
          cards.forEach(c => {
            c.classList.remove('is-hiding', 'is-showing');
            const show = f === 'all' || c.dataset.category === f;
            c.hidden = !show;
            if (show) {
              shown++;
              c.classList.add('is-showing');
            }
          });
          if (empty) empty.hidden = shown > 0;

          // Stagger the entrance
          const newVisible = cards.filter(c => !c.hidden);
          newVisible.forEach((c, i) => {
            c.style.animationDelay = `${i * 0.06}s`;
          });

          setTimeout(() => {
            newVisible.forEach(c => {
              c.classList.remove('is-showing');
              c.style.animationDelay = '';
            });
            animating = false;
          }, 500);
        }, 250);
      });
    });
  }

  /* Demo hero video */
  function initHeroVideo() {
    const video = $('#hero-video');
    if (!video) return;
    const card = video.closest('.story-card');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { video.remove(); return; }
    video.addEventListener('error', () => video.remove(), { once: true });
    video.play().then(() => {
      video.classList.add('is-playing');
      card.classList.add('has-video');
    }).catch(() => video.remove());
  }

  /* Soft falling crumbs */
  function initCrumbs() {
    const box = $('#crumbs');
    if (!box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#8A4B2A', '#D69A4C', '#F3E3C9', '#B0693A', '#6B3A1F'];
    for (let i = 0; i < 16; i++) {
      const s = document.createElement('span');
      const size = 4 + Math.random() * 7;
      s.className = 'crumb';
      s.style.cssText =
        `left:${Math.random() * 100}%;width:${size}px;height:${size * 0.8}px;` +
        `background:${colors[i % colors.length]};` +
        `animation-duration:${6 + Math.random() * 6}s;animation-delay:${-Math.random() * 10}s;` +
        `--dx:${(Math.random() - 0.5) * 70}px;--rot:${120 + Math.random() * 240}deg;`;
      box.appendChild(s);
    }
  }

  /* Scroll Progress Indicator (Throttled with requestAnimationFrame) */
  function initScrollProgress() {
    const bar = $('#scroll-progress');
    if (!bar) return;

    let ticking = false;
    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* Native Scroll Reveals via IntersectionObserver (Zero scroll lag) */
  function initScrollReveals() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      $$('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    const targets = $$(
      '.section__head, .about__copy, .about__media, .review, .visit__info, .visit__map, .cta-strip__inner'
    );
    targets.forEach(el => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });
  }

  /* Hero entrance on page load */
  function initHeroEntrance() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const heroCopy = $('.hero__copy');
    if (heroCopy) {
      const heroEls = [
        heroCopy.querySelector('.eyebrow'),
        heroCopy.querySelector('h1'),
        heroCopy.querySelector('.lead'),
        heroCopy.querySelector('.hero__ctas'),
        heroCopy.querySelector('.facts')
      ].filter(Boolean);

      heroEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.6s ease-out ${0.1 + i * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
        });
      });
    }

    const heroMedia = $('.hero__media');
    if (heroMedia) {
      heroMedia.style.opacity = '0';
      heroMedia.style.transform = 'scale(0.96)';
      heroMedia.style.transition = 'opacity 0.8s ease-out 0.25s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          heroMedia.style.opacity = '1';
          heroMedia.style.transform = 'scale(1)';
        });
      });
    }
  }

  // Initialize everything
  initStatus();
  initCrumbs();
  initHeroVideo();
  initNav();
  initIconicPop();
  initCardTilt();
  initConfettiTriggers();
  initCakeStudio();
  initOrderTray();
  initFilters();
  initScrollProgress();
  initScrollReveals();
  initHeroEntrance();
})();

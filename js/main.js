/* ==========================================================================
   NEOVIBEZ MUSIC — lógica de la web
   No hace falta tocar este archivo: el contenido está en js/content.js
   ========================================================================== */
(() => {
  'use strict';

  const D = window.NEOVIBEZ || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad2 = (n) => String(n).padStart(2, '0');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Placeholders de color (hasta que subas las fotos) ---------- */
  const PALETTES = [
    ['#c6ff3d', '#12331f', '#07070a'],
    ['#ff3d81', '#3a0d3f', '#07070a'],
    ['#7a5cff', '#10204f', '#07070a'],
    ['#3dffd0', '#0c3a47', '#07070a'],
    ['#ffb03d', '#4a1a0d', '#07070a'],
    ['#f4f1ea', '#2a2a36', '#07070a']
  ];
  function art(i) {
    const p = PALETTES[i % PALETTES.length];
    const x = 18 + (i * 37) % 64, y = 14 + (i * 53) % 60, a = (i * 67) % 360;
    return `radial-gradient(circle at ${x}% ${y}%, ${p[0]} 0%, transparent 46%), conic-gradient(from ${a}deg at 50% 60%, ${p[1]}, ${p[2]}, ${p[1]})`;
  }
  function media(src, i, label, alt) {
    const ph = `<span class="ph" style="background:${art(i)}">${label ? `<span class="ph-label">${esc(label)}</span>` : ''}</span>`;
    const img = src ? `<img src="${esc(src)}" alt="${esc(alt || '')}" loading="lazy" decoding="async" onload="this.classList.add('ok')" onerror="this.remove()">` : '';
    return ph + img;
  }

  /* ======================================================================
     RENDER
     ====================================================================== */
  const tracks = D.tracks || [];
  const gallery = D.gallery || [];
  const videos = D.videos || [];

  function render() {
    // Cinta
    const mq = $('#marquee');
    if (mq && D.marquee?.length) {
      const items = D.marquee.map((g) => `<span>${esc(g)}</span>`).join('');
      mq.innerHTML = `<div class="marquee-track">${items.repeat(6)}</div>`;
    }

    // Cifras
    const st = $('#stats');
    if (st && D.stats) {
      st.innerHTML = D.stats.map((s, i) => `
        <div class="stat" data-reveal style="--d:${i * 0.08}s">
          <span class="stat-num" data-count="${Number(s.value) || 0}" data-suffix="${esc(s.suffix || '')}">${esc(s.value)}${esc(s.suffix || '')}</span>
          <span class="stat-label">${esc(s.label)}</span>
        </div>`).join('');
    }

    // Catálogo
    const genres = [...new Set(tracks.map((t) => t.genre).filter(Boolean))];
    const fl = $('#filters');
    if (fl) {
      fl.innerHTML = ['Todos', ...genres].map((g, i) =>
        `<button type="button" class="chip${i === 0 ? ' active' : ''}" data-genre="${i === 0 ? '' : esc(g)}" aria-pressed="${i === 0}">${esc(g)}</button>`).join('');
    }
    const tl = $('#tracks');
    if (tl) {
      tl.innerHTML = tracks.map((t, i) => `
        <li class="track" data-i="${i}" data-genre="${esc(t.genre || '')}" data-reveal style="--d:${Math.min(i, 8) * 0.05}s">
          <button type="button" class="track-main" aria-label="Reproducir ${esc(t.title)}">
            <span class="track-num">${pad2(i + 1)}</span>
            <span class="track-cover media">
              ${media(t.cover, i, '', '')}
              <span class="track-play">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 4v16l13-8z"/></svg>
                <span class="eq"><i></i><i></i><i></i></span>
              </span>
            </span>
            <span class="track-info">
              <span class="track-title">${esc(t.title)}</span>
              <span class="track-artist">${esc(t.artist || '')}</span>
            </span>
            <span class="track-tag">${esc(t.genre || '')}</span>
            <span class="track-meta">${[t.bpm ? t.bpm + ' BPM' : '', t.key || ''].filter(Boolean).map(esc).join(' · ')}</span>
            <span class="track-dur">${esc(t.duration || '')}</span>
          </button>
        </li>`).join('');
    }

    // Dúo
    const dg = $('#duoGrid');
    if (dg && D.duo) {
      dg.innerHTML = D.duo.map((m, i) => `
        <article class="member" data-reveal style="--d:${i * 0.12}s">
          <div class="member-photo media">
            ${media(m.photo, i + 1, 'Foto · ' + m.name, m.name)}
            <span class="member-idx">${pad2(i + 1)} / ${pad2(D.duo.length)}</span>
            <h3 class="member-name">${esc(m.name)}</h3>
          </div>
          <div class="member-body">
            <p class="member-role">${esc(m.role || '')}</p>
            <p class="member-bio">${esc(m.bio || '')}</p>
            <div class="member-links">${(m.links || []).map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.name)}</a>`).join('')}</div>
          </div>
        </article>`).join('');
    }

    // Studio
    const gl = $('#gallery');
    if (gl) {
      gl.innerHTML = gallery.map((g, i) => `
        <button type="button" class="shot media" data-photo="${i}" data-reveal style="--d:${(i % 4) * 0.07}s" aria-label="Ampliar foto: ${esc(g.caption || 'Studio')}">
          ${media(g.src, i + 2, 'Foto ' + pad2(i + 1), g.caption)}
          <span class="shot-cap">${esc(g.caption || '')}</span>
        </button>`).join('');
    }

    // Vídeos
    const vf = $('#videoFeature');
    if (vf && videos[0]) {
      const v = videos[0];
      vf.innerHTML = `
        <button type="button" class="video-feature media" data-video="0" aria-label="Reproducir vídeo: ${esc(v.title)}">
          ${media(v.poster, 2, '', v.title)}
          <span class="play-big">PLAY</span>
          <span class="video-info"><span class="video-title">${esc(v.title)}</span><span class="video-meta">${esc(v.meta || '')}</span></span>
        </button>`;
    }
    const vl = $('#videoList');
    if (vl) {
      vl.innerHTML = videos.slice(1).map((v, k) => `
        <button type="button" class="video-card media" data-video="${k + 1}" data-reveal style="--d:${k * 0.08}s" aria-label="Reproducir vídeo: ${esc(v.title)}">
          ${media(v.poster, k + 3, '', v.title)}
          <span class="play-sm"><span class="tri"></span></span>
          <span class="video-info"><span class="video-meta">${esc(v.meta || '')}</span><span class="video-title">${esc(v.title)}</span></span>
        </button>`).join('');
    }

    // Servicios
    const sv = $('#services');
    if (sv && D.services) {
      sv.innerHTML = D.services.map((s, i) => `
        <li data-reveal style="--d:${i * 0.06}s">
          <div class="service">
            <span class="service-num">${pad2(i + 1)}</span>
            <h3 class="service-title">${esc(s.title)}</h3>
            <p class="service-text">${esc(s.text || '')}</p>
            <div class="service-tags">${(s.tags || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
          </div>
        </li>`).join('');
    }

    // Redes y email
    const soc = (D.socials || []).map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join('');
    $$('#socials, #footSocials').forEach((el) => (el.innerHTML = soc));
    $$('[data-email]').forEach((a) => { a.href = 'mailto:' + (D.email || ''); a.textContent = D.email || ''; });
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

    // Vídeo de fondo en portada (opcional)
    if (D.heroVideo) {
      const v = document.createElement('video');
      Object.assign(v, { src: D.heroVideo, muted: true, loop: true, autoplay: true, playsInline: true });
      v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
      v.addEventListener('canplay', () => v.classList.add('ok'), { once: true });
      v.addEventListener('error', () => v.remove());
      $('#heroVideo')?.appendChild(v);
    }
  }

  /* ======================================================================
     TITULARES A TODO EL ANCHO
     ====================================================================== */
  function fitText() {
    $$('[data-fit]').forEach((el) => {
      const inner = el.firstElementChild;
      if (!inner) return;
      el.style.fontSize = '';
      const fs = parseFloat(getComputedStyle(el).fontSize);
      const cw = el.clientWidth, iw = inner.offsetWidth;
      if (cw > 0 && iw > 0) el.style.fontSize = (fs * cw / iw * 0.992).toFixed(2) + 'px';
    });
  }

  /* ======================================================================
     ONDAS DE LA PORTADA (canvas)
     ====================================================================== */
  function initWaves() {
    const c = $('#waves');
    if (!c) return;
    const ctx = c.getContext('2d');
    const LINES = 30;
    let w = 0, h = 0, grad = null, t = 0, running = false, visible = true;
    let mx = 0.5, tmx = 0.5, my = 0.5, tmy = 0.5, boost = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, '#c6ff3d'); grad.addColorStop(0.35, '#3dffd0');
      grad.addColorStop(0.68, '#7a5cff'); grad.addColorStop(1, '#ff3d81');
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = grad;
      const step = w < 700 ? 10 : 8;
      const amp = 1 + boost * 0.6;                 // crece cuando suena música
      const cy = h * (w < 700 ? 0.36 : 0.42);
      for (let l = 0; l < LINES; l++) {
        const k = l / (LINES - 1);
        ctx.globalAlpha = 0.08 + 0.42 * Math.sin(Math.PI * k);
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const nx = x / w;
          const env = Math.pow(Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, nx)))), 1.4);
          const y = cy + (k - 0.5) * h * 0.09
            + Math.sin(nx * 5.2 + t * 0.9 + k * 2.4 + mx * 1.6) * h * 0.13 * env * amp
            + Math.sin(nx * 11.5 - t * 1.4 + k * 4.2) * h * 0.04 * env * amp
            + Math.sin(nx * 2.1 + t * 0.45) * h * 0.05
            + (my - 0.5) * h * 0.1 * env * (k - 0.5) * 2;
          if (x === -step) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function loop() {
      if (!running) return;
      t += 0.0075 * (1 + boost);
      mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
      boost += ((document.body.classList.contains('is-playing') ? 1 : 0) - boost) * 0.03;
      draw();
      requestAnimationFrame(loop);
    }
    function setRunning() {
      const should = visible && !document.hidden && !reduceMotion;
      if (should && !running) { running = true; requestAnimationFrame(loop); }
      else if (!should) running = false;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (e) => { tmx = e.clientX / innerWidth; tmy = e.clientY / innerHeight; }, { passive: true });
    document.addEventListener('visibilitychange', setRunning);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; setRunning(); }).observe(c);
    resize();
    setRunning();
  }

  /* ======================================================================
     SCROLL: aparición, manifiesto, cifras, nav
     ====================================================================== */
  function initScroll() {
    // Aparición
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('[data-reveal]').forEach((el) => io.observe(el));

    // Cifras
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        const el = e.target, end = Number(el.dataset.count) || 0, suf = el.dataset.suffix || '';
        if (reduceMotion) return;
        const t0 = performance.now(), dur = 1500;
        (function step(now) {
          const p = Math.min(1, (now - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
          el.textContent = v + suf;
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach((el) => cio.observe(el));

    // Manifiesto palabra a palabra
    const mt = $('[data-words]');
    let words = [];
    if (mt && !reduceMotion) {
      mt.innerHTML = mt.textContent.trim().split(/\s+/).map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
      words = $$('.w', mt);
    }

    // Nav + enlace activo
    const nav = $('#nav');
    const links = $$('#navLinks a');
    const secs = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);

    let ticking = false;
    function onScroll() {
      ticking = false;
      nav?.classList.toggle('scrolled', scrollY > 30);
      if (words.length) {
        const r = mt.getBoundingClientRect(), vh = innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.88 - r.top) / (r.height + vh * 0.38)));
        const n = Math.round(p * words.length);
        words.forEach((w, i) => w.classList.toggle('on', i < n));
      }
      let cur = -1;
      secs.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
      links.forEach((a, i) => a.classList.toggle('active', i === cur));
    }
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  }

  /* ======================================================================
     MENÚ MÓVIL
     ====================================================================== */
  function initMenu() {
    const b = $('#burger'), n = $('#navLinks');
    if (!b || !n) return;
    const set = (open) => {
      n.classList.toggle('open', open);
      b.setAttribute('aria-expanded', String(open));
      b.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.classList.toggle('lock', open);
    };
    b.addEventListener('click', () => set(!n.classList.contains('open')));
    n.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }

  /* ======================================================================
     REPRODUCTOR
     ====================================================================== */
  const P = {};
  const audio = new Audio();
  audio.preload = 'metadata';
  let cur = -1, demo = false, demoT = 0, demoDur = 0, rafId = 0, lastTs = 0, bars = [];

  const toSec = (s) => { const m = String(s || '').split(':').map(Number); return m.length === 2 && m.every(isFinite) ? m[0] * 60 + m[1] : 180; };
  const fmt = (s) => { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + pad2(s % 60); };
  const visibleIdx = () => $$('.track:not([hidden])').map((li) => Number(li.dataset.i));

  function buildWave(i) {
    let x = (i + 3) * 7919;
    const rnd = () => (x = (x * 9301 + 49297) % 233280) / 233280;
    const n = 80; let html = '';
    for (let k = 0; k < n; k++) {
      const env = 0.4 + 0.6 * Math.sin(Math.PI * (k + 0.5) / n);
      html += `<i style="--h:${Math.max(12, Math.round((20 + rnd() * 80) * env))}%"></i>`;
    }
    P.wave.innerHTML = html;
    bars = [...P.wave.children];
  }
  function ui(tNow, dur) {
    const f = dur > 0 ? Math.min(1, tNow / dur) : 0, n = Math.round(f * bars.length);
    bars.forEach((b, k) => b.classList.toggle('on', k < n));
    P.time.textContent = `${fmt(tNow)} / ${fmt(dur)}`;
    P.wave.setAttribute('aria-valuenow', String(Math.round(f * 100)));
  }
  function setPlaying(on) { document.body.classList.toggle('is-playing', on); }
  const isPlaying = () => document.body.classList.contains('is-playing');

  function tick(ts) {
    demoT += Math.min(0.5, (ts - lastTs) / 1000); lastTs = ts;
    if (demoT >= demoDur) { next(); return; }
    ui(demoT, demoDur);
    rafId = requestAnimationFrame(tick);
  }
  function toDemo() {
    if (demo || cur < 0) return;
    demo = true;
    P.artist.textContent = `${tracks[cur].artist || ''} · vista previa sin audio`;
    if (isPlaying() || audio.paused) play();
  }

  function load(i, autoplay = true) {
    const t = tracks[i];
    if (!t) return;
    cancelAnimationFrame(rafId);
    audio.pause();
    cur = i; demo = !t.audio; demoT = 0; demoDur = toSec(t.duration);
    P.title.textContent = t.title;
    P.artist.textContent = demo ? `${t.artist || ''} · vista previa sin audio` : (t.artist || '');
    P.cover.innerHTML = media(t.cover, i, '', '');
    buildWave(i); ui(0, demoDur);
    P.el.classList.add('show');
    document.body.classList.add('has-player');
    $$('.track').forEach((li) => li.classList.toggle('playing', Number(li.dataset.i) === i));
    if (!demo) audio.src = t.audio;
    if (autoplay) play(); else setPlaying(false);
  }
  function play() {
    if (cur < 0) { load(visibleIdx()[0] ?? 0); return; }
    if (demo) {
      cancelAnimationFrame(rafId);
      lastTs = performance.now();
      rafId = requestAnimationFrame(tick);
      setPlaying(true);
    } else {
      setPlaying(true);
      audio.play().catch((e) => { if (e?.name !== 'AbortError') toDemo(); });
    }
  }
  function pause() {
    cancelAnimationFrame(rafId);
    if (!demo) audio.pause();
    setPlaying(false);
  }
  function toggle() { isPlaying() ? pause() : play(); }
  function step(dir) {
    const list = visibleIdx();
    if (!list.length) return;
    const at = list.indexOf(cur);
    load(list[(at + dir + list.length) % list.length]);
  }
  const next = () => step(1);
  const prev = () => step(-1);
  function seek(f) {
    f = Math.min(1, Math.max(0, f));
    if (demo) { demoT = f * demoDur; ui(demoT, demoDur); }
    else if (isFinite(audio.duration)) { audio.currentTime = f * audio.duration; }
  }
  function closePlayer() {
    pause(); cur = -1;
    P.el.classList.remove('show');
    document.body.classList.remove('has-player');
    $$('.track.playing').forEach((li) => li.classList.remove('playing'));
  }

  function initPlayer() {
    Object.assign(P, { el: $('#player'), cover: $('#pCover'), title: $('#pTitle'), artist: $('#pArtist'), wave: $('#pWave'), time: $('#pTime') });
    if (!P.el) return;

    audio.addEventListener('timeupdate', () => { if (!demo) ui(audio.currentTime, isFinite(audio.duration) ? audio.duration : demoDur); });
    audio.addEventListener('ended', next);
    audio.addEventListener('error', () => { if (cur >= 0 && !demo) toDemo(); });

    $('#tracks')?.addEventListener('click', (e) => {
      const li = e.target.closest('.track');
      if (!li) return;
      const i = Number(li.dataset.i);
      i === cur ? toggle() : load(i);
    });
    $('#filters')?.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      const g = chip.dataset.genre;
      $$('.chip').forEach((c) => { const on = c === chip; c.classList.toggle('active', on); c.setAttribute('aria-pressed', String(on)); });
      $$('.track').forEach((li) => { li.hidden = !!g && li.dataset.genre !== g; li.classList.add('in'); });
    });

    $('#pPlay').addEventListener('click', toggle);
    $('#pNext').addEventListener('click', next);
    $('#pPrev').addEventListener('click', prev);
    $('#pClose').addEventListener('click', closePlayer);
    P.wave.addEventListener('click', (e) => { const r = P.wave.getBoundingClientRect(); seek((e.clientX - r.left) / r.width); });
    P.wave.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const now = demo ? demoT / demoDur : (audio.currentTime / audio.duration || 0);
      seek(now + (e.key === 'ArrowRight' ? 0.05 : -0.05));
    });
    window.addEventListener('keydown', (e) => {
      if (e.code !== 'Space' || cur < 0) return;
      if (e.target.closest('input, textarea, select, button, a, [role="slider"]')) return;
      e.preventDefault(); toggle();
    });
  }

  /* ======================================================================
     MODAL: fotos y vídeos
     ====================================================================== */
  const M = {};
  let mKind = '', mIdx = 0, lastFocus = null;

  function showModal() {
    const list = mKind === 'photo' ? gallery : videos;
    const item = list[mIdx];
    if (!item) return;
    M.body.className = 'modal-body' + (mKind === 'photo' ? ' photo' : '');
    M.el.classList.toggle('single', list.length < 2);

    if (mKind === 'photo') {
      M.body.innerHTML = media(item.src, mIdx + 2, 'Foto ' + pad2(mIdx + 1), item.caption);
      M.cap.textContent = `${pad2(mIdx + 1)} / ${pad2(list.length)} — ${item.caption || ''}`;
    } else {
      if (item.youtube) {
        M.body.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.youtube)}?autoplay=1&rel=0" title="${esc(item.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      } else if (item.file) {
        M.body.innerHTML = `<video src="${esc(item.file)}" controls autoplay playsinline${item.poster ? ` poster="${esc(item.poster)}"` : ''}></video>`;
      } else {
        M.body.innerHTML = media(item.poster, mIdx + 2, '', '') +
          `<div class="modal-empty"><strong>Aquí va tu vídeo</strong><span>Añade el ID de YouTube o un .mp4 en js/content.js</span></div>`;
      }
      M.cap.textContent = `${item.title || ''}${item.meta ? ' — ' + item.meta : ''}`;
    }
  }
  function openModal(kind, idx) {
    mKind = kind; mIdx = idx; lastFocus = document.activeElement;
    if (kind === 'video' && isPlaying()) pause();
    showModal();
    M.el.classList.add('open');
    document.body.classList.add('lock');
    $('#mClose').focus({ preventScroll: true });
  }
  function closeModal() {
    if (!M.el.classList.contains('open')) return;
    M.el.classList.remove('open');
    document.body.classList.remove('lock');
    M.body.innerHTML = '';
    lastFocus?.focus?.({ preventScroll: true });
  }
  function navModal(dir) {
    const n = (mKind === 'photo' ? gallery : videos).length;
    if (n < 2) return;
    mIdx = (mIdx + dir + n) % n;
    showModal();
  }

  function initModal() {
    Object.assign(M, { el: $('#modal'), body: $('#modalBody'), cap: $('#modalCap') });
    if (!M.el) return;
    document.addEventListener('click', (e) => {
      const v = e.target.closest('[data-video]');
      if (v) { openModal('video', Number(v.dataset.video)); return; }
      const p = e.target.closest('[data-photo]');
      if (p) openModal('photo', Number(p.dataset.photo));
    });
    $('#mClose').addEventListener('click', closeModal);
    $('#mPrev').addEventListener('click', () => navModal(-1));
    $('#mNext').addEventListener('click', () => navModal(1));
    M.el.addEventListener('click', (e) => { if (e.target === M.el || e.target.classList.contains('modal-stage')) closeModal(); });
    window.addEventListener('keydown', (e) => {
      if (!M.el.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') navModal(1);
      if (e.key === 'ArrowLeft') navModal(-1);
    });
  }

  /* ======================================================================
     FORMULARIO (abre el email del visitante con el mensaje ya escrito)
     Para recibirlo sin abrir su correo, conecta un servicio tipo Formspree.
     ====================================================================== */
  function initForm() {
    const f = $('#contactForm'), note = $('#formNote');
    if (!f) return;
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      $$('[required]', f).forEach((el) => {
        const bad = !el.value.trim() || (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value.trim()));
        el.classList.toggle('bad', bad);
        if (bad) ok = false;
      });
      if (!ok) { note.textContent = 'Revisa los campos marcados.'; return; }
      const d = new FormData(f);
      const subject = `[NeoVibez] ${d.get('type')} — ${d.get('name')}`;
      const body = `${d.get('message')}\n\n—\n${d.get('name')}\n${d.get('email')}`;
      location.href = `mailto:${D.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      note.textContent = 'Se ha abierto tu aplicación de correo con el mensaje listo para enviar.';
    });
    f.addEventListener('input', (e) => e.target.classList?.remove('bad'));
  }

  /* ======================================================================
     ARRANQUE
     ====================================================================== */
  render();
  fitText();
  initWaves();
  initScroll();
  initMenu();
  initPlayer();
  initModal();
  initForm();

  document.fonts?.ready.then(fitText);
  window.addEventListener('load', fitText);
  let rz;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(fitText, 80); });
})();

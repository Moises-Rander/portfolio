/* Moises Rander — portfolio
   Vanilla JS: language toggle, sticky nav state,
   scroll reveal, gallery tabs, lightbox. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ── Language (EN default, PT toggle) ── */
  function setLang(lang, persist) {
    root.setAttribute('lang', lang);
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === lang);
    });
    if (persist) store.set('lang', lang);
    var t = document.querySelector('title[data-en]');
    if (t) document.title = t.getAttribute('data-' + lang) || document.title;
  }
  setLang(store.get('lang') || 'en', false);
  document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang-btn'), true); });
  });


  /* ── Nav border on scroll ── */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Reveal on scroll ── */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Gallery tabs ── */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var buttons = group.querySelectorAll('[data-tab]');
    var panes = document.querySelectorAll('[data-pane]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-tab');
        buttons.forEach(function (b) { b.classList.toggle('active', b === btn); });
        panes.forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-pane') === id); });
      });
    });
  });

  /* ── Horizontal flow: fade edges while there is more to scroll ── */
  document.querySelectorAll('.flow-track').forEach(function (track) {
    var box = track.parentElement;
    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      box.classList.toggle('can-left', track.scrollLeft > 4);
      box.classList.toggle('can-right', max > 4 && track.scrollLeft < max - 4);
    };
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* ── Lightbox ── */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');
    var open = function (src, cap) {
      lbImg.src = src;
      lbCap.textContent = cap || '';
      lbCap.hidden = !cap;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    var close = function () {
      lb.classList.remove('open');
      lbImg.src = '';
      document.body.style.overflow = '';
    };
    document.querySelectorAll('[data-zoom]').forEach(function (el) {
      el.addEventListener('click', function () {
        var inner = el.tagName === 'IMG' ? el : el.querySelector('img');
        var full = el.getAttribute('data-zoom') || (inner && inner.src) || '';
        // Caption: the node visible in the active language. innerText is used on
        // purpose: textContent would also return the hidden translation.
        var fig = el.closest('figure') || el.parentElement;
        var pick = function (sel) {
          var found = '';
          if (fig) {
            fig.querySelectorAll(sel).forEach(function (n) {
              if (!found && n.offsetParent !== null) found = (n.innerText || '').trim();
            });
          }
          return found;
        };
        open(full, pick('figcaption b') || pick('figcaption'));
      });
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('.close')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
  }
})();

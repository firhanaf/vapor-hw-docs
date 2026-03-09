/* ─────────────────────────────────────────
   VAPOR-HW DOCS · app.js
───────────────────────────────────────── */

(function () {
  'use strict';

  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('overlay');
  const navItems  = document.querySelectorAll('.nav-item');

  /* ── SIDEBAR TOGGLE ── */
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener('click', closeSidebar);

  // Close when a nav link is clicked on mobile
  navItems.forEach(function (item) {
    item.addEventListener('click', function () {
      if (window.innerWidth <= 960) closeSidebar();
    });
  });

  // Close when resized back to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) closeSidebar();
  });

  /* ── ACTIVE NAV ON SCROLL ── */
  var sections = document.querySelectorAll('section[id]');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navItems.forEach(function (item) {
          item.classList.remove('active');
          if (item.getAttribute('href') === '#' + id) {
            item.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-15% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(function (s) { observer.observe(s); });

  /* ── COPY CODE ── */
  window.copyCode = function (btn) {
    var pre = btn.closest('.codeblock').querySelector('pre');
    var text = pre.innerText || pre.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopied(btn);
      }).catch(function () {
        fallbackCopy(text, btn);
      });
    } else {
      fallbackCopy(text, btn);
    }
  };

  function showCopied(btn) {
    var original = btn.textContent;
    btn.textContent = 'copied!';
    btn.style.color = '#4ade80';
    setTimeout(function () {
      btn.textContent = original;
      btn.style.color = '';
    }, 1600);
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCopied(btn);
    } catch (e) {
      btn.textContent = 'error';
    }
    document.body.removeChild(ta);
  }

})();

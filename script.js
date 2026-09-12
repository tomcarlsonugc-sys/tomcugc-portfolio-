// Shared site behavior: nav scroll state, mobile menu, YouTube lazy-embeds, email de-obfuscation.
(function () {
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  const toggle = document.getElementById('navToggle');
  const mnav = document.getElementById('mnav');
  if (toggle && mnav) {
    toggle.addEventListener('click', () => {
      const open = mnav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mnav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        mnav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  document.querySelectorAll('.frame[data-yt]').forEach((frame) => {
    const btn = frame.querySelector('.reel-play');
    const videoId = frame.dataset.yt;
    if (btn) btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z"/></svg>';
    function playVideo(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      if (frame.querySelector('iframe')) return;
      const iframe = document.createElement('iframe');
      iframe.className = 'reel-video';
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
      iframe.title = frame.dataset.title || 'UGC video example';
      iframe.loading = 'lazy';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      const img = frame.querySelector('img.reel-video');
      if (img) img.replaceWith(iframe);
      frame.classList.add('playing');
    }
    if (btn) btn.addEventListener('click', playVideo);
    frame.addEventListener('click', playVideo);
  });

  // Keeps the real address out of the raw page source to cut down on scraper spam,
  // while still rendering a normal mailto link for real visitors.
  const e = ['hello', 'tomcugc.com'].join('@');
  document.querySelectorAll('a[data-email]').forEach((a) => {
    const sub = a.getAttribute('data-subject');
    a.setAttribute('href', 'mailto:' + e + (sub ? '?subject=' + sub : ''));
    if (a.hasAttribute('data-email-text')) {
      const v = a.querySelector('.v') || a;
      v.textContent = e;
    }
  });
})();

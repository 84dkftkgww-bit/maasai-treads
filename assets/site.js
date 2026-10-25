// Shared page behaviour: mobile menu, footer year, reveal-on-scroll.
(function () {
  var header = document.querySelector('header');
  var btn = document.querySelector('.menu-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    header.querySelectorAll('.nav ul a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var els = document.querySelectorAll('.section-head, .cat, .mat, .steps li, .value, .contact-box, .order-grid > div');
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
})();

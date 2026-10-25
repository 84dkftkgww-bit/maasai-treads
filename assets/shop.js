// Renders the product cards for a category page from window.PRODUCTS (assets/products.js).
(function () {
  var WHATSAPP = '254769438328';
  var grid = document.getElementById('products');
  var key = document.body.dataset.category;
  var label = document.body.dataset.label;
  var items = (window.PRODUCTS || {})[key] || [];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function price(p) {
    return typeof p === 'number' && p > 0 ? 'KSh ' + p.toLocaleString('en-KE') : null;
  }

  document.getElementById('count').textContent = items.length + (items.length === 1 ? ' product' : ' products');

  grid.innerHTML = items.map(function (p, i) {
    var pr = price(p.price);
    var sizes = (p.sizes || []).map(function (s) {
      return '<label><input type="radio" name="size-' + i + '" value="' + esc(s) + '"><span>' + esc(s) + '</span></label>';
    }).join('');
    return '<article class="product" data-i="' + i + '">' +
      '<div class="img">' + (p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy">' : '<span class="ph">Photo coming soon</span>') + '</div>' +
      '<h3>' + esc(p.name) + '</h3>' +
      '<div class="price' + (pr ? '' : ' tbc') + '">' + (pr || 'Price on request') + '</div>' +
      (p.desc ? '<p class="desc">' + esc(p.desc) + '</p>' : '') +
      (sizes ? '<fieldset class="sizes"><legend>Size</legend><div>' + sizes + '</div></fieldset><p class="size-hint" aria-live="polite"></p>' : '') +
      '<div class="actions"><a class="btn btn-dark" href="#" data-order>Order on WhatsApp</a></div>' +
      '</article>';
  }).join('');

  grid.addEventListener('change', function (e) {
    var card = e.target.closest('.product');
    if (!card) return;
    card.querySelector('.sizes').classList.remove('need');
    card.querySelector('.size-hint').textContent = '';
  });

  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-order]');
    if (!btn) return;
    e.preventDefault();
    var card = btn.closest('.product');
    var p = items[+card.dataset.i];
    var picked = card.querySelector('.sizes input:checked');
    if (p.sizes && p.sizes.length && !picked) {
      card.querySelector('.sizes').classList.add('need');
      card.querySelector('.size-hint').textContent = 'Please choose a size.';
      return;
    }
    var msg = "Hi Maasai Treads, I'd like to order: " + p.name + ' (' + label + ')' +
      (picked ? ', size ' + picked.value : '') +
      (price(p.price) ? ', ' + price(p.price) : '') + '.';
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
})();

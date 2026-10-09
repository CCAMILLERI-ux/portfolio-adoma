/* Portfolio Caroline Camilleri — interactions légères (le site reste utilisable sans JS). */
(function () {
  'use strict';

  /* Hauteur de l'en-tête collant : les ancres ne passent pas dessous. */
  var header = document.querySelector('.site-header');
  function setHeaderHeight() {
    if (header) {
      document.documentElement.style.setProperty('--header-h', header.offsetHeight + 16 + 'px');
    }
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  /* Aperçus : l'image remplace l'emplacement seulement si elle existe. */
  document.querySelectorAll('[data-preview]').forEach(function (figure) {
    var img = figure.querySelector('img');
    var zoom = figure.querySelector('[data-zoom-open]');
    if (!img) return;

    function onLoad() {
      if (!img.naturalWidth) return onError();
      figure.classList.add('is-loaded');
      if (zoom) zoom.hidden = false;
    }
    function onError() {
      figure.classList.remove('is-loaded');
      if (zoom) zoom.hidden = true;
      else img.hidden = true;
    }

    if (img.complete) {
      img.naturalWidth ? onLoad() : onError();
    } else {
      img.addEventListener('load', onLoad);
      img.addEventListener('error', onError);
    }
  });

  /* Vidéo : le lecteur natif s'affiche seulement si le fichier MP4 est présent. */
  document.querySelectorAll('[data-video]').forEach(function (figure) {
    var video = figure.querySelector('video');
    if (!video) return;
    function show() {
      video.hidden = false;
      figure.classList.add('is-loaded');
    }
    if (video.readyState >= 1) show();
    else video.addEventListener('loadedmetadata', show, { once: true });
  });

  /* Agrandissement de la planche UI. */
  var dialog = document.getElementById('lightbox');
  var target = dialog && dialog.querySelector('[data-zoom-target]');
  var lastTrigger = null;

  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-zoom-open]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var source = btn.querySelector('img');
        target.src = source.currentSrc || source.src;
        target.alt = source.alt;
        lastTrigger = btn;
        dialog.showModal();
      });
    });

    dialog.querySelector('[data-zoom-close]').addEventListener('click', function () {
      dialog.close();
    });

    /* Clic sur le fond : fermeture. */
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', function () {
      if (lastTrigger) lastTrigger.focus();
    });
  } else {
    /* Navigateur sans <dialog> : ouvrir l'image dans un nouvel onglet. */
    document.querySelectorAll('[data-zoom-open]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var source = btn.querySelector('img');
        window.open(source.currentSrc || source.src, '_blank', 'noopener');
      });
    });
  }

  /* Navigation : indique la section en cours de lecture. */
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  if ('IntersectionObserver' in window && links.length) {
    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute('href').slice(1)] = link; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        } else if (link.getAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();

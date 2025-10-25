(function ($) {
  // =========================
// DOM Cache (restored)
// =========================
const $projectModal = $('#projectModal');
const $projectTitle = $('#projectTitle');
const $projectMeta = $('#projectMeta');
const $projectDescription = $('#projectDescription');
const $projectMainImage = $('#projectMainImage');
const $projectThumbnails = $('#projectThumbnails');
const $projectCertificates = $('#projectCertificates');

const $projectGrid = $('#projectGrid');
const $projectToggle = $('#projectToggle');
const $awardsGrid = $('#awardsGrid');

const $extracurricularGrid = $('#extracurricularGrid');
const $leadershipGrid = $('#leadershipGrid');

const $certificateModal = $('#certificateModal');
const $certificateModalImage = $('#certificateModalImage');
const $certificateModalTitle = $('#certificateModalTitle');
const $certificateModalMeta = $('#certificateModalMeta');
const $certificateModalDescription = $('#certificateModalDescription');

// Card template helper (restored)
function normaliseTileImage(image, fallbackTitle) {
  const fallbackAlt = fallbackTitle || 'Portfolio item preview';
  if (!image) {
    return { src: '', alt: fallbackAlt };
  }
  if (typeof image === 'string') {
    return { src: image, alt: fallbackAlt };
  }
  const src = image.src || '';
  const description = image.description || image.alt || '';
  const alt = description || fallbackAlt;
  return { src: src, alt: alt };
}

function tileHtml(id, image, title, tag, meta, summary) {
  const safeTitle = $('<div>').text(title || 'Detail').html();
  const { src, alt } = normaliseTileImage(image, title);
  const safeAlt = $('<div>').text(alt).html();
  return `
    <a href="#"
       class="activity-tile js-open-modal"
       role="button"
       data-id="${id}"
       aria-haspopup="dialog"
       aria-label="Open details for ${safeTitle}">
      <div class="activity-tile__image">
        <img src="${src}" alt="${safeAlt}" class="img-fluid" />
        <span class="tile-affordance" aria-hidden="true"><i class="fa fa-ellipsis-v"></i></span>
      </div>
      <div class="activity-tile__body">
        <span class="activity-tile__tag">${tag || ''}</span>
        <h4 class="activity-tile__title">${title || ''}</h4>
        <p class="activity-tile__meta">${meta || ''}</p>
        ${summary ? `<p class="activity-tile__summary">${summary}</p>` : ''}
      </div>
    </a>
  `;
}

  "use strict";
  var nav = $('nav');
  var navHeight = nav.outerHeight();

  $('.navbar-toggler').on('click', function() {
    if (!$('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  });

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Scroll helpers
  $('.scrolltop-mf').on("click", function () {
    $('html, body').animate({ scrollTop: 0 }, 1000);
  });

  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - navHeight + 5)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  $('.js-scroll').on("click", function () {
    $('.navbar-collapse').collapse('hide');
  });

  $('body').scrollspy({
    target: '#mainNav',
    offset: navHeight
  });

  $(window).trigger('scroll');
  $(window).on('scroll', function () {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-expand-md').addClass('navbar-reduce');
      $('.navbar-expand-md').removeClass('navbar-trans');
    } else {
      $('.navbar-expand-md').addClass('navbar-trans');
      $('.navbar-expand-md').removeClass('navbar-reduce');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

  // Typed
  if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
    new Typed('.text-slider', {
      strings: typed_strings.split(','),
      typeSpeed: 80,
      loop: true,
      backDelay: 1100,
      backSpeed: 30
    });
  }

  // =========================
  // Unified Content Data (loaded from JSON)
  // =========================

  let modalDetails = {};
  let projectCards = [];
  let activityDetails = {};
  let activityOrder = [];
  let awardsCards = [];
  let extracurricularIds = [];
  let leadershipIds = [];

  function hydrateContent(data) {
    if (!data || typeof data !== 'object') {
      console.error('Portfolio content data missing or invalid');
      showContentError();
      return;
    }

    modalDetails = data.modalDetails && typeof data.modalDetails === 'object' ? data.modalDetails : {};
    projectCards = Array.isArray(data.projectCards) ? data.projectCards : [];
    activityDetails = data.activityDetails && typeof data.activityDetails === 'object' ? data.activityDetails : {};
    const providedActivityOrder = Array.isArray(data.activityOrder) ? data.activityOrder : [];
    activityOrder = providedActivityOrder.length ? providedActivityOrder.slice() : Object.keys(activityDetails);
    activityOrder = activityOrder.filter(function (id) { return !!activityDetails[id]; });
    awardsCards = Array.isArray(data.awardsCards) ? data.awardsCards : [];

    extracurricularIds = activityOrder.filter(function (id) {
      return activityDetails[id] && activityDetails[id].group === 'extracurricular';
    });
    leadershipIds = activityOrder.filter(function (id) {
      return activityDetails[id] && activityDetails[id].group === 'leadership';
    });

    renderProjectGrid();
    renderAwardsGrid();
    renderActivitySection(extracurricularIds, $extracurricularGrid);
    renderActivitySection(leadershipIds, $leadershipGrid);
    updateSectionCounts();
    updateCounters();
    renderCertificateGallery();
  }

  function showContentError(message) {
    const fallback = message || 'Portfolio content is temporarily unavailable.';
    const errorHtml = '<div class="col-12"><p class="text-center text-danger">' + fallback + '</p></div>';

    if ($projectGrid.length) $projectGrid.html(errorHtml);
    if ($awardsGrid.length) $awardsGrid.html(errorHtml);
    if ($extracurricularGrid.length) $extracurricularGrid.html(errorHtml);
    if ($leadershipGrid.length) $leadershipGrid.html(errorHtml);
  }

  function loadContent() {
  const CANDIDATES = ['content.json', 'data/content.json'];

  function tryFetch(paths) {
    if (!paths.length) {
      console.error('No content.json found in expected locations');
      showContentError();
      return;
    }
    const url = paths[0];
    if (window.fetch) {
      fetch(url, { cache: 'no-cache' })
        .then(r => {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(hydrateContent)
        .catch(() => tryFetch(paths.slice(1)));
    } else if ($ && $.getJSON) {
      $.getJSON(url)
        .done(hydrateContent)
        .fail(() => tryFetch(paths.slice(1)));
    } else {
      console.error('No supported method available to load portfolio content');
      showContentError();
    }
  }

  tryFetch(CANDIDATES);
}

function showContentError(message) {
  const fallback = message || 'Portfolio content is temporarily unavailable.';
  const errorHtml = '<div class="col-12"><p class="text-center text-danger">' + fallback + '</p></div>';

  if ($projectGrid && $projectGrid.length) $projectGrid.html(errorHtml);
  if ($awardsGrid && $awardsGrid.length) $awardsGrid.html(errorHtml);
  if ($extracurricularGrid && $extracurricularGrid.length) $extracurricularGrid.html(errorHtml);
  if ($leadershipGrid && $leadershipGrid.length) $leadershipGrid.html(errorHtml);
}


  function renderProjectGrid() {
    if (!$projectGrid.length) return;
    $projectGrid.empty();

    const projectVisibleLimit = 6;
    projectCards.forEach((p, index) => {
      const hidden = index >= projectVisibleLimit ? ' d-none project-card--hidden' : '';
      const $col = $('<div/>', { class: `col-md-6 col-lg-4 mb-4${hidden}` });
      $col.html(tileHtml(p.id, { src: p.image, description: p.imageDescription }, p.title, p.tag, p.meta, p.summary));
      $projectGrid.append($col);
    });

    setupProjectToggle(projectCards.length, projectVisibleLimit);
  }

  function setupProjectToggle(total, limit) {
    if (!$projectToggle.length) return;
    if (total <= limit) {
      $projectToggle.addClass('d-none');
      return;
    }
    $projectToggle.removeClass('d-none').data('expanded', false).text('View All Projects');
    $projectToggle.off('click').on('click', function () {
      const expanded = $(this).data('expanded');
      const $hidden = $projectGrid.find('.project-card--hidden');
      if (expanded) {
        $hidden.addClass('d-none');
        $(this).text('View All Projects');
      } else {
        $hidden.removeClass('d-none');
        $(this).text('Show Fewer Projects');
      }
      $(this).data('expanded', !expanded);
    });
  }

  function renderActivitySection(ids, $grid) {
    if (!$grid.length) return;
    $grid.empty();
    ids.forEach(id => {
      const d = activityDetails[id];
      if (!d) return;
      const $col = $('<div/>', { class: 'col-md-6 col-lg-4 mb-4' });
      $col.html(tileHtml(id, { src: d.image, description: d.imageDescription }, d.title, d.tag, d.meta, d.summary));
      $grid.append($col);
    });
  }

  function renderAwardsGrid() {
    if (!$awardsGrid.length) return;
    $awardsGrid.empty();
    awardsCards.forEach(a => {
      const $col = $('<div/>', { class: 'col-md-6 col-lg-4 mb-4' });
      $col.html(tileHtml(a.id, { src: a.image, description: a.imageDescription }, a.title, a.tag, a.meta, a.summary));
      $awardsGrid.append($col);
    });
  }

  function updateSectionCounts() {
    $('#projectCount').text(`(${projectCards.length})`);
    $('#awardsCount').text(`(${awardsCards.length})`);
    $('#extracurricularCount').text(`(${activityOrder.filter(id => activityDetails[id].group==='extracurricular').length})`);
    $('#leadershipCount').text(`(${activityOrder.filter(id => activityDetails[id].group==='leadership').length})`);
  }

  function updateCounters() {
    $('#counterHonors').text(awardsCards.length);
    $('#counterResearch').text(projectCards.length);
    $('#counterLeadership').text(activityOrder.filter(id => activityDetails[id].group==='leadership').length);
    $('#counterActivities').text(activityOrder.length);
    if ($.fn.counterUp) {
      $('.counter').counterUp({ delay: 15, time: 2000 });
    }
  }

  // =========================
  // Modal helpers (Project Modal)
  // =========================
  function normaliseImages(detail) {
    const images = Array.isArray(detail.images) ? detail.images : [];
    const fallbackAlt = detail.title ? detail.title + ' preview image' : 'Project preview image';
    if (!images.length) {
      return [{ src: 'img/work-1.jpg', alt: fallbackAlt }];
    }
    return images.map(img => {
      if (!img) return null;
      if (typeof img === 'string') return { src: img, alt: fallbackAlt };
      if (!img.src) return null;
      return { src: img.src, alt: img.alt || fallbackAlt };
    }).filter(Boolean);
  }

  function setMainImage(src, altText) {
    if (!src) {
      $projectMainImage.attr('src', '').attr('alt', '');
      return;
    }
    $projectMainImage.attr('src', src).attr('alt', altText || 'Project preview image');
  }

  function renderImages(detail) {
    const images = normaliseImages(detail);
    const [primary] = images;
    setMainImage(primary ? primary.src : '', primary ? primary.alt : '');
    $projectThumbnails.empty();
    if (images.length <= 1) {
      $projectThumbnails.hide();
      return;
    }
    $projectThumbnails.show();
    images.forEach((image, index) => {
      const $btn = $('<button type="button" class="project-thumbnail"></button>');
      $btn.append($('<img/>', { src: image.src, alt: image.alt }));
      if (index === 0) $btn.addClass('is-active');
      $btn.on('click', function () {
        if ($btn.hasClass('is-active')) return;
        setMainImage(image.src, image.alt);
        $projectThumbnails.find('.project-thumbnail').removeClass('is-active');
        $btn.addClass('is-active');
      });
      $projectThumbnails.append($btn);
    });
  }

function renderCertificates(certificates, detail) {
  const items = Array.isArray(certificates) ? certificates.filter(Boolean) : [];
  $projectCertificates.empty().removeClass('project-certificates');
  if (!items.length) {
    $projectCertificates.html('<p class="project-certificate__empty">Supporting certificates will appear here when available.</p>');
    return;
  }
  $projectCertificates.addClass('project-certificates');
  items.forEach(c => {
    const $row = $('<div class="project-certificate"></div>');
    const $thumb = $('<div class="project-certificate__thumb"></div>');
    if (c.image) {
      $thumb.append($('<img/>', { src: c.image, alt: (c.title || 'Certificate') + ' preview' }));
    } else {
      $thumb.append('<i class="ion-ribbon-a"></i>');
    }

    const $text = $('<div class="project-certificate__text"></div>');

    // allow HTML in title
    if (c.title) $text.append($('<p class="project-certificate__title"></p>').html(c.title));

    const meta = [c.issuer, c.year].filter(Boolean).join(' • ');
    if (meta) $text.append($('<p class="project-certificate__meta"></p>').text(meta));

    // allow HTML in description (optional line, add only if you want inline descriptions under each certificate)
    if (c.description) {
      $text.append($('<div class="project-certificate__description"></div>').html(c.description));
    }

    if (c.link) {
      const $link = $('<a class="project-certificate__link" target="_blank" rel="noopener"><i class="ion-ios-open-outline"></i><span>View credential</span></a>').attr('href', c.link);
      $text.append($link);
    }

    $row.append($thumb, $text);

    // Click opens Certificate Modal
    if (c.image) {
      $row.addClass('project-certificate--clickable')
          .attr('tabindex','0')
          .data('full', c.image)
          .data('title', c.title || detail.title || 'Certificate')
          .data('meta', meta || '')
          .data('description', c.description || detail.description || '');
      $row.on('click keyup', function (ev) {
        if (ev.type === 'keyup' && ev.key !== 'Enter' && ev.key !== ' ') return;
        if ($(ev.target).closest('.project-certificate__link').length) return;
        openCertificateModal(this);
      });
    }

    $projectCertificates.append($row);
  });
}

function renderCertificateGallery() {
  const $grid = $('#certificateGrid');
  if (!$grid.length) return;

  const items = [];
  const seen = new Set();

  // 1) from project certificates
  Object.keys(modalDetails || {}).forEach(id => {
    const detail = modalDetails[id];
    const certs = Array.isArray(detail.certificates) ? detail.certificates : [];
    certs.forEach(c => {
      const title = c.title || detail.title || 'Certificate';
      const issuer = c.issuer || '';
      const year = c.year || '';
      const meta = [issuer, year].filter(Boolean).join(' · ');
      const image = c.image || '';
      const description = c.description || detail.description || '';
      const key = [title, meta, image].join('|');
      if (image && !seen.has(key)) {
        seen.add(key);
        items.push({ title, meta, image, description });
      }
    });
  });

  // 2) from awards (use certificateImage OR image)
  (awardsCards || []).forEach(a => {
    const image = a.certificateImage || a.image || '';
    if (!image) return;
    const title = a.certificateTitle || a.title || 'Certificate';
    const meta = a.certificateMeta || a.meta || '';
    const description = a.certificateDescription || a.summary || '';
    const key = [title, meta, image].join('|');
    if (!seen.has(key)) {
      seen.add(key);
      items.push({ title, meta, image, description });
    }
  });

  // 3) render
  $grid.empty();
  if (!items.length) {
    $grid.html('<div class="col-12"><p class="text-center text-muted">Certificates will appear here when added to projects or awards.</p></div>');
    return;
  }

  items.forEach(item => {
  const col = document.createElement('div');
  col.className = 'col-md-4 col-lg-3 mb-4';

  // Build the element without dangerous inline data-*
  // inside renderCertificateGallery() when building $card
const $card = $(`
  <a href="#" class="certificate-card" role="button" aria-controls="certificateModal"
     aria-label="Open certificate: ${$('<div>').text(item.title).html()}">
    <div class="certificate-card__frame">
      <img src="${item.image}" alt="${$('<div>').text(item.title).text()} certificate" class="img-fluid" />
      <span class="tile-affordance" aria-hidden="true"><i class="fa fa-ellipsis-v"></i></span>
    </div>
    <div class="certificate-card__caption">
      <h5>${item.title}</h5>
      <p>${item.meta}</p>
    </div>
  </a>
`);



  // Store values safely (no HTML injection into attributes)
  $card.data('full', item.image);
  $card.data('title', item.title);
  $card.data('meta', item.meta);
  $card.data('description', item.description); // can contain HTML

  $(col).append($card);
  $grid.append(col);
});

}


  function populateProjectModal(id) {
    const detail = modalDetails[id];
    if (!detail) return;
    $projectTitle.text(detail.title || 'Detail');
    const meta = [detail.category, detail.date].filter(Boolean).join(' • ');
    $projectMeta.text(meta);
    $projectDescription.html(detail.description || '');
    renderImages(detail);
    renderCertificates(detail.certificates, detail);
    $projectModal.modal('show');
  }

  // =========================
  // Certificate Modal open (unchanged)
  // =========================
function openCertificateModal(context) {
  if (!context || !$certificateModal.length) return;

  const $ctx = $(context);
  const imageSrc = $ctx.data('full') || $ctx.find('img').attr('src');
  const title = $ctx.data('title') || 'Certificate';
  const meta = $ctx.data('meta') || '';
  const description = $ctx.data('description') || '';

  // Set content
  $certificateModalImage
    .attr('src', imageSrc || '')
    .attr('alt', title);

  $certificateModalTitle.text(title);
  $certificateModalMeta.text(meta);
  $certificateModalDescription.html(description); // allow HTML

  // Reset orientation classes each time
  $certificateModal.removeClass('portrait landscape');

  // After the image is loaded, decide layout (portrait vs landscape)
  function applyOrientation() {
    const img = $certificateModalImage[0];
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    if (img.naturalHeight > img.naturalWidth) {
      // Portrait → side-by-side (image left, text right)
      $certificateModal.addClass('portrait');
    } else {
      // Landscape → keep stacked (no class needed, but add for clarity)
      $certificateModal.addClass('landscape');
    }
  }

  $certificateModalImage.off('load.certaspect').on('load.certaspect', applyOrientation);
  if ($certificateModalImage[0].complete) {
    // Cached image path
    applyOrientation();
  }
  // Decide portrait/landscape and toggle a *scoped* class only on big screens
const $modalRoot = $certificateModal;              // modal container
$modalRoot.removeClass('is-portrait');            // reset each time

$certificateModalImage.off('load._orient').on('load._orient', function () {
  const isPortrait = this.naturalHeight > this.naturalWidth;
  if (isPortrait && window.matchMedia('(min-width: 992px)').matches) {
    $modalRoot.addClass('is-portrait');
  } else {
    $modalRoot.removeClass('is-portrait');
  }
});


  $certificateModal.modal('show');
}



 

  // =========================
  // Init render
  // =========================
  loadContent();

  // Open the unified Project modal from any tile
  $(document).on('click', '.js-open-modal', function (e) {
    e.preventDefault();
    const id = $(this).data('id');
    if (id) populateProjectModal(id);
  });

  // optional keyboard support
  $(document).on('keyup', '.js-open-modal', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const id = $(this).data('id');
      if (id) populateProjectModal(id);
    }
  });

  // Delegated click: any tile opens the unified Project Modal
  $(document).on('click', '.certificate-card', function (event) {
    event.preventDefault();
    openCertificateModal(this);
  });
  $(document).on('keyup', '.certificate-card', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCertificateModal(this);
    }
  });

})(jQuery);

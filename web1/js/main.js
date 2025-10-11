(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
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

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
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

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
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

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	// Project detail modal
	$(function () {
		const projectDetails = {
			limneth: {
				title: 'Limneth Assistive AI System',
				category: 'Accessible Computing',
				date: 'SISTEMIC 2025 • Singapore',
				description: 'Designed a multimodal assistive platform that combines speech interfaces, computer vision and WebSocket automation so visually impaired users can navigate complex spaces independently. Embedded the model on an edge device with a cloud dashboard to monitor usage analytics.',
				images: [
					{ src: 'img/projects/limneth-cover.jpg', alt: 'Limneth assistive AI interface' },
					{ src: 'img/certificates/sistemic-2025.jpg', alt: 'SISTEMIC bronze medal certificate' }
				],
				certificates: [
					{ title: 'Singapore International STEM Innovation Challenge', issuer: 'National Junior College, Singapore', year: '2025', image: 'img/certificates/sistemic-2025.jpg' }
				]
			},
			'speech-detection': {
				title: 'Synthetic Speech Detection via Multi-Generator GANs',
				category: 'Machine Learning & Security',
				date: 'YSC 2025 • Thailand',
				description: 'Constructed an anomaly-aware GAN ensemble trained on diverse speech corpora to distinguish human voices from deepfakes. Delivered a production-ready API with improved equal error rate and interpretability visualisations for audio forensics stakeholders.',
				images: [
					{ src: 'img/projects/speech-detection.jpg', alt: 'Synthetic speech detection GAN workflow' },
					{ src: 'img/certificates/ysc-2025.jpg', alt: 'Young Scientist Competition gold medal certificate' }
				],
				certificates: [
					{ title: '27th Young Scientist Competition', issuer: 'NSTDA • Thailand', year: '2025', image: 'img/certificates/ysc-2025.jpg' },
					{ title: 'IEEE CIS Thailand Conference Presentation', issuer: 'IEEE Computational Intelligence Society Thailand Chapter', year: '2025' }
				]
			},
			'food-allergen': {
				title: 'Food Allergen Warning Program',
				category: 'Public Health Tech',
				date: 'New Gen Inventors Award 2025 • Thailand',
				description: 'Developed a machine learning pipeline that identifies risky ingredients for people with food allergies, paired with a personalised alert network for household use. Integrated a national ingredient database and push notifications to guide safe consumption.',
				images: [
					{ src: 'img/projects/food-allergen.jpg', alt: 'Food allergen warning dashboard' },
					{ src: 'img/certificates/new-gen-2025.jpg', alt: 'Thailand New Gen Inventors Award certificate' }
				],
				certificates: [
					{ title: 'Thailand New Gen Inventors Award', issuer: 'NSTDA & NRCT', year: '2025', image: 'img/certificates/new-gen-2025.jpg' },
					{ title: 'National Software Contest Finalist', issuer: 'NECTEC • Thailand', year: '2024' }
				]
			},
			'global-league': {
				title: 'Global Sports League Optimizer',
				category: 'Operations Research',
				date: 'IMMC 2025 • International',
				description: 'Formulated a decision-based annealing optimisation model that balances fairness, travel time and broadcast requirements for international sports leagues. Delivered sensitivity analyses and what-if scheduling scenarios for policy makers.',
				images: [
					{ src: 'img/projects/global-league.jpg', alt: 'Sports league scheduling optimisation results' }
				],
				certificates: [
					{ title: 'International Mathematical Modeling Challenge (IMMC)', issuer: 'IMMC 2025', year: '2025', image: 'img/certificates/ipst-camp.jpg' },
					{ title: 'High School Mathematical Contest in Modeling', issuer: 'COMAP • USA', year: '2024' }
				]
			},
			'go-kila': {
				title: 'GO-KILA Sports Matchmaking Platform',
				category: 'Start-up Engineering',
				date: 'Shark Tank TYP (in progress) • 2025',
				description: 'Architected a cloud-native platform that pairs amateur athletes with nearby teams using routing heuristics and live chat. Built the backend services, database design, and websocket-based messaging for real-time coordination.',
				images: [
					{ src: 'img/projects/go-kila.jpg', alt: 'GO-KILA sports platform mobile mockup' }
				],
				certificates: [
					{ title: 'Datathon 2025 ABData Science Elite Summer Camp', issuer: 'CHHK-Shenzhen & KVIS', year: '2025' }
				]
			},
			'enrollment-scanner': {
				title: 'KVIS OPH Enrollment Scanner',
				category: 'Data Systems',
				date: 'KVIS Open House 2023-2025',
				description: 'Engineered a computer-vision powered scanning pipeline that digitises student enrollment forms for large-scale events. Automated statistical analytics and deployed the solution on Flask with integrated Dewarp models for 2025 operations.',
				images: [
					{ src: 'img/projects/enrollment-scanner.jpg', alt: 'KVIS enrollment scanner web interface' }
				],
				certificates: [
					{ title: 'KVIS Open House Innovation Highlight', issuer: 'Kamnoetvidya Science Academy', year: '2025' }
				]
			}
		};

		const $modal = $('#projectModal');
		const $projectTitle = $('#projectTitle');
		const $projectMeta = $('#projectMeta');
		const $projectDescription = $('#projectDescription');
		const $projectMainImage = $('#projectMainImage');
		const $projectThumbnails = $('#projectThumbnails');
		const $projectCertificates = $('#projectCertificates');

		function normaliseImages(detail) {
			const images = Array.isArray(detail.images) ? detail.images : [];
			const fallbackAlt = detail.title ? detail.title + ' preview image' : 'Project preview image';
			if (!images.length) {
				return [{ src: 'img/work-1.jpg', alt: fallbackAlt }];
			}
			return images
				.map(image => {
					if (!image) {
						return null;
					}
					if (typeof image === 'string') {
						return { src: image, alt: fallbackAlt };
					}
					if (!image.src) {
						return null;
					}
					return {
						src: image.src,
						alt: image.alt || fallbackAlt
					};
				})
				.filter(Boolean);
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
			const hasMultiple = images.length > 1;
			const [primaryImage] = images;
			setMainImage(primaryImage ? primaryImage.src : '', primaryImage ? primaryImage.alt : '');
			$projectThumbnails.empty();
			$projectThumbnails.toggle(hasMultiple);
			if (!hasMultiple) {
				return;
			}
			images.forEach((image, index) => {
				const $button = $('<button type="button" class="project-thumbnail"></button>');
				$button.append($('<img />', { src: image.src, alt: image.alt }));
				if (index === 0) {
					$button.addClass('is-active');
				}
				$button.on('click', function () {
					if ($button.hasClass('is-active')) {
						return;
					}
					setMainImage(image.src, image.alt);
					$projectThumbnails.find('.project-thumbnail').removeClass('is-active');
					$button.addClass('is-active');
				});
				$projectThumbnails.append($button);
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
			items.forEach(certificate => {
				const $certificate = $('<div class="project-certificate"></div>');
				const $thumb = $('<div class="project-certificate__thumb"></div>');
				if (certificate.image) {
					$thumb.append($('<img />', {
						src: certificate.image,
						alt: certificate.title ? certificate.title + ' preview' : 'Certificate thumbnail'
					}));
				} else {
					$thumb.append('<i class="ion-ribbon-a"></i>');
				}
				const $text = $('<div class="project-certificate__text"></div>');
				if (certificate.title) {
					$text.append($('<p class="project-certificate__title"></p>').text(certificate.title));
				}
				const metaParts = [certificate.issuer, certificate.year].filter(Boolean);
				const metaText = metaParts.join(' • ');
				if (metaParts.length) {
					$text.append($('<p class="project-certificate__meta"></p>').text(metaText));
				}
				if (certificate.link) {
					const $link = $('<a class="project-certificate__link" target="_blank" rel="noopener"></a>')
						.attr('href', certificate.link)
						.html('<i class="ion-ios-open-outline"></i><span>View credential</span>');
					$text.append($link);
				}
				$certificate.append($thumb, $text);
				if (certificate.image) {
					$certificate
						.addClass('project-certificate--clickable')
						.attr('tabindex', '0')
						.attr('data-full', certificate.image)
						.attr('data-title', certificate.title || (detail && detail.title) || 'Certificate');
					if (metaText) {
						$certificate.attr('data-meta', metaText);
					}
					const description = certificate.description || (detail && detail.description) || '';
					if (description) {
						$certificate.attr('data-description', description);
					}
					$certificate.on('click keyup', function (event) {
						if (event.type === 'keyup' && event.key !== 'Enter' && event.key !== ' ') {
							return;
						}
						if ($(event.target).closest('.project-certificate__link').length) {
							return;
						}
						event.preventDefault();
						openCertificateModal(this);
					});
				}
				$projectCertificates.append($certificate);
			});
		}

		function populateProjectModal(projectId) {
			const detail = projectDetails[projectId];
			if (!detail) {
				return;
			}
			$projectTitle.text(detail.title || 'Project detail');
			const metaParts = [detail.category, detail.date].filter(Boolean);
			$projectMeta.text(metaParts.join(' • '));
			$projectDescription.text(detail.description || 'Add a short project overview to give visitors context.');
			renderImages(detail);
			renderCertificates(detail.certificates, detail);
			$modal.modal('show');
		}

		$('.work-box__link').on('click', function (event) {
			const projectId = $(this).closest('.work-box').data('project');
			if (!projectId) {
				return;
			}
			event.preventDefault();
			populateProjectModal(projectId);
		});
	});

	// Certificate modal
	const $certificateModal = $('#certificateModal');
	const $certificateModalImage = $('#certificateModalImage');
	const $certificateModalTitle = $('#certificateModalTitle');
	const $certificateModalMeta = $('#certificateModalMeta');
	const $certificateModalDescription = $('#certificateModalDescription');

	function openCertificateModal(context) {
		if (!context || !$certificateModal.length) {
			return;
		}
		const $context = $(context);
		const imageSrc = $context.data('full') || $context.find('img').attr('src');
		const title = $context.data('title') || 'Certificate';
		const meta = $context.data('meta') || '';
		const description = $context.data('description') || '';
		$certificateModalImage.attr('src', imageSrc || '').attr('alt', title);
		$certificateModalTitle.text(title);
		$certificateModalMeta.text(meta);
		$certificateModalDescription.text(description);
		$certificateModal.modal('show');
	}

	$('.certificate-card').on('click', function (event) {
		event.preventDefault();
		openCertificateModal(this);
	});

	$('.certificate-card').on('keyup', function (event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			openCertificateModal(this);
		}
	});

	// Activity modal
	const activityDetails = {
		jstp: {
			title: 'Junior Science Talent Project (JSTP-SCB)',
			tag: 'STEM Outreach Mentor',
			meta: 'Mentor · 2023-2025 · NSTDA Thailand',
			summary: 'Guided JSTP-SCB scholars by translating AI research journeys into hands-on, student-led prototypes.',
			highlights: [
				'Built machine learning sprint curriculum covering data collection, ethics, and deployment.',
				'Reviewed project roadmaps and presentation scripts for the national innovation stage.',
				'Led reflection clinics that refined problem statements and user impact stories.'
			],
			image: 'img/activities/jstp-scb.jpg'
		},
		'open-house': {
			title: 'KVIS Open House Enrollment Scanner',
			tag: 'Applied AI Developer',
			meta: 'Lead Engineer · 2023-2025 · Kamnoetvidya Science Academy',
			summary: 'Engineered the computer vision pipeline that digitises enrolment flows for 2,500+ visitors annually.',
			highlights: [
				'Implemented detection, alignment, and OCR stack with automated analytics dashboards.',
				'Trained volunteers to operate the scanning workflow and troubleshoot baseline edge cases.',
				'Deployed Flask-based microservices so visitors could retrieve personalised insights instantly.'
			],
			image: 'img/activities/kvis-open-house.jpg'
		},
		kvisdom: {
			title: 'KVISDOM YouTube Channel',
			tag: 'Executive Producer',
			meta: 'Production Lead · 2023-2025 · Thailand',
			summary: 'Produces national STEM broadcasts that translate complex research into accessible storytelling.',
			highlights: [
				'Orchestrated filming, editing, and live-streaming schedules across student creator teams.',
				'Adopted data-driven content planning to improve viewer engagement and retention.',
				'Delivered multi-camera coverage for flagship KVIS events and national olympiad briefings.'
			],
			image: 'img/activities/kvisdom.jpg'
		},
		'mentor-singapore': {
			title: 'Mentor for Juniors\' Projects',
			tag: 'Cross-border Mentor',
			meta: 'Coach · 2024-2025 · Thailand & Singapore',
			summary: 'Coached Thai and Singaporean student teams in speech technology, UX research, and deployment.',
			highlights: [
				'Introduced version-controlled workflows and Git hygiene for distributed collaboration.',
				'Mapped model evaluation metrics to user acceptance criteria for competition judges.',
				'Facilitated design critiques that strengthened pitch decks and live demos.'
			],
			image: 'img/activities/mentor-singapore.jpg'
		},
		'datascience-camp': {
			title: 'ABData Science Elite Summer Camp',
			tag: 'International Delegate',
			meta: 'Participant · Jul-Aug 2025 · CUHK Shenzhen',
			summary: 'Collaborated with global peers on datathon challenges spanning sustainability and smart cities.',
			highlights: [
				'Developed predictive pipelines with new teammates under 24-hour hackathon constraints.',
				'Shared Thai community datasets to explore cross-cultural bias mitigation strategies.',
				'Presented cross-border insights to delegates from Greater Bay Area universities.'
			],
			image: 'img/activities/datascience-camp.jpg'
		},
		photography: {
			title: 'KVIS Event Photographer',
			tag: 'Creative Arts Lead',
			meta: 'Photographer · 2023-2025 · Kamnoetvidya Science Academy',
			summary: 'Documented major academic and cultural events, crafting the visual narrative of campus life.',
			highlights: [
				'Produced photo essays for sports days, festivals, and national competition send-offs.',
				'Coordinated asset delivery to media teams for same-day social coverage.',
				'Taught junior photographers framing, lighting, and storytelling basics.'
			],
			image: 'img/activities/photography.jpg'
		},
		'student-committee': {
			title: 'Head of IT · KVIS Student Committee',
			tag: 'Digital Transformation',
			meta: 'Executive Board · 2024-2025 · KVIS',
			summary: 'Modernised committee operations with a campus-wide booking and communications platform.',
			highlights: [
				'Migrated fragmented spreadsheets into a secure, real-time booking system.',
				'Led user testing sessions with teachers, staff, and students to refine UX flows.',
				'Implemented analytics dashboards to forecast resource usage and collisions.'
			],
			image: 'img/leadership/student-committee.jpg'
		},
		fisym: {
			title: 'Vice President · FiSym Club',
			tag: 'Finance Literacy',
			meta: 'Executive Team · 2023-2024 · KVIS',
			summary: 'Built financial literacy programmes that demystify personal finance and investing for teens.',
			highlights: [
				'Designed simulation portfolios with risk profiling tailored to student interests.',
				'Invited industry mentors to host Q&A clinics on macro trends and wealth planning.',
				'Published actionable playbooks on budgeting, saving, and ethical investing.'
			],
			image: 'img/leadership/fisym.jpg'
		},
		animators: {
			title: 'President · Animator\'s Tournament Club',
			tag: 'Creative Leadership',
			meta: 'Club President · 2024-2025 · KVIS',
			summary: 'Expanded a 3D animation community that fuses storytelling, Blender skills, and showcase events.',
			highlights: [
				'Authored the training roadmap from storyboarding to final renders for 17 members.',
				'Coordinated with faculty advisors on equipment, venue logistics, and event curation.',
				'Delivered live demos and exhibitions during festivals to inspire new cohorts.'
			],
			image: 'img/leadership/animators-club.jpg'
		},
		'student-council': {
			title: 'Executive · KVIS Student Council',
			tag: 'Policy & Governance',
			meta: 'Elected Leader · 2023-2025 · KVIS',
			summary: 'Steered campus-wide policy proposals, debates, and student-led civic engagement.',
			highlights: [
				'Organised public forums to gather insights ahead of school-wide referendums.',
				'Crafted communications that clarified policy impacts and vote logistics.',
				'Partnered with committee heads to align initiatives across departments.'
			],
			image: 'img/leadership/student-council.jpg'
		},
		'give-got-grown': {
			title: 'Co-founder · Give Got Grown Volunteer Group',
			tag: 'Social Innovation',
			meta: 'Founder · 2024-2025 · Thailand',
			summary: 'Mobilised volunteers to design exercise kits and wellness activities for rural communities.',
			highlights: [
				'Fundraised through community campaigns, delivering exercise kits and education.',
				'Built partnerships with local schools to schedule wellness workshops.',
				'Managed digital comms to recruit peers and report on impact transparently.'
			],
			image: 'img/leadership/give-got-grown.jpg'
		},
		'school-choir': {
			title: 'Bass Section · KVIS School Choir',
			tag: 'Community Spirit',
			meta: 'Performer · 2024 · KVIS',
			summary: 'Contributed to the choir\'s signature performances, celebrating school heritage and gratitude.',
			highlights: [
				'Performed the Wai Khru tribute, honouring teachers with traditional repertoire.',
				'Balanced vocal training with academic commitments through disciplined practice.',
				'Helped spark participation from classmates who were new to performing arts.'
			],
			image: 'img/leadership/school-choir.jpg'
		}
	};

	const $activityModal = $('#activityModal');
	const $activityModalImage = $('#activityModalImage');
	const $activityModalTag = $('#activityModalTag');
	const $activityModalTitle = $('#activityModalTitle');
	const $activityModalMeta = $('#activityModalMeta');
	const $activityModalSummary = $('#activityModalSummary');
	const $activityModalHighlights = $('#activityModalHighlights');

	function populateActivityModal(activityId) {
		const detail = activityDetails[activityId];
		if (!detail || !$activityModal.length) {
			return;
		}
		if (detail.tag) {
			$activityModalTag.text(detail.tag).show();
		} else {
			$activityModalTag.hide().text('');
		}
		$activityModalTitle.text(detail.title || 'Activity');
		$activityModalMeta.text(detail.meta || '');
		$activityModalSummary.text(detail.summary || '');
		const highlights = Array.isArray(detail.highlights) ? detail.highlights.filter(Boolean) : [];
		$activityModalHighlights.empty();
		if (highlights.length) {
			highlights.forEach(item => {
				$activityModalHighlights.append($('<li></li>').text(item));
			});
			$activityModalHighlights.show().attr('aria-hidden', 'false');
		} else {
			$activityModalHighlights.hide().attr('aria-hidden', 'true');
		}
		const imageSrc = detail.image || 'img/overlay-bg.jpg';
		$activityModalImage.attr('src', imageSrc).attr('alt', detail.title || 'Activity feature visual');
		$activityModal.modal('show');
	}

	$('.activity-tile').on('click', function (event) {
		event.preventDefault();
		const activityId = $(this).data('activity');
		populateActivityModal(activityId);
	});

	$('.activity-tile').on('keyup', function (event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			const activityId = $(this).data('activity');
			populateActivityModal(activityId);
		}
	});

})(jQuery);

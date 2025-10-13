(function ($) {
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
  // Unified Content Data
  // =========================

  // 1) Project-style modal details (used by ALL sections’ popups)
  const modalDetails = {
    // Projects
    limneth: {
      title: 'Lumineth Assistive Smart Assisstive System for the Visually Impaired',
      category: 'Embeded & Networking systems',
      date: 'SISTEMIC 2025 • Singapore',
      description: 'Built on a WebSocket-based server-client architecture for real-time communication: I designed a multimodal assistive wearable system that combines speech interfaces, helping blind users navigate urban environments. Developed real-time scene narration, obstacle detection, face recognition, emotion analysis, and more to help make user life easier.',
      images: [
        { src: 'img/projects/lumineth-cover.jpeg', alt: 'Lumineth system worn by Tames' },
        { src: 'img/projects/Lu1.jpg', alt: 'Awarding ceremony' },
		{ src: 'img/projects/Lu2.jpg', alt: 'Tames presenting the product to other international students' },
		{ src: 'img/projects/Lu3.jpg', alt: 'Tames was welcomed home by school representatives' },
      ],
      certificates: [
        { title: 'Singapore International STEM Innovation Challenge: Bronze medal', issuer: 'National Junior College, Singapore', year: '2025', image: 'img/certificates/sistemic.png' }
      ]
    },
    'speech-detection': {
      title: 'Synthetic Speech Detection via Multi-Generator GANs with Anomaly Detection Architectures',
      category: 'Machine Learning & Security',
      date: 'ICITEE 2025 • YSC 2025 • KVIS Final project• Thailand',
      description: 'Design an improved anomaly-based mGANs architecture (eD-AnoGAN and RES-mGANomaly) with high accuracy for diverse/generalized datasets to classify synthetic speech and human speech by imposing the multi-generator and latent consistency loss concept. Developed a baseline for adapting a multi-generator approach to human voice tasks, improving cybersecurity measures.',
      images: [
        { src: 'img/projects/YSC0.jpeg', alt: 'Synthetic speech detection GAN workflow' },
        { src: 'img/projects/YSC1.jpg', alt: 'Young Scientist Competition gold medal certificate' }
      ],
      certificates: [
        { title: '27th Young Scientist Competition: Gold Medal', issuer: 'NSTDA • Thailand', year: '2025', image: 'img/certificates/ysc.png' },
        { title: 'IEEE CIS Thailand Conference Presentation', issuer: 'IEEE Computational Intelligence Society Thailand Chapter', year: '2025' }
      ]
    },
    'food-allergen': {
      title: 'Food Allergen Warning Program',
      category: 'Machine learning & Public Health Tech',
      date: 'NSC 2024 • New Gen Inventors Award 2025 • Thailand',
      description: 'Developed a computer vision machine learning model that can accurately identify the type and ingredients of food from their images with an integrated database for user personalization and deploy using a sophisticated computer network model so users can access the program conveniently and efficiently. Reduced the risk of food consumption for individuals with food allergies, making their lives easier.' + 
	  ' <a href="https://app.kvis.ac.th/foodallergies/" target="_blank" rel="noopener">Click here to visit the website</a>.',
      images: [
        { src: 'img/projects/inewgen0.jpg', alt: 'Food allergen warning program for people with food allergy' },
		{ src: 'img/projects/inewgen2.png', alt: 'Food allergen warning program for people with food allergy' },
		{ src: 'img/projects/inewgen3.jpg', alt: 'Food allergen warning program for people with food allergy' },
		{ src: 'img/projects/inewgen4.jpg', alt: 'Food allergen warning program for people with food allergy' },
		{ src: 'img/projects/inewgen5.jpg', alt: 'Food allergen warning program for people with food allergy' },
		{ src: 'img/projects/NSC0.jpg', alt: 'Food allergen warning program for people with food allergy' },
		{ src: 'img/projects/NSC1.jpg', alt: 'Food allergen warning program for people with food allergy' },
      ],
      certificates: [
        { title: 'Thailand New Gen Inventors Award: Silver Medal', issuer: 'NSTDA & NRCT', year: '2025', image: 'img/certificates/inewgen0.png' },
		{ title: 'Thailand New Gen Inventors Award: Popular Vote', issuer: 'NSTDA & NRCT', year: '2025', image: 'img/certificates/inewgen1.jpeg' },
        { title: 'National Software Contest Finalist', issuer: 'NECTEC • Thailand', year: '2024' }
      ]
    },
    'global-league': {
      title: 'Global Sports League Optimizer',
      category: 'Operations Research',
      date: 'IMMC 2025 • International',
      description: 'Formulated a decision-based annealing optimisation model that balances fairness, travel time and broadcast requirements for international sports leagues. Delivered sensitivity analyses and what-if scheduling scenarios for policy makers.',
      images: [{ src: 'img/projects/global-league.jpg', alt: 'Sports league scheduling optimisation results' }],
      certificates: [
        { title: 'International Mathematical Modeling Challenge (IMMC)', issuer: 'IMMC 2025', year: '2025' },
        { title: 'High School Mathematical Contest in Modeling', issuer: 'COMAP • USA', year: '2024' }
      ]
    },
    'go-kila': {
      title: 'GO-KILA Sports Matchmaking Platform',
      category: 'Start-up Engineering',
      date: 'Shark Tank TYP (in progress) • 2025',
      description: 'Architected a cloud-native platform that pairs amateur athletes with nearby teams using routing heuristics and live chat. Built the backend services, database design, and websocket-based messaging for real-time coordination.',
      images: [{ src: 'img/projects/go-kila.jpg', alt: 'GO-KILA sports platform mobile mockup' }],
      certificates: [
        { title: 'Datathon 2025 ABData Science Elite Summer Camp', issuer: 'CHHK-Shenzhen & KVIS', year: '2025' }
      ]
    },
    'enrollment-scanner': {
      title: 'KVIS OPH Enrollment Scanner',
      category: 'Data Systems',
      date: 'KVIS Open House 2023-2025',
      description: 'Engineered a computer-vision powered scanning pipeline that digitises student enrollment forms for large-scale events. Automated statistical analytics and deployed the solution on Flask with integrated Dewarp models for 2025 operations.',
      images: [{ src: 'img/projects/enrollment-scanner.jpg', alt: 'KVIS enrollment scanner web interface' }],
      certificates: [
        { title: 'KVIS Open House Innovation Highlight', issuer: 'Kamnoetvidya Science Academy', year: '2025' }
      ]
    },
    'surveillance-optimization': {
      title: 'Surveillance Coverage Optimizer',
      category: 'Intelligent Systems',
      date: '2024 · Thailand',
      description: 'Designed a ray-tracing, simulated annealing, and genetic programming workflow to maximise CCTV coverage for critical facilities.',
      images: [{ src: 'img/projects/surveillance-optimization.jpg', alt: 'Visualising optimised CCTV coverage layout' }],
      certificates: [
        { title: 'High School Mathematical Contest in Modeling', issuer: 'COMAP • USA', year: '2024' }
      ]
    },
    'stock-predictor': {
      title: 'S&P 500 Stock Market Prediction',
      category: 'Financial Data Science',
      date: '2024 · Thailand',
      description: 'Built an ensemble of XGBoost, CatBoost, and random forest models with feature engineering pipelines to forecast S&P 500 trends for FiSym investment coaching.',
      images: [{ src: 'img/projects/stock-predictor.jpg', alt: 'Dashboard visualising S&P 500 prediction signals' }],
      certificates: []
    },

    // Extracurricular and Leadership transformed to project-style popups
    'jstp': {
      title: 'Junior Science Talent Project (JSTP-SCB)',
      category: 'STEM Outreach',
      date: 'Mentor • 2023-2025 • NSTDA Thailand',
      description: 'Guided JSTP-SCB scholars by translating AI research journeys into hands-on, student-led prototypes.',
      images: [{ src: 'img/activities/jstp-scb.jpg', alt: 'JSTP-SCB mentoring' }],
      certificates: []
    },
    'open-house': {
      title: 'KVIS Open House Enrollment Scanner',
      category: 'Applied AI',
      date: 'Lead Engineer • 2023-2025 • Kamnoetvidya Science Academy',
      description: 'Engineered the computer vision pipeline that digitises enrolment flows for 2,500+ visitors annually.',
      images: [{ src: 'img/activities/kvis-open-house.jpg', alt: 'KVIS Open House scanner' }],
      certificates: []
    },
    'mentor-singapore': {
      title: "Mentor for Juniors' Projects",
      category: 'Cross-border Mentor',
      date: 'Coach • 2024-2025 • Thailand & Singapore',
      description: 'Coached Thai and Singaporean student teams in speech technology, UX research, and deployment.',
      images: [{ src: 'img/activities/mentor-singapore.jpg', alt: 'Mentoring cross-border teams' }],
      certificates: []
    },
    'international-camp': {
      title: 'ABData Science Elite Summer Camp',
      category: 'International Delegate',
      date: 'Participant • Jul-Aug 2025 • CUHK Shenzhen',
      description: 'Collaborated with global peers on datathon challenges spanning sustainability and smart cities.',
      images: [{ src: 'img/activities/datascience-camp.jpg', alt: 'Data science camp' }],
      certificates: []
    },
    'kvisdom': {
      title: 'KVISDOM YouTube Channel',
      category: 'Media Production',
      date: 'Executive Producer • 2023-2025 • Thailand',
      description: 'Produces national STEM broadcasts that translate complex research into accessible storytelling.',
      images: [{ src: 'img/activities/kvisdom.jpg', alt: 'KVISDOM channel production' }],
      certificates: []
    },
    'photography': {
      title: 'KVIS Event Photographer',
      category: 'Creative Arts',
      date: 'Photographer • 2023-2025 • KVIS',
      description: 'Documented major academic and cultural events, crafting the visual narrative of campus life.',
      images: [{ src: 'img/activities/photography.jpg', alt: 'Event photography' }],
      certificates: []
    },
    'school-choir': {
      title: 'KVIS School Choir · Bass Section',
      category: 'Community Spirit',
      date: 'Performer • 2024 • KVIS',
      description: 'Contributed to signature performances celebrating school heritage and gratitude.',
      images: [{ src: 'img/leadership/school-choir.jpg', alt: 'School choir' }],
      certificates: []
    },
    'fisym-club': {
      title: 'FiSym Club · Vice President',
      category: 'Finance Literacy',
      date: 'Executive Team • 2023-2024 • KVIS',
      description: 'Built financial literacy programmes that demystify personal finance and investing for teens.',
      images: [{ src: 'img/leadership/fisym.jpg', alt: 'FiSym club' }],
      certificates: []
    },
    'animators-club': {
      title: "Animator's Tournament Club · President",
      category: 'Creative Leadership',
      date: 'Club President • 2024-2025 • KVIS',
      description: 'Expanded a 3D animation community that fuses storytelling, Blender skills, and showcase events.',
      images: [{ src: 'img/leadership/animators-club.jpg', alt: 'Animator club' }],
      certificates: []
    },
    'student-committee': {
      title: 'KVIS Student Committee · Head of IT',
      category: 'Digital Transformation',
      date: 'Executive Board • 2024-2025 • KVIS',
      description: 'Modernised committee operations with a campus-wide booking and communications platform.',
      images: [{ src: 'img/leadership/student-committee.jpg', alt: 'Student committee IT' }],
      certificates: []
    },
    'student-council': {
      title: 'KVIS Student Council · Executive',
      category: 'Policy & Governance',
      date: 'Elected Leader • 2023-2025 • KVIS',
      description: 'Steered campus-wide policy proposals, debates, and student-led civic engagement.',
      images: [{ src: 'img/leadership/student-council.jpg', alt: 'Student council' }],
      certificates: []
    },
    'give-got-grown': {
      title: 'Give Got Grown Volunteer Group · Co-founder',
      category: 'Social Innovation',
      date: 'Founder • 2024-2025 • Thailand',
      description: 'Mobilised volunteers to design exercise kits and wellness activities for rural communities.',
      images: [{ src: 'img/leadership/give-got-grown.jpg', alt: 'Give Got Grown' }],
      certificates: []
    },

    // Awards as project-style modal entries
    'award-sistemic-2025': {
      title: 'Singapore International STEM Innovation Challenge 2025',
      category: 'Award',
      date: 'Bronze Medalist • NJC, Singapore • 2025',
      description: 'Represented KVIS with Limneth, an assistive AI for the visually impaired, and secured the Bronze Medal among 64 schools worldwide.',
      images: [{ src: 'img/certificates/sistemic-2025.jpg', alt: 'SISTEMIC 2025 certificate' }],
      certificates: [{ title: 'SISTEMIC 2025', issuer: 'National Junior College', year: '2025', image: 'img/certificates/sistemic-2025.jpg' }]
    },
    'award-cat-2025': {
      title: 'Computational & Algorithmic Thinking 2024-2025',
      category: 'Award',
      date: 'Silver & Distinction • Thailand • 2025',
      description: 'Earned national silver (2024) and bronze (2025) with global Distinction ranking from the Australian Mathematics Trust.',
      images: [],
      certificates: []
    },
    'award-immc-2025': {
      title: '1st International Mathematical Modeling Challenge 2025',
      category: 'Award',
      date: 'Honorable Mention • Global Online • 2025',
      description: 'Led Thailand’s four-person team to optimise sports scheduling with decision-based annealing, earning the international Honorable Mention.',
      images: [],
      certificates: []
    },
    'award-newgen-2025': {
      title: 'Thailand New Gen Inventors Award 2025',
      category: 'Award',
      date: 'Silver & Popular Vote • BITEC Bangkok • 2025',
      description: 'Developed the food allergen warning platform and won both the Silver Medal and national Popular Vote among 1,549 teams.',
      images: [{ src: 'img/certificates/new-gen-2025.jpg', alt: 'New Gen 2025 certificate' }],
      certificates: [{ title: 'New Gen 2025', issuer: 'NSTDA & NRCT', year: '2025', image: 'img/certificates/new-gen-2025.jpg' }]
    },
    'award-ysc-2025': {
      title: '27th Young Scientist Competition 2025',
      category: 'Award',
      date: 'Gold Medalist • NSTDA • 2025',
      description: 'Awarded Gold for the multi-generator GAN speech detection research and invited to present at IEEE CIS Thailand.',
      images: [{ src: 'img/certificates/ysc-2025.jpg', alt: 'YSC 2025 certificate' }],
      certificates: [{ title: 'YSC 2025', issuer: 'NSTDA', year: '2025', image: 'img/certificates/ysc-2025.jpg' }]
    },
    'award-hscm-2024': {
      title: 'High School Mathematical Contest in Modeling 2024',
      category: 'Award',
      date: 'Honorable Mention • Global Online • 2024',
      description: 'Received Honorable Mention among 1,055 teams for modelling Olympic scheduling with SARIMAX forecasting.',
      images: [],
      certificates: []
    },
    'award-simsat-2024': {
      title: 'Siriraj Mathematics and Science Aptitude Test 2024',
      category: 'Award',
      date: '2nd Runner-Up • Bangkok • 2024',
      description: 'Placed top three among 1,303 national teams while representing Siriraj Hospital’s STEM knowledge evaluation.',
      images: [{ src: 'img/certificates/simsat-2024.jpg', alt: 'SIMSAT certificate' }],
      certificates: [{ title: 'Siriraj SIMSAT', issuer: 'Siriraj Hospital', year: '2024', image: 'img/certificates/simsat-2024.jpg' }]
    },
    'award-tpho-2024': {
      title: '23rd Thailand Physics Olympiad',
      category: 'Award',
      date: 'Silver Medalist • Thailand • 2024',
      description: 'Ranked 12th nationally after multi-round theoretical and experimental finals with POSN.',
      images: [{ src: 'img/certificates/tpho-2024.jpg', alt: 'TPhO 2024 certificate' }],
      certificates: [{ title: 'TPhO 2024', issuer: 'POSN', year: '2024', image: 'img/certificates/tpho-2024.jpg' }]
    },
    'award-ipst-2024': {
      title: 'IPST Physics Camp 2024',
      category: 'Award',
      date: 'National Finalist • Bangkok • 2024',
      description: 'Selected as one of 33 national finalists for the Physics IPST Camp toward the International Physics Olympiad team.',
      images: [{ src: 'img/certificates/ipst-camp.jpg', alt: 'IPST Camp certificate' }],
      certificates: [{ title: 'IPST Camp 2024', issuer: 'IPST', year: '2024', image: 'img/certificates/ipst-camp.jpg' }]
    },
    'award-amc-2023': {
      title: 'American Mathematics Competitions (AMC) 2023',
      category: 'Award',
      date: 'Gold Distinction • USA (Remote) • 2023',
      description: 'Earned Gold Distinction with a score of 120/150 and qualified for the American Invitational Mathematics Examination.',
      images: [],
      certificates: []
    },
    'award-hkimo-2023': {
      title: 'Hong Kong International Mathematical Olympiad 2023',
      category: 'Award',
      date: 'Silver Medal • Hong Kong • 2023',
      description: 'Achieved Silver Medal for HKIMO round 3 while collaborating with international peers on advanced problem solving.',
      images: [],
      certificates: []
    },
    'award-posn-informatics-2023': {
      title: 'Second POSN Informatics Training Camp 2023',
      category: 'Award',
      date: 'Top 50 Finalist • Thammasat • 2023',
      description: 'Qualified for the national top 50 Informatics training camp organised by POSN.',
      images: [],
      certificates: []
    },
    'award-conrad-2024': {
      title: 'Conrad Challenge 2023-2024',
      category: 'Award',
      date: 'Innovation Stage • Global • 2024',
      description: 'Advanced to the global Innovation Stage in the Energy & Environment category with the eco-sustainable fuel system project.',
      images: [],
      certificates: []
    },
    'award-amc-2024-amc': {
      title: 'Australian Mathematics Competition 2024',
      category: 'Award',
      date: 'Silver Distinction • Thailand • 2024',
      description: 'Awarded Silver with Distinction in the senior division for excellence across algebra, geometry, and probability.',
      images: [],
      certificates: []
    }
  };

  // 2) Main-page tile definitions per section
  const projectCards = [
    { id: 'limneth', image: 'img/projects/lumineth-cover.jpeg', title: modalDetails.limneth.title, tag: 'Embedded & Networking systems', meta: '2025', summary: 'Edge AI assistant delivering scene narration, obstacle alerts, and transit guidance for visually impaired communities.' },
    { id: 'speech-detection', image: 'img/projects/YSC0.jpeg', title: modalDetails['speech-detection'].title, tag: 'Machine Learning', meta: '2024 – 2025', summary: 'Design an improved anomaly-based mGANs architecture with high accuracy for diverse/generalized datasets to classify synthetic speech and human speech.' },
    { id: 'food-allergen', image: 'img/projects/inewgen1.jpg', title: modalDetails['food-allergen'].title, tag: 'Public Health Tech', meta: '2024 – 2025', summary: 'Computer vision and ML platform that personalises allergen alerts and estimated nutrients.' },
    { id: 'global-league', image: 'img/projects/global-league.jpg', title: modalDetails['global-league'].title, tag: 'Operations Research', meta: '2025', summary: 'Scheduling optimizer balancing travel, fairness, and broadcast priorities for an international sports league case study.' },
    { id: 'go-kila', image: 'img/projects/go-kila.jpg', title: modalDetails['go-kila'].title, tag: 'Start-up Engineering', meta: '2025 (ongoing)', summary: 'Start-up backend connecting athletes with clubs through analytics-driven matchmaking and websocket messaging.' },
    { id: 'enrollment-scanner', image: 'img/projects/enrollment-scanner.jpg', title: modalDetails['enrollment-scanner'].title, tag: 'Data Systems', meta: '2023 – 2025', summary: 'Vision-powered kiosk digitising 2,500+ enrollment forms with instant analytics for KVIS Open House each year.' },
    { id: 'surveillance-optimization', image: 'img/projects/surveillance-optimization.jpg', title: modalDetails['surveillance-optimization'].title, tag: 'Intelligent Systems', meta: '2024', summary: 'Ray-tracing and simulated annealing workflow eliminating CCTV blind spots for campus safety planning.' },
    { id: 'stock-predictor', image: 'img/projects/stock-predictor.jpg', title: modalDetails['stock-predictor'].title, tag: 'Financial Data Science', meta: '2024', summary: 'Ensemble models forecasting S&P 500 trends to coach FiSym members on strategy, risk, and evidence-based investing.' }
  ];

  const activityDetails = {
    jstp: { group: 'extracurricular', title: 'Junior Science Talent Project (JSTP-SCB)', tag: 'STEM Outreach', meta: 'Mentor · 2023-2025 · NSTDA Thailand', summary: 'Guided JSTP-SCB scholars by translating AI research journeys into hands-on, student-led prototypes.', image: 'img/activities/jstp-scb.jpg' },
    'open-house': { group: 'extracurricular', title: 'KVIS Open House Enrollment Scanner', tag: 'Applied AI', meta: 'Lead Engineer · 2023-2025 · KVIS', summary: 'Engineered the computer vision pipeline that digitises enrolment flows for 2,500+ visitors annually.', image: 'img/activities/kvis-open-house.jpg' },
    'mentor-singapore': { group: 'extracurricular', title: "Mentor for Juniors' Projects", tag: 'Cross-border Mentor', meta: 'Coach · 2024-2025 · Thailand & Singapore', summary: 'Coached Thai and Singaporean student teams in speech technology, UX research, and deployment.', image: 'img/activities/mentor-singapore.jpg' },
    'international-camp': { group: 'extracurricular', title: 'ABData Science Elite Summer Camp', tag: 'International Delegate', meta: 'Participant · Jul-Aug 2025 · CUHK Shenzhen', summary: 'Collaborated with global peers on datathon challenges spanning sustainability and smart cities.', image: 'img/activities/datascience-camp.jpg' },
    kvisdom: { group: 'extracurricular', title: 'KVISDOM YouTube Channel', tag: 'Media Production', meta: 'Executive Producer · 2023-2025 · Thailand', summary: 'Produces national STEM broadcasts that translate complex research into accessible storytelling.', image: 'img/activities/kvisdom.jpg' },
    photography: { group: 'extracurricular', title: 'KVIS Event Photographer', tag: 'Creative Arts', meta: 'Photographer · 2023-2025 · KVIS', summary: 'Documented major academic and cultural events, crafting the visual narrative of campus life.', image: 'img/activities/photography.jpg' },
    'school-choir': { group: 'leadership', title: 'KVIS School Choir · Bass Section', tag: 'Community Spirit', meta: 'Performer · 2024 · KVIS', summary: 'Contributed to signature performances celebrating school heritage and gratitude.', image: 'img/leadership/school-choir.jpg' },
    'fisym-club': { group: 'leadership', title: 'FiSym Club · Vice President', tag: 'Finance Literacy', meta: 'Executive Team · 2023-2024 · KVIS', summary: 'Built financial literacy programmes that demystify personal finance and investing for teens.', image: 'img/leadership/fisym.jpg' },
    'animators-club': { group: 'leadership', title: "Animator's Tournament Club · President", tag: 'Creative Leadership', meta: 'Club President · 2024-2025 · KVIS', summary: 'Expanded a 3D animation community that fuses storytelling, Blender skills, and showcase events.', image: 'img/leadership/animators-club.jpg' },
    'student-committee': { group: 'leadership', title: 'KVIS Student Committee · Head of IT', tag: 'Digital Transformation', meta: 'Executive Board · 2024-2025 · KVIS', summary: 'Modernised committee operations with a campus-wide booking and communications platform.', image: 'img/leadership/student-committee.jpg' },
    'student-council': { group: 'leadership', title: 'KVIS Student Council · Executive', tag: 'Policy & Governance', meta: 'Elected Leader · 2023-2025 · KVIS', summary: 'Steered campus-wide policy proposals, debates, and student-led civic engagement.', image: 'img/leadership/student-council.jpg' },
    'give-got-grown': { group: 'leadership', title: 'Give Got Grown Volunteer Group · Co-founder', tag: 'Social Innovation', meta: 'Founder · 2024-2025 · Thailand', summary: 'Mobilised volunteers to design exercise kits and wellness activities for rural communities.', image: 'img/leadership/give-got-grown.jpg' }
  };

  const activityOrder = ['jstp','open-house','mentor-singapore','international-camp','kvisdom','photography','school-choir','fisym-club','animators-club','student-committee','student-council','give-got-grown'];
  const extracurricularIds = activityOrder.filter(id => activityDetails[id].group === 'extracurricular');
  const leadershipIds = activityOrder.filter(id => activityDetails[id].group === 'leadership');

  // Awards now tile-based on main page
  const awardsCards = [
    { id: 'award-sistemic-2025', image: 'img/certificates/sistemic-2025.jpg', title: 'SISTEMIC 2025', tag: 'Bronze Medalist', meta: 'NJC · Singapore · 2025', summary: 'Limneth assistive AI recognized among global finalists.' },
    { id: 'award-cat-2025', image: 'img/overlay-bg.jpg', title: 'CAT 2025', tag: 'Silver & Distinction', meta: 'Thailand · 2025', summary: 'National silver and global Distinction ranking.' },
    { id: 'award-immc-2025', image: 'img/overlay-bg.jpg', title: 'IMMC 2025', tag: 'Honorable Mention', meta: 'Global Online · 2025', summary: 'International recognition for scheduling optimization.' },
    { id: 'award-newgen-2025', image: 'img/certificates/new-gen-2025.jpg', title: 'New Gen 2025', tag: 'Silver & Popular Vote', meta: 'BITEC · Thailand · 2025', summary: 'Food allergen warning platform won Silver and Popular Vote.' },
    { id: 'award-ysc-2025', image: 'img/certificates/ysc-2025.jpg', title: 'YSC 2025', tag: 'Gold Medalist', meta: 'NSTDA · Thailand · 2025', summary: 'Multi-generator GAN speech detection research awarded Gold.' },
    { id: 'award-hscm-2024', image: 'img/overlay-bg.jpg', title: 'HiMCM 2024', tag: 'Honorable Mention', meta: 'Global Online · 2024', summary: 'Olympic scheduling with SARIMAX forecasting.' },
    { id: 'award-simsat-2024', image: 'img/certificates/simsat-2024.jpg', title: 'Siriraj SIMSAT 2024', tag: '2nd Runner-Up', meta: 'Bangkok · 2024', summary: 'Top three nationwide for science aptitude.' },
    { id: 'award-tpho-2024', image: 'img/certificates/tpho-2024.jpg', title: 'TPhO 2024', tag: 'Silver Medalist', meta: 'Thailand · 2024', summary: '12th nationally in theory and experiment finals.' },
    { id: 'award-ipst-2024', image: 'img/certificates/ipst-camp.jpg', title: 'IPST Physics Camp 2024', tag: 'National Finalist', meta: 'Bangkok · 2024', summary: 'Selected among 33 finalists for IPhO training.' },
    { id: 'award-amc-2023', image: 'img/overlay-bg.jpg', title: 'AMC 2023', tag: 'Gold Distinction', meta: 'USA (Remote) · 2023', summary: 'Qualified for AIME with 120/150.' },
    { id: 'award-hkimo-2023', image: 'img/overlay-bg.jpg', title: 'HKIMO 2023', tag: 'Silver Medal', meta: 'Hong Kong · 2023', summary: 'International problem solving collaboration.' },
    { id: 'award-posn-informatics-2023', image: 'img/overlay-bg.jpg', title: 'POSN Informatics 2023', tag: 'Top 50 Finalist', meta: 'Thammasat · 2023', summary: 'Qualified for national top 50 camp.' },
    { id: 'award-conrad-2024', image: 'img/overlay-bg.jpg', title: 'Conrad 2023-2024', tag: 'Innovation Stage', meta: 'Global · 2024', summary: 'Energy & Environment project advanced globally.' },
    { id: 'award-amc-2024-amc', image: 'img/overlay-bg.jpg', title: 'AMC 2024', tag: 'Silver Distinction', meta: 'Thailand · 2024', summary: 'Senior division excellence in math.' }
  ];

  // =========================
  // DOM Cache
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

  // Certificate Modal (unchanged)
  const $certificateModal = $('#certificateModal');
  const $certificateModalImage = $('#certificateModalImage');
  const $certificateModalTitle = $('#certificateModalTitle');
  const $certificateModalMeta = $('#certificateModalMeta');
  const $certificateModalDescription = $('#certificateModalDescription');

  // =========================
  // Renderers (main page tiles)
  // =========================

  function tileHtml(id, img, title, tag, meta, summary) {
    return `
      <a href="#" class="activity-tile js-open-modal" role="button" data-id="${id}">
        <div class="activity-tile__image">
          <img src="${img}" alt="${title}" class="img-fluid" />
        </div>
        <div class="activity-tile__body">
          <span class="activity-tile__tag">${tag || ''}</span>
          <h4 class="activity-tile__title">${title}</h4>
          <p class="activity-tile__meta">${meta || ''}</p>
          ${summary ? `<p class="activity-tile__summary">${summary}</p>` : ''}
        </div>
      </a>
    `;
  }

  function renderProjectGrid() {
    if (!$projectGrid.length) return;
    $projectGrid.empty();

    const projectVisibleLimit = 6;
    projectCards.forEach((p, index) => {
      const hidden = index >= projectVisibleLimit ? ' d-none project-card--hidden' : '';
      const $col = $('<div/>', { class: `col-md-6 col-lg-4 mb-4${hidden}` });
      $col.html(tileHtml(p.id, p.image, p.title, p.tag, p.meta, p.summary));
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
      const $col = $('<div/>', { class: 'col-md-6 col-lg-4 mb-4' });
      $col.html(tileHtml(id, d.image, d.title, d.tag, d.meta, d.summary));
      $grid.append($col);
    });
  }

  function renderAwardsGrid() {
    if (!$awardsGrid.length) return;
    $awardsGrid.empty();
    awardsCards.forEach(a => {
      const $col = $('<div/>', { class: 'col-md-6 col-lg-4 mb-4' });
      $col.html(tileHtml(a.id, a.image, a.title, a.tag, a.meta, a.summary));
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
  const $card = $(`
    <a href="#" class="certificate-card" role="button" aria-controls="certificateModal">
      <div class="certificate-card__frame">
        <img src="${item.image}" alt="${item.title} certificate" class="img-fluid" />
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

  $certificateModalImage.attr('src', imageSrc || '').attr('alt', title);
  $certificateModalTitle.text(title);
  $certificateModalMeta.text(meta);
  $certificateModalDescription.html(description); // ← allow HTML
  $certificateModal.modal('show');
}


 

  // =========================
  // Init render
  // =========================
  renderProjectGrid();
  renderAwardsGrid();
  renderActivitySection(extracurricularIds, $extracurricularGrid);
  renderActivitySection(leadershipIds, $leadershipGrid);
  updateSectionCounts();
  updateCounters();
  renderCertificateGallery(); // build the certificate gallery from projects and awards
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


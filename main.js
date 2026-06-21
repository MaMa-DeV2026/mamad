/*
 * main.js — Portfolio Main Application
 *
 * Modules:
 *   1. Default data & localStorage sync
 *   2. Loading screen animation (GSAP Timeline)
 *   3. Custom cursor
 *   4. Navigation (hamburger + full-page overlay + GSAP stagger)
 *   5. Three.js hero scene (floating 3D shape + particles)
 *   6. GSAP scroll animations (ScrollTrigger, TextPlugin)
 *   7. Skills rendering + animated progress bars
 *   8. Portfolio rendering + 3D tilt cards
 *   9. Contact form validation
 *  10. Scroll-based navbar show/hide
 *
 * Respects prefers-reduced-motion throughout.
 * RTL-compatible (dir="rtl" on <html>).
 */

(function () {
  'use strict';

  // ============================================================
  // 1. DEFAULT DATA & LOCALSTORAGE SYNC
  // ============================================================

  /**
   * Default data structure — used when localStorage is empty.
   * Admin panel writes to the same keys; this page reads them
   * on load and listens for 'storage' events for live sync.
   */
  const DEFAULT_SKILLS = [
    { id: 'html-css', name: 'HTML / CSS', percent: 95 },
    { id: 'javascript', name: 'JavaScript', percent: 88 },
    { id: 'react', name: 'React', percent: 80 },
    { id: 'ui-ux', name: 'UI/UX Design', percent: 85 },
    { id: 'threejs', name: 'Three.js', percent: 70 },
    { id: 'gsap', name: 'GSAP', percent: 75 },
  ];

  const DEFAULT_PROJECTS = [
    {
      id: 'proj-1',
      title: 'فروشگاه آنلاین مینیمال',
      description: 'یه فروشگاه سریع و سبک با Next.js و Tailwind. پرداخت آنلاین، سبد خرید، و پنل مدیریت.',
      tags: ['وب‌سایت', 'Next.js', 'Tailwind'],
      image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'500\'%3E%3Crect fill=\'%23f5f0eb\' width=\'800\' height=\'500\'/%3E%3Crect x=\'40\' y=\'40\' width=\'320\' height=\'200\' rx=\'12\' fill=\'%23e8590c\' opacity=\'0.1\'/%3E%3Crect x=\'380\' y=\'40\' width=\'380\' height=\'24\' rx=\'6\' fill=\'%231c1917\' opacity=\'0.08\'/%3E%3Crect x=\'380\' y=\'78\' width=\'240\' height=\'16\' rx=\'4\' fill=\'%231c1917\' opacity=\'0.05\'/%3E%3Crect x=\'40\' y=\'270\' width=\'720\' height=\'14\' rx=\'6\' fill=\'%231c1917\' opacity=\'0.04\'/%3E%3Crect x=\'40\' y=\'300\' width=\'520\' height=\'14\' rx=\'6\' fill=\'%231c1917\' opacity=\'0.03\'/%3E%3Ctext x=\'400\' y=\'460\' text-anchor=\'middle\' fill=\'%23a8a29e\' font-family=\'sans-serif\' font-size=\'16\'%3Eفروشگاه آنلاین%3C/text%3E%3C/svg%3E',
      link: '#',
    },
    {
      id: 'proj-2',
      title: 'داشبورد تحلیل داده',
      description: 'داشبورد مدیریتی با نمودارهای تعاملی و گزارش‌های لحظه‌ای. React + D3.js.',
      tags: ['UI/UX', 'React', 'D3.js'],
      image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'500\'%3E%3Crect fill=\'%23f5f0eb\' width=\'800\' height=\'500\'/%3E%3Crect x=\'30\' y=\'30\' width=\'740\' height=\'60\' rx=\'8\' fill=\'%231c1917\' opacity=\'0.04\'/%3E%3Ccircle cx=\'60\' cy=\'60\' r=\'16\' fill=\'%23e8590c\' opacity=\'0.15\'/%3E%3Crect x=\'30\' y=\'110\' width=\'230\' height=\'340\' rx=\'8\' fill=\'%231c1917\' opacity=\'0.03\'/%3E%3Crect x=\'280\' y=\'110\' width=\'490\' height=\'160\' rx=\'8\' fill=\'%23e8590c\' opacity=\'0.06\'/%3E%3Crect x=\'280\' y=\'290\' width=\'235\' height=\'160\' rx=\'8\' fill=\'%231c1917\' opacity=\'0.03\'/%3E%3Crect x=\'535\' y=\'290\' width=\'235\' height=\'160\' rx=\'8\' fill=\'%231c1917\' opacity=\'0.03\'/%3E%3Ctext x=\'400\' y=\'470\' text-anchor=\'middle\' fill=\'%23a8a29e\' font-family=\'sans-serif\' font-size=\'16\'%3Eداشبورد مدیریتی%3C/text%3E%3C/svg%3E',
      link: '#',
    },
    {
      id: 'proj-3',
      title: 'اپلیکیشن موبایل فیتنس',
      description: 'اپ ردیابی ورزش و تغذیه با React Native. اتصال به wearable devices.',
      tags: ['موبایل', 'React Native'],
      image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'500\'%3E%3Crect fill=\'%23f5f0eb\' width=\'800\' height=\'500\'/%3E%3Crect x=\'290\' y=\'40\' width=\'220\' height=\'420\' rx=\'24\' fill=\'%231c1917\' opacity=\'0.06\'/%3E%3Crect x=\'300\' y=\'70\' width=\'200\' height=\'360\' rx=\'4\' fill=\'%23fff\'/%3E%3Crect x=\'315\' y=\'90\' width=\'170\' height=\'100\' rx=\'8\' fill=\'%23e8590c\' opacity=\'0.1\'/%3E%3Crect x=\'315\' y=\'210\' width=\'170\' height=\'12\' rx=\'4\' fill=\'%231c1917\' opacity=\'0.06\'/%3E%3Crect x=\'315\' y=\'235\' width=\'120\' height=\'12\' rx=\'4\' fill=\'%231c1917\' opacity=\'0.04\'/%3E%3Ccircle cx=\'340\' cy=\'320\' r=\'24\' fill=\'%23e8590c\' opacity=\'0.12\'/%3E%3Ccircle cx=\'420\' cy=\'320\' r=\'24\' fill=\'%23e8590c\' opacity=\'0.08\'/%3E%3Ctext x=\'400\' y=\'480\' text-anchor=\'middle\' fill=\'%23a8a29e\' font-family=\'sans-serif\' font-size=\'16\'%3Eاپ فیتنس%3C/text%3E%3C/svg%3E',
      link: '#',
    },
    {
      id: 'proj-4',
      title: 'هویت بصری استارتاپ',
      description: 'طراحی لوگو، پالت رنگ، و راهنمای برند برای یه استارتاپ فین‌تک.',
      tags: ['برندینگ', 'UI/UX'],
      image: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'500\'%3E%3Crect fill=\'%23f5f0eb\' width=\'800\' height=\'500\'/%3E%3Ccircle cx=\'400\' cy=\'200\' r=\'100\' fill=\'none\' stroke=\'%23e8590c\' stroke-width=\'4\' opacity=\'0.2\'/%3E%3Ccircle cx=\'400\' cy=\'200\' r=\'60\' fill=\'%23e8590c\' opacity=\'0.08\'/%3E%3Cpolygon points=\'400,140 440,200 400,260 360,200\' fill=\'%23e8590c\' opacity=\'0.15\'/%3E%3Crect x=\'200\' y=\'340\' width=\'400\' height=\'12\' rx=\'6\' fill=\'%231c1917\' opacity=\'0.06\'/%3E%3Crect x=\'260\' y=\'370\' width=\'280\' height=\'12\' rx=\'6\' fill=\'%231c1917\' opacity=\'0.04\'/%3E%3Ctext x=\'400\' y=\'460\' text-anchor=\'middle\' fill=\'%23a8a29e\' font-family=\'sans-serif\' font-size=\'16\'%3Eهویت بصری%3C/text%3E%3C/svg%3E',
      link: '#',
    },
  ];

  /**
   * readStore — safely parse localStorage with fallback to defaults.
   * @param {string} key
   * @param {Array} defaults
   * @returns {Array}
   */
  function readStore(key, defaults) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaults;
    } catch {
      return defaults;
    }
  }

  /**
   * writeStore — persist data to localStorage.
   * @param {string} key
   * @param {Array} data
   */
  function writeStore(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* quota exceeded — silently ignore */ }
  }

  // Initialize storage if empty
  if (!localStorage.getItem('portfolio_skills')) writeStore('portfolio_skills', DEFAULT_SKILLS);
  if (!localStorage.getItem('portfolio_projects')) writeStore('portfolio_projects', DEFAULT_PROJECTS);

  // Live sync: when admin panel updates localStorage in another tab, re-render
  window.addEventListener('storage', (e) => {
    if (e.key === 'portfolio_skills') renderSkills();
    if (e.key === 'portfolio_projects') renderPortfolio();
  });

  // ============================================================
  // 2. LOADING SCREEN — GSAP Timeline
  // ============================================================

  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Check reduced motion — skip animation if user prefers it
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({
      onComplete: () => {
        loader.setAttribute('aria-hidden', 'true');
        gsap.set(loader, { display: 'none' });
        initHeroAnimations();
      },
    });

    if (prefersReduced) {
      // Instant reveal for reduced-motion users
      gsap.set(loader, { display: 'none' });
      loader.setAttribute('aria-hidden', 'true');
      initHeroAnimations();
      return;
    }

    // Animate logo letters staggered in
    tl.fromTo('.loader__logo-letter', {
      opacity: 0,
      y: 20,
      rotateX: -90,
    }, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)',
    })
    // Progress bar fill
    .to('.loader__bar', {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
    }, '-=0.3')
    // Fade out the entire loader
    .to(loader, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    }, '+=0.3');
  }

  // ============================================================
  // 3. CUSTOM CURSOR
  // ============================================================

  function initCursor() {
    // Skip on touch devices or reduced motion
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');

    // Both dot and ring follow mouse EXACTLY — positioned at mouse coordinates
    document.addEventListener('mousemove', (e) => {
      // Use left/top + translate(-50%, -50%) so center lands on cursor
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      gsap.set(dot, { x: 0, y: 0 });
      gsap.set(ring, { x: 0, y: 0 });
    });

    // Expand ring on interactive elements
    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, .project-card__inner, .skill-card';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursor.classList.add('cursor--hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursor.classList.remove('cursor--hover');
      }
    });

    // Hide cursor when leaving the viewport
    document.addEventListener('mouseleave', () => gsap.to(cursor, { opacity: 0, duration: 0.2 }));
    document.addEventListener('mouseenter', () => gsap.to(cursor, { opacity: 1, duration: 0.2 }));
  }

  // ============================================================
  // 4. NAVIGATION — Hamburger + Overlay + GSAP Stagger
  // ============================================================

  function initNav() {
    const hamburger = document.getElementById('navHamburger');
    const overlay = document.getElementById('navOverlay');
    const linkItems = document.querySelectorAll('.nav__link-item');
    const navLinks = document.querySelectorAll('.nav__link');
    let isOpen = false;

    if (!hamburger || !overlay) return;

    /**
     * openNav — blur overlay fades in, links stagger from bottom
     */
    function openNav() {
      isOpen = true;
      hamburger.setAttribute('aria-expanded', 'true');
      overlay.setAttribute('aria-hidden', 'false');
      overlay.classList.add('nav__overlay--open');
      document.body.style.overflow = 'hidden';

      // GSAP stagger: links animate in one by one
      gsap.fromTo(linkItems, {
        opacity: 0,
        y: 40,
        rotateX: -15,
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Animate footer elements
      gsap.fromTo('.nav__menu-footer', {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.6,
      });
    }

    /**
     * closeNav — reverse animation, reset link positions
     */
    function closeNav() {
      isOpen = false;
      hamburger.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.classList.remove('nav__overlay--open');
      document.body.style.overflow = '';

      gsap.to(linkItems, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        stagger: 0.04,
        ease: 'power2.in',
      });
    }

    hamburger.addEventListener('click', () => {
      isOpen ? closeNav() : openNav();
    });

    // Close when a nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (isOpen) closeNav();
      });
    });

    // Escape key closes menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeNav();
    });
  }

  // ============================================================
  // 5. THREE.JS HERO SCENE — 3D Computer with Hacker Terminal
  // ============================================================

  let threeScene, threeCamera, threeRenderer, threeParticles;
  let threeMonitorGroup, threeAnimatedObjects = [];
  let threeAnimFrameId = null;

  function initThreeJS() {
    // Respect reduced motion — skip 3D entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = document.getElementById('heroCanvasContainer');
    if (!container || typeof THREE === 'undefined') return;

    // ---- Scene setup ----
    threeScene = new THREE.Scene();
    threeCamera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 1000);
    threeCamera.position.set(0, 0.6, 6.5);
    threeCamera.lookAt(0, 0.1, 0);

    // ---- Renderer with alpha for transparency ----
    threeRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeRenderer.setSize(window.innerWidth, window.innerHeight);
    threeRenderer.setClearColor(0x000000, 0);
    threeRenderer.shadowMap.enabled = true;
    threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(threeRenderer.domElement);

    // ---- Lighting ----
    threeScene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.55);
    mainLight.position.set(3, 5, 5);
    mainLight.castShadow = true;
    threeScene.add(mainLight);

    // Warm accent light
    const accentLight = new THREE.PointLight(0xe8590c, 0.6, 15);
    accentLight.position.set(-2, 3, 4);
    threeScene.add(accentLight);

    // Green screen glow
    const screenGlow = new THREE.PointLight(0x00ff41, 1.0, 10);
    screenGlow.position.set(0, 0.5, 2);
    threeScene.add(screenGlow);

    // ---- Build 3D Computer ----
    threeMonitorGroup = new THREE.Group();

    // === MONITOR ===
    // Body
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a, metalness: 0.12, roughness: 0.7,
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.3, 0.1), bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    threeMonitorGroup.add(body);

    // Bezel (thin inner frame)
    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(3.35, 2.08, 0.025),
      new THREE.MeshPhysicalMaterial({ color: 0x111111, metalness: 0.05, roughness: 0.85 })
    );
    bezel.position.z = 0.065;
    threeMonitorGroup.add(bezel);

    // Screen — pure black
    const screenW = 3.15, screenH = 1.92;
    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(screenW, screenH),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    screenMesh.position.z = 0.085;
    threeMonitorGroup.add(screenMesh);

    // === TERMINAL TEXT ON SCREEN — right-aligned, green on black ===
    const codeLines = [
      'const dev = {',
      '  name: "mamad.dev"',
      '  role: "Full-Stack"',
      '  skills: [',
      '    "React",',
      '    "Three.js",',
      '    "Node"',
      '  ],',
      '  build() {',
      '    return "🚀";',
      '  }',
      '};',
    ];

    const charW = 0.052;  // width per character
    const charH = 0.09;   // line height
    const startY = 0.78;  // top of screen
    const startZ = 0.09;  // just above screen surface
    const alignX = 1.35;  // right-align position

    // Store text segment groups for animation
    const textGroups = [];

    codeLines.forEach((line, lineIdx) => {
      const yPos = startY - lineIdx * charH * 1.2;
      const lineWidth = line.length * charW;
      const xPos = alignX - lineWidth; // right-aligned

      // Group for this line's segments
      const lineGroup = {
        startX: xPos,
        y: yPos,
        z: startZ,
        segments: [],
        delay: lineIdx * 0.35,
        visible: false,
      };

      // Break line into word segments (separated by spaces)
      let currentX = xPos;
      const words = line.split(/(\s+)/);
      words.forEach((word) => {
        if (!word) return;
        const isSpace = /^\s+$/.test(word);
        if (isSpace) {
          currentX += word.length * charW;
          return;
        }
        const segWidth = word.length * charW;
        const segGeo = new THREE.PlaneGeometry(segWidth, charH * 0.7);
        const segMat = new THREE.MeshBasicMaterial({
          color: 0x00ff41,
          transparent: true,
          opacity: 0,
        });
        const seg = new THREE.Mesh(segGeo, segMat);
        seg.position.set(currentX + segWidth / 2, yPos, startZ + 0.005);
        threeMonitorGroup.add(seg);
        lineGroup.segments.push(seg);
        currentX += segWidth;
      });

      textGroups.push(lineGroup);
    });

    // Blinking cursor — positioned after the last line
    const cursorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.06, charH * 0.75),
      new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        transparent: true,
        opacity: 0,
      })
    );
    const lastLineEndX = alignX - codeLines[codeLines.length - 1].length * charW;
    cursorMesh.position.set(
      lastLineEndX - 0.08,
      startY - (codeLines.length - 1) * charH * 1.2,
      startZ + 0.006
    );
    threeMonitorGroup.add(cursorMesh);

    // === MONITOR STAND ===
    // Neck
    const neck = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.65, 0.1),
      new THREE.MeshPhysicalMaterial({ color: 0x2a2a2a, metalness: 0.6, roughness: 0.4 })
    );
    neck.position.set(0, -1.47, -0.05);
    neck.castShadow = true;
    threeMonitorGroup.add(neck);

    // Base plate
    const basePlate = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.035, 0.55),
      new THREE.MeshPhysicalMaterial({ color: 0x222222, metalness: 0.45, roughness: 0.55 })
    );
    basePlate.position.set(0, -1.8, 0);
    basePlate.receiveShadow = true;
    basePlate.castShadow = true;
    threeMonitorGroup.add(basePlate);

    // === KEYBOARD ===
    const kbBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.025, 0.95),
      new THREE.MeshPhysicalMaterial({ color: 0x1e1e1e, metalness: 0.08, roughness: 0.75 })
    );
    kbBase.position.set(0, -2.0, 0.65);
    kbBase.rotation.x = 0.1;
    kbBase.castShadow = true;
    kbBase.receiveShadow = true;
    threeMonitorGroup.add(kbBase);

    // Keyboard keys — placed EXACTLY on keyboard surface
    const keyboardKeys = [];
    const keyRows = [14, 13, 12, 10];
    const tiltAngle = 0.1;
    const kbTopY = -1.987; // just above keyboard base surface

    for (let row = 0; row < 4; row++) {
      const keysInRow = keyRows[row];
      const rowOffsetX = (14 - keysInRow) * 0.08 / 2;
      for (let k = 0; k < keysInRow; k++) {
        const keyMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.13, 0.015, 0.11),
          new THREE.MeshPhysicalMaterial({ color: 0x333333, metalness: 0.03, roughness: 0.85 })
        );
        const x = -1.2 + rowOffsetX + k * 0.17;
        const z = 0.3 + row * 0.17;
        // Y accounts for keyboard tilt: higher Z = slightly higher Y
        const y = kbTopY + (z - 0.3) * Math.sin(tiltAngle);
        keyMesh.position.set(x, y, z);
        keyMesh.rotation.x = tiltAngle;
        keyMesh.userData = {
          baseY: y,
          baseZ: z,
          keyPhase: Math.random() * Math.PI * 2,
        };
        threeMonitorGroup.add(keyMesh);
        keyboardKeys.push(keyMesh);
      }
    }

    // === DESK ===
    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.08, 4),
      new THREE.MeshPhysicalMaterial({ color: 0x2d2520, metalness: 0.02, roughness: 0.92 })
    );
    desk.position.set(0, -2.05, 0.5);
    desk.receiveShadow = true;
    threeMonitorGroup.add(desk);

    // Position the group — shifted LEFT so hero text is visible on right
    threeMonitorGroup.position.set(-1.6, 0.35, 0);
    threeMonitorGroup.rotation.y = -0.2;
    threeScene.add(threeMonitorGroup);

    // === PARTICLES ===
    const pCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    threeParticles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0xe8590c, size: 0.018, transparent: true, opacity: 0.3, sizeAttenuation: true })
    );
    threeScene.add(threeParticles);

    // ---- Mouse parallax ----
    let mRotX = 0, mRotY = 0;
    document.addEventListener('mousemove', (e) => {
      mRotX = (e.clientY / window.innerHeight - 0.5) * 0.1;
      mRotY = (e.clientX / window.innerWidth - 0.5) * 0.1;
    });

    // ---- Animation loop ----
    const clock = new THREE.Clock();

    function animate() {
      threeAnimFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // --- Terminal typing animation — infinite loop ---
      textGroups.forEach((group) => {
        const cycleTime = 12; // total cycle duration in seconds
        const t = ((elapsed - group.delay) % cycleTime + cycleTime) % cycleTime;

        group.segments.forEach((seg) => {
          // Fade in quickly, stay visible, fade out at end of cycle
          if (t < 0.5) {
            seg.material.opacity = (t / 0.5) * 0.92;
          } else if (t > cycleTime - 1.5) {
            seg.material.opacity = ((cycleTime - t) / 1.5) * 0.92;
          } else {
            seg.material.opacity = 0.92;
          }
        });
      });

      // Cursor blink — always visible
      cursorMesh.material.opacity = Math.sin(elapsed * 2.5 * Math.PI) > 0 ? 0.9 : 0;

      // Keyboard keys — stay EXACTLY on keyboard surface
      keyboardKeys.forEach((key) => {
        const press = Math.sin(key.userData.keyPhase * 13 + elapsed * 2) > 0.95 ? 0.003 : 0;
        key.position.y = key.userData.baseY - press;
        key.position.z = key.userData.baseZ;
      });

      // Floating motion
      threeMonitorGroup.position.y = 0.35 + Math.sin(elapsed * 0.65) * 0.05;

      // Mouse parallax
      threeMonitorGroup.rotation.x += (mRotX - threeMonitorGroup.rotation.x) * 0.03;
      threeMonitorGroup.rotation.y += (-0.1 + mRotY - threeMonitorGroup.rotation.y) * 0.03;

      // Particles
      threeParticles.rotation.y += 0.00015;
      threeParticles.rotation.x += 0.00008;

      // Screen glow pulse
      screenGlow.intensity = 1.0 + Math.sin(elapsed * 1.8) * 0.25;

      threeRenderer.render(threeScene, threeCamera);
    }
    animate();

    // ---- Resize ----
    window.addEventListener('resize', () => {
      threeCamera.aspect = window.innerWidth / window.innerHeight;
      threeCamera.updateProjectionMatrix();
      threeRenderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /**
   * disposeThreeJS — clean up WebGL context on page unload.
   */
  function disposeThreeJS() {
    if (threeAnimFrameId) cancelAnimationFrame(threeAnimFrameId);
    if (threeRenderer) threeRenderer.dispose();
  }

  // ============================================================
  // 6. GSAP SCROLL ANIMATIONS
  // ============================================================

  function initScrollAnimations() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Instantly show all animated elements
      gsap.set('[data-gsap]', { opacity: 1, y: 0, x: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Fade-up elements
    gsap.utils.toArray('[data-gsap="fade-up"]').forEach((el) => {
      gsap.fromTo(el, {
        opacity: 0,
        y: 40,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Fade-left elements
    gsap.utils.toArray('[data-gsap="fade-left"]').forEach((el) => {
      gsap.fromTo(el, {
        opacity: 0,
        x: -40,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Navbar: hide on scroll down, show on scroll up
    const navbar = document.getElementById('navbar');
    ScrollTrigger.create({
      start: 80,
      onUpdate: (self) => {
        if (self.direction === 1 && window.scrollY > 200) {
          navbar.classList.add('nav--hidden');
        } else {
          navbar.classList.remove('nav--hidden');
        }
      },
    });
  }

  // ============================================================
  // 7. HERO TEXT ANIMATIONS (after loader)
  // ============================================================

  function initHeroAnimations() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set('.hero__tag, .hero__subtitle, .hero__actions', { opacity: 1, y: 0 });
      gsap.set('.hero__title-line', { y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Tag fades in
    tl.to('.hero__tag', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    })
    // Title lines reveal with TextPlugin-style clip effect
    .fromTo('.hero__title-line', {
      y: 60,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
    }, '-=0.3')
    // Subtitle fades in
    .to('.hero__subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.4')
    // Action buttons appear
    .to('.hero__actions', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.3');
  }

  // ============================================================
  // 8. SKILLS RENDERING + ANIMATED PROGRESS BARS
  // ============================================================

  function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;

    const skills = readStore('portfolio_skills', DEFAULT_SKILLS);

    grid.innerHTML = skills.map((skill) => `
      <div class="skill-card" data-gsap="fade-up" data-skill-id="${skill.id}">
        <div class="skill-card__header">
          <span class="skill-card__name">${skill.name}</span>
          <span class="skill-card__percent">${skill.percent}%</span>
        </div>
        <div class="skill-card__bar">
          <div class="skill-card__fill" data-percent="${skill.percent}"></div>
        </div>
      </div>
    `).join('');

    // Animate progress bars on scroll using ScrollTrigger
    initSkillBars();
  }

  function initSkillBars() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.skill-card__fill').forEach((bar) => {
      const percent = bar.getAttribute('data-percent');

      if (prefersReduced) {
        // Instant fill for reduced motion
        gsap.set(bar, { width: percent + '%' });
        return;
      }

      // GSAP ScrollTrigger: animate width when card enters viewport
      gsap.fromTo(bar, {
        width: '0%',
      }, {
        width: percent + '%',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bar.closest('.skill-card'),
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  // ============================================================
  // 9. PORTFOLIO RENDERING + 3D TILT CARDS
  // ============================================================

  function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    const projects = readStore('portfolio_projects', DEFAULT_PROJECTS);

    grid.innerHTML = projects.map((project) => `
      <article class="project-card" data-project-id="${project.id}">
        <div class="project-card__inner" data-tilt>
          <div class="project-card__img">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-card__overlay"></div>
          </div>
          <div class="project-card__body">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__desc">${project.description}</p>
            <div class="project-card__tags">
              ${(project.tags || []).map((tag) => `<span class="project-card__tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-card__link">
              مشاهده پروژه
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M10 2L4 8l6 6"/>
              </svg>
            </a>
          </div>
        </div>
      </article>
    `).join('');

    // GSAP stagger entrance for cards
    initPortfolioAnimations();
    // 3D tilt effect on hover
    initTiltEffect();
  }

  function initPortfolioAnimations() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set('.project-card', { opacity: 1, y: 0 });
      return;
    }

    // Staggered reveal: cards appear one after another
    gsap.fromTo('.project-card', {
      opacity: 0,
      y: 50,
      scale: 0.95,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#portfolioGrid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  /**
   * 3D Tilt Effect — mouse-tracking perspective transform on project cards.
   * Calculates mouse position relative to card center, applies rotateX/Y.
   */
  function initTiltEffect() {
    // Skip on touch devices and reduced motion
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach((card) => {
      const maxTilt = 8; // Maximum rotation in degrees

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate normalized offset from center (-1 to 1)
        const offsetX = (e.clientX - centerX) / (rect.width / 2);
        const offsetY = (e.clientY - centerY) / (rect.height / 2);

        // Apply rotation: tilt follows mouse
        const rotateY = offsetX * maxTilt;
        const rotateX = -offsetY * maxTilt;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      });

      card.addEventListener('mouseleave', () => {
        // Smoothly reset to flat position
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }

  // ============================================================
  // 10. CONTACT FORM VALIDATION
  // ============================================================

  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = document.getElementById('submitBtn');

    const fields = {
      contactName: {
        errorEl: document.getElementById('nameError'),
        validate(val) {
          if (!val.trim()) return 'اسمتو ننوشتی... چطوری صدات کنم؟';
          if (val.trim().length < 2) return 'اسمت فقط یه حرفه؟ بیشتر بنویس 😄';
          return '';
        },
      },
      contactEmail: {
        errorEl: document.getElementById('emailError'),
        validate(val) {
          if (!val.trim()) return 'ایمیل هم لازمه — نمی‌خوام اسپم بفرستم، قول می‌دم.';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'این ایمیل درست به نظر نمی‌رسه. یه بار دیگه چکش کن.';
          return '';
        },
      },
      contactMessage: {
        errorEl: document.getElementById('messageError'),
        validate(val) {
          if (!val.trim()) return 'پیامت خالیه! یه چیزی بنویس، هر چیزی.';
          if (val.trim().length < 10) return 'یه کم بیشتر توضیح بده — حداقل ده حرف.';
          return '';
        },
      },
    };

    // Validate on blur
    Object.entries(fields).forEach(([id, field]) => {
      const input = document.getElementById(id);
      if (!input) return;

      input.addEventListener('blur', () => {
        const msg = field.validate(input.value);
        showFieldError(input, field.errorEl, msg);
      });

      // Clear error on input (only if previously invalid)
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          const msg = field.validate(input.value);
          showFieldError(input, field.errorEl, msg);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;
      Object.entries(fields).forEach(([id, field]) => {
        const input = document.getElementById(id);
        const msg = field.validate(input.value);
        showFieldError(input, field.errorEl, msg);
        if (msg) hasError = true;
      });

      if (hasError) return;

      // Simulate sending
      const btnText = submitBtn.querySelector('.btn__text');
      const originalText = btnText.textContent;
      btnText.textContent = 'داره می‌ره...';
      submitBtn.disabled = true;

      setTimeout(() => {
        btnText.textContent = '✓ رسید!';
        form.reset();
        Object.entries(fields).forEach(([id, field]) => {
          const input = document.getElementById(id);
          input.classList.remove('valid', 'invalid');
          if (field.errorEl) field.errorEl.textContent = '';
        });

        setTimeout(() => {
          btnText.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  /**
   * showFieldError — update error message and input class.
   */
  function showFieldError(input, errorEl, msg) {
    if (errorEl) errorEl.textContent = msg;
    input.classList.toggle('invalid', !!msg);
    input.classList.toggle('valid', !msg && input.value.trim() !== '');
  }

  // ============================================================
  // 11. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================

  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10);
      const top = target.getBoundingClientRect().top + window.scrollY - navH;

      // Check reduced motion for instant scroll
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  // ============================================================
  // BOOTSTRAP — initialize everything when DOM is ready
  // ============================================================

  function init() {
    // Easter egg
    console.log("👋 Hey developer! Like what you see? Let's work together.");

    renderSkills();
    renderPortfolio();
    initLoader();
    initCursor();
    initNav();
    initThreeJS();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
  }

  // Wait for DOM + all scripts (GSAP, Three.js) to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Clean up Three.js on page unload
  window.addEventListener('beforeunload', disposeThreeJS);

})();

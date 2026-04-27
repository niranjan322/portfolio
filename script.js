/* ──────────────────────────────────────
   NIRANJAN PORTFOLIO — script.js
   ────────────────────────────────────── */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ── Mobile hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ── Scroll Reveal ── */
const revealTargets = document.querySelectorAll(
  '.section-label, .section-title, .section-sub, .project-card, .skill-category, .diff-card, .about-lead, .about-text p, .stat-card, .chip, .edu-item, .contact-card, .maker-content, .pillar, .about-avatar'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => revealObserver.observe(el));

/* ── Skill Bar Animation ── */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width  = parseInt(target.dataset.w, 10);
      const pctEl  = target.closest('li')?.querySelector('.skill-pct');

      setTimeout(() => {
        target.style.width = width + '%';

        // Count-up animation for the percentage label
        if (pctEl) {
          const duration = 1200; // ms — matches CSS transition
          const startTime = performance.now();
          
          function tick() {
            const elapsed = performance.now() - startTime;
            let progress = elapsed / duration;
            if (progress > 1) progress = 1;
            
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            pctEl.textContent = Math.round(eased * width) + '%';
            
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              pctEl.textContent = width + '%'; // Ensure final exact value
            }
          }
          requestAnimationFrame(tick);
        }
      }, 200);
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObserver.observe(el));

/* ── Project Click → navigates to Project Details Page ── */
document.querySelectorAll('.project-toggle, .project-card').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = el.closest('.project-card');
    if (card) {
      window.location.href = 'project.html?id=' + card.id;
    }
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove('active-nav');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active-nav');
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

/* ── Staggered reveal for cards ── */
function staggerReveal(containerSelector, childSelector, delay = 100) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll(childSelector);
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * delay}ms`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(containerSelector).forEach(el => observer.observe(el));
}
staggerReveal('.projects-grid', '.project-card', 80);
staggerReveal('.skills-grid',   '.skill-category', 80);
staggerReveal('.diff-grid',     '.diff-card', 80);
staggerReveal('.contact-grid',  '.contact-card', 80);

/* ── Smooth hero parallax subtle ── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const heroVis = document.querySelector('.hero-visual');
  if (heroContent && scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrollY * 0.08}px)`;
    if (heroVis) heroVis.style.transform = `translateY(${scrollY * 0.05}px)`;
  }
});

/* ── Console Easter egg ── */
console.log(
`%c
  ____  _  _  _____  ____    ____  _  _  ____  __   _  _  ____
 (_  _)( )( )(  _  )(_  _)  / ___)( )( )(_  _)(  ) ( )( )(_  _)
  _)(_  )()(  )(_)(   )(    ( (__  )()(   )(   /__\\  )()(   )(
 (____)(_/\\_)(_____)  (__) __ \\___)(_____)(__) (__)(__)(__) (__)
                               |__|
  Portfolio of Niranjan — Embedded Systems & IoT Enthusiast
  Built with raw HTML/CSS/JS — No frameworks, just circuits.
`,
'color: #4da8ff; font-family: monospace;'
);

/* ═══════════════════════════════════════════
   UI/UX ENHANCEMENTS
   ═══════════════════════════════════════════ */

/* ── Custom Cursor ── */
(function() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let ringX = 0, ringY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', e => {
    dotX = e.clientX;
    dotY = e.clientY;
    dot.style.left  = dotX + 'px';
    dot.style.top   = dotY + 'px';
  });

  function animateRing() {
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
})();

/* ── Floating Particles ── */
(function() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 55;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.15,
    color: Math.random() > 0.5 ? '77,168,255' : '124,92,252'
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(77,168,255,${0.06 * (1 - dist/130)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Scroll to Top ── */
(function() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Typed Text Hero ── */
(function() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Embedded Systems Engineer',
    'IoT Developer',
    'Circuit Designer',
    'Firmware Developer',
    'Robotics Enthusiast'
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (deleting) {
      el.textContent = current.slice(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 45);
    } else {
      el.textContent = current.slice(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 80);
    }
  }
  setTimeout(type, 800);
})();

/* ── Skill fill dot visibility on animate ── */
document.querySelectorAll('.skill-fill').forEach(fill => {
  const observer = new MutationObserver(() => {
    const w = parseFloat(fill.style.width);
    if (w > 0) fill.classList.add('animated');
  });
  observer.observe(fill, { attributes: true, attributeFilter: ['style'] });
});

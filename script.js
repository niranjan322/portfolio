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
          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            pctEl.textContent = Math.round(eased * width) + '%';
            if (progress < 1) requestAnimationFrame(tick);
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
  _)(_  )()(  )(_)(   )(    ( (__  )()(   )(   /__\  )()(   )(
 (____)(_/\_)(_____)  (__) __ \___)(_____)(__) (__)(__)(__) (__)
                               |__|
  Portfolio of Niranjan — Embedded Systems & IoT Enthusiast
  Built with raw HTML/CSS/JS — No frameworks, just circuits.
`,
'color: #4da8ff; font-family: monospace;'
);

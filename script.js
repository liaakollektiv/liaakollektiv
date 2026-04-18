/* ─────────────────────────────────────────────
   VEREINSSEITE · script.js
   ───────────────────────────────────────────── */

/* ── LANGUAGE ── */
let currentLang = localStorage.getItem('lang') || 'de';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.body.dataset.lang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Re-render events in new language
  renderEvents();
}

/* ── EVENTS RENDERING ── */
const STATUS_LABELS = {
  open:    { de: 'Offen',      en: 'Open' },
  members: { de: 'Mitglieder', en: 'Members only' },
  full:    { de: 'Ausgebucht', en: 'Fully booked' },
};

function renderEvents() {
  const container = document.getElementById('event-list');
  if (!container) return;

  if (!EVENTS || EVENTS.length === 0) {
    container.innerHTML = `
      <div class="no-events">
        <span data-de="Keine Termine eingetragen." data-en="No events listed.">
          ${currentLang === 'de' ? 'Keine Termine eingetragen.' : 'No events listed.'}
        </span>
      </div>`;
    return;
  }

  container.innerHTML = EVENTS.map(ev => {
    const title    = currentLang === 'de' ? ev.title_de    : ev.title_en;
    const location = currentLang === 'de' ? ev.location_de : ev.location_en;
    const month    = currentLang === 'de' ? ev.month_de    : ev.month_en;
    const badge    = STATUS_LABELS[ev.status] || STATUS_LABELS.open;
    const badgeLabel = badge[currentLang];

    return `
    <div class="event-card reveal">
      <div class="event-date">
        <div class="event-day">${ev.day}</div>
        <div class="event-month">${month}</div>
      </div>
      <div class="event-info">
        <h3>${title}</h3>
        <div class="event-meta">
          <span class="event-meta-item">
            <svg class="event-meta-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/>
            </svg>
            ${ev.time}
          </span>
          <span class="event-meta-item">
            <svg class="event-meta-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 14S3 9.5 3 6a5 5 0 0 1 10 0c0 3.5-5 8-5 8z"/><circle cx="8" cy="6" r="1.5"/>
            </svg>
            ${location}
          </span>
        </div>
      </div>
      <span class="event-badge badge-${ev.status}">${badgeLabel}</span>
    </div>`;
  }).join('');

  // trigger reveal for newly added cards
  observeReveal();
}

/* ── SCROLL REVEAL ── */
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

/* ── MOBILE MENU ── */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved language
  document.body.dataset.lang = currentLang;
  document.documentElement.lang = currentLang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  // Render events from events.js
  renderEvents();

  // Scroll reveal for static elements
  observeReveal();

  // Close mobile menu when link clicked
  document.querySelectorAll('#mobile-menu a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Active nav link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, #mobile-menu a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.fontWeight = link.getAttribute('href') === '#' + entry.target.id ? '900' : '';
          link.style.color = link.getAttribute('href') === '#' + entry.target.id ? 'var(--clr-primary)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));
});

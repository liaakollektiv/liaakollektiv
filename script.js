/* ─────────────────────────────────────────────
   LIAA KOLLEKTIV · script.js
   ───────────────────────────────────────────── */

/* ══════════════════════════════════════
   LANGUAGE SYSTEM
   ══════════════════════════════════════

   Jedes Element mit data-de="..." und data-en="..."
   bekommt beim Sprachenwechsel automatisch den
   richtigen Text gesetzt.
*/

let currentLang = localStorage.getItem('lang') || 'de';

/**
 * Alle Elemente mit data-de / data-en Attributen
 * auf die neue Sprache umschalten.
 */
function applyLang(lang) {
  // Update alle Textelemente
  document.querySelectorAll('[data-de],[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null) {
      // innerHTML erlaubt <br> in Texten
      el.innerHTML = text;
    }
  });

  // Sprachbuttons updaten
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // html-Tag updaten (Screenreader, SEO)
  document.documentElement.lang = lang;
}

/**
 * Öffentliche Funktion — wird von den Buttons aufgerufen.
 */
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyLang(lang);
  renderEvents(); // Events neu rendern (mehrsprachig)
}


/* ══════════════════════════════════════
   EVENTS RENDERING
   Liest EVENTS aus events.js und baut
   die Terminliste dynamisch auf.
   ══════════════════════════════════════ */

const STATUS_LABELS = {
  open:    { de: 'Offen',      en: 'Open' },
  members: { de: 'Mitglieder', en: 'Members only' },
  full:    { de: 'Ausgebucht', en: 'Fully booked' },
};

function renderEvents() {
  const container = document.getElementById('event-list');
  if (!container) return;

  if (typeof EVENTS === 'undefined' || EVENTS.length === 0) {
    container.innerHTML = `
      <div class="no-events">
        ${currentLang === 'de' ? 'Keine Termine eingetragen.' : 'No events listed.'}
      </div>`;
    return;
  }

  container.innerHTML = EVENTS.map(ev => {
    const title    = currentLang === 'de' ? ev.title_de    : ev.title_en;
    const location = currentLang === 'de' ? ev.location_de : ev.location_en;
    const month    = currentLang === 'de' ? ev.month_de    : ev.month_en;
    const badge    = STATUS_LABELS[ev.status] || STATUS_LABELS.open;

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
      <span class="event-badge badge-${ev.status}">${badge[currentLang]}</span>
    </div>`;
  }).join('');

  observeReveal();
}


/* ══════════════════════════════════════
   SCROLL REVEAL
   ══════════════════════════════════════ */
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


/* ══════════════════════════════════════
   MOBILE MENU
   ══════════════════════════════════════ */
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}


/* ══════════════════════════════════════
   INIT
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // Sprache anwenden (aus localStorage oder Standard: de)
  applyLang(currentLang);

  // Events rendern
  renderEvents();

  // Scroll-Reveal starten
  observeReveal();

  // Mobile Menu: Links schließen das Menü
  document.querySelectorAll('#mobile-menu a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Aktiven Nav-Link beim Scrollen hervorheben
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, #mobile-menu a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === '#' + entry.target.id;
          link.style.color      = isActive ? 'var(--clr-primary)' : '';
          link.style.fontWeight = isActive ? '900' : '';
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => sectionObserver.observe(s));
});

async function loadEvents() {
  const res = await fetch('events.json');
  const events = await res.json();

  const container = document.getElementById('event-list');

  events.forEach(event => {
    const date = new Date(event.date);
    const day = date.getDate();
    const month = date.toLocaleString('de-DE', { month: 'short' }).toUpperCase();

    const el = document.createElement('div');
    el.className = 'event-item';

    el.innerHTML = `
      <div class="event-date-block">
        <div class="event-day">${day}</div>
        <div class="event-month">${month}</div>
      </div>

      <div class="event-info">
        <h3>${event.title_de}</h3>
        <div class="event-meta">
          <span>🕖 ${event.time}</span>
          <span>📍 ${event.location_de}</span>
        </div>
      </div>

      <span class="event-badge badge-${event.type}">
        ${getLabel(event.type)}
      </span>
    `;

    container.appendChild(el);
  });
}

function getLabel(type) {
  if (type === 'open') return 'Offen';
  if (type === 'members') return 'Mitglieder';
  if (type === 'full') return 'Ausgebucht';
  return '';
}

loadEvents();
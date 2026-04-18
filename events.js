/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                    TERMINE & EVENTS                              ║
 * ║  Hier könnt ihr Termine hinzufügen, ändern oder entfernen.       ║
 * ║  Kein HTML-Wissen nötig — einfach die Felder anpassen!           ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * PRO TERMIN folgende Felder ausfüllen:
 *
 *   date_de  → Datum auf Deutsch (z.B. "24. April 2025")
 *   date_en  → Datum auf Englisch (z.B. "April 24, 2025")
 *   day      → Nur die Zahl des Tages (z.B. "24")
 *   month_de → Monatsabkürzung Deutsch (z.B. "APR")
 *   month_en → Monatsabkürzung Englisch (z.B. "APR")
 *   title_de → Titel auf Deutsch
 *   title_en → Titel auf Englisch
 *   time     → Uhrzeit (z.B. "18:00 Uhr" oder "10:00 – 14:00 Uhr")
 *   location_de → Ort auf Deutsch
 *   location_en → Ort auf Englisch
 *   status   → "open" (offen für alle), "members" (nur Mitglieder), "full" (ausgebucht)
 *
 * Neuen Termin hinzufügen: Den Block { ... } kopieren und anpassen.
 * Termin entfernen: Den ganzen Block { ... } löschen.
 */

const EVENTS = [
  {
    day: "24",
    month_de: "APR",
    month_en: "APR",
    title_de: "Frühjahrstreffen",
    title_en: "Spring Meeting",
    time: "18:00 Uhr",
    location_de: "Vereinsheim",
    location_en: "Clubhouse",
    status: "mögliche Notizen",
  },
  {
    day: "10",
    month_de: "MAI",
    month_en: "MAY",
    title_de: "Tag der offenen Tür",
    title_en: "Open Day",
    time: "10:00 – 17:00 Uhr",
    location_de: "Hauptgebäude",
    location_en: "Main Building",
    status: "mögliche Notizen",
  },
  {
    day: "22",
    month_de: "MAI",
    month_en: "MAY",
    title_de: "Jahreshauptversammlung",
    title_en: "Annual General Meeting",
    time: "19:00 Uhr",
    location_de: "Festsaal",
    location_en: "Main Hall",
    status: "mögliche Notizen",
  },
  {
    day: "14",
    month_de: "JUN",
    month_en: "JUN",
    title_de: "Sommerfest",
    title_en: "Summer Festival",
    time: "14:00 – 22:00 Uhr",
    location_de: "Außengelände",
    location_en: "Outdoor Area",
    status: "mögliche Notizen",
  },
  {
    day: "05",
    month_de: "JUL",
    month_en: "JUL",
    title_de: "Workshop: Einführung für Neue",
    title_en: "Workshop: Introduction for Newcomers",
    time: "10:00 – 13:00 Uhr",
    location_de: "Seminarraum 1",
    location_en: "Seminar Room 1",
    status: "mögliche Notizen",
  },
];

// script.js – Interaktivitet för Git-workshop-sidan
//
// JavaScript körs i webbläsaren och kan läsa och ändra HTML-sidan i realtid.
// Det sker via DOM:en (Document Object Model) – en trädstruktur av alla element.

// ── Hämta element från DOM:en ──────────────────────────────────────────────
// getElementById letar upp ett HTML-element med ett specifikt id-attribut.
// Vi sparar referenserna i variabler så vi slipper söka igen varje gång.
const input  = document.getElementById('log-input');    // Textfältet
const button = document.getElementById('log-button');   // Spara-knappen
const log    = document.getElementById('workshop-log'); // Behållaren för poster

// ── Eventlystnare på knappen ────────────────────────────────────────────
// addEventListener(händelse, funktion) kör funktionen varje gång händelsen sker.
// 'click' är händelsen som triggas när användaren klickar på knappen.
button.addEventListener('click', () => {
  // Hämta texten från inputfältet och ta bort inledande/avslutande blanksteg
  const text = input.value.trim();

  // Om fältet är tomt – sätt fokus tillbaka på det och avbryt
  if (!text) {
    input.focus();
    return; // return avslutar funktionen direkt
  }

  // Skapa ett nytt <div>-element i minnet (det syns inte än)
  const item = document.createElement('div');

  // Lägg till CSS-klassen "log-item" så elementet stilas rätt
  item.className = 'log-item';

  // Sätt texten inuti elementet (textContent är säkrare än innerHTML –
  // det tolkar inte texten som HTML, vilket skyddar mot XSS-attacker)
  item.textContent = text;

  // Om placeholdern "loggen är tom" fortfarande visas – ta bort den
  if (log.querySelector('.log-empty')) {
    log.innerHTML = ''; // Töm hela behållaren
  }

  // Lägg till den nya posten FÖRST i loggen (nyast överst)
  // prepend lägger till i början, append hade lagt till i slutet
  log.prepend(item);

  // Rensa textfältet och flytta fokus dit så man kan skriva direkt igen
  input.value = '';
  input.focus();
});

// ── Eventlyssnare på tangentbordet ─────────────────────────────────────
// 'keydown' triggas varje gång en tangent trycks ned i inputfältet.
// Vi lyssnar efter Enter-tangenten så man kan spara utan att klicka.
input.addEventListener('keydown', (event) => {
  // event.key innehåller namnet på tangenten som trycktes
  if (event.key === 'Enter') {
    button.click(); // Simulerar ett klick på knappen – återanvänder samma logik
  }
});

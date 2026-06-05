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

// ── Quiz ────────────────────────────────────────────────────────────────
// Varje fråga är ett objekt med frågetext, svarsalternativ och index på rätt svar.
const quizFragor = [
  {
    fraga: 'Vad gör kommandot git pull?',
    alternativ: [
      'Laddar upp dina lokala ändringar till GitHub',
      'Hämtar och slår ihop ändringar från remote till din lokala branch',
      'Skapar en ny branch från main',
      'Ångrar den senaste commiten',
    ],
    ratt: 1,
  },
  {
    fraga: 'Vad är en "branch" i Git?',
    alternativ: [
      'En kopia av hela repot på en annan server',
      'En tagg som markerar en specifik version',
      'En parallell utvecklingslinje där du kan jobba utan att påverka main',
      'En sammanfattning av alla commits',
    ],
    ratt: 2,
  },
  {
    fraga: 'Vad händer när du kör git merge?',
    alternativ: [
      'Din branch tas bort permanent',
      'Alla commits skrivs om från grunden',
      'Ändringar från en branch slås ihop med den nuvarande branchen',
      'En ny remote läggs till',
    ],
    ratt: 2,
  },
  {
    fraga: 'Vad innebär en "pull request" (PR)?',
    alternativ: [
      'En begäran om att någon annan ska granska och godkänna dina ändringar',
      'Ett kommando för att hämta kod från en annan dator',
      'Ett sätt att ta bort en branch från GitHub',
      'En automatisk merge utan granskning',
    ],
    ratt: 0,
  },
  {
    fraga: 'Vad gör git status?',
    alternativ: [
      'Visar historiken över alla commits',
      'Skickar ändringar till remote',
      'Visar vilka filer som ändrats eller inte är stagade än',
      'Skapar en ny commit automatiskt',
    ],
    ratt: 2,
  },
];

// Håller koll på vilken fråga vi är på och hur många rätt spelaren fått
let fragaIndex = 0;
let rattSvar   = 0;

// Hämta quiz-elementen från DOM:en
const quizQuestion = document.getElementById('quiz-question');
const quizOptions  = document.getElementById('quiz-options');
const quizFeedback = document.getElementById('quiz-feedback');
const quizNext     = document.getElementById('quiz-next');
const quizProgress = document.getElementById('quiz-progress');
const quizResult   = document.getElementById('quiz-result');
const quizScore    = document.getElementById('quiz-score');
const quizRestart  = document.getElementById('quiz-restart');
const quizWrap     = document.getElementById('quiz-question-wrap');

function visaFraga(index) {
  const fraganNu = quizFragor[index];

  quizProgress.textContent = `Fråga ${index + 1} av ${quizFragor.length}`;
  quizQuestion.textContent = fraganNu.fraga;
  quizFeedback.textContent = '';
  quizNext.style.display   = 'none';

  // Töm gamla alternativ och skapa nya knappar
  quizOptions.innerHTML = '';
  fraganNu.alternativ.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.textContent = text;

    btn.addEventListener('click', () => {
      // Inaktivera alla knappar direkt efter ett svar
      quizOptions.querySelectorAll('button').forEach(b => (b.disabled = true));

      if (i === fraganNu.ratt) {
        btn.classList.add('correct');
        quizFeedback.textContent = '✓ Rätt!';
        rattSvar++;
      } else {
        btn.classList.add('wrong');
        // Markera det rätta svaret grönt så man lär sig
        quizOptions.querySelectorAll('button')[fraganNu.ratt].classList.add('correct');
        quizFeedback.textContent = '✗ Fel – rätt svar är markerat i grönt.';
      }

      // Sista frågan → visa "Visa resultat" istället för "Nästa fråga"
      quizNext.textContent  = index + 1 < quizFragor.length ? 'Nästa fråga →' : 'Visa resultat';
      quizNext.style.display = 'inline-block';
    });

    quizOptions.appendChild(btn);
  });
}

quizNext.addEventListener('click', () => {
  fragaIndex++;
  if (fragaIndex < quizFragor.length) {
    visaFraga(fragaIndex);
  } else {
    // Alla frågor klara – visa resultatsidan
    quizWrap.style.display   = 'none';
    quizResult.style.display = 'block';

    const emoji = rattSvar === quizFragor.length ? '🎉' : rattSvar >= 3 ? '👍' : '📚';
    quizScore.textContent = `${emoji} Du fick ${rattSvar} av ${quizFragor.length} rätt!`;
  }
});

quizRestart.addEventListener('click', () => {
  fragaIndex             = 0;
  rattSvar               = 0;
  quizResult.style.display = 'none';
  quizWrap.style.display   = 'block';
  visaFraga(0);
});

// Starta quizen direkt när sidan laddas
visaFraga(0);

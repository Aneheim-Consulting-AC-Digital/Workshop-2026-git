# Git-workshop: Instruktioner

Det här är ett enkelt arbetsområde för att öva Git och GitHub tillsammans.

## Vad ingår
- `index.html` — enkel webbsida med övningsformat
- `styles.css` — grundläggande styling
- `script.js` — enkel JavaScript-interaktion
- `INSTRUKTIONER.md` — steg-för-steg-guide

## Starta webbsidan på localhost
1. Öppna en terminal i mappen `workshop`.
2. Kör:
   ```bash
   python3 -m http.server 8000
   ```
3. Öppna webbläsaren och gå till:
   ```
   http://localhost:8000
   ```

> Alternativt kan ni öppna `index.html` direkt i webbläsaren, men localhost ger samma miljö som en riktig webbserver.

## Förslag på pedagogiskt upplägg

1. **Förklara målet först**
   - Målet är att kunna klona repot, göra ändringar, commit:a, pusha och skapa en pull request.
   - Spela upp hur en gemensam arbetsprocess kan se ut.

2. **Arbeta i par eller små grupper**
   - En person skriver, en annan läser, och ni byter roller.
   - Låt gruppen diskutera varje commit-meddelande.

3. **Gör övningar i små steg**
   - Skapa en ny branch med namn som `övning-1`, `övning-2`, `fixa-styling`, etc.
   - Gör små ändringar i `index.html`, `styles.css` eller `script.js`.

4. **Tänk på tydliga commits**
   - Exempel: `lägg till loggfunktion`, `justera rubrikfärg`, `lägg till instruktioner`.
   - Commit ofta, men bara när ändringen är logisk och färdig.

5. **Push och pull request**
   - Pusha brancher till GitHub.
   - Skapa en pull request och be en kollega granska den.
   - Använd PR-kommentarer för att förklara vad ni gjort.

## Förslag på övningar

### Övning 1: Ändra texten
- Öppna `index.html`.
- Lägg till en egen övningstext i listan eller byt ut rubrik.
- Spara filen, commit:a och pusha.

### Övning 2: Styling
- Öppna `styles.css`.
- Ändra färg på bakgrunden eller knappen.
- Testa i webbläsaren och kontrollera resultatet.
- Commit:a med ett tydligt meddelande.

### Övning 3: Interaktiv logg
- Öppna `script.js`.
- Skriv ny text i loggen och testa funktionen.
- Lägg till en liten förbättring, t.ex. ändra knapptext eller rensa fältet.

## Git-flöde

1. `git clone <repo-url>`
2. `git checkout -b övning-1`
3. Gör ändringar
4. `git add .`
5. `git commit -m "lägg till egen text"`
6. `git push -u origin övning-1`
7. Skapa pull request på GitHub

## Avslutning
Ni är klara kan ni mergea en pull request till `main` och se hur sidan uppdateras.



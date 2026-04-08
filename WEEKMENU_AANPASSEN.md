# Weekmenu aanpassen

Je hebt nu twee bestanden:

- `/Users/suzannescheerens/Documents/Website aan tafel bij san/weekmenu.txt`
- `/Users/suzannescheerens/Documents/Website aan tafel bij san/weekmenu-next.txt`

Zo werkt het:

1. Pas `weekmenu.txt` aan als je het huidige live menu wilt wijzigen
2. Pas `weekmenu-next.txt` aan als je alvast het volgende menu wilt klaarzetten
3. Vul in `weekmenu-next.txt` bij `publishAt` het moment in waarop het menu live moet gaan
4. Sla het bestand op
5. De website zet het volgende menu automatisch live zodra `publishAt` is bereikt

Handig om te weten:

- In `weekmenu-next.txt` hoef je alleen nog de volgende velden in te vullen:
  `publishAt`, `weekLabel`, `servingDate`, `dishTitle`, `dishDescription` en `priceText`
- Alles wat je niet invult, blijft automatisch hetzelfde als op de huidige live site
- `tagline` en `invitation` kun je alleen invullen als je die ook wilt wijzigen
- Je kunt vooraf een preview bekijken via `https://www.aantafelbijsan.nl/?preview=next`

Voorbeeld:

```txt
publishAt: 2026-04-12T11:00:00+02:00
weekLabel: Weekmenu 17
servingDate: woensdag 15 april
dishTitle: Lasagne bolognese
dishDescription: met frisse salade en kruidenboter
priceText: € 13,50 per persoon
```

Voorbeeld van automatisch live zetten op zondag 11:00:

```txt
publishAt: 2026-04-12T11:00:00+02:00
```

Belangrijk:

- Laat de woorden links van de `:` staan
- Laat elke regel op een nieuwe regel staan
- Laat een regel leeg als je die waarde niet wilt wijzigen

De website leest automatisch `weekmenu.txt` in en schakelt automatisch over naar `weekmenu-next.txt` zodra `publishAt` is bereikt.

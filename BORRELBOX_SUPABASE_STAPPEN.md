# Borrelbox professioneel maken met Supabase

Dit is de professionele oplossing voor de borrelbox.

Hiermee gebeurt straks automatisch:

- per datum maximaal 4 boxen
- als iemand 3 boxen reserveert, blijven er nog maar 1 over
- als het op is, springt de datum automatisch naar `Vol`
- als 2 mensen tegelijk reserveren, voorkomt het systeem dat er te veel wordt geboekt

## Wat jij even moet doen

### 1. Maak een Supabase-project aan

1. Ga naar [supabase.com](https://supabase.com/)
2. Log in of maak een account aan
3. Klik op `New project`
4. Kies een projectnaam, bijvoorbeeld:
   `aan-tafel-bij-san-borrelbox`
5. Kies een databasewachtwoord en sla dat goed op
6. Wacht tot het project klaar is

### 2. Zet de database klaar

1. Open in Supabase links `SQL Editor`
2. Klik op `New query`
3. Open dit bestand:
   [BORRELBOX_SUPABASE_SCHEMA.sql](/Users/suzannescheerens/Documents/Website%20aan%20tafel%20bij%20san/supabase/BORRELBOX_SUPABASE_SCHEMA.sql)
4. Kopieer de hele inhoud
5. Plak dit in de SQL Editor
6. Klik op `Run`

Daarmee worden meteen de tabellen en de eerste data aangemaakt.

### 3. Geef mij daarna deze 2 dingen

Die vind je in Supabase bij:

`Project Settings` → `API`

Ik heb van jou nodig:

- `Project URL`
- `anon public key`

Stuur die hier naar mij, dan maak ik de borrelbox-pagina verder voor je af.

## Hoe jij straks data per maand openzet

Als alles aangesloten is, kun jij per maand heel simpel nieuwe zaterdagen toevoegen.

Gebruik daarvoor dit bestand:

[BORRELBOX_DATA_BIJWERKEN.sql](/Users/suzannescheerens/Documents/Website%20aan%20tafel%20bij%20san/supabase/BORRELBOX_DATA_BIJWERKEN.sql)

Daar pas je alleen de datums aan.

Voorbeelden:

- `available` = bezoekers kunnen reserveren
- `full` = handmatig op vol zetten
- `closed` = datum staat wel in de lijst, maar is gesloten

## Wat ik daarna voor je doe

Zodra jij mij de `Project URL` en `anon public key` stuurt:

1. koppel ik de borrelbox-pagina aan Supabase
2. laat ik de website live de voorraad ophalen
3. zorg ik dat reserveren alleen lukt als er echt nog boxen beschikbaar zijn
4. laat ik de status automatisch op `Vol` springen
5. testen we het samen eerst in preview

## Belangrijk

Er wordt nu nog niets live gezet.

We doen dit eerst netjes in preview, zodat jouw huidige website gewoon rustig blijft werken.

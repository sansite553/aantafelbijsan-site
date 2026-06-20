# Bevestigingsmail voor borrelbox aanzetten

De code is al voorbereid.
Er zijn nog 3 korte stappen nodig om de automatische bevestigingsmail naar de klant echt werkend te maken.

## 1. Maak een Gmail app-wachtwoord aan

Gebruik hiervoor het Gmail-adres:

`aantafelbijsan@gmail.com`

Benodigd:

1. Zet 2-staps-verificatie aan op dit Google-account.
2. Ga daarna naar Google `App-wachtwoorden`.
3. Maak een nieuw app-wachtwoord aan voor `Mail`.
4. Bewaar dat wachtwoord even, dat heb je zo nodig in Supabase.

## 2. Voeg secrets toe in Supabase

Ga in Supabase naar je project en daarna naar:

`Edge Functions` -> `Secrets`

Voeg daar deze secrets toe:

`SMTP_USER` = `aantafelbijsan@gmail.com`

`SMTP_PASS` = het Gmail app-wachtwoord dat je net hebt aangemaakt

Optioneel kun je ook toevoegen:

`SMTP_HOST` = `smtp.gmail.com`

`SMTP_PORT` = `465`

`SMTP_SECURE` = `true`

## 3. Deploy de Edge Function

Maak in Supabase een nieuwe Edge Function aan met deze naam:

`send-borrelbox-confirmation`

Gebruik daarna de code uit:

`supabase/functions/send-borrelbox-confirmation/index.ts`

Na deploy gebruikt de website automatisch deze function om een bevestigingsmail naar de klant te sturen.

## Wat er daarna gebeurt

Na een reservering:

- de reservering wordt opgeslagen in Supabase
- jij ontvangt nog steeds je melding
- de klant ontvangt automatisch een bevestigingsmail

## Tekst in de bevestigingsmail

De klant krijgt een nette mail in het Nederlands met:

- naam
- gekozen datum
- aantal boxen
- bericht dat jij nog contact opneemt voor bevestiging en betaalverzoek

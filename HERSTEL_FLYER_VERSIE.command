#!/bin/zsh

set -e

cd "$(dirname "$0")"

cp "backup-flyer-versie/index.html" "index.html"
cp "backup-flyer-versie/styles.css" "styles.css"
cp "backup-flyer-versie/script.js" "script.js"
cp "backup-flyer-versie/menu-data.js" "menu-data.js"
cp "backup-flyer-versie/brand-seal.png" "brand-seal.png"
cp "backup-flyer-versie/weekmenu-flyer.png" "weekmenu-flyer.png"
cp "backup-flyer-versie/WEEKMENU_AANPASSEN.md" "WEEKMENU_AANPASSEN.md"

echo "De flyer-versie is teruggezet."
echo "Je kunt nu de website verversen in je browser."

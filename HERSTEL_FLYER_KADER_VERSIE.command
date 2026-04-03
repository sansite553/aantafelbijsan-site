#!/bin/zsh

set -e

cd "$(dirname "$0")"

cp "backup-flyer-kader-versie/index.html" "index.html"
cp "backup-flyer-kader-versie/styles.css" "styles.css"
cp "backup-flyer-kader-versie/script.js" "script.js"
cp "backup-flyer-kader-versie/menu-data.js" "menu-data.js"
cp "backup-flyer-kader-versie/brand-seal.png" "brand-seal.png"
cp "backup-flyer-kader-versie/weekmenu-flyer.png" "weekmenu-flyer.png"
cp "backup-flyer-kader-versie/WEEKMENU_AANPASSEN.md" "WEEKMENU_AANPASSEN.md"

echo "De versie met flyer-kader is teruggezet."
echo "Ververs nu de website in je browser."

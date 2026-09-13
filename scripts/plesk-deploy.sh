#!/bin/bash
# Plesk Git → "Aanvullende acties bij publicatie" (optioneel):
#   bash scripts/plesk-deploy.sh
#
# Werkt als Zoekpad = map met package.json (hele repo).
# .htaccess stuurt traffic naar out/. Dit script ruimt alleen de Plesk-defaultpagina op.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f out/index.html ]; then
  echo "FOUT: out/index.html ontbreekt. Push eerst een static build (npm run build:static)."
  exit 1
fi

if [ ! -f .htaccess ]; then
  echo "FOUT: .htaccess ontbreekt in de repo-root."
  exit 1
fi

# Plesk-defaultpagina blokkeert soms DirectoryIndex naar out/
if [ -f index.html ] && grep -qi "Domain Default page\|default-website-index" index.html 2>/dev/null; then
  echo "==> Plesk-defaultpagina verwijderen"
  rm -f index.html index.htm
fi

echo "==> Klaar. Site wordt geserveerd vanuit out/ via .htaccess"
echo "    Controleer: https://jouw-domein/"

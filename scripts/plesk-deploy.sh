#!/bin/bash
# Plesk Git → "Aanvullende acties bij publicatie":
#   bash scripts/plesk-deploy.sh
#
# Zoekpad = map met package.json (hele repo).
# 1) Kopieert out/ naar document root zodat / direct werkt
# 2) Ruimt Plesk-defaultpagina op
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f out/index.html ]; then
  echo "FOUT: out/index.html ontbreekt. Push eerst: npm run build:static"
  exit 1
fi

echo "==> Statische site uit out/ naar document root kopiëren"
# shellcheck disable=SC2086
if command -v rsync >/dev/null 2>&1; then
  rsync -a out/ ./ \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude 'src' \
    --exclude 'scripts' \
    --exclude 'prisma' \
    --exclude 'out'
else
  cp -a out/. ./
fi

if [ -f index.html ] && grep -qi "Domain Default page\|default-website-index" index.html 2>/dev/null; then
  echo "==> Plesk-defaultpagina vervangen mislukt; forceer out/index.html"
  cp -f out/index.html index.html
fi

# Zorg dat DirectoryIndex klopt (rewrite dekt out/ ook)
if [ ! -f .htaccess ]; then
  printf '%s\n' 'DirectoryIndex index.html' > .htaccess
fi

echo "==> Klaar. Controleer https://jouw-domein/ (hard refresh)"

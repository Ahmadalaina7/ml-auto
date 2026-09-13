#!/bin/bash
# Plesk Git: plak dit als "Aanvullende acties bij publicatie"
# of voer uit: bash scripts/plesk-deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Dependencies installeren"
npm ci

echo "==> Data-map aanmaken"
mkdir -p data/uploads

if [ ! -f .env ]; then
  echo "FOUT: .env ontbreekt. Kopieer .env.example naar .env en vul AUTH_SECRET, DATABASE_URL en admin-gegevens in."
  exit 1
fi

echo "==> Database migreren"
npx prisma migrate deploy

echo "==> Productie-build"
npm run build

echo "==> Klaar. Herstart de Node.js-app in Plesk indien nodig."

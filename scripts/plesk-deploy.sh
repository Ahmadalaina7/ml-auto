#!/bin/bash
# Plesk Git → "Aanvullende acties bij publicatie":
#   bash scripts/plesk-deploy.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Werkmap: $ROOT"

if [ ! -f package.json ] || [ ! -f server.js ]; then
  echo "FOUT: package.json/server.js niet gevonden. Zet in Plesk het Zoekpad server op de map met deze bestanden."
  exit 1
fi

echo "==> Plesk-defaultpagina verwijderen (blokkeert anders de app)"
rm -f index.html index.htm default.html Default.htm

echo "==> Data-map aanmaken"
mkdir -p data/uploads

if [ ! -f .env ]; then
  echo "==> .env ontbreekt → automatisch aanmaken"
  if command -v openssl >/dev/null 2>&1; then
    SECRET="$(openssl rand -hex 24)"
  else
    SECRET="$(head -c 48 /dev/urandom | od -An -tx1 | tr -d ' \n')"
  fi
  cat > .env <<EOF
DATABASE_URL="file:./data/prod.db"
AUTH_SECRET="${SECRET}"
ADMIN_EMAIL="admin@mlauto.nl"
ADMIN_PASSWORD="WijzigDitWachtwoord123"
DATA_DIR="data"
LOG_LEVEL="info"
EOF
  echo "==> .env aangemaakt. Wijzig ADMIN_PASSWORD na eerste login."
  FIRST_DEPLOY=1
else
  FIRST_DEPLOY=0
fi

# Plesk zet vaak NODE_ENV=production → dan ontbreken build-tools. Forceer volledige install.
echo "==> Dependencies installeren"
export NPM_CONFIG_PRODUCTION=false
NODE_ENV=development npm ci

echo "==> Prisma client genereren"
npx prisma generate

echo "==> Database migreren"
npx prisma migrate deploy

if [ "$FIRST_DEPLOY" = "1" ]; then
  echo "==> Eerste deploy: admin + demo-data seeden"
  npm run db:seed || true
fi

echo "==> Productie-build"
NODE_ENV=production npm run build

echo "==> Klaar."
echo "    1) Plesk → Node.js: AN, startup file = server.js (of app.js), Node 20+"
echo "    2) Node.js-app HERSTARTEN"
echo "    3) Document root = deze map (waar package.json staat)"

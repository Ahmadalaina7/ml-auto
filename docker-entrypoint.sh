#!/bin/sh
set -e

mkdir -p /app/data

echo "==> Databasemigraties toepassen"
node /app/node_modules/prisma/build/index.js migrate deploy

if [ "${ML_AUTO_SEED:-0}" = "1" ]; then
  echo "==> Seed uitvoeren"
  node /app/node_modules/tsx/dist/cli.mjs prisma/seed.ts
fi

echo "==> ML Auto server starten"
exec node /app/node_modules/next/dist/bin/next start -H 0.0.0.0 -p "${PORT:-3000}"
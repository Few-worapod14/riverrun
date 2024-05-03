#!/bin/bash
git pull
cp .env-dev ./apps/api/.env
cp .env-dev ./apps/web/.env
pnpm run build
pm2 restart ecosystem.config.js

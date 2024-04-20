#!/bin/bash
docker compose up -d
cp .env-dev ./apps/api/.env
cp .env-dev ./apps/web/.env
pnpm install && pnpm run build
pm2 start npm --name "api" -- run start:prod --cwd /var/www/riverrun/apps/api
pm2 start npm --name "ui" -- run preview --cwd /var/www/riverrun/web

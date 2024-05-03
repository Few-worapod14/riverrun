#!/bin/bash
docker compose up -d
cp .env-dev ./apps/api/.env
cp .env-dev ./apps/web/.env
pnpm install && pnpm run build
pm2 start ecosystem.config.js


cp .env ./apps/api/.env
cp .env ./apps/web/.env
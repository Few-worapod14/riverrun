#!/bin/bash
cp ../.env-dev ../apps/api/.env
cp ../.env-dev ../apps/web/.env
pnpm install && pnpm run build
pm2 start npm --name "api" -- run start:prod --cwd ../apps/api
pm2 start npm --name "ui" -- run preview --cwd ../apps/web

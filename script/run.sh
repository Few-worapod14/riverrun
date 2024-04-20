#!/bin/bash
cd .. && pnpm run build
pm2 start npm --name "api" -- start:prod --cwd ../apps/api
pm2 start npm --name "ui" -- preview --cwd ../apps/web

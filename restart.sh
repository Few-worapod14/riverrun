#!/bin/bash
git pull
pm2 restart ecosystem.config.js

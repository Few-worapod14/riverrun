#!/bin/bash

# Update package lists
sudo apt update

# Install Docker
sudo apt install -y docker.io

# Add your user to the docker group
sudo usermod -aG docker $USER

# Install Docker Compose
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.3.3/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose

# Install Nginx
sudo apt install -y nginx

# Install Node.js version 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pm2
npm install pm2@latest -g

cp ../nginx/dev.conf:/etc/nginx/conf.d/default.conf

# Display versions of installed software
echo "Docker version:"
docker --version
echo "Docker Compose version:"
docker compose version
echo "Nginx version:"
nginx -v
echo "Node.js version:"
node --version

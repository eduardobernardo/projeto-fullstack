#!/bin/bash
##################################
# Testado em ubuntu 22
##################################

# Install docker and docker-compose
sudo apt update
sudo apt install docker.io
sudo apt install docker-ce docker-ce-cli containerd.io
sudo apt install docker-compose

# Prevent permission issues
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

docker -v

echo "Reinicie a sessão do terminal para aplicar as alterações."
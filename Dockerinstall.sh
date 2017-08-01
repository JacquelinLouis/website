#!/usr/bin/env bash
# remove old docker version
sudo apt-get remove docker docker-engine docker.io
sudo apt-get update
# install tools
sudo apt-get install \
    linux-image-extra-$(uname -r) \
    linux-image-extra-virtual
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
# add docker to repo
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# use the matching architecture
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce
sudo docker run hello-world

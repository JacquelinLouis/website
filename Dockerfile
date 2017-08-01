# NodeJS
FROM ubuntu
MAINTAINER Louis Jacquelin <jacque_l@epita.fr>

# install our dependencies and NodeJS
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash
RUN apt-get update
RUN apt-get -y install nodejs
RUN apt-get update

# use changes to package.json to force Docker not to use the cache when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app

EXPOSE 8080

# CMD ["npm", "start"]
CMD ["node", "app.js"]
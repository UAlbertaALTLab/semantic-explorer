# Reference:
# https://github.com/UAlbertaALTLab/morphodict-frontend/blob/main/docker/Dockerfile
# https://www.pluralsight.com/guides/using-react.js-with-docker

# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install --force

# add app
COPY . ./

RUN npm run build

# uWSGI will bind HTTP to this port:
EXPOSE 3000 
# uWSGI stats are accessible on this port
# I view them with this command:
#
#    $ nc 127.0.0.1 9191 | jq
#
# EXPOSE 4141

# start app
CMD ["npm", "start"]

# Reference:
# https://github.com/UAlbertaALTLab/morphodict-frontend/blob/main/docker/Dockerfile
# https://www.pluralsight.com/guides/using-react.js-with-docker

# pull the base image
FROM node:alpine AS builder

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

#### Application image

FROM nginx
COPY --from=builder /app/build/ /usr/share/nginx/html

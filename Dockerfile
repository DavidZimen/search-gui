### STAGE 1:BUILD ###
# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies
# This is needed to build and compile our code
# while generating the docker image
FROM node:16-alpine as build-step

# Create a Virtual directory inside the docker image
RUN mkdir -p /app
WORKDIR /app

# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
COPY package.json /app
COPY . /app
RUN npm cache clean --force
RUN npm install
RUN npm run build-prod


### STAGE 2:RUN ###
# Defining nginx(web server) image to be used
FROM nginx:1.17.1-alpine

# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder

RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-step /app/dist/search-gui /usr/share/nginx/html

# Exposing a port, here it means that inside the container
# the app will be using Port 8080 while running
EXPOSE 8080

# Change the ownership of several vital directories to the pre-installed nginx user
#RUN chown -R nginx:nginx /var/cache/nginx
#RUN chown -R nginx:nginx /var/log/nginx
#RUN chown -R nginx:nginx /etc/nginx/conf.d
#RUN chown -R nginx:nginx /usr/share/nginx

#RUN touch /var/run/nginx.pid
#RUN chown -R nginx:nginx /var/run/nginx.pid

# Run the container with the pre-installed nginx user
#USER nginx

# When the container starts, run 'envsubst' to replace the system-environment.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/system-environment.template.js > /usr/share/nginx/html/assets/system-environment/system-environment.js && exec nginx -g 'daemon off;'"]

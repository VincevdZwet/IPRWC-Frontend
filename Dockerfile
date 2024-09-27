# Stage 1: Use an official Node 20 image to build the Angular app
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire Angular project into the container
COPY . .

# Build the Angular app for production
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginxinc/nginx-unprivileged

#### copy nginx conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#### copy artifact build from the 'build environment'
COPY --from=build /usr/src/app/dist/iprwc-frontend/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

# Use the official Node.js latest image as base
FROM node:latest

# Tell container where app's source code will live and create the directory if it doesn't exist
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for backend dependencies
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Navigate to the client directory
WORKDIR /usr/src/app/client

# Copy frontend package.json and package-lock.json
COPY client/package*.json ./

# Install frontend dependencies
RUN npm install

# Build the frontend project
RUN npm run build

# Go back to the root application directory for the CMD instruction
WORKDIR /usr/src/app

# Your app binds to port 3000, make sure you expose it
EXPOSE 3000


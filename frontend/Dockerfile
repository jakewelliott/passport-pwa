# Build stage
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend/ ./

# Build the application
RUN npm run build

# Final stage - just the build output
FROM alpine:latest

# Create directory for the build
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/dist /app/dist

# No CMD needed as this is just a build container

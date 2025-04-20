# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app

# Copy the .env file
COPY [".env", ".env"]

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend/ ./

# Build the application
RUN npm run build

# Stage 2: Set up Nginx with the frontend build
FROM nginx:alpine

# Copy the nginx.conf file
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the default.conf file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Create directory for SSL certificates
RUN mkdir -p /etc/nginx/certs/localhost

# Copy the ssl certificates
COPY nginx/certs/localhost/localhost+2.pem /etc/nginx/certs/localhost/localhost+2.pem
COPY nginx/certs/localhost/localhost+2-key.pem /etc/nginx/certs/localhost/localhost+2-key.pem

# Copy the built frontend files from the frontend-build stage
COPY --from=frontend-build /app/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

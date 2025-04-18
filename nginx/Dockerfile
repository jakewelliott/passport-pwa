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

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

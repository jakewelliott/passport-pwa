FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY localhost+2.pem /etc/nginx/localhost+2.pem
COPY localhost+2-key.pem /etc/nginx/localhost+2-key.pem
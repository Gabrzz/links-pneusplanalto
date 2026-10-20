FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html style.css app.js links.json favicon.svg apple-touch-icon.png /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
EXPOSE 80

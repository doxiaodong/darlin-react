FROM nginx
COPY dist/ /usr/share/nginx/html/dist/
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 4000

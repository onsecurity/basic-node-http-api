FROM node:12
ENV LOG_LEVEL=warn
ENV HTTP_AUTH=1
ENV HTTP_PORT=3000
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["node", "index.js"]
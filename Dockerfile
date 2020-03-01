# single application.
FROM gcr.io/google_appengine/nodejs

RUN /usr/local/bin/install_node 10.15.0

COPY package.json /app/package.json
RUN npm install
COPY . /app
CMD node server.js
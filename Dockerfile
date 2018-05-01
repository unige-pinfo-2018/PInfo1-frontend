FROM node:latest
LABEL maintainer="jeremie.martin42@gmail.com"

ENV HOME /home/node
ENV USER node

WORKDIR ${HOME}

RUN mkdir -p src test build static config dist
RUN npm install -g http-server

COPY src ${HOME}/src/
COPY test ${HOME}/test/
COPY build ${HOME}/build/
COPY config ${HOME}/config/
COPY package.json index.html .postcssrc.js .eslintrc.js .eslintignore .editorconfig .babelrc ${HOME}/

RUN chown -R ${USER}:${USER} src test build static config dist package.json index.html .postcssrc.js .eslintrc.js .eslintignore .editorconfig .babelrc .npm .

EXPOSE 8080

USER ${USER}

WORKDIR ${HOME}

CMD ["http-server", "/home/node/dist"]

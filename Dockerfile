FROM node:12.2.0
<<<<<<< HEAD
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD [ "npm", "start" ]
=======

WORKDIR /authms
COPY package.json /authms/
RUN npm install

COPY ./ /authms

RUN npm run build

CMD ["npm", "run", "start"]
>>>>>>> initialize project with docker and docker-composer and a /api/hello route

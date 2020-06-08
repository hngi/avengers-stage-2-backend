FROM node:12.2.0

WORKDIR /authms
COPY package.json /authms/
RUN npm install

COPY ./ /authms

RUN npm run build

CMD ["npm", "run", "start"]
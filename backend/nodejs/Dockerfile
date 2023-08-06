FROM node:18-alpine

# Create App directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# if you are building your code for production
# RUN npm ci --omit=dev

# bundle app source

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]


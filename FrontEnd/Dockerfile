FROM node:21
WORKDIR /app
RUN apt-get update 
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3000
CMD ["npm","start"]

FROM node:21
WORKDIR /app
RUN apt-get update 
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 8000
CMD ["npm","start"]

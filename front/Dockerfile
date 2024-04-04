FROM node:21.5.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
# Use official Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files & install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy source code
COPY . .

# Expose the port AdonisJS runs on
EXPOSE ${PORT}

# Run migrations (optional)
RUN node ace migration:run

# Start the dev server or production server based on NODE_ENV
ENV NODE_ENV=${NODE_ENV}
CMD ["npm", "run", "start"]
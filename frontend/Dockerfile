# Use official Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files & install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE ${VITE_PORT}

# Start Vite dev server
CMD ["npm", "run", "dev" , "--", "--host", "0.0.0.0", "--port", "${VITE_PORT}"]
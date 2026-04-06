# Stage 1: Build the React Frontend
FROM node:24-alpine AS build-stage
WORKDIR /app/client

# Copy frontend dependency files and install
COPY client/package*.json ./
RUN npm install

# Copy frontend source code and build it
COPY client/ ./
RUN npm run build

# Stage 2: Setup the Node Backend & Serve
FROM node:24-alpine
WORKDIR /app

# Copy backend dependency files and install
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy backend source code
COPY server/ ./server/

# Copy the built React app from Stage 1 into the backend's public directory
COPY --from=build-stage /app/client/dist ./server/public

# Expose the port the server listens on
EXPOSE 5000

# Step into the server folder and fire it up
WORKDIR /app/server
CMD ["node", "server.js"]
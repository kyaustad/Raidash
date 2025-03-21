# Use the official Node.js image as the base image
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure the required directories and files exist with the right permissions
RUN mkdir -p /app/public/icons/svg /app/public/db && \
    echo "[]" > /app/public/db/shortcuts.json && \
    chown -R node:node /app && \
    chmod -R 755 /app && \
    chown node:node /app/public/icons/svg && \
    chown node:node /app/public/db/shortcuts.json

# Build the Nuxt application
RUN npm run build

# Use a smaller image for the final stage
FROM node:22-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/public /app/public

# Ensure the required directories and files exist with the right permissions
RUN mkdir -p /app/public/icons/svg /app/public/db && \
    echo "[]" > /app/public/db/shortcuts.json && \
    chown -R node:node /app && \
    chmod -R 755 /app && \
    chown node:node /app/public/icons/svg && \
    chown node:node /app/public/db/shortcuts.json

# Expose the port Nuxt runs on (default is 3000)
EXPOSE 3000

# Start the Nuxt server
USER node
CMD ["node", "/app/.output/server/index.mjs"]

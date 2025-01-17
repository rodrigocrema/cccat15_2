# Use the official Node.js image as base
FROM node:16.20.2

# Install netcat
RUN apt-get update && apt-get install -y netcat

# Install PostgreSQL client
RUN apt-get install -y postgresql-client

# Set the working directory
WORKDIR /usr/src/app

# Install local dependencies
COPY package*.json ./
RUN npm install

# Install TypeScript and ts-node globally
RUN npm install -g typescript ts-node

# Copy the entire project to the container
COPY . .

# Copy the SQL file into the container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the port your app will run on
EXPOSE 3000

# Start the application
CMD ["npx", "ts-node", "src/app.ts"]

# Use the official Node.js image as a base
FROM node:latest

# Install Next.js globally
RUN npm install -g next

# Set the working directory
WORKDIR /myapp

# Copy the application files
COPY . .

# Install dependencies
RUN npm install && \
    npm install nodemon && \
    npm install pg

# Expose port 3000
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]

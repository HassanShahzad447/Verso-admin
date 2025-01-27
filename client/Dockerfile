# Step 1: Use a node image to build the app
FROM node:16 AS build

WORKDIR /app

# Step 2: Install dependencies and build the client app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 3: Serve the app using a lightweight server (e.g., nginx)
FROM nginx:alpine

# Step 4: Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Step 5: Expose the default port nginx listens on
EXPOSE 80

# Step 6: Start nginx
CMD ["nginx", "-g", "daemon off;"]

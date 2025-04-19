# Build step
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve step
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

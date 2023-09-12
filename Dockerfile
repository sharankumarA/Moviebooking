# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the built React app artifacts into the Nginx HTML directory
COPY ./build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]

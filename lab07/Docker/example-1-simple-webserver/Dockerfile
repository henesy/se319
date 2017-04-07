# Base this image off an image from the Docker hub
# that already has apache installed:
# https://hub.docker.com/_/httpd/
FROM httpd:2.4-alpine

# Copy the contents of the local project/ directory to the directory on the
# image from where files are being served
COPY project/ /usr/local/apache2/htdocs/

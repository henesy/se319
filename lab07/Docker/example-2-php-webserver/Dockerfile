# Base this image off an image from the Docker hub
# that already has apache and php installed
# https://hub.docker.com/_/php/
FROM php:7.0-apache

# Copy the contents from the local project/ directory to the directory on the
# image from where files are being served
COPY project/ /var/www/html

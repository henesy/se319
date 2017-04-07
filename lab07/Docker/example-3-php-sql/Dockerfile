# Base this image off an image from the Docker hub
# that already has php and apache installed
FROM php:7.0-apache

# The image we are using doesn't have a mysql client or the php extensions for
# mysqli already installed, so we'll need to install those manually
RUN apt-get update && \
    apt-get install -y mysql-client libmysqlclient-dev && \
    docker-php-ext-install mysqli

# Copy the contents from the local project directory to the directory on the
# image from where files are being served
COPY project/ /var/www/html

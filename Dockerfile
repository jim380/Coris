
# Define image
FROM node:latest

# Protractor test with Chromium
# sudo apt-get install chromium-browser

# Create working directory
RUN mkdir -p /usr/src/Coris
WORKDIR /usr/src/Coris

# add `/usr/src/Coris/node_modules/.bin` to $PATH
ENV PATH /usr/src/Coris/node_modules/.bin:$PATH

# Copy package.json and
# the entire directory over to working directory
COPY package.json /usr/src/Coris
RUN npm install --unsafe-perm
COPY . /usr/src/Coris

# Start
CMD ng serve --host 0.0.0.0


# Define image
FROM node:latest

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# Create working directory
RUN mkdir -p /usr/src/Coris
WORKDIR /usr/src/Coris

# add `/usr/src/Coris/node_modules/.bin` to $PATH
ENV PATH /usr/src/Coris/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/Coris/package.json
RUN npm install
RUN npm install -g @angular/cli@8.2.2

# Copy to working directory
COPY . /usr/src/Coris

# Start
CMD ng serve --host 0.0.0.0

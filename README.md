# Coris – Cypher Core meets Iris
A community built Blockchain explorer for IRISnet, brought to you by Cypher Core LLC.

## Deploy
#### Prerequisite
- [node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
    ```$ curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -```
    ```$ sudo apt-get install -y nodejs```
- [Angular CLI]()
    ```$ sudo npm install -g @angular/cli```
#### Method 1 – from source
1. ```$ git clone https://github.com/jim380/irisnet-explorer```
2. ```$ cd irisnet-explorer```
3. ```$ sudo npm i``` ----> *append ```--unsafe-perm``` if compiling on ARM-based devices.*
4. ```$ ng serve```

#### Method 2 – via docker
1. ```$ git clone https://github.com/jim380/irisnet-explorer```
2. ```$ cd irisnet-explorer```
3. *(optional) If compiling on ARM-based devices, append ```--unsafe-perm``` on line 18 in ```Dockerfile```*
3. ```$ docker build -t <image_name> .```
4. ```$ docker run -i -v ${PWD}:/usr/src/<image_name> -v /usr/src/<image_name>/node_modules -p 4200:4200 --name <image_name> <container_name>```

Open http://localhost:4200 in your browser to see the app in action.

## Demo
http://iris.cyphercore.io/

## Contact
@aakatev<br/>
@jim380

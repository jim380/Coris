# Coris – Cypher Core meets Iris
A community built Blockchain explorer for IRISnet, brought to you by Cypher Core LLC.

## Deploy
#### Prerequisite
- [node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
<br/>```$ curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -```<br/>
```$ sudo apt-get install -y nodejs```
- [Angular CLI](https://cli.angular.io/)
<br/>```$ sudo npm install -g @angular/cli```
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


## Configuring RPC

After install you need to create config file, to point explorer to running RPC client
```bash
echo "export const nodeRpc1 = 'http://localhost:1317';" > src/config.js 
echo "export const nodeRpc2 = 'http://localhost:26657';" >> src/config.js 
echo "export const nodeWs = 'http://localhost:26657/websocket';" >> src/config.js 
```

## Bundle project

```bash
npm run bundle
```

## Nginx proxy config(cors)

```c
# websocket
location /node/websocket {
  proxy_pass http://localhost:26657/websocket;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "Upgrade";
}
# rpc1
location /node/ {
  add_header "Access-Control-Allow-Origin"  * always;

  if ($request_method = OPTIONS ) {
    add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS, HEAD";
    add_header "Access-Control-Allow-Headers" "Authorization, Origin, X-Requested-With, Content-Type, Accept";
    return 200;
  }
  proxy_pass http://localhost:26657/;
}
# rpc2
location /node_txs/ {
  add_header "Access-Control-Allow-Origin"  * always;

  if ($request_method = OPTIONS ) {
    add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS, HEAD";
    add_header "Access-Control-Allow-Headers" "Authorization, Origin, X-Requested-With, Content-Type, Accept";
    return 200;
  }
  proxy_pass http://localhost:1317/;
}
```

## Demo
http://iris.cyphercore.io/


## Contact
@aakatev<br/>
@jim380

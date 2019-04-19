---
layout: default
title: Configure
parent: Quickstart
nav_order: 3
permalink: /start/config
---

## Configure RPC
```bash
$ echo "export const nodeRpc1 = 'http://localhost:1317';" > src/config.js 
$ echo "export const nodeRpc2 = 'http://localhost:26657';" >> src/config.js 
$ echo "export const nodeWs = 'http://localhost:26657/websocket';" >> src/config.js 
```

## Bundle Project
```bash
$ npm run bundle
```
## Config Proxy via Nginx (CORS)

```c
# websocket
location /node/websocket {
  proxy_pass http://localhost:26657/websocket;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "Upgrade";
}
# rpc1
location /node/rpc1 {
  add_header "Access-Control-Allow-Origin"  * always;

  if ($request_method = OPTIONS ) {
    add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS, HEAD";
    add_header "Access-Control-Allow-Headers" "Authorization, Origin, X-Requested-With, Content-Type, Accept";
    return 200;
  }
  proxy_pass http://localhost:1317/;
}
# rpc2
location /node/rpc2 {
  add_header "Access-Control-Allow-Origin"  * always;

  if ($request_method = OPTIONS ) {
    add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS, HEAD";
    add_header "Access-Control-Allow-Headers" "Authorization, Origin, X-Requested-With, Content-Type, Accept";
    return 200;
  }
  proxy_pass http://localhost:26657/;
}
```
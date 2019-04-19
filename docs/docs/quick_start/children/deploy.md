---
layout: default
title: Deploy
parent: Quickstart
nav_order: 2
permalink: /start/deploy
---

## Method 1 – from source
1. ```bash
$ git clone https://github.com/jim380/irisnet-explorer
```
2. ```bash
$ cd irisnet-explorer
```
3. ```bash
$ sudo npm i
```
4. ```bash
$ ng serve
```

## Method 2 – via docker
1. ```bash
$ git clone https://github.com/jim380/irisnet-explorer
```
2. ```bash
$ cd irisnet-explorer
```
3. ```bash
$ docker build -t <image_name> .
```
4. ```bash
$ docker run -i -v ${PWD}:/usr/src/<image_name> -v /usr/src/<image_name>/node_modules -p 4200:4200 --name <image_name> <container_name>
```

Open http://localhost:4200 in your browser to see the app in action.

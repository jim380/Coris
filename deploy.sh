#!/usr/bin/env sh

# Bundling, and deploying (using netcat to transfer files)
destination_host=0.0.0.0
tcp_port=8081

ng build --prod --build-optimizer --output-path distr
cd distr && tar cf - . | nc $destination_host $tcp_port

# Now on receiving end, go in served folder and run:
# nc -l $tcp_port | tar xf -

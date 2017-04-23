## Install
 npm install --save-dev http-proxy-middleware
## Core concept
   proxy（[context，] config）

## Context matching
    proxy({...}) - matches any path, all requests will be proxied.
    proxy('/', {...}) - matches any path, all requests will be proxied.
    proxy('/api', {...}) - matches paths starting with /api




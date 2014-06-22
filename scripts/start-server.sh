#!/usr/bin/env bash
node ./bin/server.js | node ./bin/notifier.js >/dev/null

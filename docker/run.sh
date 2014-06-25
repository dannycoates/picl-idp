#!/usr/bin/env bash
node /app/bin/server.js | node /app/bin/notifier.js >/dev/null

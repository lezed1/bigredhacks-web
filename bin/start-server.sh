#!/bin/bash
# This starts the server so that it's non-blocking.
# Currently used by Travis to run integration tests.

npm start &
sleep 20
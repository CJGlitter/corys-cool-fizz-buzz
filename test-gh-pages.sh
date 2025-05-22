#!/bin/bash

# Simple script to test GitHub Pages deployment locally

echo "Setting up local test environment for GitHub Pages..."

# Create build directory if it doesn't exist
mkdir -p build

# Copy public files to build directory
cp -r public/* build/

# Check if python3 is available, otherwise use python
if command -v python3 &>/dev/null; then
    echo "Starting local server at http://localhost:8000"
    cd build && python3 -m http.server
else
    echo "Starting local server at http://localhost:8000"
    cd build && python -m SimpleHTTPServer 8000
fi

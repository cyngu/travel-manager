#!/bin/sh

# SCRIPT TO INJECT ENVIRONMENT VARIABLES DURING RUNTIME

# Path to the runtime config.js file
CONFIG_FILE=/usr/share/nginx/html/config.js

# Replace placeholders in config.js with environment variables
echo "Generating runtime configuration in $CONFIG_FILE"
cat <<EOF > $CONFIG_FILE
window.config = {
  VITE_API_ENDPOINT: "${VITE_API_ENDPOINT:-undefined}"
};
EOF

nginx -g "daemon off;"
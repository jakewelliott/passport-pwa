#!/bin/bash
set -e

# Create certs directory if it doesn't exist
mkdir -p certs

# Copy the certificates to the expected location with proper naming
cp localhost+2.pem certs/localhost.crt
cp localhost+2-key.pem certs/localhost.key

# Ensure correct permissions
chmod 644 certs/localhost.crt
chmod 600 certs/localhost.key

echo "Certificates prepared successfully!"
echo "Certificate info:"
openssl x509 -in certs/localhost.crt -text -noout | grep -E 'Subject:|Issuer:|Not Before:|Not After :|DNS:' 
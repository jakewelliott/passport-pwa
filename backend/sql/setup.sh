#!/bin/bash

# Create database
mariadb -u adam <<EOF
CREATE DATABASE IF NOT EXISTS ncparks;
EOF

# Import schema
mariadb -u adam ncparks < seed.sql

# Import dummy data
mariadb -u adam ncparks < dummy.sql

echo "Database setup complete!" 
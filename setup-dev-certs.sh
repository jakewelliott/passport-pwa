#!/bin/bash

echo "🔒 Setting up development certificates for NCDPR Passport..."

# Detect OS
if [[ "$(uname -s)" == "Darwin" ]]; then
    OS="macOS"
elif [[ -f "/proc/version" ]] && grep -qi "microsoft" "/proc/version"; then
    OS="WSL"
else
    echo "❌ This script only supports macOS and WSL"
    exit 1
fi

echo "💻 Detected OS: $OS"

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null; then
    echo "📦 Installing mkcert..."
    if [[ "$OS" == "macOS" ]]; then
        brew install mkcert
        if [ $? -ne 0 ]; then
            echo "❌ Failed to install mkcert. Please make sure Homebrew is installed."
            exit 1
        fi
    else
        # WSL installation
        echo "Installing mkcert dependencies..."
        sudo apt update
        sudo apt install -y libnss3-tools wget
        # Download and install mkcert
        wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
        sudo mv mkcert-v1.4.4-linux-amd64 /usr/local/bin/mkcert
        sudo chmod +x /usr/local/bin/mkcert
    fi
fi

# Get local IP address
if [[ "$OS" == "macOS" ]]; then
    IP=$(ipconfig getifaddr en0 || ipconfig getifaddr en1)
else
    # WSL - get IP address
    IP=$(ip addr show eth0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1)
fi

if [ -z "$IP" ]; then
    echo "⚠️  Could not determine local IP address. Using localhost only."
    IP="127.0.0.1"
fi

echo "🌐 Local IP address: $IP"

# Install local CA
echo "🔑 Installing local Certificate Authority..."
mkcert -install

# Generate certificates
echo "📜 Generating certificates for localhost and $IP..."
mkcert localhost 127.0.0.1 $IP

cp ./localhost+2.pem ./frontend/localhost+2.pem
cp ./localhost+2-key.pem ./frontend/localhost+2-key.pem

echo "✅ Setup complete! Certificates have been generated:"
echo "   - Certificate: ./localhost+2.pem"
echo "                  ./frontend/localhost+2.pem"
echo "   - Private key: ./localhost+2-key.pem"
echo "                  ./frontend/localhost+2-key.pem"
echo ""
echo "🔐 To use HTTPS on your mobile device:"
echo "   1. Send $(mkcert -CAROOT)/rootCA.pem to your device"
echo "   2. Install it in your device's settings"
echo "   3. Access the app at https://$IP:5173"

if [[ "$OS" == "WSL" ]]; then
    echo ""
    echo "📝 WSL Note: You may need to:"
    echo "   1. Install the root certificate in Windows too"
    echo "   2. Copy rootCA.pem to Windows and install it there"
    echo "   3. Restart your browser"
fi 
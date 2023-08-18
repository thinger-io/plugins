#!/bin/sh

export DEBIAN_FRONTEND=noninteractive
sudo apt update -qq > /dev/null
sudo apt install -yqq -o=Dpkg::Use-Pty=0 gettext python3-venv > /dev/null
#sudo ln -s /usr/bin/python3 /usr/bin/python

EXTENSIONS=`code-server --list-extensions --show-versions`

# Install cpptools-linux extension
if ! echo "$EXTENSIONS" | grep -q "cpptools@1.16.3" > /dev/null; then
    echo "Installing cpptools"
    curl -s -L -o cpptools-linux.vsix https://s3.eu-west-1.amazonaws.com/thinger.io.files/plugins/vscode/vsix/ms-vscode.cpptools-1.16.3%40linux-x64.vsix 
    code-server --install-extension cpptools-linux.vsix
fi

# Install platformio extension
if ! echo "$EXTENSIONS" | grep -q "platformio-ide@3.3.0" > /dev/null; then
    curl -s -L -o platformio-ide.vsix https://s3.eu-west-1.amazonaws.com/thinger.io.files/plugins/vscode/vsix/platformio.platformio-ide-3.3.0%40linux-x64.vsix
    code-server --install-extension platformio-ide.vsix
fi

# Install thinger-io extension
if ! echo "$EXTENSIONS" | grep -q "thinger-io@1.0.6" > /dev/null; then
    curl -s -L -o thinger-io.vsix https://s3.eu-west-1.amazonaws.com/thinger.io.files/plugins/vscode/vsix/thinger-io.thinger-io-1.0.6.vsix
    code-server --install-extension thinger-io.vsix
fi

rm -f *.vsix

envsubst < /settings/settings.json > /home/coder/.local/share/code-server/User/settings.json

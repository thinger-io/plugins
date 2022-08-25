FROM codercom/code-server:4.6.0

RUN sudo apt update && sudo apt install -y python3-venv

RUN \
  curl -L -o cpptools-linux.vsix https://github.com/microsoft/vscode-cpptools/releases/download/v1.11.5/cpptools-linux.vsix && \
  code-server --install-extension cpptools-linux.vsix

RUN \
  curl -L -o platformio-ide.vsix.gz https://marketplace.visualstudio.com/_apis/public/gallery/publishers/platformio/vsextensions/platformio-ide/2.5.2/vspackage?targetPlatform=linux-x64 && \
  gunzip -v platformio-ide.vsix.gz && \
  code-server --install-extension platformio-ide.vsix

RUN \
  curl -L -o thinger-io.vsix https://github.com/thinger-io/vscode-extension/releases/download/1.0.5/thinger-io-1.0.5.vsix && \
  code-server --install-extension thinger-io.vsix

RUN rm *.vsix


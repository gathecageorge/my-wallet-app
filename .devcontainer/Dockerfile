# Note: You can use any Debian/Ubuntu based image you want. 
FROM node:22
ARG USERNAME=node
ARG WORKSPACE_FOLDER

# Setup some tools and update
RUN \
    apt update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt upgrade -y \
    && apt install -y net-tools nano curl lsb-release openssh-client sudo \
    # Allow sudo access
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    # Set user shell to bash
    && usermod -s /bin/bash $USERNAME \
    # Install eas and upgrade npm
    && npm install -g eas-cli npm \
    # Cleanup
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    # Create workspace directory
    && mkdir -p $WORKSPACE_FOLDER \
    && chown $USERNAME:$USERNAME $WORKSPACE_FOLDER

# Use the user created
USER $USERNAME

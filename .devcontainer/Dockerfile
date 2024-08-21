# Note: You can use any Debian/Ubuntu based image you want. 
FROM node:20
ARG USERNAME=node

# Copy fix permission script
COPY fix-ownership.sh /usr/local/share/fix-ownership.sh

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
    # Fix ownership script
    && sed -i "s/USERNAME/$USERNAME/g" /usr/local/share/fix-ownership.sh

# Use the user created
USER $USERNAME

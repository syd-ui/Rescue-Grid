FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        curl \
        git \
        python3 \
        python3-pip \
        python3-venv \
        pkg-config \
        libudev-dev \
        unzip \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/platformio-venv \
    && /opt/platformio-venv/bin/pip install --no-cache-dir --upgrade pip setuptools wheel \
    && /opt/platformio-venv/bin/pip install --no-cache-dir platformio

ENV PATH="/opt/platformio-venv/bin:$PATH"

USER node

RUN mkdir -p /home/node/.platformio && chown -R node:node /home/node/.platformio

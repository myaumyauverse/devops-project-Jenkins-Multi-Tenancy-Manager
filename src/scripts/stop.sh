#!/bin/bash

echo "🛑 Stopping Jenkins..."
docker compose -f infrastructure/docker/docker-compose.yml down

echo "✅ Stopped"
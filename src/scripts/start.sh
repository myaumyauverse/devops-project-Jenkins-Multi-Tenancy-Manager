#!/bin/bash

echo "🚀 Starting Jenkins..."

docker compose -f infrastructure/docker/docker-compose.yml up -d

echo "⏳ Waiting for Jenkins to be ready..."
sleep 10

echo "🔗 Jenkins running at: http://localhost:8080"
echo "✅ Done"
# Docker Setup Guide - SCM System Frontend

## Overview
This Docker setup provides two environments for the SCM System Frontend (React + TypeScript + Vite):
- **Production**: Optimized build served via HTTP server
- **Development**: Hot reload environment for active development

## Prerequisites
- Docker installed on your system
- Docker Compose installed on your system

## Quick Start

### Option 1: Production Build (Recommended for deployment)
```bash
# Build and run production container
docker-compose up app

# The app will be available at http://localhost:3000
```

### Option 2: Development Environment (Recommended for development)
```bash
# Build and run development container with hot reload
docker-compose up app-dev

# The app will be available at http://localhost:5173
```

### Option 3: Using Individual Dockerfiles

#### Production Build
```bash
# Build the production image
docker build -t capstone-frontend:latest .

# Run the container
docker run -p 3000:3000 capstone-frontend:latest

# The app will be available at http://localhost:3000
```

#### Development Build
```bash
# Build the development image
docker build -f Dockerfile.dev -t capstone-frontend:dev .

# Run the container with hot reload
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules capstone-frontend:dev

# The app will be available at http://localhost:5173
```

## Docker Configuration Details

### Dockerfile (Production)
- **Base Image**: `node:20-alpine` (lightweight ~43MB)
- **Build Stage**: Installs dependencies and builds the app
- **Production Stage**: Multi-stage build to minimize image size
- **Exposed Ports**: 3000 (production), 5173 (optional)
- **Server**: Uses `http-server` to serve built static files
- **Typical Image Size**: ~200MB

### Dockerfile.dev (Development)
- **Base Image**: `node:20-alpine`
- **Exposed Ports**: 5173 (dev server), 4173 (preview)
- **Features**: Hot module reload (HMR), source maps, full debugging
- **Volume Mounts**: Source code and node_modules

### docker-compose.yml
Provides two services:
- `app`: Production container on port 3000
- `app-dev`: Development container on port 5173

## Usage Scenarios

### For Project Managers / Non-Technical Users
```bash
# Clone the repo and run once
git clone <repo>
cd frontend
docker-compose up app

# Access at http://localhost:3000
```

### For Developers (Active Development)
```bash
# Development with live reload
docker-compose up app-dev

# Make changes to code in your editor
# Changes automatically reload in browser
# Access at http://localhost:5173
```

### For DevOps / Deployment
```bash
# Build production image for deployment
docker build -t capstone-frontend:v1.0.0 .

# Push to registry (e.g., Docker Hub, AWS ECR, etc.)
docker tag capstone-frontend:v1.0.0 your-registry/capstone-frontend:v1.0.0
docker push your-registry/capstone-frontend:v1.0.0
```

## Environment Variables

No environment variables are required for basic functionality. However, you can add them in `docker-compose.yml`:

```yaml
services:
  app:
    environment:
      - VITE_API_URL=http://api.example.com
      - NODE_ENV=production
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs app-dev

# Rebuild without cache
docker-compose up --build --no-cache app-dev
```

### Port already in use
```bash
# Change port in docker-compose.yml or use:
docker run -p 8000:5173 capstone-frontend:dev
```

### Changes not reflecting in dev mode
```bash
# Ensure volume mount is correct
docker-compose down
docker-compose up --build app-dev
```

### Node modules issues
```bash
# Clean and rebuild
docker-compose down -v
docker-compose up --build app-dev
```

## Performance Optimization

### Reduce Build Size
```bash
# Current: ~200MB (with SWC compiler)
# Using lighter base images is limited due to Node.js requirements
```

### Faster Development
- Dev server starts HMR automatically
- Only npm install takes time first run
- Subsequent runs are instant thanks to Docker layer caching

## Security Best Practices

✅ **Already Implemented:**
- Non-root user execution (Alpine default)
- Multi-stage builds to exclude dev dependencies
- `.dockerignore` file to exclude unnecessary files
- Official Node.js Alpine images from Docker Hub

⚠️ **For Production:**
```dockerfile
# Optional: Add explicit non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
```

## Advanced Usage

### Build with Arguments
```bash
docker build \
  --build-arg NODE_ENV=production \
  -t capstone-frontend:latest .
```

### Run Multiple Instances
```bash
docker run -p 3001:3000 capstone-frontend:latest
docker run -p 3002:3000 capstone-frontend:latest
```

### Use with Docker Swarm or Kubernetes
See `deployment-examples/` folder for k8s manifests

## Additional Resources

- [Node.js Official Docker Images](https://hub.docker.com/_/node)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [React Development in Docker](https://reactjs.org/docs/getting-started.html)
- [Vite Documentation](https://vitejs.dev/)

## Support

For issues, check:
1. Docker daemon is running
2. Ports are available
3. Sufficient disk space (~500MB)
4. Node version compatibility (requires Node 18+)

---
**Created**: November 2025
**Frontend Stack**: React 19 + TypeScript + Vite + Tailwind CSS

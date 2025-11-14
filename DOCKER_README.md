# SCM System Frontend - Docker Quick Reference

## 🚀 Quick Start

### For Beginners
```bash
# Linux/Mac
bash docker-start.sh dev

# Windows
docker-start.bat dev
```
Then open http://localhost:5173 in your browser.

### One-liner
```bash
docker-compose up app-dev
```

## 📦 What's Included

- **Node.js 20 Alpine** - Lightweight, minimal image
- **Vite** - Fast build tool and dev server
- **React 19** - Latest React with TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **Hot Module Reload** - Instant code updates in dev mode
- **Multi-stage Build** - Optimized production images

## 🎯 Common Commands

| Task | Command |
|------|---------|
| **Start Development** | `docker-compose up app-dev` |
| **Start Production** | `docker-compose up app` |
| **Stop Containers** | `docker-compose down` |
| **View Logs** | `docker-compose logs app-dev` |
| **Rebuild Images** | `docker-compose up --build app-dev` |
| **Shell Access** | `docker-compose exec app-dev sh` |

## 📝 Environment Setup

### 1. Clone Repository
```bash
git clone <repo-url>
cd frontend
```

### 2. Create .env (Optional)
```bash
cp .env.example .env
# Edit .env with your settings
```

### 3. Run with Docker
```bash
# Development (with hot reload)
docker-compose up app-dev

# Production (optimized build)
docker-compose up app
```

## 🌐 Accessing the Application

| Environment | URL | Port | Features |
|-------------|-----|------|----------|
| Development | http://localhost:5173 | 5173 | Hot reload, source maps, debug tools |
| Production | http://localhost:3000 | 3000 | Optimized build, static serving |

## 🔧 Project Structure

```
frontend/
├── Dockerfile              # Production image
├── Dockerfile.dev          # Development image
├── docker-compose.yml      # Container orchestration
├── docker-start.sh         # Linux/Mac helper script
├── docker-start.bat        # Windows helper script
├── .dockerignore           # Files to exclude from Docker
├── DOCKER_SETUP.md         # Detailed setup guide
├── .env.example            # Environment template
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── store/
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── tailwind.config.js      # Tailwind config
```

## 🛠️ Development Workflow

### Making Changes
1. Edit files in `src/`
2. Changes automatically reload in browser (HMR)
3. See errors in terminal and browser console

### Debugging
```bash
# View development server logs
docker-compose logs -f app-dev

# Shell access in container
docker-compose exec app-dev sh

# Run npm commands in container
docker-compose exec app-dev npm run lint
```

### Building for Production
```bash
# Build static files
docker-compose exec app-dev npm run build

# Serve production build
docker-compose up app
```

## 🐛 Troubleshooting

### Container Won't Start
```bash
# Check logs for errors
docker-compose logs app-dev

# Rebuild from scratch
docker-compose up --build --no-cache app-dev
```

### Port Already in Use
```bash
# Use different port
docker run -p 8000:5173 capstone-frontend:dev

# Or modify docker-compose.yml:
# ports:
#   - "8000:5173"
```

### Node Modules Issues
```bash
# Clean and reinstall
docker-compose down -v
docker-compose up --build app-dev
```

### Changes Not Reflecting
```bash
# Check volume mount
docker-compose exec app-dev ls -la /app

# Rebuild if stuck
docker-compose down
docker-compose up --build app-dev
```

## 📊 Image Sizes

| Image | Size | Use Case |
|-------|------|----------|
| `capstone-frontend:latest` (prod) | ~200MB | Deployment |
| `capstone-frontend:dev` | ~250MB | Development |
| Node 20 Alpine | ~43MB | Base layer |

## 🔒 Security Notes

✅ Using Alpine Linux (smaller, fewer vulnerabilities)  
✅ Official Node.js images from Docker Hub  
✅ Non-root user execution (Alpine default)  
✅ Dependencies cached and validated  

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Guide](https://docs.docker.com/compose/compose-file/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 💡 Pro Tips

### Faster Rebuilds
- Docker caches layers, first build takes longer
- Subsequent builds are much faster

### Volume Mounts
- Dev environment mounts source code
- Changes immediately visible without rebuild

### Production Deployment
```bash
# Build image
docker build -t capstone-frontend:1.0.0 .

# Push to registry
docker tag capstone-frontend:1.0.0 your-registry/capstone-frontend:1.0.0
docker push your-registry/capstone-frontend:1.0.0
```

## ❓ FAQ

**Q: Can I use this with the backend?**  
A: Yes! Use Docker Compose to run both. See backend documentation.

**Q: Do I need npm installed locally?**  
A: No! Everything runs in Docker. Docker must be installed.

**Q: How do I add new dependencies?**  
A: Edit `package.json`, then rebuild:
```bash
docker-compose down
docker-compose up --build app-dev
```

**Q: Can I use a different Node version?**  
A: Yes! Edit `Dockerfile` and `Dockerfile.dev`:
```dockerfile
FROM node:18-alpine  # Change this
```

**Q: Is this production-ready?**  
A: Yes! The prod image uses multi-stage builds and serves optimized static files.

---

**Last Updated**: November 2025  
**Maintainer**: SCM System Team

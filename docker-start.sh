#!/bin/bash

# SCM System Frontend - Docker Quick Start Script
# Usage: bash docker-start.sh [dev|prod|stop|clean]

set -e

COMMAND=${1:-dev}
PROJECT_NAME="capstone-frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   SCM System Frontend - Docker Setup   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"

case $COMMAND in
  dev)
    echo -e "${YELLOW}Starting Development Environment...${NC}"
    echo -e "${BLUE}→ Development server with hot reload${NC}"
    echo -e "${BLUE}→ Available at: http://localhost:5173${NC}"
    docker-compose up app-dev
    ;;

  prod)
    echo -e "${YELLOW}Starting Production Environment...${NC}"
    echo -e "${BLUE}→ Optimized production build${NC}"
    echo -e "${BLUE}→ Available at: http://localhost:3000${NC}"
    docker-compose up app
    ;;

  stop)
    echo -e "${YELLOW}Stopping all containers...${NC}"
    docker-compose down
    echo -e "${GREEN}✓ Containers stopped${NC}"
    ;;

  clean)
    echo -e "${YELLOW}Cleaning up all containers and images...${NC}"
    docker-compose down -v
    docker rmi capstone-frontend:latest capstone-frontend:dev 2>/dev/null || true
    echo -e "${GREEN}✓ Cleanup complete${NC}"
    ;;

  build)
    echo -e "${YELLOW}Building Docker images...${NC}"
    docker-compose build --no-cache
    echo -e "${GREEN}✓ Build complete${NC}"
    ;;

  logs)
    echo -e "${YELLOW}Showing container logs...${NC}"
    docker-compose logs -f ${2:-app-dev}
    ;;

  shell)
    echo -e "${YELLOW}Opening shell in development container...${NC}"
    docker-compose exec app-dev sh
    ;;

  *)
    echo -e "${RED}Invalid command: $COMMAND${NC}"
    echo ""
    echo -e "${BLUE}Available commands:${NC}"
    echo -e "  ${GREEN}dev${NC}     - Start development environment (http://localhost:5173)"
    echo -e "  ${GREEN}prod${NC}    - Start production environment (http://localhost:3000)"
    echo -e "  ${GREEN}stop${NC}    - Stop all containers"
    echo -e "  ${GREEN}clean${NC}   - Remove containers and images"
    echo -e "  ${GREEN}build${NC}   - Rebuild Docker images"
    echo -e "  ${GREEN}logs${NC}    - Show container logs (use: logs [app-dev|app])"
    echo -e "  ${GREEN}shell${NC}   - Open shell in development container"
    echo ""
    exit 1
    ;;
esac

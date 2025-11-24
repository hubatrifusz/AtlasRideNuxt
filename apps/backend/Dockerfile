FROM node:18

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml from root
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --filter @atlasride/backend

# Copy backend source code
COPY apps/backend ./apps/backend

WORKDIR /usr/src/app/apps/backend

EXPOSE 8080

CMD ["pnpm", "start"]

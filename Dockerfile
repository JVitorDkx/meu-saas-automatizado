FROM node:22-alpine

WORKDIR /app

# Copiar package files
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiar código-fonte
COPY . .

# Build
RUN pnpm run build

# Expor porta
EXPOSE 3000

# Start
CMD ["pnpm", "run", "start"]

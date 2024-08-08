#!/bin/bash

# 오류 발생 시 스크립트 중단
set -e

# 환경 변수 설정
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  
export PATH="/home/ubuntu/.nvm/versions/node/v18.20.4/bin:$PATH"

# 작업 디렉토리로 이동
cd /home/ubuntu/api_back

# Node.js 버전 확인
echo "Node.js version:"
node -v

# pnpm 설치 (없는 경우)
if ! command -v pnpm &> /dev/null
then
    echo "pnpm not found. Installing pnpm..."
    npm install -g pnpm
fi

# pnpm 버전 확인
echo "pnpm version:"
pnpm --version

# Turbo 캐시 디렉토리 설정
export TURBO_CACHE_DIR="/home/ubuntu/.turbo-cache"

# 프로덕션 모드 설정
export NODE_ENV=production

# 의존성 설치 (프로덕션 모드, 잠금 파일 사용)
pnpm install --frozen-lockfile --production

# 환경 변수 파일 복사 (만약 별도로 관리하고 있다면)
# cp /path/to/production/.env /home/ubuntu/api_back/.env

# Lint 실행 (선택적)
pnpm run lint

# 프로덕션 빌드 (Turborepo를 사용)
pnpm run build --cache-dir="$TURBO_CACHE_DIR"

# 이전 빌드 아티팩트 정리 (선택적)
# rm -rf /home/ubuntu/api_back/.next/cache

# pm2가 설치되어 있지 않다면 글로벌로 설치
if ! command -v pm2 &> /dev/null
then
    pnpm install -g pm2
fi

# 이전에 실행 중이던 프로세스 중지
pm2 stop api_back || true

# 새로운 프로세스 시작
pm2 start pnpm --name "api_back" -- start

# pm2 프로세스 목록 표시
pm2 list

# 불필요한 캐시 및 임시 파일 정리 (선택적)
pnpm store prune

echo "Deployment completed successfully!"

# 배포 후 상태 체크 (선택적)
# curl http://localhost:3000/health || echo "Health check failed"
#!/bin/bash
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  
export PATH="/home/ubuntu/.nvm/versions/node/v18.20.4/bin:$PATH"

# 오류 발생 시 스크립트 중단
set -e

# 작업 디렉토리로 이동
cd /home/ubuntu/api_back

# Node.js 버전 확인 (선택사항)
echo "Node.js version:"
node -v

# pnpm 버전 확인
echo "pnpm version:"
pnpm --version

# pnpm이 설치되어 있지 않다면 글로벌로 설치
if ! command -v pnpm &> /dev/null
then
    npm install -g pnpm
fi

# 의존성 설치
pnpm install

# 프로덕션 빌드 (Turborepo를 사용하는 경우)
pnpm run build

# pm2가 설치되어 있지 않다면 글로벌로 설치
if ! command -v pm2 &> /dev/null
then
    pnpm install -g pm2
fi

# 이전에 실행 중이던 프로세스 중지
pm2 stop api_back || true

# 새로운 프로세스 시작 (pnpm을 사용하여 실행)
pm2 start pnpm --name "api_back" -- start

# pm2 프로세스 목록 표시
pm2 list

echo "Deployment completed successfully!"
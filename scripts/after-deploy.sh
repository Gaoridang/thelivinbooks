#!/bin/bash

# 오류 발생 시 스크립트 중단
set -e

# 도구 버전 확인
echo "Node.js 버전: $(node --version)"
echo "pnpm 버전: $(pnpm --version)"
echo "Turbo 버전: $(turbo --version)"
echo "PM2 버전: $(pm2 --version)"

# 작업 디렉토리로 이동
cd /home/ubuntu/deploy

# 의존성 설치
echo "의존성 설치 중..."
pnpm install

# 프로덕션 빌드
echo "프로덕션 빌드 중..."
pnpm run build

# PM2로 애플리케이션 시작 또는 재시작
echo "PM2로 애플리케이션 시작/재시작 중..."
pm2 startOrRestart ecosystem.config.js --env production

echo "배포 완료!"

# 최종 디스크 공간 확인
echo "최종 디스크 공간 상태:"
df -h
#!/bin/bash

# 오류 발생 시 스크립트 중단
set -e

# NVM 설치 확인 및 설치
if [ ! -d "$HOME/.nvm" ]; then
    echo "NVM이 설치되어 있지 않습니다. NVM을 설치합니다..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # NVM 스크립트를 로드
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # NVM bash_completion을 로드
else
    echo "NVM이 이미 설치되어 있습니다."
fi

# NVM 환경 설정 로드
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # NVM 스크립트를 로드
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # NVM bash_completion을 로드

# 디스크 공간 확인 및 정리
echo "디스크 공간 확인 및 정리 중..."
df -h
available_space=$(df -h / | awk 'NR==2 {print $4}' | sed 's/G//')
if (( $(echo "$available_space < 2" | bc -l) )); then
    echo "경고: 디스크 공간이 2GB 미만입니다. 불필요한 파일을 정리합니다."
    sudo find /var/log -type f -name "*.log" -mtime +7 -delete
    sudo docker system prune -af  # Docker를 사용 중인 경우
    npm cache clean --force
    yarn cache clean  # Yarn을 사용 중인 경우
    pnpm store prune  # pnpm을 사용 중이므로 캐시 정리
fi

# 작업 디렉토리로 이동
cd /home/ubuntu/deploy

# Node.js 버전 확인 및 설정
echo "Node.js 버전 확인 중..."
nvm install 18.20.4
nvm use 18.20.4

# pnpm 설치 확인
if ! command -v pnpm &> /dev/null; then
    echo "pnpm 설치 중..."
    npm install -g pnpm
fi

# 환경 변수 파일 복사
echo "환경 변수 파일 복사 중..."
cp /home/ubuntu/.env /home/ubuntu/deploy/apps/web/.env

# 이전 빌드 파일 정리
echo "이전 빌드 파일 정리 중..."
rm -rf /home/ubuntu/deploy/apps/web/.next

# 의존성 설치
echo "의존성 설치 중..."
pnpm install --prod  # 프로덕션 의존성만 설치

# 프로덕션 빌드
echo "프로덕션 빌드 중..."
pnpm run build

# PM2 설치 확인 및 설치
if ! command -v pm2 &> /dev/null; then
    echo "PM2 설치 중..."
    npm install -g pm2
fi

# PM2 로그 로테이션 설정
echo "PM2 로그 로테이션 설정 중..."
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 5

# 이전 PM2 프로세스 중지 및 삭제
echo "이전 PM2 프로세스 정리 중..."
pm2 stop writing-recommendation || true
pm2 delete writing-recommendation || true

# 새 PM2 프로세스 시작
echo "새 PM2 프로세스 시작 중..."
cd /home/ubuntu/deploy/apps/web
pm2 start ecosystem.config.js --env production

echo "배포 완료!"

# 최종 디스크 공간 확인
echo "최종 디스크 공간 상태:"
df -h
# ==============================
# 📦 Dockerfile (for React)
# ==============================
# frontend/Dockerfile

FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 설치
COPY package.json .
COPY package-lock.json .
RUN npm install

# 전체 프로젝트 복사
COPY . .

# React 빌드
RUN npm run build

# 포트 노출 (React dev server용, 배포용이면 안 씀)
EXPOSE 3000

CMD ["npm", "start"]
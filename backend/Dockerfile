# ==============================
# 📦 Dockerfile (for Django)
# ==============================
# backend/Dockerfile

FROM python:3.11-slim

# 환경변수 설정
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# 프로젝트 복사
COPY . .

# 포트 노출 (장고 dev 서버)
EXPOSE 8000

# 서버 실행 명령
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]



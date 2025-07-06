FROM python:3.11-slim

WORKDIR /app

# 시스템 패키지 (psycopg2, Pillow 등 빌드 필요시)
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Gunicorn으로 서비스 (프로젝트 폴더명이 config라면 그대로, 다르면 수정)
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]

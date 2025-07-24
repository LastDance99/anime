# 애니 커뮤니티 웹사이트 (Anime Community Web)

## 📚 프로젝트 소개
- 일본 애니메이션 기반 종합 커뮤니티 플랫폼
- 애니 정보 검색, 애니 리스트 관리, 평점/리뷰, 커뮤니티, 프로필, AI챗봇기반 애니 대화/추천, 짤 생성 등 다양한 기능 제공

## 🛠️ 기술 스택
backend
  - Django 5.2 기반, Django REST Framework와 Simple JWT, CORS headers, drf-yasg 등 사용

  - 데이터베이스로 PostgreSQL 설정

  - Redis 캐시( django-redis 이용 )

  - OpenAI, LangChain, FAISS 등 AI 관련 라이브러리 활용

  - AWS S3(boto3, Django Storages) 사용

  - WSGI 서버로 Gunicorn 설정

frontend
  - React 18 / TypeScript, 빌드는 Vite로 수행

  - styled-components, @tanstack/react-query, axios, framer-motion, react-router-dom, i18next 등 다양한 라이브러리 사용

  - 개발 도구로 ESLint, TypeScript ESLint, MSW 등 활용

  - Nginx를 통해 프론트엔드 서비스( Dockerfile 과 nginx.conf 설정 )


infra
  - Docker Compose로 Redis, Django 백엔드, React 프론트엔드 컨테이너 구성

  - 백엔드( Python 3.11 )와 프론트엔드( Node 20 )용 Dockerfile 포함

  - README에서 전체 스택 개요 확인 가능


## ⚙️ 설치 및 실행 방법

1. **환경 변수 파일 작성**
   - `.env.example` 참고해서 `.env` 생성

2. **가상환경 세팅**
   ```bash
   python -m venv venv
   source venv/bin/activate   # (윈도우는 venv\Scripts\activate)
   pip install -r requirements.txt


    python manage.py migrate
    python manage.py createsuperuser

    python manage.py runserver

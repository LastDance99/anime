# 애니 커뮤니티 웹사이트 (Anime Community Web)

## 📚 프로젝트 소개
- 일본 애니메이션 기반 종합 커뮤니티 플랫폼
- 애니 검색, 평점/리뷰, 커뮤니티, 마이룸, 챗봇 등 다양한 기능 제공

## 🛠️ 기술 스택
- **Backend:** Django, Django REST Framework, PostgreSQL
- **Frontend:** React (별도 저장소)
- **Infra:** AWS S3 (이미지 저장), Docker + Github Action + AWS (개발/배포)

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

# 애니 커뮤니티 웹사이트 (Anime Community Web)

## 📚 프로젝트 소개
- 일본 애니메이션 기반 종합 커뮤니티 플랫폼
- 애니 정보 검색, 애니 리스트 관리, 평점/리뷰, 커뮤니티, 프로필, AI챗봇기반 애니 대화/추천, 짤 생성 등 다양한 기능 제공

## 🛠️ 기술 스택
- **Backend:** Django, Django REST Framework, PostgreSQL
- **Frontend:** Typescripts + React + Vite 
- **Infra:** AWS S3 (이미지 저장), AWS RDS, AWS EC2, Docker 

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

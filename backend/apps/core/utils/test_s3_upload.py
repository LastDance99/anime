import boto3

# .env 환경변수에서 가져오거나 직접 입력
AWS_ACCESS_KEY_ID = 'AKIAZB7AEDKDR6SWG4VD'
AWS_SECRET_ACCESS_KEY = '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'
AWS_REGION = 'ap-northeast-2'
BUCKET_NAME = 'anime-project-image-bucket'

session = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
)
s3 = session.resource('s3')
bucket = s3.Bucket(BUCKET_NAME)

with open('testimg.jpg', 'rb') as data:
    bucket.upload_fileobj(data, 'test/testimg.jpg')
print("업로드 완료!")
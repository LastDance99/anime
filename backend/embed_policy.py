import os
from dotenv import load_dotenv                      
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings

load_dotenv()
# 로딩
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
pdf_path = os.path.join(BASE_DIR, 'data', 'pdf_docs', 'antada_rule.pdf')
loader = PyPDFLoader(pdf_path)
documents = loader.load()

# 쪼개기
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=300)
docs = splitter.split_documents(documents)

# 임베딩
embedding = OpenAIEmbeddings()
vectordb = FAISS.from_documents(docs, embedding)

# 저장
vectordb.save_local("vectorstores/policy_index")
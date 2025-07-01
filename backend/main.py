from fastapi import FastAPI, Request, HTTPException, Depends, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, auth
import PyPDF2
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("No GOOGLE_API_KEY environment variable found")

FIREBASE_SERVICE_ACCOUNT_KEY_PATH = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_PATH")
if not FIREBASE_SERVICE_ACCOUNT_KEY_PATH:
    raise ValueError("No FIREBASE_SERVICE_ACCOUNT_KEY_PATH environment variable found")

# Initialize Firebase Admin SDK
cred = credentials.Certificate(FIREBASE_SERVICE_ACCOUNT_KEY_PATH)
firebase_admin.initialize_app(cred)

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-2.0-flash")

async def verify_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized: No token provided")

    token = auth_header.split(" ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Unauthorized: Invalid token ({e})")

def extract_text_from_pdf(pdf_file: UploadFile) -> str:
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_file.file.read()))
    text = ""
    for page_num in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page_num].extract_text()
    return text

@app.get("/")
async def hello_world():
    return {"message": "Hello World"}


@app.post("/generate")
async def generate_cover_letter(cv_file: UploadFile = File(...), job_description: str = File(...), sentiment: str = File(...), user: dict = Depends(verify_token)):
    if cv_file.content_type == "application/pdf":
        cv_content = extract_text_from_pdf(cv_file)
    elif cv_file.content_type == "text/plain" or cv_file.content_type == "text/markdown":
        cv_content = (await cv_file.read()).decode("utf-8")
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type for CV. Please upload a PDF, TXT, or MD file.")

    if not cv_content or not job_description:
        raise HTTPException(
            status_code=400, detail="CV content and job description are required"
        )

    prompt = (        f"Given the following CV:\n{cv_content}\n\nAnd the following job "        f"description:\n{job_description}\n\nPlease generate a cover letter with a {sentiment} tone."    )

    try:
        response = model.generate_content(prompt)
        cover_letter = response.text
        return JSONResponse({"cover_letter": cover_letter})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

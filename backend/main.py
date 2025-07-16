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
import json
import logfire

load_dotenv()

app = FastAPI()
logfire.configure(
    environment=os.getenv("COVERFLOW_AI_BACKEND_ENV"),
    token=os.getenv("COVERFLOW_AI_LOGFIRE_TOKEN"),
)
logfire.info("Backend started")
logfire.instrument_fastapi(app, capture_headers=True)

# CORS Configuration: Read allowed origins from environment variable
# The variable should be a comma-separated list of URLs.
# Example: CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS")
origins = []
if CORS_ALLOWED_ORIGINS:
    origins = [origin.strip() for origin in CORS_ALLOWED_ORIGINS.split(",")]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("No GOOGLE_API_KEY environment variable found")

FIREBASE_SERVICE_ACCOUNT_JSON = os.getenv("FIREBASE_SERVICE_ACCOUNT_JSON")
if not FIREBASE_SERVICE_ACCOUNT_JSON:
    raise ValueError("No FIREBASE_SERVICE_ACCOUNT_JSON environment variable found")

# Initialize Firebase Admin SDK
cred = credentials.Certificate(json.loads(FIREBASE_SERVICE_ACCOUNT_JSON))
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
        raise HTTPException(
            status_code=401, detail=f"Unauthorized: Invalid token ({e})"
        )


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
async def generate_cover_letter(
    cv_file: UploadFile = File(...),
    job_description: str = File(...),
    sentiment: str = File(...),
    length: str = File(...),
    language: str = File(...),
    user: dict = Depends(verify_token),
):
    if cv_file.content_type == "application/pdf":
        cv_content = extract_text_from_pdf(cv_file)
    elif (
        cv_file.content_type == "text/plain" or cv_file.content_type == "text/markdown"
    ):
        cv_content = (await cv_file.read()).decode("utf-8")
    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type for CV. Please upload a PDF, TXT, or MD file.",
        )

    if not cv_content or not job_description:
        raise HTTPException(
            status_code=400, detail="CV content and job description are required"
        )

    prompt = (
        "You are a HR specialist and you need to formulate a cover letter based on the "
        f"following CV:\n{cv_content}\n\nAnd the following job "
        f"description:\n{job_description}\n\n"
        f"Use the following tone: {sentiment} for the letter. "
        f"The length of the letter should be {length}. "
        f"The language of the letter should be {language}. "
        "The result should be provided as valid Markdown. "
        "Separate sentences with line breaks for easier readability of the text."
    )

    try:
        response = model.generate_content(prompt)
        cover_letter = response.text
        return JSONResponse({"cover_letter": cover_letter})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/refine")
async def refine_cover_letter(
    cv_file: UploadFile = File(...),
    job_description: str = File(...),
    sentiment: str = File(...),
    length: str = File(...),
    language: str = File(...),
    cover_letter: str = File(...),
    refinement_instructions: str = File(...),
    user: dict = Depends(verify_token),
):
    if cv_file.content_type == "application/pdf":
        cv_content = extract_text_from_pdf(cv_file)
    elif (
        cv_file.content_type == "text/plain" or cv_file.content_type == "text/markdown"
    ):
        cv_content = (await cv_file.read()).decode("utf-8")
    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type for CV. Please upload a PDF, TXT, or MD file.",
        )

    if not cv_content or not job_description:
        raise HTTPException(
            status_code=400, detail="CV content and job description are required"
        )

    prompt = (
        "You are an HR specialist and you need to refine a cover letter based on the "
        f"following CV:\n{cv_content}\n\nAnd the following job "
        f"description:\n{job_description}\n\nHere is the original cover "
        f"letter:\n{cover_letter}\n\nAnd here are the refinement "
        f"instructions:\n{refinement_instructions}\n\n"
        f"Use the following tone: {sentiment} for the letter. "
        f"The length of the letter should be {length}. "
        f"The language of the letter should be {language}. "
        "The result should be provided as valid Markdown. "
        "Separate sentences with line breaks for easier readability of the text."
    )

    try:
        response = model.generate_content(prompt)
        refined_cover_letter = response.text
        return JSONResponse({"cover_letter": refined_cover_letter})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# CoverFlow AI

CoverFlow AI is a web application that automatically generates personalized cover letters based on your CV and a job description. It leverages Google's Generative AI to create well-written, tailored letters in various tones, lengths, and languages.

## Project Structure

*   **/frontend**: A React single-page application that provides the user interface.
*   **/backend**: A Python FastAPI server that handles the core logic of cover letter generation and user authentication.

## Local Development

To run this project locally, you will need to run the frontend and backend services separately.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create a Python virtual environment and activate it:**
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure environment variables:**
    Create a file named `.env` in the `backend` directory and add the following, replacing the placeholder values:
    ```
    GOOGLE_API_KEY=your_google_api_key
    FIREBASE_SERVICE_ACCOUNT_JSON='''{"type": "service_account", ...}'''
    CORS_ALLOWED_ORIGINS=http://localhost:3000
    ```
5.  **Run the server:**
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be running at `http://localhost:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    Create a file named `.env` in the `frontend` directory and add the following:
    ```
    REACT_APP_BACKEND_URL=http://localhost:8000
    ```
4.  **Run the development server:**
    ```bash
    npm start
    ```
    The frontend will open at `http://localhost:3000`.

---

## Deployment on Render

This guide outlines the steps to deploy CoverFlow AI to Render using Docker.

### 1. Prerequisites

*   Ensure your project is pushed to a Git repository (GitHub, GitLab, Bitbucket).
*   You have an account on Render.

### 2. Deploy Backend Service

1.  **Go to Render Dashboard:** Log in to your Render dashboard.
2.  **New Web Service:** Click "New" -> "Web Service".
3.  **Connect Repository:** Select your Git repository.
4.  **Configuration:**
    *   **Name:** `coverflow-ai-backend` (or your choice)
    *   **Region:** Choose a region.
    *   **Branch:** `main`
    *   **Root Directory:** `backend`
    *   **Runtime:** `Docker`
    *   **Port:** `8000`
5.  **Environment Variables:**
    Click "Add Environment Variable" for each of the following:
    *   **`GOOGLE_API_KEY`**: Your actual Google API key.
    *   **`FIREBASE_SERVICE_ACCOUNT_JSON`**: The full JSON content of your service account key.
    *   **`CORS_ALLOWED_ORIGINS`**: The public URL of your deployed frontend service (e.g., `https://coverflow-ai-frontend.onrender.com`).
6.  **Create Web Service:** Click "Create Web Service".

### 3. Deploy Frontend Service

1.  **Go to Render Dashboard:** Click "New" -> "Web Service".
2.  **Connect Repository:** Select the same Git repository.
3.  **Configuration:**
    *   **Name:** `coverflow-ai-frontend` (or your choice)
    *   **Region:** Choose the same region as your backend.
    *   **Branch:** `main`
    *   **Root Directory:** `frontend`
    *   **Runtime:** `Docker`
    *   **Port:** `80`
4.  **Environment Variables:**
    Click "Add Environment Variable":
    *   **`REACT_APP_BACKEND_URL`**: The public URL of your deployed backend service (e.g., `https://coverflow-ai-backend.onrender.com`).
5.  **Create Web Service:** Click "Create Web Service".

After both services are deployed, your application will be live.

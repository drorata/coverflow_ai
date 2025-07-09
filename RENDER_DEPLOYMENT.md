# Deploying CoverFlow AI to Render

This guide outlines the steps to deploy your CoverFlow AI application (both frontend and backend) to Render using Docker. It also covers secure handling of your Firebase service account key.

## Secure Secret Management

For `GOOGLE_API_KEY` and `FIREBASE_SERVICE_ACCOUNT_JSON`, you will set these as **Environment Variables** directly in the Render dashboard for your backend service.

*   **`GOOGLE_API_KEY`**: This will be your plain Google API key.
*   **`FIREBASE_SERVICE_ACCOUNT_JSON`**: This is crucial. You need to copy the *entire content* of your `serviceAccountKey.json` file (including all curly braces, keys, and values) and paste it as the value for this environment variable. Render will securely store this.

## Deployment Steps on Render

### 1. Connect to Git Repository

First, ensure your project is pushed to a Git repository (GitHub, GitLab, Bitbucket). Render integrates directly with these.

### 2. Deploy Backend Service

1.  **Go to Render Dashboard:** Log in to your Render dashboard (https://dashboard.render.com/).
2.  **New Web Service:** Click "New" -> "Web Service".
3.  **Connect Repository:** Select your Git repository.
4.  **Configuration:**
    *   **Name:** `coverflow-ai-backend` (or a name of your choice)
    *   **Region:** Choose a region close to your users.
    *   **Branch:** `main` (or your deployment branch)
    *   **Root Directory:** `backend` (This tells Render where your `Dockerfile` is for the backend)
    *   **Runtime:** `Docker`
    *   **Build Command:** (Leave empty, Docker handles the build)
    *   **Start Command:** (Leave empty, `CMD` in `Dockerfile` handles this)
    *   **Port:** `8000` (Matches `EXPOSE` in `Dockerfile`)
    *   **Health Check Path:** `/` (or `/docs` if you want to check FastAPI docs)
5.  **Environment Variables:**
    *   Click "Add Environment Variable".
    *   **Key:** `GOOGLE_API_KEY`
    *   **Value:** Your actual Google API key.
    *   Click "Add Environment Variable" again.
    *   **Key:** `FIREBASE_SERVICE_ACCOUNT_JSON`
    *   **Value:** The *full JSON content* of your `serviceAccountKey.json` file.
6.  **Create Web Service:** Click "Create Web Service".

### 3. Deploy Frontend Service

1.  **Go to Render Dashboard:** Log in to your Render dashboard.
2.  **New Web Service:** Click "New" -> "Web Service".
3.  **Connect Repository:** Select the *same* Git repository.
4.  **Configuration:**
    *   **Name:** `coverflow-ai-frontend` (or a name of your choice)
    *   **Region:** Choose the same region as your backend.
    *   **Branch:** `main` (or your deployment branch)
    *   **Root Directory:** `frontend` (This tells Render where your `Dockerfile` is for the frontend)
    *   **Runtime:** `Docker`
    *   **Build Command:** (Leave empty)
    *   **Start Command:** (Leave empty)
    *   **Port:** `80` (Matches `EXPOSE` in `Dockerfile`)
    *   **Health Check Path:** `/`
5.  **Environment Variables:** No specific environment variables are needed for the frontend unless you plan to dynamically configure the backend URL (which is currently hardcoded to `http://localhost:8000`). For now, you can leave this empty.
6.  **Create Web Service:** Click "Create Web Service".

### Important Considerations:

*   **Backend URL in Frontend:** Your frontend currently fetches from `http://localhost:8000`. Once deployed, you'll need to update this to your Render backend service's URL. You can get this URL from your Render dashboard after the backend service is deployed. You might want to use an environment variable in your React app for this, which would require a slight modification to your frontend `Dockerfile` and `App.js` to read it at build time.
*   **CORS:** Ensure your backend's CORS settings (`allow_origins=["*"]`) are appropriate for production. For better security, you should restrict `allow_origins` to your deployed frontend's URL.
*   **Firebase Configuration:** Your `firebaseConfig.js` in the frontend should contain your *public* Firebase configuration (API key, auth domain, etc.). This is separate from the service account key used by the backend.
*   **Build Time:** Render will automatically build your Docker images. You can monitor the build logs in the Render dashboard.

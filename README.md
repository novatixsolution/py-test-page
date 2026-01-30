# School Management System - PoC

A Proof of Concept (PoC) for testing connection speed and architecture with a monorepo structure containing:
- **Backend**: Python FastAPI with Supabase
- **Frontend**: Next.js 14+ with App Router and Tailwind CSS

## 🌐 Live Demo

- **Frontend (Vercel)**: https://pytestpage.vercel.app
- **Backend API (Railway)**: https://py-test-page-production.up.railway.app
- **API Docs (Swagger)**: https://py-test-page-production.up.railway.app/docs
- **Database**: Supabase (PostgreSQL)

## 📁 Project Structure

```
school-management-poc/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment variables template
│   └── .gitignore
├── frontend/
│   ├── app/
│   │   └── page.tsx         # Student admission form
│   ├── package.json
│   └── ... (Next.js files)
└── SUPABASE_SCHEMA.sql      # Database schema
```

---

## 🚀 Setup Instructions

### 1. Database Setup (Supabase)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the SQL query from `SUPABASE_SCHEMA.sql` to create the `students` table
4. Get your Supabase credentials:
   - **Project URL**: Found in Settings → API
   - **Anon/Public Key**: Found in Settings → API

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Then edit .env and add your Supabase credentials:
# SUPABASE_URL=your_supabase_project_url
# SUPABASE_KEY=your_supabase_anon_key
```

### 3. Frontend Setup

```bash
# Navigate to frontend folder (in a new terminal)
cd frontend

# Dependencies are already installed via create-next-app
# If needed, run:
npm install
```

---

## 🏃‍♂️ Running the Application

### Method 1: Two Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```
Server will start at: `http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will start at: `http://localhost:3000`

### Method 2: Using PowerShell Jobs (Single Terminal)

```powershell
# Start backend in background
cd backend
Start-Job -ScriptBlock { cd "d:\Py Test new\backend"; python main.py }

# Start frontend
cd ..\frontend
npm run dev
```

To stop background jobs:
```powershell
Get-Job | Stop-Job
Get-Job | Remove-Job
```

---

## 🧪 Testing the Application

### Test Production Deployment (Live)

1. **Visit** https://pytestpage.vercel.app
2. **Fill the form** with:
   - Student Name: e.g., "John Doe"
   - Father Name: e.g., "James Doe"
   - Class: e.g., "5th Grade"
3. **Click Submit** and verify:
   - Success message appears
   - Data is saved in Supabase `students` table

### Test Local Development

1. **Start both servers** (backend and frontend)
2. **Open browser** and go to `http://localhost:3000`
3. **Fill and submit the form** as above

---

## 📡 API Endpoints

### Backend (FastAPI)

**Production:**
- **Base URL**: `https://py-test-page-production.up.railway.app`
- **Documentation**: `https://py-test-page-production.up.railway.app/docs` (Swagger UI)

**Local Development:**
- **Base URL**: `http://127.0.0.1:8000`
- **Documentation**: `http://127.0.0.1:8000/docs` (Swagger UI)

#### POST `/api/admissions`

**Request:**
```json
{
  "full_name": "John Doe",
  "father_name": "James Doe",
  "class_grade": "5th Grade"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student admission created successfully",
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "father_name": "James Doe",
    "class_grade": "5th Grade",
    "created_at": "2026-01-30T15:23:00Z"
  }
}
```

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework
- **Uvicorn** - ASGI server
- **Supabase** - PostgreSQL database with real-time capabilities
- **Python-dotenv** - Environment variable management

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management

---

## 🔧 Troubleshooting

### CORS Errors
- Ensure backend is running on `http://127.0.0.1:8000`
- Frontend should be on `http://localhost:3000`
- CORS is configured in `backend/main.py`

### Connection Refused
- Verify backend server is running
- Check if port 8000 is not blocked by firewall

### Supabase Errors
- Verify `.env` file has correct credentials
- Check Supabase project is active
- Ensure `students` table exists

---

## 📝 Deployment

This project is deployed on:
- **Frontend**: Vercel (auto-deploys from `main` branch)
- **Backend**: Railway (auto-deploys from `main` branch)
- **Database**: Supabase

**Deployment Features:**
✅ GitHub integration (auto-deploy on push)  
✅ Environment variables configured  
✅ CORS setup for production  
✅ SSL/HTTPS enabled  

## 📝 Next Steps

This PoC demonstrates:
✅ FastAPI + Supabase integration  
✅ Next.js App Router with TypeScript  
✅ API communication between frontend/backend  
✅ CORS configuration  
✅ Form handling and validation  
✅ **Production deployment (Vercel + Railway)**  

**Potential enhancements:**
- Add authentication
- Implement data validation
- Add more CRUD operations
- Add automated tests
- Add monitoring and logging

---

## 📄 License

This is a Proof of Concept project for testing purposes.

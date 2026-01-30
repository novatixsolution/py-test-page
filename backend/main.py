from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from postgrest import AsyncPostgrestClient
from dotenv import load_dotenv
import os
import asyncio

#  Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="School Management System API")

# Configure CORS - Allow both local and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://pytestpage.vercel.app",  # Local development
        "*"  # Temporary: Allow all origins (update after deploying frontend)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in .env file")

# Construct the REST API URL
REST_URL = f"{SUPABASE_URL}/rest/v1"


# Pydantic model for request validation
class StudentAdmission(BaseModel):
    full_name: str
    father_name: str
    class_grade: str


@app.get("/")
async def root():
    return {"message": "School Management System API is running - HI zain"}


@app.post("/api/admissions")
async def create_admission(student: StudentAdmission):
    """
    Create a new student admission record
    """
    try:
        # Create Postgrest client
        async with AsyncPostgrestClient(
            REST_URL,
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}"
            }
        ) as client:
            # Insert data
            data = {
                "full_name": student.full_name,
                "father_name": student.father_name,
                "class_grade": student.class_grade
            }
            
            response = await client.from_("students").insert(data).execute()
            
            if response.data:
                return {
                    "success": True,
                    "message": "Student admission created successfully",
                    "data": response.data[0]
                }
            else:
                raise HTTPException(status_code=400, detail="Failed to create admission")
                    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

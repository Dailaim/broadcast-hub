from dotenv import load_dotenv
load_dotenv("../.env")

from fastapi import FastAPI
import uvicorn
from scalar_fastapi import get_scalar_api_reference
from fastapi.middleware.cors import CORSMiddleware
import database.init
from modules.whatsapp.services import send_whatsapp_message
from modules.scheduler.services import start_scheduler
from contextlib import asynccontextmanager

from modules.message.routes import router as message_router
from modules.group.routes import router as groups_router
from modules.group_user.routes import router as group_user_router
from modules.user.routes import router as user_router
 

@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    yield

app = FastAPI(title="The broadcast hub", openapi_url="/api/v1/docs" , lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(message_router)
app.include_router(groups_router)
app.include_router(group_user_router)
app.include_router(user_router)

@app.get("/health")
def health_check():
    return {"status": "healthy"}
  
@app.get("/new-docs", include_in_schema=False)
async def scalar_html():
    return get_scalar_api_reference(
        openapi_url=app.openapi_url,
        title=app.title,
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
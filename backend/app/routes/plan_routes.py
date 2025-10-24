from fastapi import APIRouter

router = APIRouter(
    prefix="/plan",
    tags=["Plan Routes"]
)

@router.get("/test")
def test_route():
    return {"message": "Plan route working ✅"}


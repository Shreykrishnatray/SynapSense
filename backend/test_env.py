import os
from dotenv import load_dotenv

load_dotenv()  # loads the .env file

print("OPENAI_API_KEY =", os.getenv("OPENAI_API_KEY"))

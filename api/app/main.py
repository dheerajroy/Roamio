from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .utils import get_nearby_amenities

app = FastAPI(title='Roamio')

origins = [
    'roamiomap.vercel.app',
    'https://roamiomap.vercel.app',
    'http://roamiomap.vercel.app',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
async def index():
    return 'Welcome, Roamio!'


@app.get('/nearby')
def nearby(location: str, amenity: str, radius: int=5000):
    return get_nearby_amenities(location, amenity, radius)

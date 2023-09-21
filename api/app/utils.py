import requests
from geopy.geocoders import Nominatim


def get_nearby_amenities(location: str, amenity: str, radius: int):
    location = Nominatim(user_agent='Roamio').geocode(location)
    latitude = location.latitude
    longitude = location.longitude

    overpass_query = f'''
                        [out:json];
                        (node['amenity'='{amenity}'](around:{radius},{latitude},{longitude});
                        way['amenity'='{amenity}'](around:{radius},{latitude},{longitude}););
                        out center;
                    '''

    overpass_url = 'https://overpass-api.de/api/interpreter'
    response = requests.post(overpass_url, data=overpass_query).json()
    data = []

    for item in response['elements']:
        try:
            if 'tags' in item:
                item['tags'].update(
                    {'latitude': item['lat'], 'longitude': item['lon']})
                data.append(item['tags'])
        except Exception:
            continue

    return {'latitude': latitude, 'longitude': longitude, 'data': data}

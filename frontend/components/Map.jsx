import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { FaDirections } from 'react-icons/fa'

export default function Map({ center, data, zoom }) {
    const icon = new L.Icon({
        iconUrl: '/marker.png',
        iconSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    })

    return (
        <MapContainer className="absolute z-0 w-screen h-screen overflow-hidden" zoomControl={false} center={center} zoom={zoom}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ZoomControl position='bottomleft' />
            {data.map((e, index) => (
                <>
                    <Marker key={index} position={[e.latitude, e.longitude]} icon={icon}>
                        <Popup>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-xl font-bold">{e.name}</h1>
                                <details>
                                    <summary>More information</summary>
                                    {Object.entries(e).map(([key, value], index) => (
                                        <p key={index}>{key}: {value ? value : 'NaN'}</p>
                                    ))}
                                </details>
                                <button className="flex gap-2 justify-center items-center" onClick={() => window.open(`https://www.openstreetmap.org/directions?engine=graphhopper_car&to=${e.latitude}%2C${e.longitude}`, '_blank')}><FaDirections />Direction</button>
                            </div>
                        </Popup>
                    </Marker>
                    <Marker position={[e.latitude, e.longitude]} icon={new L.divIcon({ html: `<span>${e.name}</span>`, className: 'font-semibold' })} />
                </>
            ))}
        </MapContainer>
    )
}

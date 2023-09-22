import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet"
import { FaDirections } from 'react-icons/fa'
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function Map({ center, zoom, showMarker, data }) {
    console.log(center, data)
    const icon1 = new L.Icon({
        iconUrl: '/marker1.png',
        iconSize: [32, 32],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    })

    const icon2 = new L.Icon({
        iconUrl: '/marker2.png',
        iconSize: [32, 32],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    })

    return (
        center ? (
            <MapContainer center={center} zoom={zoom} zoomControl={false} className="absolute z-0 w-screen h-screen overflow-hidden">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ZoomControl position='bottomleft' />
                {showMarker && <Marker position={center} icon={icon1} />}
                {data && data.map((e, index) => (
                    <div key={index}>
                        <Marker key={index} position={[e.latitude, e.longitude]} icon={icon2}>
                            <Popup>
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-xl font-bold">{e.name}</h1>
                                    <details>
                                        <summary>More information</summary>
                                        {Object.entries(e).map(([key, value], i) => (
                                            <p key={i}>{key}: {value ? value : 'NaN'}</p>
                                        ))}
                                    </details>
                                    <button className="flex gap-2 justify-center items-center" onClick={() => window.open(`https://www.openstreetmap.org/directions?engine=graphhopper_car&to=${e.latitude}%2C${e.longitude}`, '_blank')}><FaDirections />Direction</button>
                                </div>
                            </Popup>
                        </Marker>
                        <Marker position={[e.latitude, e.longitude]} icon={new L.divIcon({ html: `<span>${e.name}</span>`, className: 'font-semibold' })} />
                    </div>
                ))}
            </MapContainer>
        ) : ''
    )
}

"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Loading from "@/components/Loading"
import Form from '@/components/Form'
import axios from "axios"

export default function Home() {
    const [center, setCenter] = useState([20.5937, 78.9629])
    const [zoom, setZoom] = useState(5)
    const [showMarker, setShowMarker] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const [gotLocation, setGotLocation] = useState(false)
    const [data, setData] = useState()

    const Map = dynamic(() => import("../components/Map"), { ssr: false })

    function fetchData(query) {
        axios.get('https://roamio-api.onrender.com/nearby', {
            params: query,
        })
            .then((res) => {
                setShowMap(false)
                setCenter([res.data.latitude, res.data.longitude])
                setData(res.data.data)
                setZoom(15)
                setShowMap(true)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    useEffect(() => {
        navigator.permissions.query({ name: 'geolocation' }).then(console.log)
        if (navigator.geolocation && !gotLocation) {
            console.log('running')
            navigator.geolocation.getCurrentPosition(pos => {
                setCenter([pos.coords.latitude, pos.coords.longitude])
                setGotLocation(true)
                setZoom(15)
                setShowMarker(true)
                setShowMap(true)
            })
        } else {
            setShowMap(true)
            if (!navigator.geolocation)
                alert("Geolocation is not supported in this browser.")
        }
        setTimeout(() => setShowMap(true), 2000)
    }, [center, gotLocation])

    return (
        <div>
            <Form gotLocation={gotLocation} setGotLocation={setGotLocation} center={center} fetchData={fetchData} />
            {showMap ? (<Map center={center} zoom={zoom} showMarker={showMarker} data={data} />) : <Loading />}
        </div>
    )
}

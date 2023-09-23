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
    const [data, setData] = useState()
    const [yourLocation, setYourLocation] = useState("")
    const [gotLocation, setGotLocation] = useState(false)

    const Map = dynamic(() => import("../components/Map"), { ssr: false })

    function fetchData(query) {
        setShowMap(false)
        axios.get('https://roamio-api.onrender.com/nearby', {
            params: query,
        })
            .then((res) => {
                setCenter([res.data.latitude, res.data.longitude])
                setData(res.data.data)
                setZoom(15)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
        setShowMap(true)
        setShowMarker(true)
    }

    function getLocation() {
        if (navigator.geolocation && !gotLocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = [pos.coords.latitude, pos.coords.longitude]
                setCenter(coords)
                setYourLocation(coords)
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
    }

    useEffect(() => {
        setGotLocation(false)
        getLocation()
        setTimeout(() => setShowMap(true), 5000)
        setGotLocation(false)
    }, [yourLocation])

    return (
        <div>
            <Form getLocation={getLocation} yourLocation={yourLocation} fetchData={fetchData} />
            {showMap ? (<Map center={center} zoom={zoom} showMarker={showMarker} data={data} />) : <Loading />}
        </div>
    )
}
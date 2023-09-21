"use client"

import dynamic from 'next/dynamic'
import { useState } from 'react'
import axios from 'axios'
import Form from '@/components/Form'

export default function Home() {
    const Map = dynamic(() => import('../components/Map'), { ssr: false })
    const [center, setCenter] = useState([20.5937, 78.9629])
    const [data, setData] = useState([])
    const [zoom, setZoom] = useState(6)

    function fetchData(query) {
        axios.get('https://roamio-api.onrender.com/nearby', {
            params: query,
        })
            .then((response) => {
                setCenter([response.data.latitude, response.data.longitude])
                setData(response.data.data)
                setZoom(15)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    return (
        <>
            <Form fetchData={fetchData} />
            <Map center={center} data={data} zoom={zoom} />
            <h1 className="text-4xl font-bold absolute opacity-70 right-5 bottom-5">ROAMIO</h1>
        </>
    )
}

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MdGpsFixed, MdGroups } from "react-icons/md"
import { AiFillEdit } from "react-icons/ai"
import { FaDonate, FaSearchLocation } from "react-icons/fa"

export default function Form({ setShowMap, gotLocation, setGotLocation, center, fetchData }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [location, setLocation] = useState(null)
    const [amenity, setAmenity] = useState(null)
    const [radius, setRadius] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    
    useEffect(() => {
        setShowMap(false)
        setLocation(searchParams.get("location") || gotLocation ? center : "")
        setAmenity(searchParams.get("amenity") || null)
        setRadius(searchParams.get("radius") || null)

        const query = { location: location, amenity: amenity }
        if (radius)
            query.radius = radius

        if (location && amenity) {
            setSubmitted(false)
            fetchData(query)
        }
        setShowMap(true)
    }, [gotLocation, submitted])

    function onSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        
        const locationValue = data.get("location")
        const amenityValue = data.get("amenity")
        const radiusValue = data.get("radius")
        
        setLocation(locationValue)
        setAmenity(amenityValue)
        setRadius(radiusValue)

        router.push(`?location=${locationValue}&amenity=${amenityValue}${radiusValue ? `&radius=${radiusValue}` : ''}`)
        setSubmitted(true)
    }

    return (
        <form onSubmit={onSubmit} className="fixed z-10 flex gap-2 m-3 flex-wrap [&>*]:w-full md:[&>*]:w-fit">
            <div className="flex gap-2">
                <input onClick={e => e.target.select()} defaultValue={location} className="w-full" type="text" name="location" placeholder="Area, city, country" required />
                <button className="square-btn" onClick={() => setGotLocation(false)}><MdGpsFixed /></button>
            </div>
            <select defaultValue={amenity} name="amenity" required>
                <option value="restaurant">Restaurant</option>
                <option value="place_of_worship">Place  Of Worship</option>
                <option value="cafe">Cafe</option>
                <option value="park">Park</option>
                <option value="school">School</option>
                <option value="hospital">Hospital</option>
                <option value="library">Library</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="bank">Bank</option>
                <option value="post_office">Post Office</option>
                <option value="supermarket">Supermarket</option>
                <option value="gas_station">Gas Station</option>
                <option value="bar">Bar</option>
                <option value="parking">Parking</option>
                <option value="gym">Gym</option>
                <option value="movie_theater">Movie Theater</option>
                <option value="shopping_mall">Shopping Mall</option>
            </select>
            <input onClick={e => e.target.select()} defaultValue={radius} type="number" name="radius" placeholder="Radius in meters" />
            <div className="flex gap-2">
                <button className="w-full flex gap-2 justify-center items-center" type="submit"><FaSearchLocation />Explore</button>
                <button className="square-btn" onClick={() => window.open("https://www.openstreetmap.org/edit", "_blank")}><AiFillEdit /></button>
                <button className="square-btn" onClick={() => window.open("https://paypal.me/ddheerajroy", "_blank")}><FaDonate /></button>
                <button className="square-btn" onClick={() => window.open("https://github.com/dheerajroy/Roamio", "_blank")}><MdGroups /></button>
            </div>
        </form>
    )
}
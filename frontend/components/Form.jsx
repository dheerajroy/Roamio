import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdGpsFixed, MdGroups } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { FaDonate, FaSearchLocation } from 'react-icons/fa'

export default function Form({ fetchData }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    function onSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const query = { location: data.get('location'), amenity: data.get('amenity') }
        if (data.get('radius'))
            query.radius = data.get('radius')
        router.push(`?location=${query.location}&amenity=${query.amenity}${query.radius ? `&radius=${query.radius}` : ''}`)
        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false)
        }, 5000)
    }

    function getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                document.getElementsByName('location')[0].value = `${position.coords.latitude}, ${position.coords.longitude}`
            })
        } else {
            alert('Geolocation is not supported in this browser.')
        }
    }

    useEffect(() => {
        if (!searchParams.get('location') && !searchParams.get('amenity'))
            return
        console.log('hello')
        const query = { location: searchParams.get('location'), amenity: searchParams.get('amenity') }
        if (searchParams.get('radius'))
            query.radius = searchParams.get('radius')
        fetchData(query)
    }, [searchParams])

    return (
        <form onSubmit={onSubmit} className="fixed z-10 flex gap-2 m-3 flex-wrap [&>*]:w-full md:[&>*]:w-fit">
            <div className='flex gap-2'>
                <input className="w-full" type="text" name="location" placeholder="Area, city, country" required />
                <button className='square-btn' onClick={getLocation}><MdGpsFixed /></button>
            </div>
            <select name="amenity" required>
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
            <input type="number" name="radius" placeholder="Radius in meters" />
            <div className="flex gap-2">
                <button className="w-full flex gap-2 justify-center items-center" type="submit" disabled={isButtonDisabled}><FaSearchLocation />Explore</button>
                <button className="square-btn" onClick={() => window.open('https://www.openstreetmap.org/edit', '_blank')}><AiFillEdit /></button>
                <button className="square-btn" onClick={() => window.open('https://paypal.me/ddheerajroy', '_blank')}><FaDonate /></button>
                <button className="square-btn" onClick={() => window.open('https://github.com/dheerajroy/Roamio', '_blank')}><MdGroups /></button>
            </div>
        </form>
    )
}

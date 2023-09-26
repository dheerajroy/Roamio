import { useEffect, useState } from "react"

export default function Loading() {
    const [messageState, setMessageState] = useState(false)
    useEffect(() => {
        setTimeout(() => setMessageState(true), 10000)
    }, [])
    return (
        <div className="fixed w-screen h-screen top-0 flex flex-col gap-2 justify-center items-center">
            <span className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></span>
            {messageState ? <p className="p-2">Might take 1-2 mins as this platform is hosted on render free tier, the server takes time to start.</p> : ""}
        </div>
    )
}

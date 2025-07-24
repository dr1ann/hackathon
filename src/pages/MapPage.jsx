import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { ref, onValue } from 'firebase/database'

const fallbackCenter = { lat: 11.1768892, lng: 125.003195 }

const mockPickup = { lat: 11.179, lng: 125.002 } // Point A (pickup)
const mockDestination = { lat: 11.185, lng: 125.010 } // Point B (drop-off)

export default function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBYKY5CkAeXErPuGY0WvDI8tW5o3-mG9ZA',
  })

  const [riderLocation, setRiderLocation] = useState(null)
  const [directions, setDirections] = useState(null)
  const [eta, setEta] = useState(null)

  useEffect(() => {
    const riderRef = ref(db, 'drivers/driver1/location')
    const unsub = onValue(riderRef, (snapshot) => {
      const data = snapshot.val()
      if (data?.latitude && data?.longitude) {
        setRiderLocation({ lat: data.latitude, lng: data.longitude })
      }
    })

    return () => unsub()
  }, [])

  useEffect(() => {
    if (!riderLocation) return

    const service = new window.google.maps.DirectionsService()
    service.route(
      {
        origin: riderLocation,
        destination: mockDestination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (res, status) => {
        if (status === 'OK') {
          setDirections(res)
          const leg = res.routes[0]?.legs[0]
          if (leg?.duration) {
            setEta(leg.duration.text)
          }
        } else {
          console.error('Directions request failed:', status)
        }
      }
    )
  }, [riderLocation])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="h-screen w-full relative">
      {eta && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow text-black z-10">
          ETA: {eta}
        </div>
      )}

      <GoogleMap
        center={riderLocation || fallbackCenter}
        zoom={14}
        mapContainerStyle={{ height: '100%', width: '100%' }}
      >
        {/* Driver marker (D) */}
        {riderLocation && (
          <Marker position={riderLocation}  label={{
            text: 'D',
            color: '#FFFF',
            fontWeight: 'bold',
            fontSize: '14px',
          }} />
        )}

        <Marker
          position={mockPickup}
          label={{
            text: 'A',
            color: '#FFFF',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        />

        <Marker
          position={mockDestination}
          label={{
            text: 'B',
            color: '#FFFF',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        />

        {/* Route */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>
    </div>
  )
}

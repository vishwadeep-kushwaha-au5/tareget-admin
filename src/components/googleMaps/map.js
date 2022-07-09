import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsService, DirectionsRenderer, DistanceMatrixService } from '@react-google-maps/api'

import { makeStyles } from '@material-ui/core/styles';

import { setMapLoaded, unsetMapLoaded } from '../../redux/actions/googleMap';
import { useSelector, useDispatch } from "react-redux";

import InfoWindowContent from './infoWindow'
import RoundIcon from '../../images/delivery-truck.svg'

const libraries = ['places'];

const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    fullscreenControl: true,
    styles: [
        {
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#f5f5f2"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.school",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "stylers": [
                {
                    "visibility": "simplified"
                },]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "stylers": []
        },
        {
            "featureType": "road.local",
            "stylers": []
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#71c8d4"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "color": "#e5e8e7"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "color": "#8ba129"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": []
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c7c7c7"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#a0d3d3"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "color": "#91b65d"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "gamma": 1.51
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road"
        },
        {
            "featureType": "road"
        },
        {},
        {
            "featureType": "road.highway"
        }
    ]
}

const useStyles = makeStyles(theme => ({
    infoWindow: {
        backgroundColor: 'blue'
    }
}))

export default function GooglePlannerMap({ viewOnly, dimensions, markers = {}, selectedMarker = {}, updateDistanceDetails }) {
    const classes = useStyles()
    const mapLoaded = useSelector(state => state.googleMap.mapLoaded)

    const [selected, setSelected] = useState(null)
    const [ directionLoaded, setDirectionLoaded] = useState(false)
    const [ distanceLoaded, setDistanceLoaded] = useState(false)
    const dispatch = useDispatch()
    const [map, setMap] = useState(null)
    const [distanceResponse, setDistanceResponse] = useState(null)
    const [direction, setDirection] = useState({
        response: null,
        travelMode: 'DRIVING'
    })

    const [center, setCenter] = useState({
        lat: 47.8021,
        lng: -123.6044
    })

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBv6DEf2K26lxoAURZHe98bzwEnTLKJs0U",
        libraries
      })

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
        dispatch(setMapLoaded())
    }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])
    
    // // const markers = useSelector(state => state.newTrip.markers)
    // const selectedMarker = useSelector(state => state.newTrip.selectedMarker)
    // const mapLoadedLocal = useSelector(state => state.newTrip.mapLoadedLocal)

    const panTo = React.useCallback(({ lat, lng }) => {
        // map.panTo({ lat, lng });
    }, []);

    useEffect(() => {
        if (selectedMarker.lat && mapLoaded) {
            setDirectionLoaded(false)
            setDistanceLoaded(false)
            setCenter({ lat: parseFloat(selectedMarker.lat), lng: parseFloat(selectedMarker.lng) })
            panTo({ lat: parseFloat(selectedMarker.lat), lng: parseFloat(selectedMarker.lng) })
        }
    }, [selectedMarker, mapLoaded])

    const directionsCallback= (response)=> {    
        if (response !== null) {
          if (response.status === 'OK') {
            setDirectionLoaded(true)
            setDirection(prevState=>({
                ...prevState,
                response
              }))
          } else {
            console.log('Direction: ', response)
          }
        }
      }

    const distanceMatrixResponse = (response) => {
        if(response?.rows?.length && response.rows[0].elements?.length && response.rows[0].elements[0].status === 'OK'){
            setDistanceLoaded(true)
            setDistanceResponse(response.rows[0].elements[0])
            updateDistanceDetails({target:{name:'distance', value: response.rows[0].elements[0]}})
        }else{
            console.log("Distance:", response)
        }
    }

    const renderMap = () => {
        return (<>
            <GoogleMap
                mapContainerStyle={dimensions}
                zoom={6}
                center={center}
                options={mapOptions}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {
                    Object.values(markers).map((place, i) =>
                        <Marker
                            key={i}
                            position={{ lat: parseFloat(place.lat), lng: parseFloat(place.lng) }}
                            onClick={() => {
                                setSelected(place);
                            }}
                            // label={{
                            //     text: String(i + 1),
                            //     color: 'white',
                            //     fontWeight: '700',
                            //     fontSize: '18px'
                            // }}
                        />)
                }
                {Object.keys(selectedMarker).length &&
                    <Marker
                        key="selected101"
                        position={{ lat: parseFloat(selectedMarker.lat), lng: parseFloat(selectedMarker.lng) }}
                        onClick={() => {
                            setSelected(selectedMarker);
                        }}
                        // label={{
                        //     text: String(selectedMarker.key + 1),
                        //     color: 'white',
                        //     fontWeight: '700',
                        //     fontSize: '18px'
                        // }}
                    />
                }

                {selected ? (
                    (viewOnly && <InfoWindow
                        position={{ lat: parseFloat(selected.lat) + 0.5, lng: parseFloat(selected.lng) }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <InfoWindowContent selected={selected} />
                        {/* <div>
                            <h2>
                                <span role="img" aria-label="bear">
                                </span>{" "}
                                {selected.placeName}
                            </h2>
                            <p>Marked @{formatRelative(selected.id, new Date())}</p>
                            {console.log("checking2", selected)}
                        </div> */}
                    </InfoWindow>
                    )) : null}

{
              (
                markers.destinationAddress !== '' &&
                markers.originAddress !== '' &&
                !directionLoaded 
              ) && (
                <DirectionsService
                  // required
                  options={{
                    destination: markers.destinationAddress,
                    origin: markers.originAddress,
                    travelMode: direction.travelMode
                  }}
                  // required
                  callback={directionsCallback}
                  // optional
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
                  // optional
                  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  }}
                />
              )
            }
            {(
                markers.destinationAddress !== '' &&
                markers.originAddress !== '' &&
                !distanceLoaded 
              ) &&
                 <DistanceMatrixService
                 options={{
                           destinations: [markers.destinationAddress],
                           origins: [markers.originAddress],
                           travelMode: "DRIVING",
                         }}
                 callback = {(response)=>distanceMatrixResponse(response)}
                />
            }

            {
              (direction.response !== null) && (
                <DirectionsRenderer
                  // required
                  options={{
                    directions: direction.response
                  }}
                  // optional
                  onLoad={directionsRenderer => {
                    setDirectionLoaded(true)
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                  }}
                  // optional
                  onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
                />
              )
            }
            </GoogleMap></>)
    }

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? renderMap() : <div>Loading</div>
}
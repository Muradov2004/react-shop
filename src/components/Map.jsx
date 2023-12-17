import React, {useRef, useEffect, useState} from 'react';
import * as maptilerSdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

let Map = ({onCoordinatesChange, lng = 49.8671, lat = 40.4093, canChangeMarker = true}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [longitude, setLongitude] = useState(lng);
  const [latitude, setLatitude] = useState(lat);
  const [zoom] = useState(9);
  maptilerSdk.config.apiKey = 'COhoD3buRwSyj1Hvp2As';

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilerSdk.Map({
      container: mapContainer.current,
      style: maptilerSdk.MapStyle.STREETS,
      center: [longitude, latitude],
      zoom: zoom
    });

    marker.current = new maptilerSdk.Marker({color: "#FF0000"})
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    map.current.on('click', handleMapClick);
  }, [longitude, latitude, zoom]);

  const handleMapClick = (event) => {
    if (canChangeMarker) {
      const {lng, lat} = event.lngLat;
      setLongitude(lng);
      setLatitude(lat);
      marker.current.setLngLat([lng, lat]);
      onCoordinatesChange(lat, lng);
    }
  };

  return (
    <div style={{position: "relative", width: '100%', height: '100%'}}>
      <div ref={mapContainer} style={{
        position: "absolute",
        width: '100%',
        height: '100%'
      }}/>
    </div>
  );
}

export default Map;
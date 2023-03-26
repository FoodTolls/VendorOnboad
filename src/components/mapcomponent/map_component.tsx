// import { useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Popup from "../modal/modal";
const MapComponent = ({ setLatLong }: any) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMarkerPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          openPopUp();
        }
      );
    } else {
      openPopUp();
    }
  }, []);

  const openPopUp = () => {
    return (
      <>
        <Popup message={"Error fetching Location"} />
      </>
    );
  };

  const getLocation = (e: any) => {
    console.log(e);
    if (e.placeId) {
      console.log(e.placeId);
      const geocoder = new google.maps.Geocoder();
      geocoder
        .geocode({ placeId: e.placeId })
        .then(({ results }) => {
          if (map) {
            map.setZoom(14);
            map.panTo(results[0].geometry.location);
            marker?.setMap(map);
            marker?.setPosition(results[0].geometry.location);
            setLatLong(
              JSON.stringify(results[0].geometry.location.toJSON(), null, 2)
            );
          }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
      return;
    }
    if (map) {
      map.panTo(e.latLng), marker?.setMap(map);
      marker?.setPosition(e.latLng);
      setLatLong(JSON.stringify(e.latLng.toJSON(), null, 2));
    }
  };
  const options: google.maps.MapOptions = {
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    mapTypeControl: false,
    gestureHandling: "cooperative",
  };
  return (
    <div>
      <GoogleMap
        onLoad={(e: google.maps.Map) => setMap(e)}
        center={center}
        zoom={11}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "10px",
        }}
        options={options}
        onClick={(e) => getLocation(e)}
      >
        {center && (
          <MarkerF
            onLoad={(e: google.maps.Marker) => setMarker(e)}
            position={markerPosition}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;

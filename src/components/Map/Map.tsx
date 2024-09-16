import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Loader from "../Loader";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import { LeafletMouseEvent } from "leaflet";
import { HotelType } from "../context/HotelsProvider";
export type MapCenterType = [number, number];

type PropsType ={
  isLoading:boolean,
  hotels : HotelType[]
}
function Map({hotels,isLoading}:PropsType) {
  
  const [mapCenter, setMapCenter] = useState<MapCenterType>([48, 5]);
  const [searchParams] = useSearchParams();
  const {
    err,
    getGeoLocation,
    isLoading: isLoadingGeoLocation,
    position: positionGeoLocation,
  } = useGeoLocation();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  useEffect(() => {
    if (lat && lon) setMapCenter([Number(lat), Number(lon)]);
  }, [lat, lon]);
  useEffect(() => {
    if (positionGeoLocation) setMapCenter(positionGeoLocation);
  }, [positionGeoLocation]);

  if (isLoading) return <Loader />;
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <button onClick={getGeoLocation} className="getLocation">
          {isLoadingGeoLocation
            ? "loading"
            : positionGeoLocation
            ? "use your Location"
            : err
            ? err
            : "get your Location"}
        </button>
        <ChangeCenter position={mapCenter} />
        <DetectClick />
        {hotels.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.smart_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
type ChangeCenterType = {
  position: MapCenterType;
};
function ChangeCenter({ position }: ChangeCenterType) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e: LeafletMouseEvent) =>
      navigate(`/bookmark?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

export default Map;

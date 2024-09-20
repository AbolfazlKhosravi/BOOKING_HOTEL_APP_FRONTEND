import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import L, { LeafletMouseEvent } from "leaflet";
import { IoLocation } from "react-icons/io5";
import { renderToStaticMarkup } from "react-dom/server";
import useUrlLocation from "../../hooks/useUrlLocation";
export type MapCenterType = [number, number];
interface markerLoacationType {
  id: number;
  latitude: number;
  longitude: number;
  location: string;
}
type PropsType = {
  markerLoacations: markerLoacationType[];
  currentMarkerLocation: markerLoacationType | null;
};
const customMarkerIcon = L.divIcon({
  className: "custom-marker",
  html: renderToStaticMarkup(
    <IoLocation
      size={40}
      color="#007BFF"
      style={{
        filter: "drop-shadow(8px 16px 10px rgba(0,0,0,0.6))",
      }}
    />
  ),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [1, -30],
});

function Map({ markerLoacations, currentMarkerLocation }: PropsType) {
  const location = useLocation();

  const [mapCenter, setMapCenter] = useState<MapCenterType>([48, 5]);
  const [zoom, setZoom] = useState<number>(4);
  const [lat, lon] = useUrlLocation();
  const {
    err,
    getGeoLocation,
    isLoading: isLoadingGeoLocation,
    position: positionGeoLocation,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lon) {
      setMapCenter([Number(lat), Number(lon)]);
      setZoom(13);
    }
  }, [lat, lon]);
  useEffect(() => {
    if (positionGeoLocation) {
      setMapCenter(positionGeoLocation);
      setZoom(13);
    }
  }, [positionGeoLocation]);

  useEffect(() => {
    if (location.pathname === "/hotels" || location.pathname === "/bookmarks") {
      setZoom(4);
    }
  }, [markerLoacations, location.pathname]);
  
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoomControl={false}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <button
          id="getYourLocatio"
          onClick={getGeoLocation}
          className="getLocation"
        >
          {isLoadingGeoLocation
            ? "loading"
            : positionGeoLocation
            ? "use your Location"
            : err
            ? err
            : "get your Location"}
        </button>
        <ChangeCenterAndZoom position={mapCenter} zoom={zoom} />
        <DetectClick />
        {markerLoacations.length &&
          markerLoacations.map((item) => {
            return (
              <Marker key={item.id} position={[item.latitude, item.longitude]}>
                <Popup>{item.location}</Popup>
              </Marker>
            );
          })}
        {location.pathname !== "/hotels" &&
          location.pathname !== "/bookmarks" &&
          currentMarkerLocation && (
            <Marker
              position={[
                currentMarkerLocation.latitude,
                currentMarkerLocation.longitude,
              ]}
            >
              <Popup>{currentMarkerLocation.location}</Popup>
            </Marker>
          )}
        {location.pathname === "/bookmarks/add" && lat && lon && (
          <Marker position={[Number(lat), Number(lon)]}>
            <Popup>this is somthing to you choised</Popup>
          </Marker>
        )}

        {positionGeoLocation?.length && (
          <Marker
            icon={customMarkerIcon}
            position={[positionGeoLocation[0], positionGeoLocation[1]]}
          >
            <Popup>this is your location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
type ChangeCenterType = {
  position: MapCenterType;
  zoom: number;
};
function ChangeCenterAndZoom({ position, zoom }: ChangeCenterType) {
  const map = useMap();
  map.flyTo(position, zoom, {
    animate: true,
    duration: 2,
  });
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      if ((e.originalEvent.target as HTMLElement)?.id === "getYourLocatio") {
        return;
      }
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
    },
  });
  return null;
}

export default Map;

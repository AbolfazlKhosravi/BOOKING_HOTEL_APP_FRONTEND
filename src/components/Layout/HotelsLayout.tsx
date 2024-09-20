import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useStatesHotels } from "../context/useContexts";

function HotelsLayout() {
  const { hotels, currentHotel } = useStatesHotels();

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map
        markerLoacations={hotels.map((hotel) => {
          return {
            id: hotel.id,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            location: hotel.smart_location,
          };
        })}
        currentMarkerLocation={
          currentHotel
            ? {
                id: currentHotel.id,
                latitude: currentHotel.latitude,
                longitude: currentHotel.longitude,
                location: currentHotel.smart_location,
              }
            : null
        }
      />
    </div>
  );
}

export default HotelsLayout;

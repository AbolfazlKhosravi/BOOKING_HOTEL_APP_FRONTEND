import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useStatesHotels } from "../context/useContexts";

function HotelsLayout() {
  const { hotels,currentHotel } = useStatesHotels();
  
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLoacations={hotels} currentHotel={currentHotel} />
    </div>
  );
}  




export default HotelsLayout;

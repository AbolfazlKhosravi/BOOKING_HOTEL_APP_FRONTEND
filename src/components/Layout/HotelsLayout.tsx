import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useStatesHotels } from "../context/useContexts";

function HotelsLayout() {
  const { hotels, isLoading } = useStatesHotels();
  
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map hotels={hotels} isLoading={isLoading}/>
    </div>
  );
}  




export default HotelsLayout;

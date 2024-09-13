import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

function HotelsLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map/>
    </div>
  );
}  




export default HotelsLayout;

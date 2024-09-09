import { Outlet } from "react-router-dom";

function HotelsLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">map</div>
    </div>
  );
}

export default HotelsLayout;

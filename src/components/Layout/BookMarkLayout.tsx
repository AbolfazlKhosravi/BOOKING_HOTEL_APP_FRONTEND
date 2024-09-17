import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

function BookMarkLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map  markerLoacations={[]} currentHotel={null}/>
    </div>
  );
}  




export default BookMarkLayout;
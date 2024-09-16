import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

function BookMarkLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map isLoading={false} hotels={[]}/>
    </div>
  );
}  




export default BookMarkLayout;
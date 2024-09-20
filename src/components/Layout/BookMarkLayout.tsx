import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useStatesBookmarks } from "../context/Bookmarks/useContexts";

function BookMarkLayout() {
  const { bookmarks, currentBookmark } = useStatesBookmarks();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map
        markerLoacations={bookmarks.map((bookmark) => {
          return {
            id: bookmark.id,
            latitude: bookmark.latitude,
            longitude: bookmark.longitude,
            location: bookmark.host_location,
          };
        })}
        currentMarkerLocation={
          currentBookmark
            ? {
                id: currentBookmark.id,
                latitude: currentBookmark.latitude,
                longitude: currentBookmark.longitude,
                location: currentBookmark.host_location,
              }
            : null
        }
      />
    </div>
  );
}

export default BookMarkLayout;

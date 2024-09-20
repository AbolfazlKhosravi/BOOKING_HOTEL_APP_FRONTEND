import { useEffect } from "react";
import { BookmarkType } from "../components/context/Bookmarks/BookmarksProvider";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import {
  useSetStetesBookmarks,
  useStatesBookmarks,
} from "../components/context/Bookmarks/useContexts";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

function BookmarkList() {
  const { isLoading, data } = useFetch<BookmarkType[]>(
    "http://localhost:3000/api/bookmarks"
  );

  const { setBookmarks } = useSetStetesBookmarks();
  const { bookmarks, currentBookmark } = useStatesBookmarks();

  useEffect(() => {
    if (data?.length) {
      setBookmarks(data);
    } else {
      if (bookmarks.length) {
        setBookmarks([]);
      }
    }
  }, [data, setBookmarks, bookmarks]);

  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              to={`${item.id}?lat=${item.latitude}&lon=${item.longitude}`}
              key={item.id}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id && "current-bookmark"
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.country_code} />
                  &nbsp; <strong>{item.city_name}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookmarkList;

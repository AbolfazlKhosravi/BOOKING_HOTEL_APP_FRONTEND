import Loader from "../components/Loader";
import {
  useSetStetesBookmarks,
  useStatesBookmarks,
} from "../components/context/Bookmarks/useContexts";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import  { LoaderIcon } from "react-hot-toast";

function BookmarkList() {

  const {deleteBookmark } = useSetStetesBookmarks();
  const { bookmarks, currentBookmark,loadingGetBookmarks,loadingDeleteBookmark} = useStatesBookmarks();

  
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ): Promise<void> => {
    e.preventDefault();
    deleteBookmark(id)
  };
  if (loadingGetBookmarks) return <Loader />;
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
                <div>
                  <button onClick={(e) => handleDelete(e, item.id)}>
                    {loadingDeleteBookmark ? (
                      <LoaderIcon
                        style={{ width: "1.3rem", height: "1.3rem" }}
                      />
                    ) : (
                      <HiTrash className="trash" />
                    )}
                  </button>
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

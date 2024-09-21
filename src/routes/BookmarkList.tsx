import { useEffect, useState } from "react";
import { BookmarkType } from "../components/context/Bookmarks/BookmarksProvider";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import {
  useSetStetesBookmarks,
  useStatesBookmarks,
} from "../components/context/Bookmarks/useContexts";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";

function BookmarkList() {
  const [isLoadingDelete, setIsloadingDelete] = useState<boolean>(false);
  const { isLoading, data } = useFetch<BookmarkType[]>(
    "http://localhost:3000/api/bookmarks"
  );

  const { setBookmarks } = useSetStetesBookmarks();
  const { bookmarks, currentBookmark } = useStatesBookmarks();

  useEffect(() => {
    if (data?.length ) {
      setBookmarks(data);
    } else {
      if (bookmarks.length) {
        setBookmarks([]);
      }
    }
  }, [data, setBookmarks, bookmarks]);
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ): Promise<void> => {
    setIsloadingDelete(true);
    e.preventDefault();
    try {
      const { data } = await axios.delete<{
        message: string;
        bookmarks: BookmarkType[];
      }>(`http://localhost:3000/api/bookmarks/${id}`);
      setBookmarks(data.bookmarks);
      toast.success(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsloadingDelete(false);
    }
  };
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
                <div>
                  <button onClick={(e) => handleDelete(e, item.id)}>
                    {isLoadingDelete ? (
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

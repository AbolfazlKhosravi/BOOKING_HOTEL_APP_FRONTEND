import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { useEffect } from "react";
import {
  useSetStetesBookmarks,
  useStatesBookmarks,
} from "../components/context/Bookmarks/useContexts";
import { BookmarkType } from "../components/context/Bookmarks/BookmarksProvider";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams<string>();
  const { currentBookmark } = useStatesBookmarks();
  const { setCurrentBookmark } = useSetStetesBookmarks();
  const { isLoading, data } = useFetch<BookmarkType>(
    `http://localhost:3000/api/bookmarks/${id}`
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (id && data && currentBookmark !== data) {
      setCurrentBookmark(data);
    }
  }, [id, data, currentBookmark, setCurrentBookmark]);

  if (isLoading) return <Loader />;
  if (!data) return <div>جیزی پیدا نشد</div>;
  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
      <h2>{data.city_name}</h2>
      <div className="bookmarlItem">
        <ReactCountryFlag svg countryCode={data?.country_code} />
        &nbsp; <strong>{data?.city_name}</strong> &nbsp;
        <span>{data?.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;

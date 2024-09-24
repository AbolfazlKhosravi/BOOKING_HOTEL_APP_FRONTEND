import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import {
  useSetStetesBookmarks,
  useStatesBookmarks,
} from "../components/context/Bookmarks/useContexts";
import ReactCountryFlag from "react-country-flag";
import { useEffect } from "react";

function SingleBookmark() {
  const  navigate  = useNavigate();
  const { id } = useParams<string>();
  const { currentBookmark, loadingGetBookmark } = useStatesBookmarks();
  const { getBookmark } = useSetStetesBookmarks();

  useEffect(() => {
    getBookmark(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loadingGetBookmark) return <Loader />;
  if (!currentBookmark) return <div>جیزی پیدا نشد</div>;
  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
      <h2 style={{ marginTop: "10px" }}>{currentBookmark.city_name}</h2>
      <div style={{ marginTop: "10px" }} className="bookmarkItem">
        <div>
          {" "}
          <ReactCountryFlag svg countryCode={currentBookmark?.country_code} />
          &nbsp; <strong>{currentBookmark?.city_name}</strong> &nbsp;
          <span>{currentBookmark?.country}</span>
        </div>
      </div>
    </div>
  );
}

export default SingleBookmark;

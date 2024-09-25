import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import {
  useSetStetesBookmarks,
  useStatesBookmarks,
} from "../context/Bookmarks/useContexts";
interface GEOCODINGTYPE {
  city?: string;
  locality?: string;
  countryName?: string;
  countryCode?: string;
  localityInfo?: {
    administrative: Array<{ description?: string }>;
  };
}
export interface BookmarkFrontType {
  cityName: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  hostLocation: string;
}
const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
function AddNewBookmark() {
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [hostLocation, setHostLocation] = useState<string>("");
  const [isLoadingLocationData, setIsLoadingLocationData] =
    useState<boolean>(false);

  const { loadingAddBookmark } = useStatesBookmarks();
  const { addBookmark } = useSetStetesBookmarks();
  const navigate = useNavigate();
  const [lat, lon] = useUrlLocation();

  useEffect(() => {
    if (!lat || !lon) return;
    async function fetchLocationData() {
      setIsLoadingLocationData(true);
      try {
        const { data } = await axios.get<GEOCODINGTYPE>(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
          {
            withCredentials: false,
          }
        );

        if (!data.countryCode) {
          throw new Error(
            "this lcoation is not a city! please click somewher else"
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setCountryCode(data.countryCode || "");
        setHostLocation(
          data.localityInfo?.administrative[3]?.description ||
            data.localityInfo?.administrative[2]?.description ||
            ""
        );
      } catch (error) {
        setCityName("");
        setCountry("");
        setCountryCode("");
        setHostLocation("");
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setIsLoadingLocationData(false);
      }
    }

    fetchLocationData();
  }, [lat, lon]);
  const addNewBookmarkHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const data: BookmarkFrontType = {
      cityName,
      country,
      countryCode,
      lat,
      lon,
      hostLocation,
    };
    addBookmark(data);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h2>Bookmark New Location </h2>
        <span>
          {isLoadingLocationData && (
            <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />
          )}
        </span>
      </div>
      <form onSubmit={addNewBookmarkHandler} className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            value={cityName}
            placeholder="City Name"
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityNmae"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="cityNmae"
            id="country"
          />
          {countryCode && (
            <ReactCountryFlag className="flag" svg countryCode={countryCode} />
          )}
        </div>
        <div className="formControl">
          <label htmlFor="country">Host Location</label>
          <input
            value={hostLocation}
            placeholder="Host Location"
            onChange={(e) => setHostLocation(e.target.value)}
            type="text"
            name="cityNmae"
            id="country"
          />
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; Back
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/bookmarks");
            }}
            className="btn btn--back"
          >
            show Bookmarks
          </button>
          <button type="submit" className="btn btn--primary">
            {loadingAddBookmark ? (
              <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />
            ) : (
              "Add Bookmark"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;

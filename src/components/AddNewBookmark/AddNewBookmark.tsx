import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
function AddNewBookmark() {
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [hostLocation, setHostLocation] = useState<string>("");
  const navigate = useNavigate();
  const [lat,lon] = useUrlLocation();
  
  useEffect(() => {
    if (!lat || !lon) return;
    async function fetchLocationData() {
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        
        if (!data.countryCode) {
          throw new Error(
            "this lcoation is not a city! please click somewher else"
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
        setHostLocation(data.localityInfo.administrative[3].description||data.localityInfo.administrative[2].description);
      } catch (error) {
        setCityName("");
        setCountry("");
        setCountryCode("");
        setHostLocation("");
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    }

    fetchLocationData();
  }, [lat, lon]);
  const addNewBookmarkHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
    const {data}=  await axios.post("http://localhost:3000/api/bookmarks/addbookmark", {
        cityName,
        country,
        countryCode,
        lat,
        lon,
        hostLocation,
      });
      toast.success(data.message);
      navigate("/bookmarks");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form onSubmit={addNewBookmarkHandler} className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            value={cityName}
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;

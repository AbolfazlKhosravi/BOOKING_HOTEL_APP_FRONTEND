import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import {
  HotelType,
} from "../components/context/HotelsProvider";
import { useEffect } from "react";
import { useSetStetesHotels, useStateCurrentHotels } from "../components/context/useContexts";

export default function Hotels() {
  const location = useLocation();

  const { data, isLoading } = useFetch<HotelType[]>(
    "http://localhost:3000/api/hotels",
    location.search
  );
  const { setHotels, setIsLoading } = useSetStetesHotels();
  const {currentHotels}=useStateCurrentHotels()
  console.log(" hotels");
  
  useEffect(() => {
    if (data?.length) {
      setHotels(data);
      setIsLoading(isLoading);
    }
  }, [data, setHotels,setIsLoading,isLoading]);
  if (isLoading) return <Loader />;
  if (!data) return <p>چیزی یافت نشد </p>;
  return (
    <div className="searchList">
      <h2>Search Results ({data.length})</h2>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lon=${item.longitude}`}
          >
            <div className={`searchItem ${currentHotels===item.id&&"current-hotel"}`}>
              <img src={item.pictuer_url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  {" "}
                  €&nbsp;{item.price}&nbsp;<span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

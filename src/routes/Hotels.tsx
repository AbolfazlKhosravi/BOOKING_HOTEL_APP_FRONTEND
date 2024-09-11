import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";

export interface HotelType {
  id: number;
  pictuer_url: string;
  smart_location: string;
  name: string;
  price: number;
  summary:string;
  description:string;
  street:string;
  city:string;
  state:string;
  country:string
}
export default function Hotels() {
  const location = useLocation();
 
  const { data, isLoading } = useFetch<HotelType[]>(
    "http://localhost:3000/api/hotels",
    location.search
  );
  

  if (isLoading) return <Loader />;
  if (!data) return <p>چیزی یافت نشد </p>;
  return (
    <div className="searchList">
      <h2>Search Results ({data.length})</h2>
      {data.map((item) => {
        return (
          <Link key={item.id} to={`/hotels/${item.id}`}>
            <div className="searchItem">
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

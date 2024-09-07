import useFetch from "../../hooks/useFetch";
import Loader from "../Loader";
export interface HotelType {
  id: number;
  pictuer_url: string;
  smart_location: string;
  name: string;
  price: number;
}

function LocationList() {
  const { data, isLoading } = useFetch<HotelType>(
    "http://localhost:3000/api/hotels",
    ""
  );

  if (isLoading) return <Loader />;
  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div key={item.id} className="locationItem">
              <img src={item.pictuer_url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;<span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;

import { HomeDataType } from "../../routes/Hoom";
import Loader from "../Loader";

interface Props {
  isLoading: boolean;
  data: HomeDataType|null;
}
function LocationList({ isLoading, data }: Props) {
  if (isLoading) return <Loader />;

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data ? data.hotels.map((item) => {
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
        }):<p>خطایی وجود دارد </p>}
      </div>
    </div>
  );
}

export default LocationList;

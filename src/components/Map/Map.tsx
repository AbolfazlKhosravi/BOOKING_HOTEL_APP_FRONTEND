import { useStatesHotels } from "../context/contextHotels";

function Map() {
  const {hotels,isLoading} = useStatesHotels();
  console.log(hotels,isLoading);

  return <div className="mapContainer">map</div>;
}

export default Map;

import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { HotelType } from "../components/context/HotelsProvider";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { useSetStetesHotels, useStatesHotels } from "../components/context/useContexts";

function SingleHotel() {
  const { id } = useParams<string>();
  const {currentHotels}=useStatesHotels()
  const {setCurrentHotels}=useSetStetesHotels()
  const { isLoading, data } = useFetch<HotelType>(
    `http://localhost:3000/api/hotels/${id}`
  );
  useEffect(()=>{
    if(id && currentHotels!==Number(id)){
      setCurrentHotels(Number(id))
    }
  },[id,currentHotels,setCurrentHotels])
  
  if (isLoading) return <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{data?.name}</h2>
        <div>
          &nbsp;{data?.price} &nbsp; night &bull; {data?.smart_location}
        </div>
        <img src={data?.pictuer_url} alt={data?.name} />
      </div>
    </div>
  );
}

export default SingleHotel;

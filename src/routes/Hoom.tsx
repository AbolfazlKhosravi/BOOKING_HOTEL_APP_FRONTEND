import { HotelType } from "../components/context/HotelsProvider";
import LocationList from "../components/LocationList/LocationList";
import useFetch from "../hooks/useFetch";

export type HomeDataType = {
  hotels: HotelType[];
};
export default function Hoom() {
  const { data, isLoading } = useFetch<HomeDataType>(
    "http://localhost:3000/api",
    ""
  );

  return (
    <div>
      <LocationList data={data} isLoading={isLoading} />
    </div>
  );
}

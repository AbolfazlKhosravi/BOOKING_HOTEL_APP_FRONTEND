import LocationList from "../components/LocationList/LocationList";
import useFetch from "../hooks/useFetch";
import { HotelType } from "./Hotels";

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

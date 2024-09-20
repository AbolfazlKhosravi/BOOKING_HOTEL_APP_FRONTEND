import { useSearchParams } from "react-router-dom";

type ResultuseUrlLocation=[number,number]
function useUrlLocation(): ResultuseUrlLocation {
  const [searchParams] = useSearchParams();

  const  lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  
  return [Number(lat), Number(lon)]
}

export default useUrlLocation;

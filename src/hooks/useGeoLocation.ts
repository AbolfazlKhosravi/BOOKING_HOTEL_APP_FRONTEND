import { useState } from "react";
import { MapCenterType } from "../components/Map/Map";
type ResultUseGeoLocationTYpe = {
  isLoading: boolean;
  position: MapCenterType | undefined;
  err: string;
  getGeoLocation: () => void;
};
function useGeoLocation(): ResultUseGeoLocationTYpe {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [position, setPosition] = useState<MapCenterType | undefined>(
    undefined
  );
  const [err, setErr] = useState<string>("");

  function getGeoLocation():void {
    setIsloading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setIsloading(false);
      },
      (err) => {
        setIsloading(false);
        setErr(err.message);
      }
    );
  }

  return { isLoading, position, err, getGeoLocation };
}

export default useGeoLocation;

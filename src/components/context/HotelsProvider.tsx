import { createContext, useState } from "react";

export interface HotelType {
  id: number;
  pictuer_url: string;
  smart_location: string;
  name: string;
  price: number;
  summary: string;
  description: string;
  street: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}
type PropsType = {
  children: React.ReactNode;
};
type States ={
  hotels: HotelType[],
  currentHotel:HotelType|null,
}
export type StatesHotelsProviderType = States;
export interface setStateProviderType {
  setHotels:React.Dispatch<React.SetStateAction<HotelType[]>>;
  setCurrentHotel:React.Dispatch<React.SetStateAction<HotelType|null>>
 }
export const HotelsContext = createContext<StatesHotelsProviderType>({
  hotels:[],
  currentHotel:null
});

export const SetStatesHotelsContext = createContext< setStateProviderType | undefined>(
  undefined
);

function HotelsProvider({ children }: PropsType) {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [currentHotel,setCurrentHotel]=useState<HotelType|null>(null)
  
  return (
    <HotelsContext.Provider value={{
      hotels,
      currentHotel
    }}>
      <SetStatesHotelsContext.Provider value={{
        setHotels,
        setCurrentHotel
      }}>
        {children}
      </SetStatesHotelsContext.Provider>
    </HotelsContext.Provider>
  );
}


export default HotelsProvider;

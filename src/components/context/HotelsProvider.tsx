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
  isLoading: boolean
}
export type StatesHotelsProviderType = States;
export interface setStateProviderType {
  setHotels:React.Dispatch<React.SetStateAction<HotelType[]>>;
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>;
 }
export const HotelsContext = createContext<StatesHotelsProviderType>({
  hotels:[],
  isLoading:true
});

export const SetStatesHotelsContext = createContext< setStateProviderType | undefined>(
  undefined
);

function HotelsProvider({ children }: PropsType) {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
   
  return (
    <HotelsContext.Provider value={{
      hotels,
      isLoading
    }}>
      <SetStatesHotelsContext.Provider value={{
        setHotels,
        setIsLoading
      }}>
        {children}
      </SetStatesHotelsContext.Provider>
    </HotelsContext.Provider>
  );
}


export default HotelsProvider;

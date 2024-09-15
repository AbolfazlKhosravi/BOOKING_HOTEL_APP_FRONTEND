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
  isLoading: boolean,
  currentHotels:number,
}
export type StatesHotelsProviderType = States;
export interface setStateProviderType {
  setHotels:React.Dispatch<React.SetStateAction<HotelType[]>>;
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentHotels:React.Dispatch<React.SetStateAction<number>>
 }
export const HotelsContext = createContext<StatesHotelsProviderType>({
  hotels:[],
  isLoading:true,
  currentHotels:-1
});

export const SetStatesHotelsContext = createContext< setStateProviderType | undefined>(
  undefined
);

function HotelsProvider({ children }: PropsType) {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentHotels,setCurrentHotels]=useState<number>(-1)
  
  return (
    <HotelsContext.Provider value={{
      hotels,
      isLoading,
      currentHotels
    }}>
      <SetStatesHotelsContext.Provider value={{
        setHotels,
        setIsLoading,
        setCurrentHotels
      }}>
        {children}
      </SetStatesHotelsContext.Provider>
    </HotelsContext.Provider>
  );
}


export default HotelsProvider;

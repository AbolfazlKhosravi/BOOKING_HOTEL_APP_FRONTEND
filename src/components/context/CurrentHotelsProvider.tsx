import { createContext, useState } from "react"



export interface StateCurentHotelsType {
    currentHotels:number,
    setCurrentHotels:React.Dispatch<React.SetStateAction<number>>
}
export const StateCurrentHotelsContext=createContext<StateCurentHotelsType|undefined>(undefined)

type PropsType = {
    children:React.ReactNode
}
function CurrentHotelsProvider({children}:PropsType) {
    const [currentHotels,setCurrentHotels]=useState<number>(-1)
    
  return (
    <StateCurrentHotelsContext.Provider value={{currentHotels,setCurrentHotels}}>
        {children}
    </StateCurrentHotelsContext.Provider>
  )
}

export default CurrentHotelsProvider
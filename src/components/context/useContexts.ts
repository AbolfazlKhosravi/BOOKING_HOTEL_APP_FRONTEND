import { useContext } from "react";
import {
  HotelsContext,
  setStateProviderType,
  SetStatesHotelsContext,
  StatesHotelsProviderType,
} from "./HotelsProvider";

export const useStatesHotels = (): StatesHotelsProviderType =>
  useContext(HotelsContext);
export const useSetStetesHotels = (): setStateProviderType => {
  const context = useContext(SetStatesHotelsContext);
  if (!context) {
    throw new Error("useSetHotels must be used within a HotelsProvider");
  }
  return context;
};



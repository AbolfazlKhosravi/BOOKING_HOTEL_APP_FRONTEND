import { useContext } from "react";
import {
  HotelsContext,
  setStateProviderType,
  SetStatesHotelsContext,
  StatesHotelsProviderType,
} from "./HotelsProvider";
import {
  StateCurentHotelsType,
  StateCurrentHotelsContext,
} from "./CurrentHotelsProvider.tsx";
export const useStatesHotels = (): StatesHotelsProviderType =>
  useContext(HotelsContext);
export const useSetStetesHotels = (): setStateProviderType => {
  const context = useContext(SetStatesHotelsContext);
  if (!context) {
    throw new Error("useSetHotels must be used within a HotelsProvider");
  }
  return context;
};

export const useStateCurrentHotels = (): StateCurentHotelsType => {
  const context = useContext(
    StateCurrentHotelsContext
  );
  if (!context) {
    throw new Error(
      "useStateCurrentHotels must be used within a CurrentHotelsProvider"
    );
  }
  return context;
};

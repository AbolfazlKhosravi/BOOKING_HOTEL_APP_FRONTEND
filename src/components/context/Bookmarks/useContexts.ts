import { useContext } from "react";
import {
  BookmarksContext,
  SetStatesBookmarksContext,
  StatesBookmarksProviderType,
  setStatesBookmarksProviderType,
} from "./BookmarksProvider";

export const useStatesBookmarks = (): StatesBookmarksProviderType =>
  useContext(BookmarksContext);
export const useSetStetesBookmarks = (): setStatesBookmarksProviderType => {
  const context = useContext(SetStatesBookmarksContext);
  if (!context) {
    throw new Error(
      "useSetStetesBookmarks must be used within a BookmarksProvider"
    );
  }
  return context;
};

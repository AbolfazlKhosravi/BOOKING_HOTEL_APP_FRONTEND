import { useContext } from "react";
import {
  BookmarksContext,
  SetStatesBookmarksContext,
  StateBookmarksType,
  HandlerBookmarksType,
} from "./BookmarksProvider";

export const useStatesBookmarks = (): StateBookmarksType =>
  useContext(BookmarksContext);
export const useSetStetesBookmarks = (): HandlerBookmarksType =>
  useContext(SetStatesBookmarksContext);

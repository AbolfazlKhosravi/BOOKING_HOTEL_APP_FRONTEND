import { createContext, useState } from "react";

export interface BookmarkType {
    id: number;
    city_name: string;
    country: string;
    country_code: string;
    latitude: number;
    longitude: number;
    host_location: string;
}
type PropsType = {
  children: React.ReactNode;
};
type States ={
  bookmarks: BookmarkType[],
  currentBookmark:BookmarkType|null,
}
export type StatesBookmarksProviderType = States;
export interface setStatesBookmarksProviderType {
  setBookmarks:React.Dispatch<React.SetStateAction<BookmarkType[]>>;
  setCurrentBookmark:React.Dispatch<React.SetStateAction<BookmarkType|null>>
 }
export const BookmarksContext = createContext<StatesBookmarksProviderType>({
    bookmarks:[],
    currentBookmark:null
});

export const SetStatesBookmarksContext = createContext< setStatesBookmarksProviderType | undefined>(
  undefined
);

function BookmarksProvider({ children }: PropsType) {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [currentBookmark,setCurrentBookmark]=useState<BookmarkType|null>(null)
  
  return (
    <BookmarksContext.Provider value={{
        bookmarks,
        currentBookmark
    }}>
      <SetStatesBookmarksContext.Provider value={{
        setBookmarks,
        setCurrentBookmark
      }}>
        {children}
      </SetStatesBookmarksContext.Provider>
    </BookmarksContext.Provider>
  );
}


export default BookmarksProvider;

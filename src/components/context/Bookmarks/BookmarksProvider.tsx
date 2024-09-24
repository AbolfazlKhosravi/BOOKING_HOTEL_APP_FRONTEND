import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { BookmarkFrontType } from "../../AddNewBookmark/AddNewBookmark";

export interface BookmarkType {
  id: number;
  city_name: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  host_location: string;
}

export interface StateBookmarksType {
  bookmarks: BookmarkType[];
  currentBookmark: BookmarkType | null;
  loadingGetBookmarks: boolean;
  loadingGetBookmark: boolean;
  loadingAddBookmark: boolean;
  loadingDeleteBookmark: boolean;
  errGetBookmarks: string | null;
  errGetBookmark: string | null;
  errDeleteBookmark: string | null;
  errAddBookmark: string | null;
}
export interface HandlerBookmarksType {
  getBookmark: (id: number) => Promise<void>;
  addBookmark: (value: BookmarkFrontType) => Promise<void>;
  deleteBookmark: (id: number) => Promise<void>;
}

type BookmarksActionType =
  | { type: "GET_BOOKMARKS/SUCCESS"; payload: BookmarkType[] }
  | { type: "GET_BOOKMARKS/PENDING" }
  | { type: "GET_BOOKMARKS/REJECTED"; payload: string }
  | { type: "GET_BOOKMARK/SUCCESS"; payload: BookmarkType }
  | { type: "GET_BOOKMARK/PENDING" }
  | { type: "GET_BOOKMARK/REJECTED"; payload: string }
  | { type: "ADD_BOOKMARK/SUCCESS"; payload: BookmarkType }
  | { type: "ADD_BOOKMARK/PENDING" }
  | { type: "ADD_BOOKMARK/REJECTED"; payload: string }
  | { type: "DELETE_BOOKMARK/SUCCESS"; payload: BookmarkType[] }
  | { type: "DELETE_BOOKMARK/PENDING" }
  | { type: "DELETE_BOOKMARK/REJECTED"; payload: string };

const initialState: StateBookmarksType = {
  bookmarks: [],
  currentBookmark: null,
  loadingGetBookmarks: false,
  loadingGetBookmark: false,
  loadingAddBookmark: false,
  loadingDeleteBookmark: false,
  errGetBookmarks: null,
  errGetBookmark: null,
  errDeleteBookmark: null,
  errAddBookmark: null,
};

const bookmarksReducer = (
  state: StateBookmarksType,
  action: BookmarksActionType
): StateBookmarksType => {
  switch (action.type) {
    case "GET_BOOKMARKS/PENDING":
      return {
        ...state,
        loadingGetBookmarks: true,
      };
    case "GET_BOOKMARKS/SUCCESS":
      return {
        ...state,
        loadingGetBookmarks: false,
        bookmarks: action.payload,
      };
    case "GET_BOOKMARKS/REJECTED":
      return {
        ...state,
        loadingGetBookmarks: false,
        errGetBookmarks: action.payload,
      };
    case "GET_BOOKMARK/PENDING":
      return {
        ...state,
        loadingGetBookmark: true,
      };
    case "GET_BOOKMARK/SUCCESS":
      return {
        ...state,
        loadingGetBookmark: false,
        currentBookmark: action.payload,
      };
    case "GET_BOOKMARK/REJECTED":
      return {
        ...state,
        loadingGetBookmark: false,
        errGetBookmark: action.payload,
        currentBookmark: null,
      };
    case "ADD_BOOKMARK/PENDING":
      return {
        ...state,
        loadingAddBookmark: true,
      };
    case "ADD_BOOKMARK/SUCCESS":
      return {
        ...state,
        loadingAddBookmark: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "ADD_BOOKMARK/REJECTED":
      return {
        ...state,
        loadingAddBookmark: false,
        errAddBookmark: action.payload,
        currentBookmark: null,
      };
    case "DELETE_BOOKMARK/PENDING":
      return {
        ...state,
        loadingDeleteBookmark: true,
      };
    case "DELETE_BOOKMARK/SUCCESS":
      return {
        ...state,
        loadingDeleteBookmark: false,
        bookmarks: action.payload,
      };
    case "DELETE_BOOKMARK/REJECTED":
      return {
        ...state,
        loadingDeleteBookmark: false,
        errDeleteBookmark: action.payload,
      };

    default:
      throw new Error("unknown action type: ");
  }
};

export const BookmarksContext = createContext<StateBookmarksType>(initialState);

export const SetStatesBookmarksContext = createContext<HandlerBookmarksType>({
  getBookmark: async () => {
    return;
  },

  addBookmark: async () => {
    return;
  },
  deleteBookmark: async () => {
    return;
  },
});

interface PropsType {
  children: React.ReactNode;
}
const BASE_URL: string = "http://localhost:3000/api";
function BookmarksProvider({ children }: PropsType) {
  const location = useLocation();
  const navigate = useNavigate();
  const [
    {
      bookmarks,
      currentBookmark,
      errAddBookmark,
      errDeleteBookmark,
      errGetBookmark,
      errGetBookmarks,
      loadingAddBookmark,
      loadingDeleteBookmark,
      loadingGetBookmark,
      loadingGetBookmarks,
    },
    dispatch,
  ] = useReducer(bookmarksReducer, initialState);

  useEffect(() => {
    if (location.pathname !== "/bookmarks") return;
    const fetchData = async () => {
      dispatch({ type: "GET_BOOKMARKS/PENDING" });
      try {
        const { data } = await axios.get<BookmarkType[]>(
          `${BASE_URL}/bookmarks`
        );
        dispatch({ type: "GET_BOOKMARKS/SUCCESS", payload: data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch({
            type: "GET_BOOKMARKS/REJECTED",
            payload: error.response?.data,
          });
          toast.error(error?.response?.data || "An error occurred.");
        }
      }
    };
    fetchData();
  }, [location.pathname]);

  const getBookmark = async (id: number): Promise<void> => {
    if (id === currentBookmark?.id) return;
    dispatch({ type: "GET_BOOKMARK/PENDING" });
    try {
      const { data } = await axios.get<BookmarkType>(
        `${BASE_URL}/bookmarks/${id}`
      );
      console.log(data);
      
      dispatch({ type: "GET_BOOKMARK/SUCCESS", payload: data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type: "GET_BOOKMARK/REJECTED",
          payload: error.response?.data,
        });
        toast.error(error?.response?.data || "An error occurred.");
      }
    }
  };
  const addBookmark = async (value: BookmarkFrontType): Promise<void> => {
    dispatch({ type: "ADD_BOOKMARK/PENDING" });
    try {
      const { data } = await axios.post<{
        message: string;
        bookmark: BookmarkType;
      }>("http://localhost:3000/api/bookmarks/addbookmark", value);
      toast.success(data.message);
      dispatch({ type: "ADD_BOOKMARK/SUCCESS", payload: data.bookmark });
      navigate("/bookmarks");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type: "ADD_BOOKMARK/REJECTED",
          payload: error.response?.data.message,
        });
        toast.error(error.response?.data.message);
      }
    }
  };
  const deleteBookmark = async (id: number): Promise<void> => {
    dispatch({ type: "DELETE_BOOKMARK/PENDING" });
    try {
      const { data } = await axios.delete<{
        message: string;
        bookmarks: BookmarkType[];
      }>(`http://localhost:3000/api/bookmarks/${id}`);
      dispatch({ type: "DELETE_BOOKMARK/SUCCESS", payload: data.bookmarks });
      toast.success(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type: "DELETE_BOOKMARK/REJECTED",
          payload: error.response?.data.message,
        });
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        currentBookmark,
        errAddBookmark,
        errDeleteBookmark,
        errGetBookmark,
        errGetBookmarks,
        loadingAddBookmark,
        loadingDeleteBookmark,
        loadingGetBookmark,
        loadingGetBookmarks,
      }}
    >
      <SetStatesBookmarksContext.Provider
        value={{
          addBookmark,
          deleteBookmark,
          getBookmark,
        }}
      >
        {children}
      </SetStatesBookmarksContext.Provider>
    </BookmarksContext.Provider>
  );
}

export default BookmarksProvider;

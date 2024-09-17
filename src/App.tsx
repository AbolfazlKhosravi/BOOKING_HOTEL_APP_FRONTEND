import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Hoom from "./routes/Hoom";
import AppLayout from "./components/Layout/AppLayout";
import HotelsLayout from "./components/Layout/HotelsLayout";
import Hotels from "./routes/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./routes/SingleHotel";
import BookMarkLayout from "./components/Layout/BookMarkLayout";
import BookmarkList from "./routes/BookmarkList";
import BookmarksProvider from "./components/context/Bookmarks/BookmarksProvider";
function App() {
  return (
    <BookmarksProvider>
      <HotelsProvider>
        <div>
          <Toaster />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Hoom />} />
              <Route path="hotels" element={<HotelsLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
              <Route path="bookmarks" element={<BookMarkLayout />}>
                <Route index element={<BookmarkList />} />
                <Route path="add" element={<div>add new bookmark</div>} />
                <Route path=":id" element={<div>single bookmark</div>} />
              </Route>
            </Route>
          </Routes>
        </div>
      </HotelsProvider>
    </BookmarksProvider>
  );
}

export default App;

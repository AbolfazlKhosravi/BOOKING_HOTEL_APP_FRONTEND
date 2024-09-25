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
import SingleBookmark from "./routes/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import AuthProvier from "./components/context/Auth/AuthProvider";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvier>
      <BookmarksProvider>
        <HotelsProvider>
          <div>
            <Toaster />
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/rejester" element={<Signup />} />
                <Route index element={<Hoom />} />
                <Route path="hotels" element={<HotelsLayout />}>
                  <Route index element={<Hotels />} />
                  <Route path=":id" element={<SingleHotel />} />
                </Route>
                <Route
                  path="bookmarks"
                  element={
                    <ProtectedRoute>
                      {" "}
                      <BookMarkLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<BookmarkList />} />
                  <Route path="add" element={<AddNewBookmark />} />
                  <Route path=":id" element={<SingleBookmark />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </HotelsProvider>
      </BookmarksProvider>
    </AuthProvier>
  );
}

export default App;

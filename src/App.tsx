import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Hoom from "./routes/Hoom";
import AppLayout from "./components/Layout/AppLayout";
import HotelsLayout from "./components/Layout/HotelsLayout";
import Hotels from "./routes/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./routes/SingleHotel";
function App() {
  return (
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
            </Route>
          </Routes>
        </div>
    </HotelsProvider>
  );
}

export default App;

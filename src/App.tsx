import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Hoom from "./routes/Hoom";
import AppLayout from "./components/Layout/AppLayout";
import HotelsLayout from "./components/Layout/HotelsLayout";
import Hotels from "./routes/Hotels";
function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<Hoom />} />
          <Route path="hotels" element={<HotelsLayout />} >
            <Route index element={<Hotels/>} /> 
            <Route path=":id" element={<div>this is singe route for hotels </div>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

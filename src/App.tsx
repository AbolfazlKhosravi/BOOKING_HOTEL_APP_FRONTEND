import "./App.css";
import Header from "./components/Header/Header";
import  { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
      <Header />
      <p>hey it me!</p>
      <Toaster/>
    </div>
  );
}

export default App;

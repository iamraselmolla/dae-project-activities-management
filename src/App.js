import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import AddImageModal from "./components/shared/AddImageModal";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

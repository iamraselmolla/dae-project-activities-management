import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "../src/css/custom_css.css";
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

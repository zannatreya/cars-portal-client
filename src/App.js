import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/Routes";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="max-w-[1440px] mx-auto">
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </div>
  );
}

export default App;

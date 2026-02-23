import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { useAppSelector } from "./app/hooks";
import { useEffect } from "react";

function App() {

   const theme = useAppSelector((state) => state.ui.theme);

   useEffect(() =>{
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
   }, [theme]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <AppRoutes />
    </>
  );
}

export default App;

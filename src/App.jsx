import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import PWAUpdateToast from "./components/PWAUpdateToast";

function App() {

   const theme = useAppSelector((state) => state.ui.theme);

   useEffect(() =>{
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
   }, [theme]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            width: "260px",
            minHeight: "44px",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "13px",
          },
        }}
      />
      <AppRoutes />
      <PWAUpdateToast />
    </>
  );
}

export default App;

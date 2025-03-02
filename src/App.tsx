import AppRouterProvider from "./providers/AppRouterProvider";
import ThemeProvider from "./providers/ThemeProviders";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./i18n"

const App = () => {
  return (
    <ThemeProvider>
      <AppRouterProvider />
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;

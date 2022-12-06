import HandleRoutes from "./routes/router";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <HandleRoutes />
    </>
  );
};

export default App;

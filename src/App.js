import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { useSelector } from "react-redux";
import LoadingGlobal from "./components/moleculars/loading/loading-global";

function App() {
  const storeData = useSelector((store) => store?.global);
  const { isLoading } = storeData;

  return (
    <BrowserRouter>
      {isLoading && <LoadingGlobal />}
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

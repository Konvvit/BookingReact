import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { routes } from "./routes";

function App() {
  const location = useLocation();
  const element = useRoutes(routes);

  return (
    <AnimatePresence mode="wait">
      {element && (
        <div key={location.pathname}>
          {element}
        </div>
      )}
    </AnimatePresence>
  );
}


export default App;






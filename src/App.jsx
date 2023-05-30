import Navbar from "./components/Navbar";
import RoutesTree from "./components/RoutesTree";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { PetProvider } from "./context/PetContext";

const App = () => {
  const { loading } = useContext(AuthContext);

  return (
    <PetProvider>
      {!loading && (
        <>
          <Navbar />
          <RoutesTree />
        </>
      )}
    </PetProvider>
  );
};

export default App;

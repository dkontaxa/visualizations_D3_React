import React from "react";
import "./App.css";
import AppRoutes from "./Routes";
import Navbar from "./Components/Navbar";

const App = () => {
  const [dataCISATotal, setDataCISATotal] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;

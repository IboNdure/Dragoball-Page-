// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlanetList from "./PlanetList";
import HomePage from "./HomePage"; // Deine Home-Seite
import CharacterList from "./Characterlist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planets" element={<PlanetList />} />
        <Route path="/Characterlist" element={<CharacterList />} />
      </Routes>
    </Router>
  );
}

export default App;

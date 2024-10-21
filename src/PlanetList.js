import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://dragonball-api.com/api";
const planetsUrl = `${API_BASE_URL}/planets?limit=100`;

export default function PlanetList() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    // Abrufen der Planeten-Daten
    fetch(planetsUrl)
      .then((res) => res.json())
      .then((data) => {
        setPlanets(data.items);
      });
  }, []);

  return (
    <div>
      <h1>Planeten-Liste</h1>
      <Link to="/">
        <button>Back to Homepage</button>
      </Link>
      {planets.length > 0 ? (
        planets.map((planet) => (
          <div key={planet.id}>
            <h3>{planet.name}</h3>
            <p>{planet.description}</p>
            <p>Zerstört: {planet.isDestroyed ? "Ja" : "Nein"}</p>
            {planet.image && (
              <img
                src={planet.image}
                alt={planet.name}
                style={{ width: "150px", height: "150px" }}
              />
            )}
            <hr />
          </div>
        ))
      ) : (
        <p>Keine Planeten gefunden.</p>
      )}
    </div>
  );
}

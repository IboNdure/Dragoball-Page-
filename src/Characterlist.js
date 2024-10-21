import { useEffect, useState } from "react";
import { API_BASE_URL } from "./constants";
import { Link } from "react-router-dom";
const url = `${API_BASE_URL}/characters?limit=100`; // Begrenze auf 100 Charaktere (sofern unterstützt)

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [showTransformations, setShowTransformations] = useState(false);

  useEffect(() => {
    // Holen der Charaktere
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.items);
        if (data.items.length > 0) {
          fetchCharacterDetails(data.items[0].id);
        }
      });
  }, []);

  // Funktion zum Abrufen der Charakterdetails
  const fetchCharacterDetails = (id) => {
    fetch(`${API_BASE_URL}/characters/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentCharacter(data);
        setShowTransformations(false);
      });
  };

  // Navigation zur nächsten oder vorherigen Seite
  const handleNext = () => {
    if (currentIndex < characters.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      fetchCharacterDetails(characters[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      fetchCharacterDetails(characters[currentIndex - 1].id);
    }
  };

  if (!currentCharacter) {
    return <p>Lädt...</p>;
  }

  return (
    <div>
      <h3>{currentCharacter.name}</h3>
      <ul>
        <li>KI: {currentCharacter.ki.toUpperCase()}</li>
        <li>MAX KI: {currentCharacter.maxKi}</li>
        <li>{currentCharacter.race.toUpperCase()}</li>
        <li>GENDER: {currentCharacter.gender.toUpperCase()}</li>
        <li>AFFILIATION: {currentCharacter.affiliation}</li>
        <li>KILLED @: {currentCharacter.deletedAt}</li>
        <li>
          TRANSFORMATIONS:{" "}
          <button onClick={() => setShowTransformations((prev) => !prev)}>
            {showTransformations ? "Ausblenden" : "Anzeigen"}
          </button>
        </li>
        {showTransformations && (
          <ul>
            {currentCharacter.transformations &&
            currentCharacter.transformations.length > 0 ? (
              currentCharacter.transformations.map((transformation) => (
                <li key={transformation.id}>
                  <strong>{transformation.name}</strong>
                  <br />
                  KI: {transformation.ki}
                  <br />
                  <img
                    src={transformation.image}
                    alt={transformation.name}
                    style={{ width: "100px", height: "auto" }} // Setze eine fixe Breite für die Bilder
                  />
                </li>
              ))
            ) : (
              <li>Keine Transformationen verfügbar</li>
            )}
          </ul>
        )}
      </ul>
      <img src={currentCharacter.image} alt={currentCharacter.name} />
      <p>{currentCharacter.description}</p>

      {/* Navigation Buttons */}
      <div>
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Vorheriger Charakter
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === characters.length - 1}
        >
          Nächster Charakter
        </button>
        <Link to="/">
          <button>Back to Homepage</button>
        </Link>
      </div>
    </div>
  );
}

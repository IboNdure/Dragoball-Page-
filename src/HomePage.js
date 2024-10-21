import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome To My Dragonball Page</h1>
      <div className="button-container">
        <Link to="/planets">
          <button>Go to Planets</button>
        </Link>
        <Link to="/Characterlist">
          <button>Go to Characters</button>
        </Link>
      </div>
      <img
        src="https://i.ytimg.com/vi/_cgRbEv1080/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAesSpnBM4q3fTiQp0Ydyzdjmcm2Q"
        alt="Dragenballbanner"
      ></img>
    </div>
  );
}

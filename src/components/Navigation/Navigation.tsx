import logo from "../../assets/logo.png";
import pokeball from "../../assets/pokeball2.png";
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <nav className="nav wrapper">
      <div className="nav__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="nav__block">
        <h1 className="nav__block-title">Who are Pokémon?</h1>
        <p className="nav__block-description">
          The good guide to explore the world of Pokemon
        </p>
        <div className="nav__block-image">
          <img src={pokeball} alt="pokeball" />
        </div>
      </div>
    </nav>
  );
};

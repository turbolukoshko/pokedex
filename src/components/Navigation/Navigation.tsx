import logo from "../../assets/logo.png";
import pokeball from "../../assets/pokeball2.png";
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <nav className="nav wrapper">
      <h1 className="nav__logo">Pokedex</h1>
      <div className="nav__search-panel">
        <input
          type="text"
          placeholder="Type name"
          className="nav__search-panel-input"
        />
        <button className="nav__search-panel-btn">Find</button>
      </div>
    </nav>
  );
};

import { useState, ChangeEvent, FC } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getPokemon } from "../../api";
import { routes } from "../../routes/index";
import "./Navigation.scss";

interface INavigation {
  theme: string | null;
  setTheme: (value: string) => void;
}

export const Navigation: FC<INavigation> = ({ theme, setTheme }) => {
  const [searchParam, setSearchParam] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const switchActiveTheme = () => {
    if (theme === null || theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  // TODO: add validation

  const search = async () => {
    try {
      if (searchParam === "") {
        setError("The field cannot be empty");
        return;
      }
      const pokemon = await axios.get(getPokemon(searchParam));
      navigate(`${routes.pokemon}/${pokemon.data.id}`);
      setError("");

      // throw new Error("Perhaps the id or name was entered incorrectly");
    } catch (e) {
      console.log(e);
      navigate(routes.pageNotFound);
    }
    setSearchParam("");
  };

  return (
    <nav className="nav">
      <div className="nav__logo">
        <img
          src={require("../../assets/pokeball2.png")}
          alt="pokeball"
          className="nav__logo-img"
        />
        <h1 onClick={() => navigate(routes.home)} className="nav__logo-name">
          Pokedex
        </h1>
      </div>
      <div className="nav__search-panel">
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchParam(e.target.value)
          }
          value={searchParam}
          placeholder="Type name"
          className="nav__search-panel-input"
        />
        <button onClick={() => search()} className="nav__search-panel-btn">
          Find
        </button>
        <p className="nav__search-panel-error">{error}</p>
      </div>
      <button onClick={() => switchActiveTheme()}>Switch theme</button>
    </nav>
  );
};

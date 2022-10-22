import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getPokemon } from "../../api";
import { routes } from "../../routes/index";
import "./Navigation.scss";

export const Navigation = () => {
  const [searchParam, setSearchParam] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

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
    </nav>
  );
};

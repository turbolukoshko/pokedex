import React from "react";
import "./App.css";
import "./scss/theme/index.scss";
import { Navigation } from "./components/Navigation";
import { PokemonList } from "./components/PokemonList";

function App() {
  return (
    <div>
      <Navigation />
      <PokemonList />
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import "./scss/theme/index.scss";
import { Navigation } from "./components/Navigation";
import { PokemonList } from "./components/PokemonList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route index element={<PokemonList />} />
      </Routes>
    </div>
  );
}

export default App;

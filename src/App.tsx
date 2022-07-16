import React from "react";
import "./App.css";
import "./scss/theme/index.scss";
import { Navigation } from "./components/Navigation";
import { PokemonList } from "./components/PokemonList";
import { Route, Routes } from "react-router-dom";
import { PokemonCard } from "./components/PokemonCard";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route index element={<PokemonList />} />
        <Route path="/:id" element={<PokemonCard />} />
      </Routes>
    </div>
  );
}

export default App;

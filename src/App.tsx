import React from "react";
import "./App.css";
import "./scss/theme/index.scss";
import { Navigation } from "./components/Navigation";
import { PokemonList } from "./components/PokemonList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PokemonCard } from "./components/PokemonCard";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route index element={<PokemonList />} />
        <Route path="/:id" element={<PokemonCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import "./App.css";
import "./scss/theme/index.scss";
import { PokemonList } from "./components/PokemonList";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PokemonCard } from "./components/PokemonCard";
import { routes } from "./routes";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { Navigation } from "./components/Navigation";

function App() {
  const { pokemon, pokemonCard, pageNotFound } = routes;
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<Navigate to={pokemon} replace />} />
          <Route path={pokemon} element={<PokemonList />} />
          <Route path={pokemonCard} element={<PokemonCard />} />
          <Route path={pageNotFound} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { useState } from "react";
import "./App.scss";
import "./scss/theme/index.scss";
import { PokemonList } from "./components/PokemonList";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PokemonCard } from "./components/PokemonCard";
import { routes } from "./routes";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { Navigation } from "./components/Navigation";
import { FavouritePokemon } from "./components/FavouritePokemon/FavouritePokemon";

function App() {
  const { pokemon, pokemonCard, pageNotFound, favouritePokemon } = routes;
  const [theme, useTheme] = useState<string>("light");

  return (
    <main data-theme={theme} className="main">
      <BrowserRouter>
        <Navigation theme={theme} swithTheme={useTheme} />
        <Routes>
          <Route index element={<Navigate to={pokemon} replace />} />
          <Route path={pokemon} element={<PokemonList />} />
          <Route path={pokemonCard} element={<PokemonCard />} />
          <Route path={favouritePokemon} element={<FavouritePokemon />} />
          <Route path={pageNotFound} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;

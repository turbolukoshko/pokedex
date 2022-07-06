// TODO: add types for the data
export interface PokemonData {
  data: any[];
  loading: boolean;
  error: string | null;
}

export interface PokemonPagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PokemonState extends PokemonData, PokemonPagination {}

export interface PokemonItemData {
  name: string;
  url: string;
}

export interface PokemonSelectorState {
  pokemon: PokemonState;
}

import { useState, useEffect } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}
interface PokemonSelectedProps {
  onSelect: (selectedPokemon: Pokemon[]) => void;
  maxSelected?: number;
}

const PokemonSelect: React.FC<PokemonSelectedProps> = ({
  onSelect = () => {},
  maxSelected = 4,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<(Pokemon | null)[]>(
    new Array(maxSelected).fill(null)
  );

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch((error) => {
        console.error(
          "Ууупс, щось пішло не так, і ми не знайшли покемонів",
          error
        );
      });
  }, []);

  const handleSelect = (index: number, pokemonName: string) => {
    const pokemon = pokemonList.find((p) => p.name === pokemonName);
    if (!pokemon) return;
    const updatedSelection = [...selectedPokemon];
    updatedSelection[index] = pokemon;
    setSelectedPokemon(updatedSelection);
    onSelect(updatedSelection.filter((p) => p !== null) as Pokemon[]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Вибери свою команду покемонів</h2>
      <div className="flex flex-col gap-4">
        {selectedPokemon.map((selected, index) => (
          <select
            key={index}
            className="p-2 border rounded"
            value={selected?.name || ""}
            onChange={(e) => handleSelect(index, e.target.value)}
          >
            <option value="">Виберіть покемона</option>
            {pokemonList
              .filter(
                (p) =>
                  !selectedPokemon.some((sp) => sp?.name === p.name) ||
                  selected?.name === p.name
              )
              .map((pokemon) => (
                <option key={pokemon.name} value={pokemon.name}>
                  {pokemon.name}
                </option>
              ))}
          </select>
        ))}
      </div>
    </div>
  );
};

export default PokemonSelect;

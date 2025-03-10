import { useState, useEffect } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/solid";

export interface Pokemon {
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
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [isFocus, setIsFocus] = useState(false);

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

  const handleSelect = (pokemonName: string) => {
    if (selectedPokemon.length >= maxSelected) return;
    const pokemon = pokemonList.find((p) => p.name === pokemonName);
    if (!pokemon) return;

    setSelectedPokemon((prev) => {
      const updated = [...prev, pokemon];
      onSelect(updated);
      return updated;
    });

    setIsFocus(false);
  };

  const handleRemove = (index: number) => {
    setSelectedPokemon((prev) => {
      const update = prev.filter((_, i) => i !== index);
      onSelect(update);
      return update;
    });
  };
  const filterPokemon = pokemonList.filter((p) =>
    p.name.toLocaleLowerCase().includes(searchPokemon.toLocaleLowerCase())
  );
  return (
    <div className="p-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Покемони <span className="text-gray-400">(макс {maxSelected})</span>
      </label>

      <div className="flex flex-wrap gap-2 border p-2 rounded">
        {selectedPokemon.length < maxSelected && (
          <input
            type="text"
            placeholder="Виберіть покемона..."
            value={searchPokemon}
            onChange={(e) => setSearchPokemon(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setTimeout(() => setIsFocus(false), 200)}
            className="flex-1 p-1 focus:outline-none"
            list="pokemon-options"
          />
        )}
        {selectedPokemon.map((pokemon, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
          >
            {pokemon.name}
            <button
              className="ml-2 text-gray-500 hover:text-red-500"
              onClick={() => handleRemove(index)}
            >
              <XMarkIcon className="h-6 w-6 text-black " />
            </button>
          </div>
        ))}
      </div>

      {isFocus && (
        <ul className="border rounded mt-1 max-h-40 overflow-auto bg-white">
          {(searchPokemon ? filterPokemon : pokemonList).map((pokemon) => (
            <li
              key={pokemon.name}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(pokemon.name)}
            >
              {pokemon.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonSelect;

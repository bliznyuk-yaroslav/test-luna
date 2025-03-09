import { useState } from "react";
import PokemonSelected from "../PokemonSelected/PokemonSelected";
interface Pokemon {
  name: string;
  url: string;
}

interface AddTeamModalProps {
  onClose: () => void;
  onAddTeam: (
    teamName: string,
    trainFirstName: string,
    trainLastName: string,
    selectedPokemon: Pokemon[]
  ) => void;
}
const AddTeamModal: React.FC<AddTeamModalProps> = ({ onClose, onAddTeam }) => {
  const [teamName, setTeamName] = useState<string>("");
  const [trainFirstName, setTrainFirstName] = useState<string>("");
  const [trainLastName, setTrainLastName] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
  const handleSelectPokemon = (selectedPokemon: Pokemon[]) => {
    setSelectedPokemon(selectedPokemon);
  };
  const handleSubmit = () => {
    if (
      teamName &&
      trainFirstName &&
      trainLastName &&
      selectedPokemon.length > 0
    ) {
      onAddTeam(teamName, trainFirstName, trainLastName, selectedPokemon);
      onClose();
    } else {
      alert("Заповніть всі поля та виберіть покемонів");
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Додати нову команду</h2>
        <div className="flex flex-wrap justify-center gap-x-10 ">
          <input
            type="text"
            placeholder="Ім'я команди"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-170 mb-4"
          />
          <input
            type="text"
            placeholder="Ім'я тренера"
            value={trainFirstName}
            onChange={(e) => setTrainFirstName(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-80 mb-4"
          />
          <input
            type="text"
            placeholder="Фамілія тренера"
            value={trainLastName}
            onChange={(e) => setTrainLastName(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-80 mb-4"
          />
        </div>

        <PokemonSelected onSelect={handleSelectPokemon} maxSelected={4} />

        <div className="mt-4 flex justify-between">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Додати команду
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddTeamModal;

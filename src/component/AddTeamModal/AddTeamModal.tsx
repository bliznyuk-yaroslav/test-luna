import { useState } from "react";
import PokemonSelected from "../PokemonSelected/PokemonSelected";
import { XMarkIcon } from "@heroicons/react/24/solid";
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
  size?: "default" | "small";
}
const AddTeamModal: React.FC<AddTeamModalProps> = ({
  onClose,
  onAddTeam,
  size,
}) => {
  const [teamName, setTeamName] = useState<string>("");
  const [trainFirstName, setTrainFirstName] = useState<string>("");
  const [trainLastName, setTrainLastName] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState({
    teamName: "",
    trainFirstName: "",
    trainLastName: "",
  });
  const modalSizeClass = size === "small" ? "w-1/4" : "w-1/3";
  const handleSelectPokemon = (selectedPokemon: Pokemon[]) => {
    setSelectedPokemon(selectedPokemon);
  };

  const validateInput = (
    value: string,
    field: "teamName" | "trainFirstName" | "trainLastName"
  ) => {
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      setError((prev) => ({
        ...prev,
        [field]: "Поле не повинно містити цифри або інші символи ",
      }));
    } else {
      setError((prev) => ({ ...prev, [field]: "" }));
    }
  };
  const handleInputValid = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "teamName" | "trainFirstName" | "trainLastName",
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    setState(value);
    validateInput(value, field);
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
    <div className="fixed inset-0 bg-gray-500  bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white p-6 rounded-lg w-1/3 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Додати нову команду</h2>
        <div className="flex flex-wrap justify-center gap-x-10 ">
          <div className="w-170 mb-4">
            <input
              type="text"
              placeholder="Ім'я команди"
              value={teamName}
              onChange={(e) => handleInputValid(e, "teamName", setTeamName)}
              className="p-2 border border-gray-300 rounded-lg w-170 "
            />
            {error.teamName && (
              <p className="text-red-500 text-sm">{error.teamName}</p>
            )}
          </div>
          <div className="w-170 mb-4">
            <input
              type="text"
              placeholder="Ім'я тренера"
              value={trainFirstName}
              onChange={(e) =>
                handleInputValid(e, "trainFirstName", setTrainFirstName)
              }
              className="p-2 border border-gray-300 rounded-lg w-80 "
            />
            {error.teamName && (
              <p className="text-red-500 text-sm">{error.trainFirstName}</p>
            )}
          </div>
          <div className="w-170 mb-4">
            <input
              type="text"
              placeholder="Фамілія тренера"
              value={trainLastName}
              onChange={(e) =>
                handleInputValid(e, "trainLastName", setTrainLastName)
              }
              className="p-2 border border-gray-300 rounded-lg w-80 "
            />
            {error.teamName && (
              <p className="text-red-500 text-sm">{error.trainLastName}</p>
            )}
          </div>
        </div>

        <PokemonSelected onSelect={handleSelectPokemon} maxSelected={4} />

        <div className="mt-4 flex justify-between">
          <button
            onClick={handleSubmit}
            className={`border border-purple-800 text-purple-800 rounded-md px-3 flex items-center gap-2 
             hover:bg-purple-50  active:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed 
             focus:ring-2 focus:ring-purple-200 transition-colors duration-200 ${modalSizeClass}`}
          >
            Додати команду
          </button>
        </div>
        <XMarkIcon
          className="h-6 w-6 absolute  top-3 right-3"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
export default AddTeamModal;

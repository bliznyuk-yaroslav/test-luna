import { useState, useEffect } from "react";
import PokemonSelected from "../PokemonSelected/PokemonSelected";
import { StarIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import AddTeamModal from "../AddTeamModal/AddTeamModal";

interface Pokemon {
  name: string;
  url: string;
}
interface Team {
  teamName: string;
  trainFirstName: string;
  trainLastName: string;
  selectedPokemon: Pokemon[];
}
const AddTeam: React.FC = () => {
  const [teamList, setTeamList] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedTeams = localStorage.getItem("teams");
    if (savedTeams) {
      setTeamList(JSON.parse(savedTeams));
    }
  }, []);

  const handleAddTeam = (
    teamName: string,
    trainFirstName: string,
    trainLastName: string,
    selectedPokemon: Pokemon[]
  ) => {
    {
      const newTeam: Team = {
        teamName,
        trainFirstName,
        trainLastName,
        selectedPokemon,
      };
      const updateTeam = [...teamList, newTeam];

      setTeamList(updateTeam);
      localStorage.setItem("teams", JSON.stringify(updateTeam));
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(teamList);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Додати команду</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className=" h-8 border border-purple-800 text-purple-800 rounded-md px-3 flex items-center gap-2 
             hover:bg-purple-50  active:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed 
             focus:ring-2 focus:ring-purple-200 transition-colors duration-200"
      >
        <StarIcon className="w-5 h-5 " /> <span>Додати команду</span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      <div className="overflow-hidden rounded-lg border border-gray-700  mt-6">
        <table className="w-full min-w-max bg-wite-900 text-left text-black">
          <thead className="border-b text-gray-700">
            <tr>
              <th className="px-6 py-3">Назва команди</th>
              <th className="px-6 py-3">Тренер</th>
              <th className="px-6 py-3">Покемони</th>
            </tr>
          </thead>
          <tbody>
            {teamList.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  Немає команд. Додайте нову команду!
                </td>
              </tr>
            ) : (
              teamList.map((team, index) => (
                <tr
                  key={index}
                  className={`border-b border-white-700 ${
                    index % 2 === 1 ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="px-6 py-4 font-semibold">{team.teamName}</td>
                  <td className="px-6 py-4">{`${team.trainFirstName} ${team.trainLastName}`}</td>
                  <td className="px-6 py-4">
                    <ul className="flex flex-wrap gap-2">
                      {team.selectedPokemon.map((pokemon, i) => (
                        <li
                          key={i}
                          className=" flex items-center rounded-full px-3 py-1  text-sm font-medium text-green-900 bg-green-100"
                        >
                          {pokemon.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddTeamModal
          onClose={() => setIsModalOpen(false)}
          onAddTeam={handleAddTeam}
        />
      )}
    </div>
  );
};
export default AddTeam;

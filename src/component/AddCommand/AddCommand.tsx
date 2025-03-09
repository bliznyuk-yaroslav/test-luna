import { useState, useEffect } from "react";
import PokemonSelected from "../PokemonSelected/PokemonSelected";
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
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Додати команду
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
            {teamList.map((team, index) => (
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
                        className="py-1 px-3.5 rounded-3xl text-sm font-medium text-green-700 bg-green-100"
                      >
                        {pokemon.name}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
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

// import type { Meta, StoryObj } from "@storybook/react";
// import { useState } from "react";
// import AddTeamModal from "./AddTeamModal";
// import { Pokemon } from "../PokemonSelected/PokemonSelected";

// export default {
//   title: "Components/AddTeamModal",
//   component: AddTeamModal,
//   parameters: {
//     layout: "centered",
//   },
//   argTypes: {
//     onClose: { action: "closed" },
//     onAddTeam: { action: "teamAdded" },
//   },
// } as Meta;

// const Template: StoryObj<typeof AddTeamModal> = (args) => {
//   const [showModal, setShowModal] = useState(true);

//   const handleClose = () => {
//     setShowModal(false);
//     args.onClose();
//   };

//   const handleAddTeam = (
//     teamName: string,
//     trainFirstName: string,
//     trainLastName: string,
//     selectedPokemon: Pokemon[]
//   ) => {
//     args.onAddTeam(teamName, trainFirstName, trainLastName, selectedPokemon);
//   };

//   return (
//     <>
//       {showModal && (
//         <AddTeamModal onClose={handleClose} onAddTeam={handleAddTeam} />
//       )}
//     </>
//   );
// };

// export const Default = {
//   ...Template,
//   args: {
//     onClose: () => {},
//     onAddTeam: () => {},
//   },
// };
import type { Meta, StoryObj } from "@storybook/react";
import { Pokemon } from "../PokemonSelected/PokemonSelected";
import AddTeamModal from "./AddTeamModal";
const meta: Meta<typeof AddTeamModal> = {
    component: AddTeamModal,
    tags:['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AddTeamModal>;

export const Default: Story = {
  args: {
    size: "default",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

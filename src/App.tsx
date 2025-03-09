import RootLayout from "./component/Layout/Layout";
import AddTeam from "./component/AddCommand/AddCommand";

function App() {
  return (
    <RootLayout>
      <div>
        <p>Welcome to Luna Edge technical interview</p>
        <AddTeam />
      </div>
    </RootLayout>
  );
}

export default App;

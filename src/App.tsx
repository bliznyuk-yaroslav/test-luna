import { useState } from "react";
import StatusLabel, { Status } from "./component/StatusLabel/StatusLabel";
import RootLayout from "./component/Layout/Layout";
import "./index.css";

function App() {
  return (
    <RootLayout>
      <div>
        <p>Welcome to Luna Edge technical interview</p>
        <StatusLabel status={Status.Active}>User is active</StatusLabel>
      </div>
    </RootLayout>
  );
}

export default App;

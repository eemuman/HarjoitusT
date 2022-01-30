import React, { useState } from "react";
import "./App.css";
import AddModify from "./Components/AddModify";
import Table from "./Components/Table";
import { user } from "./Components/UserInterface";

function App() {
  const [curUsers, setCurUsers] = useState<Array<user>>([]);

  const addNewUser = (user: user) => {
    setCurUsers([...curUsers, user]);
  };

  return (
    <div className="App">
      <div className="Box">
        <div>
          <h1>HARJOITUSTEHTÄVÄ</h1>
          <hr />
        </div>
        <div>
          <AddModify addNewUser={addNewUser} />
        </div>
        <div>
          <Table curUsers={curUsers} />
        </div>
      </div>
    </div>
  );
}

export default App;

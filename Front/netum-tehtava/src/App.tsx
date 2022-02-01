import React, { useEffect, useState } from "react";
import "./App.css";
import AddModify from "./Components/AddNew";
import { getAll } from "./Components/FetchUtils";
import Table from "./Components/Table";
import { user } from "./Components/UserInterface";

function App() {
  const [curUsers, setCurUsers] = useState<Array<user>>([]);

  useEffect(() => {
    getAll("http://localhost:8000/users").then((res) => setCurUsers(res));
  }, []);

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

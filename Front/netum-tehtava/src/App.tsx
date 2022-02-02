import { useEffect, useState } from "react";
import "./App.css";
import AddModify from "./Components/AddNew";
import { getAll, postNew } from "./Components/FetchUtils";
import Table from "./Components/Table";
import { user } from "./Components/UserInterface";

function App() {
  const [curUsers, setCurUsers] = useState<Array<user>>([]);

  const fetchAll = async () => {
    const data = await getAll("http://localhost:8000/users");
    setCurUsers(data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const addNewUser = async (user: user) => {
    await postNew("http://localhost:8000/users", user);
    await fetchAll();
  };

  return (
    <div className="App">
      <div className="Box">
        <div>
          <h1 style={{ fontSize: "42px" }}>HARJOITUSTEHTÄVÄ</h1>
          <hr />
        </div>
        <div>
          <AddModify addNewUser={addNewUser} />
        </div>
        <div>
          <Table curUsers={curUsers} fetchAll={fetchAll} />
        </div>
      </div>
    </div>
  );
}

export default App;

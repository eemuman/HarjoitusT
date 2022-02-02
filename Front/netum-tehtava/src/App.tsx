import { useEffect, useState } from "react";
import "./App.css";
import AddModify from "./Components/AddNew";
import { getAll, postNew } from "./Components/FetchUtils";
import Table from "./Components/Table";
import { user } from "./Components/UserInterface";

/**
 * Pohja koko sivulle, täällä säilytetään backendistä saadut henkilöt.
 * Tämä myös renderöi koko sivun pohjan ja uuden lisäämiseen tehdyn napin sekä itse tablen jossa data on.
 *
 */
function App() {
  /**
   * Tässä statessa säilytetään kaikki henkilöt.
   */
  const [curUsers, setCurUsers] = useState<Array<user>>([]);

  /**
   * Tällä funktiolla haeataan Fetch-apia hyväksikäyttäen kaikki käyttäjät backendistä.
   */
  const fetchAll = async () => {
    const data = await getAll("/users");
    setCurUsers(data);
  };

  /**
   * Kun sivulle tullaan tai refreshataan, niin ensimmäisenä haetaan useEffectiä käyttäen henkilöt backendistä.
   * Tyhjä array tekee sen, että ne haetaan vain kerran ja se on heti alussa.
   */
  useEffect(() => {
    fetchAll();
  }, []);

  /**
   * Renderöidään itse sivu, addModify on uuden henkilön lisäämiseen ja table on no... Table.
   */
  return (
    <div className="App">
      <div className="Box">
        <div>
          <h1 style={{ fontSize: "42px" }}>HARJOITUSTEHTÄVÄ</h1>
          <hr />
        </div>
        <div>
          <AddModify fetchAll={fetchAll} />
        </div>
        <div>
          <Table curUsers={curUsers} fetchAll={fetchAll} />
        </div>
      </div>
    </div>
  );
}

export default App;

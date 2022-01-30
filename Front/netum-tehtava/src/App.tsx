import React from "react";
import "./App.css";
import AddModify from "./Components/AddModify";

function App() {
  return (
    <div className="App">
      <div className="Box">
        <div>
          <h1>HARJOITUSTEHTÄVÄ</h1>
          <hr />
        </div>
        <div>
          <AddModify />
        </div>
        <div>
          <p>TEST</p>
        </div>
      </div>
    </div>
  );
}

export default App;

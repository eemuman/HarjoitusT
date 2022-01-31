import React, { useState } from "react";

export default function DeleteUser() {
  const [show, setShow] = useState<Boolean>(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return show ? (
    <div className="form">
      <div className="delete">
        <h2>POISTA KÄYTTÄJÄ</h2>
        <p>Oletko varma, että haluat poistaa nämä tiedot?</p>
        <div className="delButtons">
          <button
            className="AddButton"
            onClick={handleClose}
            style={{ backgroundColor: "red" }}
          >
            POISTA
          </button>
          <button className="AddButton" onClick={handleClose}>
            Peru
          </button>
        </div>
      </div>
    </div>
  ) : (
    <button
      className="AddButton"
      id="edDel"
      onClick={handleShow}
      style={{ backgroundColor: "red" }}
    >
      D
    </button>
  );
}

import React, { useState } from "react";
import { user } from "./UserInterface";

export default function AddModify(props: any) {
  const [show, setShow] = useState<Boolean>(false);
  const [newUser, setNewUser] = useState<user>({
    fName: "",
    lName: "",
    age: 0,
  });

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setNewUser({ fName: "", lName: "", age: 0 });
    setShow(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log(newUser);
    props.addNewUser(newUser);
    handleClose();
  };

  return show ? (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>LISÄÄ / MUOKKAA TIETOJA</h2>
        <hr />
        <label>
          Etunimi
          <input
            type="text"
            id="fName"
            name="fName"
            placeholder="Etunimi"
            value={newUser.fName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Sukunimi
          <input
            type="text"
            id="lName"
            name="lName"
            placeholder="Sukunimi"
            value={newUser.lName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Ikä
          <input
            type="number"
            min="0"
            max="100"
            id="age"
            name="age"
            placeholder="Ikä"
            value={newUser.age}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="TALLENNA" />
        <div>
          <input type="button" value="PERU" onClick={handleClose} />
        </div>
      </form>
    </div>
  ) : (
    <button className="AddButton" onClick={handleShow}>
      LISÄÄ UUSI
    </button>
  );
}

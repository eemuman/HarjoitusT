import React, { useState } from "react";

export default function AddModify() {
  const [show, setShow] = useState<Boolean>(false);
  const [newUser, setNewUser] = useState<any>({
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
    handleClose();
  };

  return show ? (
    <form onSubmit={handleSubmit}>
      <h2>LISÄÄ / MUOKKAA TIETOJA</h2>
      <label>
        Etunimi
        <input
          type="text"
          id="fName"
          name="fName"
          placeholder="Etunimi"
          value={newUser.fName}
          onChange={handleChange}
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
      <input type="button" value="PERU" onClick={handleClose} />
    </form>
  ) : (
    <button onClick={handleShow}>TESTBUTTON</button>
  );
}

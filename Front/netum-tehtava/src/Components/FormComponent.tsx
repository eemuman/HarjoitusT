import React, { useState } from "react";

interface propData {
  btnLabel: string;
  fName: string;
  lName: string;
  age: number;
  id: string;
  handleSubmit: Function;
}

export default function FormComponent(props: propData) {
  const [show, setShow] = useState<Boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await props.handleSubmit({
      fName: e.currentTarget.fName.value,
      lName: e.currentTarget.lName.value,
      age: Number(e.currentTarget.age.value),
    });
    handleClose();
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h2>LISÄÄ / MUOKKAA TIETOJA</h2>
            <hr />
            <label>
              Etunimi
              <input
                type="text"
                pattern="\S(.*\S)?"
                id="fName"
                name="fName"
                placeholder="Etunimi"
                defaultValue={props.fName}
                required
              />
            </label>
            <label>
              Sukunimi
              <input
                type="text"
                pattern="\S(.*\S)?"
                id="lName"
                name="lName"
                placeholder="Sukunimi"
                defaultValue={props.lName}
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
                defaultValue={props.age}
              />
            </label>
            <input type="submit" value="TALLENNA" />
            <div>
              <input type="button" value="PERU" onClick={handleClose} />
            </div>
          </form>
        </div>
      )}
      <button className="AddButton" id={props.id} onClick={handleShow}>
        {props.btnLabel}
      </button>
    </>
  );
}

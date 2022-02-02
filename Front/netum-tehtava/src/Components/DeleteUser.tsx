import { useState } from "react";
import { deleteById } from "./FetchUtils";
import { user } from "./UserInterface";

interface deleteProps {
  deleteUser: user;
  fetchAll: Function;
}

export default function DeleteUser(props: deleteProps) {
  const textHelper = (
    <>
      Oletko varma, että haluat poistaa käyttäjän{" "}
      <b>{props.deleteUser.fName}</b> <b>{props.deleteUser.lName}</b>?
    </>
  );
  const [show, setShow] = useState<Boolean>(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const deleteUser = async () => {
    await deleteById(`http://localhost:8000/users/${props.deleteUser.id}`);
    await props.fetchAll();
    handleClose();
  };

  return (
    <>
      {show && (
        <div className="form">
          <div className="delete">
            <h2>POISTA KÄYTTÄJÄ</h2>
            <p>{textHelper}</p>
            <div className="delButtons">
              <button
                className="AddButton"
                onClick={deleteUser}
                style={{ backgroundColor: "red" }}
              >
                POISTA
              </button>
              <button className="AddButton" id={"canC"} onClick={handleClose}>
                Peru
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="AddButton"
        id="edDel"
        onClick={handleShow}
        style={{ backgroundColor: "red" }}
      >
        D
      </button>
    </>
  );
}

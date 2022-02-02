import { useState } from "react";
import { deleteById } from "./FetchUtils";
import { user } from "./UserInterface";

/**
 * Poistamisen typescript interface. Halutaan poistettava käyttäjä, sekä kaiken datan uudelleenhaun funktio, jota kutsutaan että saadaan tablen data päivitettyä.
 */
interface deleteProps {
  deleteUser: user;
  fetchAll: Function;
}

/**
 *
 * Tämä on poistamisen elementti, toimii kanssa modaltyyppisesti. Eli jos D nappia painetaan, renderöidään itse poistomahdollisuus.
 *
 */
export default function DeleteUser(props: deleteProps) {
  /**
   * Käytetään tätä helpertextiä, jotta saadaan halutun poistettavan henkilön nimi boldattua. Ei onnistunut Template literalseilla.
   */
  const textHelper = (
    <>
      Oletko varma, että haluat poistaa henkilön <b>{props.deleteUser.fName}</b>{" "}
      <b>{props.deleteUser.lName}</b>?
    </>
  );

  /**
   * State jolla ohjataan poistomodalin näkyvyyttä.
   */
  const [show, setShow] = useState<Boolean>(false);
  /**
   * Kun D-nappia painetaan, laitetaan setShow trueksi.
   */
  const handleShow = () => {
    setShow(true);
  };
  /**
   * Kun taas joko perutaan, tai ollaan poistettu haluttu data, niin tämän avulla suljetaan modali.
   */
  const handleClose = () => {
    setShow(false);
  };

  /**
   * Tällä poistetaan käyttäjä backendistä fetch-apia käyttäen, kun ollaan poistettu, niin haetaan tuorein data taas backendistä.
   */
  const deleteUser = async () => {
    await deleteById(`/users/${props.deleteUser.id}`);
    await props.fetchAll();
    handleClose();
  };
  /**
   * Vähän sekaisen näköinen returni, mutta jos show on true, niin renderöidään modali, muuten pelkkä näppäin.
   */
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

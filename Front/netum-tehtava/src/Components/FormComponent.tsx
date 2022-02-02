import React, { useState } from "react";

/**
 * FormComponentin typescript interface, pakollista dataa on näppäimen teksti sekä handlesubmit funkkarit.
 */
interface propData {
  btnLabel: string;
  fName?: string;
  lName?: string;
  age?: number;
  id?: string;
  handleSubmit: Function;
}

export default function FormComponent(props: propData) {
  /**
   * Tällä statella hallitaan modalin näkyvyys.
   */
  const [show, setShow] = useState<Boolean>(false);

  /**
   *
   * Kun formissa painetaan Tallennusta, kutsutaan tätä, joka kerää formin inputeista datat kasaan ja lähettää ne propseina saatuun handler-funktioon
   * Käytetään preventdefaulttia, jotta ei turhaan refreshata sivua.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await props.handleSubmit({
      fName: e.currentTarget.fName.value,
      lName: e.currentTarget.lName.value,
      age: Number(e.currentTarget.age.value),
    });
    handleClose();
  };

  /**
   * Modalin näyttämisen handlerit
   */
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {/**Vähän tönkkö ratkaisu, mutta näytetään taas shown ollessa true modal, muuten pelkkä näppäin. */}
      {show && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h2>LISÄÄ / MUOKKAA TIETOJA</h2>
            <hr />
            <label>
              Etunimi
              <input
                type="text"
                pattern="\S(.*\S)?" //Pieni pattern, jolla pakoitetaan että ei voi laittaa kirjeimellisesti pelkkää tyhjää inputtia.
                id="fName"
                name="fName"
                placeholder="Etunimi"
                defaultValue={props.fName}
                required //Kaikki datat ovat pakollisia
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
                max="100" //Iän pitää osua 0-100 väliin.
                id="age"
                name="age"
                placeholder="Ikä"
                defaultValue={props.age || 0}
              />
            </label>
            {/**Käytetään hyväksi html-validointia, eli varmistetaan että patternit täsmää, kaikissa on dataa, sekä ikä on numero. */}
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

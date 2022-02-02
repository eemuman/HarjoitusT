import React, { useState } from "react";
import DeleteUser from "./DeleteUser";
import EditOld from "./EditOld";
import { userProps } from "./UserInterface";

/**
 * Itse tablen propsit, sisältää niin käyttäjät, kuin fetchAll funktion.
 */
interface tableProps extends userProps {
  fetchAll: Function;
}

/**
 *
 * Tämä elementti renderöi tablen jossa näkyy kaikki backendistä saadut käyttäjät. Tämän kautta ajetaan myös muokkaus-, sekä poistamismahdollisuudet.
 * Alun funktio-oksennusta käytetään tablen sorttausmahdollisuuksiin.
 */
export default function Table(props: tableProps) {
  /**
   * Tämä state sisältää tiedon siitä, mitä tablen riviä halutaan sortata, sekä kumpaan suuntaan sorttaus tehdään. (asc=ascending, desc=descending)
   */
  const [sortBy, setSortBy] = useState({ whatToSort: "", dir: "asc" });

  /**
   * Tällä funktio-oksennuksella haetaan data constiin haluttu järjestys, jota sitten alempana käytetään renderöintiin.
   * Käytetään useMemoa, jotta ei tehdä tätä turhaan uudestaan jos data ei ole muuttunut.
   */
  const data = React.useMemo(() => {
    /**
     * Tällä iffillä varmistetaan, että meillä on edes jotain dataa käytettävissä. Ts. varmistetaan että ohjelma ei kaadu.
     */
    if (props.curUsers !== undefined) {
      //Luodaan uusi array käyttäen saatua henkilöarrayta.
      let sortedArr = [...props.curUsers];
      //Jos on painettu jotain, eli meillä on joku sortattava rivinimi ylläolevassa statessa, sekä se EI ole age, mennään tämän sisään.
      if (sortBy.whatToSort !== "" && sortBy.whatToSort !== "age") {
        sortedArr.sort((a: any, b: any) => {
          //Käytetään arrayn.sort funktiota, jolla verrataan kumpi halutaan. Käytetään toLowerCasea, koska muuten ISOT KIRJAMET rikkovat järjestyksen.
          if (
            a[sortBy.whatToSort].toLowerCase() <
            b[sortBy.whatToSort].toLowerCase()
          ) {
            return sortBy.dir === "asc" ? -1 : 1; //Palautetaan haluttu järjestys
          }
          if (
            a[sortBy.whatToSort].toLowerCase() >
            b[sortBy.whatToSort].toLowerCase()
          ) {
            return sortBy.dir === "asc" ? 1 : -1; //Palautetaan haluttu järjestys
          }
          return 0; //Jos ei merkitystä, ei merkitystä.
        });
      }
      if (sortBy.whatToSort === "age") {
        //Jos kyseessä on ikä, TS. numero, tehdään tämä miinustamalla. Jos tämä tehtäisiin ylläolevalla tyylillä, olis järjestys esim (1, 11, 11, 3, 33, 4, jne..). Tällä saadaan iät numerojärjestykseen.
        return sortBy.dir === "asc"
          ? sortedArr.sort(
              (a: any, b: any) => a[sortBy.whatToSort] - b[sortBy.whatToSort]
            )
          : sortedArr.sort(
              (a: any, b: any) => b[sortBy.whatToSort] - a[sortBy.whatToSort]
            );
      }
      //Kun ollaan käyty koko array läpi, laitetaan se data constiin.
      return sortedArr;
    }

    //Jos ei olla saatu backendistä mitään dataa, laitetaan const dataan tyhjä array.
    return [];
  }, [props.curUsers, sortBy]);

  /**
   *
   * Kun jotain headeria painetaan, tullaan tähän funktioon, ensiksi katotaan onko kyseistä headeria painettu jo.
   * Jos on, laitetaan järjestykseksi desc ja sen jälkeen asetetaan se sortBy stateen. Muuten laitetaan asc ja painetun headerin nimi sortByhyn.
   */
  const sortOrder = (whatToSort: string) => {
    let dir = "asc";
    if (sortBy.whatToSort === whatToSort && sortBy.dir === dir) {
      dir = "desc";
    }
    setSortBy({ whatToSort, dir });
  };

  /**
   * Jos data on tyhjä array, renderöidään vain, että dataa ei saatavilla. Muuten renderöidään alla oleva.
   */
  return data.length !== 0 ? (
    <div className="TableBox">
      <table>
        <thead>
          <tr>
            {/**Iso headeri, jossa lukee HENKILÖT. */}
            <th
              colSpan={4}
              style={{
                borderBottom: 0,
                textAlign: "center",
                fontSize: "28px",
              }}
            >
              HENKILÖT
            </th>
          </tr>
          <tr>
            <th>
              {/**Pienemmät headerit, tässä on kaikki titlet ja onClickit, jolla saadaan järjestelyt yllä. */}
              <button
                className="tableButtons"
                onClick={() => sortOrder("fName")}
              >
                Etunimi
              </button>
            </th>
            <th>
              <button
                className="tableButtons"
                onClick={() => sortOrder("lName")}
              >
                Sukunimi
              </button>
            </th>
            <th>
              <button className="tableButtons" onClick={() => sortOrder("age")}>
                Ikä
              </button>
            </th>
            <th>Hallitse</th>
          </tr>
        </thead>
        <tbody>
          {/**Täällä mapataan jokainen const datassa oleva käyttäjä näkyviin tableen, jokaiselle käyttäjälle mapataan myös editaus ja poistonäppäimet. */}
          {data.map((user) => (
            <tr id={"col"} key={user.id}>
              <td style={{ width: "35%" }}>{user.fName}</td>
              <td style={{ width: "35%" }}>{user.lName}</td>
              <td>{user.age}</td>
              <td style={{ width: "15%" }}>
                <div>
                  <EditOld editUser={user} fetchAll={props.fetchAll} />
                  <DeleteUser fetchAll={props.fetchAll} deleteUser={user} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    /**Jos ei ole dataa, renderöidään allaoleva */
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "64px" }}>DATAA EI LÖYTYNYT!</h1>
    </div>
  );
}

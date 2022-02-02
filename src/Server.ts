/**
 * Tällä tehdään kaikki itse tietokantakutsut.
 *
 * Käytössä on express, mysql2 promise versio ja dotenv.
 */

const express = require("express");
const router = express.Router();
router.use(express.json());
const mysql = require("mysql2/promise");
require("dotenv").config();

/**
 * Typescriptin userinterface
 */
interface user {
  fName: string;
  lName: string;
  age: number;
}

/**
 * Luodaan connectionpooli, kivempi kun yks yhteys.
 */
const config = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

const connection = mysql.createPool(config);

/**
 *
 * Tällä funktiolla tehdään itse kutsut tietokantaan, halutut tiedot saadaan allaolevista funktioista.
 * parametreissä on queryyn tarvittavat lisätiedot, id:t, etu ja sukunimet, iät, jne.
 * Saadusta querysta palautetaan vaan rows, joka sisältää relevantit datat. Nämä menee sitten apiin joka ohjaa ne fronttiin.
 */
async function doQuery(query: String, params: any[]) {
  const [rows, fields] = await connection.query(query, params);
  console.log(rows);
  return rows;
}

module.exports = {
  /**
   * Perus query kaikkien henkilöiden hakemiseen.
   */
  getAll: async () => {
    return await doQuery("SELECT * FROM users", []);
  },

  /*
   * Tällä voi hakea henkilöitä ID:n avulla.
   */
  getById: async (id: number) => {
    return await doQuery("SELECT * FROM users WHERE id=?", [id]);
  },

  /**
   * Uuden henkilön luominen. ? ? ? antaa mahdollisuuden escapee tiedot ennen niitten käyttämistä.
   */
  postNew: async (data: user) => {
    return await doQuery(
      "INSERT INTO users (fName, lName, age) VALUES (?, ?, ?)",
      [data.fName, data.lName, data.age]
    );
  },

  /**
   *
   * Päivitettäessä henkilötietoja ensiksi käydään läpi mitä päivitettyä dataa ollaan saatu frontendistä, ja luodaan näistä halutunnäköinen SQL query.
   * Eli jos vaikkapa sukunimeä ei ole muokattu, niin sitä ei turhaan tarvitse päivittää samalla datalla, vaan voidaan tällein nätisti luoda halutut päivitystiedot.
   *
   */
  updateById: async (id: number, properties: user) => {
    var updateProps: string[] = [];
    var propValues: any[] = [];

    if ("fName" in properties) {
      updateProps.push("fName = ?");
      propValues.push(properties.fName);
    }
    if ("lName" in properties) {
      updateProps.push("lName = ?");
      propValues.push(properties.lName);
    }
    if ("age" in properties) {
      updateProps.push("age = ?");
      propValues.push(properties.age);
    }

    var query = [
      "UPDATE users",
      "SET " + updateProps.join(", "),
      "WHERE id = ?",
    ];
    return await doQuery(query.join(" "), propValues.concat([id]));
  },

  /**
   * Perus kutsu jolla poistetaan henkilöitä id:tä käyttäen.
   */
  deleteById: async (id: number) => {
    return await doQuery("DELETE FROM users WHERE id=?", [id]);
  },
};

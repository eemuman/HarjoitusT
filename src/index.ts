/**Pikkunen api backendille, käytetään corssia, expressiä, dotenviä ja tietty nodejs */

import express, { Request, Response, Application } from "express";
require("dotenv").config();
const server = require("./Server");
const path = require("path");

/**
 * Express ja corssi
 */
const app: Application = express();
app.use(express.static(path.join(__dirname, "Front/netum-tehtava/build")));

const PORT = process.env.PORT || 8000;

/**
 *
 * Tosi nopea ja yksinkertainen backendistä saadun datan virhetsekaus.
 * Jos saatu data on tyhjä, lähetetään 404, jos dataa ei ole lähetetään 500, muuten lähetetään itse data.
 */
const checkSend = (res: Response, data: any) => {
  if (data.length === 0) {
    res.status(404).send("Ei löydy");
    return;
  }
  if (!data) {
    res.status(500).send("Jokin meni vikaan...");
    return;
  }
  res.send(data);
};

/**
 * Jes
 */
app.listen(PORT, () => {
  console.log("Yhteys upis");
});

app.use(express.json());

/**
 * Kun frontista tulee kutsua hakea kaikki henkilöt, haetaan ne tämän avulla ja käytetään ylläolevaa virhetsekauksee
 */
app.get(`/users`, async (req, res) => {
  const data = await server.getAll();
  checkSend(res, data);
});

/**
 * Tällä voi hakea käyttäjän id:tä käyttäen, tätä ei ole frontissa käytössä, mutta tämän toiminnallisuuden pystyy testaaman vaikka postmanilla tai ihan vaan urlilla.
 */
app.get(`/users/:id`, async (req, res) => {
  const data = await server.getById(req.params.id);
  checkSend(res, data);
});

/**
 * Tätä käytetään uuden käyttäjän luomiseen
 */
app.post("/users", async (req, res) => {
  const data = await server.postNew(req.body);
  checkSend(res, data);
});

/**
 * Tätä käytetään henkilön tietojen päivitykseen, haluttu henkilö löydetään id:tä käytäen.
 */
app.patch(`/users/:id`, async (req: Request, res) => {
  console.log(req.body);
  const data = await server.updateById(Number(req.params.id), req.body);
  checkSend(res, data);
});
/**
 * Tätä käytetään henkilön poistamiseen, haluttu henkilö löydetään id:tä käyttäen.
 */
app.delete(`/users/:id`, async (req: Request, res: Response) => {
  const data = await server.deleteById(req.params.id);
  checkSend(res, data);
});

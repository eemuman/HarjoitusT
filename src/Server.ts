import { query } from "express";

const express = require("express");
const router = express.Router();
router.use(express.json());
const mysql = require("mysql2/promise");
require("dotenv").config();

interface user {
  fName: string;
  lName: string;
  age: number;
}

const config = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

console.log(config);

const connection = mysql.createPool(config);

async function doQuery(query: String, params: any[]) {
  const result = await connection.query(query, params);
  return result[0];
}

module.exports = {
  getAll: async () => {
    return await doQuery("SELECT * FROM users", []);
  },

  getById: async (id: number) => {
    return await doQuery("SELECT * FROM users WHERE id=?", [id]);
  },

  postNew: async (fName: string, lName: string, age: number) => {
    return await doQuery(
      'INSERT INTO users ("fName", "lName", "age") VALUES (?, ?, ?)',
      [fName, lName, age]
    );
  },
  updateById: async (id: number, properties: user) => {
    var updateProps: string[] = [];
    var propValues: any[] = [];

    if ("fName" in properties) {
      updateProps.push('"fName" = ?' + (updateProps.length + 1));
      propValues.push(properties.fName);
    }
    if ("lName" in properties) {
      updateProps.push('"lName"= ?' + (updateProps.length + 1));
      propValues.push(properties.lName);
    }
    if ("age" in properties) {
      updateProps.push('"age= ?"' + (updateProps.length + 1));
      propValues.push(properties.age);
    }

    var query = [
      "UPDATE users",
      "SET " + updateProps.join(", "),
      "WHERE id = ?" + (updateProps.length + 1),
    ];
    return await doQuery(query.join(" "), propValues.concat([id]));
  },

  deleteById: async (id: number) => {
    return await doQuery("DELETE FROM users WHERE id=$1", [id]);
  },
};

import React from "react";
import { userProps } from "./UserInterface";

export default function Table(props: userProps) {
  return (
    <div className="TableBox">
      <table>
        <thead>
          <tr>
            <th>Etunimi</th>
            <th>Sukunimi</th>
            <th>Ikä</th>
          </tr>
        </thead>
        <tbody>
          {props.curUsers.map((user) => (
            <tr>
              <td>{user.fName}</td>
              <td>{user.lName}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

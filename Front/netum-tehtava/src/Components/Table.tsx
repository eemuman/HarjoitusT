import React from "react";
import { userProps } from "./UserInterface";

export default function Table(props: userProps) {
  const data = props.curUsers;

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
          {data.map((user) => (
            <tr key={user.fName}>
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

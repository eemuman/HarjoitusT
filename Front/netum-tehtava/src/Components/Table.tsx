import React, { useState } from "react";
import DeleteUser from "./DeleteUser";
import EditOld from "./EditOld";
import { userProps } from "./UserInterface";

interface tableProps extends userProps {
  fetchAll: Function;
}

export default function Table(props: tableProps) {
  const [sortBy, setSortBy] = useState({ whatToSort: "", dir: "asc" });

  const data = React.useMemo(() => {
    if (props.curUsers !== undefined) {
      let sortedArr = [...props.curUsers];
      if (sortBy.whatToSort !== "" && sortBy.whatToSort !== "age") {
        sortedArr.sort((a: any, b: any) => {
          if (
            a[sortBy.whatToSort].toLowerCase() <
            b[sortBy.whatToSort].toLowerCase()
          ) {
            return sortBy.dir === "asc" ? -1 : 1;
          }
          if (
            a[sortBy.whatToSort].toLowerCase() >
            b[sortBy.whatToSort].toLowerCase()
          ) {
            return sortBy.dir === "asc" ? 1 : -1;
          }
          return 0;
        });
      }
      if (sortBy.whatToSort === "age") {
        return sortBy.dir === "asc"
          ? sortedArr.sort(
              (a: any, b: any) => a[sortBy.whatToSort] - b[sortBy.whatToSort]
            )
          : sortedArr.sort(
              (a: any, b: any) => b[sortBy.whatToSort] - a[sortBy.whatToSort]
            );
      }
      return sortedArr;
    }
    return [];
  }, [props.curUsers, sortBy]);

  const sortOrder = (whatToSort: string) => {
    let dir = "asc";
    if (sortBy.whatToSort === whatToSort && sortBy.dir === dir) {
      dir = "desc";
    }
    setSortBy({ whatToSort, dir });
  };

  return data.length !== 0 ? (
    <div className="TableBox">
      <table>
        <thead>
          <tr>
            <th>
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
          {data.map((user) => (
            <tr key={user.id}>
              <td style={{ width: "35%" }}>{user.fName}</td>
              <td style={{ width: "35%" }}>{user.lName}</td>
              <td>{user.age}</td>
              <td style={{ width: "15%" }}>
                <div>
                  {<EditOld editUser={user} fetchAll={props.fetchAll} />}
                  <DeleteUser fetchAll={props.fetchAll} deleteUser={user} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "64px" }}>DATAA EI LÖYTYNYT!</h1>
    </div>
  );
}

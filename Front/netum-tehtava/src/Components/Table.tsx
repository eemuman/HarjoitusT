import React, { useState } from "react";
import { userProps } from "./UserInterface";

export default function Table(props: userProps) {
  const [sortBy, setSortBy] = useState({ whatToSort: "", dir: "asc" });

  const data = React.useMemo(() => {
    let sortedArr = [...props.curUsers];
    if (sortBy.whatToSort !== "" && sortBy.whatToSort !== "age") {
      sortedArr.sort((a: any, b: any) => {
        if (a[sortBy.whatToSort] < b[sortBy.whatToSort]) {
          return sortBy.dir === "asc" ? -1 : 1;
        }
        if (a[sortBy.whatToSort] > b[sortBy.whatToSort]) {
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
  }, [props.curUsers, sortBy]);

  const sortOrder = (whatToSort: string) => {
    let dir = "asc";
    if (sortBy.whatToSort === whatToSort && sortBy.dir === dir) {
      dir = "desc";
    }
    setSortBy({ whatToSort, dir });
  };

  return (
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

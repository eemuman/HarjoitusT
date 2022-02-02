//Käyttäjän typescript interface
export interface user {
  fName: string;
  lName: string;
  age: number;
  id?: number;
}
//Käyttäjäarrayn interface.
export interface userProps {
  curUsers: user[];
}

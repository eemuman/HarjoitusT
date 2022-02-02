export interface user {
  fName: string;
  lName: string;
  age: number;
  id?: number;
}

export interface userProps {
  curUsers: user[];
}

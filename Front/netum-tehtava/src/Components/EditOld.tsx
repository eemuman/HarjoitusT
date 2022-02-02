import React from "react";
import { patchOld } from "./FetchUtils";
import FormComponent from "./FormComponent";
import { user } from "./UserInterface";

interface editProps {
  editUser: user;
  fetchAll: Function;
}

export default function EditOld(props: editProps) {
  const submitHandler = async (user: user) => {
    var changedUser: any = {};

    for (const [key, val] of Object.entries(user)) {
      if (props.editUser[key as keyof user] !== val) {
        changedUser[key] = val;
      }
    }
    await patchOld(
      `http://localhost:8000/users/${props.editUser.id}`,
      changedUser
    );
    await props.fetchAll();
  };

  return (
    <FormComponent
      btnLabel={"E"}
      fName={props.editUser.fName}
      lName={props.editUser.lName}
      age={props.editUser.age}
      id={"edDel"}
      handleSubmit={submitHandler}
    />
  );
}

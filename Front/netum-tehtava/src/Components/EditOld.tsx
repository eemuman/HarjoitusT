import React from "react";
import FormComponent from "./FormComponent";
import { user } from "./UserInterface";

interface editProps {
  editUser: user;
  updateUser: Function;
}

export default function EditOld(props: editProps) {
  const submitHandler = (user: user) => {
    props.updateUser(user);
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

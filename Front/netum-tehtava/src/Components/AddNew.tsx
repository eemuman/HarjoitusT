import FormComponent from "./FormComponent";
import { user } from "./UserInterface";

interface addProps {
  addNewUser: Function;
}

export default function AddModify(props: addProps) {
  const handleSubmit = (user: user) => {
    props.addNewUser(user);
  };

  return (
    <FormComponent
      btnLabel={"Lisää uusi"}
      fName={""}
      lName={""}
      age={0}
      id={""}
      handleSubmit={handleSubmit}
    />
  );
}

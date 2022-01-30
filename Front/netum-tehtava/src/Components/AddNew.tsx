import FormComponent from "./FormComponent";
import { user } from "./UserInterface";

export default function AddModify(props: any) {
  /*
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };
*/
  const handleSubmit = (user: user) => {
    props.addNewUser(user);
  };

  return (
    <div>
      <FormComponent
        btnLabel={"Lisää uusi"}
        fName={""}
        lName={""}
        age={0}
        handleSubmit={handleSubmit}
      ></FormComponent>
    </div>
  );
}

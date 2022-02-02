import { patchOld } from "./FetchUtils";
import FormComponent from "./FormComponent";
import { user } from "./UserInterface";
/**
 * Henkilön muokkaamisen propsit, muuten sama kuin uuden luomisella, mutta täällä halutaan myös muokattavan käyttäjä.
 */
interface editProps {
  editUser: user;
  fetchAll: Function;
}

/**
 *
 *  Hyvin samanlainen pikku elementti kuin uuden luomiseen tarkoitettu on. Erona on se, että tässä otetaan vastaan henkilö-objekti joka lähetetään FormComponenttiin.
 */
export default function EditOld(props: editProps) {
  /**
   *
   * Kun FormComponentissa painetaan tallenna, tullaan tänne. Tässä verrataan for-of loopilla formilta saadun ja tablesta saadun henkilön avainarvopareja.
   * Jos nämä eroavat, tallennetaan se uusi, muokattu versio changedUser variableen, muuten mennään eteenpäin. Näin saadaan haettua vain muutetut datat.
   * Jos mitään ei muutettu, ei lähetetä backendiin mitään dataa, jos taas on jotain muutettu, lähetetään backendiin pelkästään tämä muutettu data.
   */
  const submitHandler = async (user: user) => {
    var changedUser: any = {};

    for (const [key, val] of Object.entries(user)) {
      if (props.editUser[key as keyof user] !== val) {
        changedUser[key] = val;
      }
    }
    if (Object.keys(changedUser).length !== 0) {
      await patchOld(
        `http://localhost:8000/users/${props.editUser.id}`,
        changedUser
      );
      await props.fetchAll();
    }
  };

  /**
   * Renderöidään FormComponent.
   */
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

import { postNew } from "./FetchUtils";
import FormComponent from "./FormComponent";
import { user } from "./UserInterface";

/**
 * Typescript interface, varmistetaan että propseissa on oikeat asiat.
 */
interface addProps {
  fetchAll: Function;
}
/**
 * Tämä on uuden henkilön luomiseen tehty pikkuelementti. Täällä ei tehdä muuta kuin lähetetä POST-pyyntö backendiin kun FormComponentissa painetaan submit.
 * Tätä tarvitaan, jotta voidaan käyttää samaa formia myös muokkaamiseen ilman turhaa iffittelysäätämistä.
 *
 */
export default function AddModify(props: addProps) {
  /**
   *
   * Kun FormComponentissa painetaan submit, otetaan täällä sieltä saatu data vastaan ja lähetetään POST-pyyntö backendiin.
   */
  const handleSubmit = async (user: user) => {
    await postNew("http://localhost:8000/users", user);
    await props.fetchAll();
  };

  /**
   * Renderöidään FormComponent ja annetaan sille vähän labelia, sekä uuden luontifunkkari.
   */
  return <FormComponent btnLabel={"LISÄÄ UUSI"} handleSubmit={handleSubmit} />;
}

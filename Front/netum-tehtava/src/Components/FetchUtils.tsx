import { user } from "./UserInterface";

/**
 * Tällä funktiolla haetaan backendistä kaikki sieltä löytyvät henkilöt.
 */
export async function getAll(url: string) {
  try {
    const resp = await fetch(url);
    return await resp.json();
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * Tällä funktiolla luodaan uusi henkilö databaseen.
 * Data-objekti sisältää kaikki tarvittavat tiedot uuden henkilön luomiseen.
 *
 */
export async function postNew(url: string, data: user) {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const rsp = await resp.json();
    return rsp;
  } catch (err) {
    console.log(err);
  }
}
/**
 *
 * Tällä funktiolla voidaan muokata henkilön dataa.
 * Muokkaamiseen käytetään ID:tä, joka on urlissa, ESIM. users/1 johtaa useriin jonka id on 1.
 * Data objekti sisältää vain ne datat, mitä on oikeasti muokattu, katso EditOld.tsx.
 */
export async function patchOld(url: string, data: user) {
  try {
    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const rsp = await resp.json();
    return rsp;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Tällä funktiolla voidaan poistaa henkilöitä databasest käyttäen urlissa olevaa ID:tä.
 * Eli jos url on users/1, niin poistetaan user jolla on id 1.
 */
export async function deleteById(url: string) {
  try {
    const resp = await fetch(url, {
      method: "DELETE",
    });
    const rps = await resp.json();
    return rps;
  } catch (err) {}
}

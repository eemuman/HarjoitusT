import { user } from "./UserInterface";

export async function getAll(url: string) {
  try {
    const resp = await fetch(url);
    return await resp.json();
  } catch (err) {
    console.log(err);
  }
}

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

export async function deleteById(url: string) {
  try {
    const resp = await fetch(url, {
      method: "DELETE",
    });
    const rps = await resp.json();
    return rps;
  } catch (err) {}
}

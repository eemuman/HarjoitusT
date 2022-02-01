export function getAll(url: string) {
  return fetch(url).then((res) => res.json());
}

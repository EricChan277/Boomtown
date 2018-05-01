import fetch from 'node-fetch';
const apiUrl = 'http://localhost:3001';

export default function(app) {
  return {
    items() {
      return fetch(`${apiUrl}/items`)
        .then(itemsResp => itemsResp.json())
        .catch(errors => console.log(errors));
    },
    users() {
      return fetch(`${apiUrl}/users`)
        .then(usersResp => usersResp.json())
        .catch(errors => console.log(errors));
    },
    item(id) {
      return fetch(`${apiUrl}/items/${id}`).then(resp => resp.json());
    },
    user(id) {
      return fetch(`${apiUrl}/users/${id}`).then(resp => resp.json());
    },
    getUserOwnedItems(id) {
      return fetch(`${apiUrl}/items/?itemowner=${id}`).then(resp =>
        resp.json()
      );
    }
  };
}

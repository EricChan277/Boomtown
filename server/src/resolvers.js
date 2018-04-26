import fetch from 'node-fetch';

const apiUrl = 'http://localhost:3001';

const resolveFunctions = {
  Query: {
    items(root) {
      return fetch(`${apiUrl}/items`)
        .then(itemsResp => itemsResp.json())
        .catch(errors => console.log(errors));
    },
    users(root) {
      return fetch(`${apiUrl}/users`)
        .then(usersResp => usersResp.json())
        .catch(errors => console.log(errors));
    },
    item(root, { id }) {
      return fetch(`${apiUrl}/items/${id}`).then(resp => resp.json());
    },
    user(root, { id }) {
      return fetch(`${apiUrl}/users/${id}`).then(resp => resp.json());
    }
  },
  Item: {
    itemowner({ itemowner }) {
      return fetch(`${apiUrl}/users/${itemowner}`).then(resp => resp.json());
    },

    async borrower({ borrower }) {
      const user = await fetch(`${apiUrl}/users/${borrower}`);
      const json = await user.json();
      if (!json.id) return null;
      return json;
    }
  },
  User: {
    owneditems({ id }) {
      return fetch(`${apiUrl}/items/?itemowner=${id}`).then(resp =>
        resp.json()
      );
    },
    borroweditems({ id }) {
      return fetch(`${apiUrl}/items/?borrower=${id}`).then(resp => resp.json());
    }
  }
};
export default resolveFunctions;

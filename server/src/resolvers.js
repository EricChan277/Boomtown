import fetch from 'node-fetch';
const resolveFunctions = {
  Query: {
    items(root) {
      return fetch(`http://localhost:3000/items`)
        .then(itemsResp => itemsResp.json())
        .catch(errors => console.log(errors));
    },
    users(root) {
      return fetch(`http://localhost:3000/users`)
        .then(usersResp => usersResp.json())
        .catch(errors => console.log(errors));
    },
    item(root, { id }) {
      return fetch(`http://localhost:3000/items/${id}`).then(resp => resp.json());
    },
    user(root, { id }) {
      return fetch(`http://localhost:3000/users/${id}`).then(resp => resp.json());
    }
  },
  Item: {
    itemowner({ itemowner }) {
      return fetch(`http://localhost:3000/users/${itemowner}`).then(resp => resp.json());
    },
    borrower({ borrower }) {
      return fetch(`http://localhost:3000/users/${borrower}`).then(resp => resp.json());
    }
  },
  User: {
    owneditems({ id }) {
      return fetch(`http://localhost:3000/items/?itemowner=${id}`).then(resp => resp.json());
    },
    borroweditems({ id }) {
      return fetch(`http://localhost:3000/items/?borrower=${id}`).then(resp => resp.json());
    }
  }
};
export default resolveFunctions;

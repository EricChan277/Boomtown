import fetch from 'node-fetch';

export default function({ jsonResources, firebaseResources, pgResources }) {
  const apiUrl = 'http://localhost:3001';
  let createDate = new Date();
  return {
    Query: {
      items(root) {
        return pgResources.items();
      },
      users(root) {
        return firebaseResources.getUsers();
      },
      item(root, { id }) {
        return pgResources.item(id);
      },
      user(root, { id }) {
        return firebaseResources.user(id);
      }
    },
    Item: {
      itemowner({ itemowner }, args, context) {
        return context.loaders.GetUsers.load(itemowner);
      },
      async borrower({ borrower }, args, context) {
        return borrower
          ? await context.loaders.ItemBorrower.load(borrower)
          : null;
      }
    },

    // New Item mutation
    Mutation: {
      // addItem(root, item) {
      //   const newItem = {
      //     title: item.title,
      //     description: item.description,
      //     imageurl: item.imageurl,
      //     tags: item.tags,
      //     itemowner: item.itemowner,
      //     created: item.createDate,
      //     available: item.available,
      //     borrower: item.borrower
      //   };
      //   return fetch(`${apiUrl}/items`, {
      //     body: JSON.stringify(newItem),
      //     method: 'POST',
      //     headers: {
      //       'content-type': 'application/json'
      //     }
      //   }).then(resp => resp.json());
      //   return newItem;
      // }
      addItem(root, args) {
        return pgResources.addItem();
      }
    },
    User: {
      owneditems({ id }, args, context) {
        return context.loaders.UserOwnedItems.load(id);
      },
      borroweditems({ id }, args, context) {
        return context.loaders.GetUserBorrowed.load(id);
      }
    }
  };
}

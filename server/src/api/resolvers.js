import fetch from 'node-fetch';

export default function({ jsonResources }) {
  const apiUrl = 'http://localhost:3001';
  let createDate = new Date();
  return {
    Query: {
      items(root) {
        return jsonResources.items();
      },
      users(root) {
        return jsonResources.users();
      },
      item(root, { id }) {
        return jsonResources.item(id);
      },
      user(root, { id }) {
        return jsonResources.user(id);
      }
    },
    Item: {
      // Add to loader
      itemowner({ itemowner }, args, context) {
        return context.loaders.GetUsers.load(itemowner);
      },
      async borrower({ borrower }) {
        const user = await fetch(`${apiUrl}/users/${borrower}`);
        const json = await user.json();
        if (!json.id) return null;
        return json;
      }
    },
    // New Item mutation
    Mutation: {
      addItem(root, item) {
        const newItem = {
          title: item.title,
          description: item.description,
          imageurl: item.imageurl,
          tags: item.tags,
          itemowner: item.itemowner,
          created: item.createDate,
          available: item.available,
          borrower: item.borrower
        };
        return fetch(`${apiUrl}/items`, {
          body: JSON.stringify(newItem),
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          }
        }).then(resp => resp.json());
        return newItem;
      }
    },
    User: {
      owneditems({ id }, args, context) {
        return context.loaders.UserOwnedItems.load(id);
      },
      borroweditems({ id }) {
        //Add to loader
        return fetch(`${apiUrl}/items/?borrower=${id}`).then(resp =>
          resp.json()
        );
      }
    }
  };
}

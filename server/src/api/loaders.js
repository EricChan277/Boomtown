import DataLoader from 'dataloader';
// import { getUserOwnedItems } from '../resources/jsonServer';

export default function Loaders({ pgResources, firebaseResources }) {
  return {
    UserOwnedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => pgResources.item(id)))
    ),
    GetUsers: new DataLoader(ids =>
      Promise.all(ids.map(id => firebaseResources.user(id)))
    ),
    GetItemBorrower: new DataLoader(ids => {
      return Promise.all(ids.map(id => firebaseResources.item(id)));
    }),
    GetUserBorrowed: new DataLoader(ids => {
      return Promise.all(id.map(id => pgResources.item(id)));
    })
  };
}

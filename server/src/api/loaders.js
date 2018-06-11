import DataLoader from 'dataloader';
// import { getUserOwnedItems } from '../resources/jsonServer';

export default function Loaders({ pgResources, firebaseResources }) {
  return {
    UserOwnedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => pgResources.getUserOwnedItems(id)))
    ),
    GetUsers: new DataLoader(ids =>
      Promise.all(ids.map(id => firebaseResources.getUsers(id)))
    ),
    GetItemBorrower: new DataLoader(ids => {
      return Promise.all(ids.map(id => firebaseResources.getUser(id)));
    }),
    GetUserBorrowed: new DataLoader(ids => {
      return Promise.all(id.map(id => pgResources.getUserBorrowedItems(id)));
    })
  };
}

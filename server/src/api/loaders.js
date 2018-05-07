import DataLoader from 'dataloader';
// import { getUserOwnedItems } from '../resources/jsonServer';

export default function Loaders({ jsonResources }) {
  return {
    UserOwnedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => jsonResources.item(id)))
    ),
    GetUsers: new DataLoader(ids =>
      Promise.all(ids.map(id => jsonResources.user(id)))
    )
  };
}
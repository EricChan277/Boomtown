const initialStore = [];
// Action Defining

const FETCH_ITEMS = "FETCH_ITEMS";

export const fetch_items = items => ({
  type: FETCH_ITEMS,
  payload: items
});

const initialState = {
  items: initialStore,
  isLoading: true
};

//Thunk

export const getDatafromUrls = () => dispatch => {
  const urls = ["http://localhost:3000/items", "http://localhost:3000/users"];

  const CombineUrlData = userAndItemData => {
    userAndItemData[0].map(item => {
      userAndItemData[1].map(user => {
        if (item.itemowner == user.id) {
          item.itemowner = user;
        }
      });
    });
    return userAndItemData[0];
  };
  Promise.all(urls.map(url => fetch(url).then(resp => resp.json()))).then(
    responses => dispatch(fetch_items(CombineUrlData(responses)))
  );
};

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS: {
      const items = action.payload;
      return { ...state, items, isLoading: false };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

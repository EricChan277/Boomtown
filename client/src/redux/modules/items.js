// ****************** Action Defining ***************************/

/*_________________Item and Profile fetching _____________________*/
const FETCH_ITEMS = "FETCH_ITEMS";

const GET_IS_LOADING = "GET_IS_LOADING";
const FETCH_USERS_ONLY = "FETCH_USERS_ONLY";
const GET_ITEM_FILTERS = "GET_ITEM_FILTERS";
const GET_ERROR = "GET_ERROR";
const GET_TAGS = "GET_TAGS";

export const get_is_loading = isLoading => ({
  type: GET_IS_LOADING,
  payload: isLoading
});

export const fetch_items = items => ({
  type: FETCH_ITEMS,
  payload: items
});

export const get_item_filters = filters => ({
  type: GET_ITEM_FILTERS,
  payload: filters
});

export const get_error = error => ({
  type: GET_ERROR,
  payload: error
});

export const get_tags = () => ({
  type: GET_TAGS
});

export const fetch_users_only = users => ({
  type: FETCH_USERS_ONLY,
  payload: users
});

// ****************** Setting initial state ***************************/
const initialState = {
  items: [],
  isLoading: false,
  itemFilters: [],
  error: ""
};

/*************************** Thunks ***********************************/

/*____________________ Item Thunk ______________________*/
export const getDatafromUrls = () => dispatch => {
  const urls = ["http://localhost:3000/items", "http://localhost:3000/users"];

  const combineUrlData = userAndItemData => {
    userAndItemData[0].map(item => {
      userAndItemData[1].map(user => {
        if (item.itemowner == user.id) {
          item.itemowner = user;
        }
      });
    });
    return userAndItemData[0];
  };
  dispatch(get_is_loading(true));
  Promise.all(urls.map(url => fetch(url).then(resp => resp.json())))
    .then(responses => dispatch(fetch_items(combineUrlData(responses))))
    .catch(error => dispatch(get_error(error)));
};

/*_________________Profile Thunk________________________*/
export const getDatafromProfileUrl = () => dispatch => {
  const url = ["http://localhost:3000/users"];
  Promise.all(
    url.map(userUrl => fetch(userUrl).then(resp => resp.json()))
  ).then(responses =>
    dispatch(fetch_users_only(getDatafromProfileUrl(responses)))
  );
};

//****************************** Reducers*********************************************/
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_IS_LOADING: {
      return { ...state, isLoading: true, error: "" };
      break;
    }
    case FETCH_ITEMS: {
      const items = action.payload;
      return { ...state, items, isLoading: false, error: "" };
      break;
    }
    case FETCH_USERS_ONLY: {
      const users = action.payload;
      return { ...state, users, isLoading: false, error: "" };
      break;
    }
    case GET_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
      break;
    }
    default: {
      return {
        ...state
      };
    }
  }
};

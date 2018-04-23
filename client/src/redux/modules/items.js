// ****************** Action Defining ***************************/

const FETCH_ITEMS = 'FETCH_ITEMS';
const GET_IS_LOADING = 'GET_IS_LOADING';
const FETCH_USERS_ONLY = 'FETCH_USERS_ONLY';
const GET_ITEM_FILTERS = 'GET_ITEM_FILTERS';
const GET_ERROR = 'GET_ERROR';

export const getIsLoading = isLoading => ({
    type: GET_IS_LOADING,
    payload: isLoading
});

export const fetchItems = items => ({
    type: FETCH_ITEMS,
    payload: items
});

export const getItemFilters = filters => ({
    type: GET_ITEM_FILTERS,
    payload: filters
});

export const getError = error => ({
    type: GET_ERROR,
    payload: error
});

export const fetchUsersOnly = users => ({
    type: FETCH_USERS_ONLY,
    payload: users
});

// ****************** Setting initial state ***************************/
const initialState = {
    items: [],
    isLoading: false,
    itemFilters: [],
    error: ''
};

/** ************************* Thunks ********************************** */

/* ____________________ Item Thunk ______________________ */
export const getDatafromUrls = () => dispatch => {
    const urls = ['http://localhost:3000/items', 'http://localhost:3000/users'];

    const combineUrlData = userAndItemData => {
        userAndItemData[0].map(item => {
            userAndItemData[1].map(user => {
                if (item.itemowner === user.id) {
                    item.itemowner = user;
                }
            });
        });
        return userAndItemData[0];
    };
    dispatch(getIsLoading(true));
    Promise.all(urls.map(url => fetch(url).then(resp => resp.json())))
        .then(responses => dispatch(fetchItems(combineUrlData(responses))))
        .catch(error => dispatch(getError(error)));
};

/* _________________Profile Thunk________________________ */
export const getDatafromProfileUrl = () => dispatch => {
    const url = ['http://localhost:3000/users'];
    Promise.all(
        url.map(userUrl => fetch(userUrl).then(resp => resp.json()))
    ).then(responses =>
        dispatch(fetchUsersOnly(getDatafromProfileUrl(responses)))
    );
};

//* ***************************** Reducers*********************************************/
export default (state = initialState, action) => {
    switch (action.type) {
    case GET_IS_LOADING: {
        return { ...state, isLoading: true, error: '' };
    }
    case FETCH_ITEMS: {
        const items = action.payload;
        return { ...state, items, isLoading: false, error: '' };
    }
    case FETCH_USERS_ONLY: {
        const users = action.payload;
        return { ...state, users, isLoading: false, error: '' };
    }
    case GET_ERROR: {
        return { ...state, isLoading: false, error: action.payload };
    }
    case GET_ITEM_FILTERS: {
        let itemFilters = [...state.itemFilters];
        if (!itemFilters.includes(action.payload)) {
            itemFilters.push(action.payload);
        } else {
            itemFilters = itemFilters.filter(tag => tag !== action.payload);
        }
        return { ...state, itemFilters };
    }
    default: {
        return {
            ...state
        };
    }
    }
};

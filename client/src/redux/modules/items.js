// ****************** Action Defining ***************************/

const FETCH_ITEMS = 'FETCH_ITEMS';
const GET_IS_LOADING = 'GET_IS_LOADING';
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
    const urls = ['http://localhost:3001/items', 'http://localhost:3001/users'];

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

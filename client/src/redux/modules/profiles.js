const FETCH_USERS_ONLY = 'FETCH_USERS_ONLY';
const GET_IS_LOADING = 'GET_IS_LOADING';
const GET_ERROR = 'GET_ERROR';

export const getIsLoading = isLoading => ({
    type: GET_IS_LOADING,
    payload: isLoading
});
/** Defining Actions */
export const fetchUsersOnly = users => ({
    type: FETCH_USERS_ONLY,
    payload: users
});

export const getError = error => ({
    type: GET_ERROR,
    payload: error
});

const initialState = {
    users: [],
    isLoading: false,
    error: ''
};

/* _________________Profile Thunk________________________ */
// export const getDatafromProfileUrl = () => dispatch => {
//     const url = ['http://localhost:3001/users'];
//     Promise.all(
//         url.map(userUrl => fetch(userUrl).then(resp => resp.json()))
//     ).then(responses =>
//         dispatch(fetchUsersOnly(getDatafromProfileUrl(responses)))
//     );
// };

// export const getDatafromProfileUrl = () => dispatch => {
//     const urls = ['http://localhost:3001/items', 'http://localhost:3001/users'];

//     const combineUrlData = userAndItemData => {
//         userAndItemData[0].map(item => {
//             userAndItemData[1].map(user => {
//                 if (item.itemowner === user.id) {
//                     item.itemowner = user;
//                 }
//             });
//         });
//         return userAndItemData[0];
//     };
//     dispatch(getIsLoading(true));
//     Promise.all(urls.map(url => fetch(url).then(resp => resp.json())))
//         .then(responses => dispatch(fetchItems(combineUrlData(responses))))
//         .catch(error => dispatch(getError(error)));
// };

/** Reducer */
export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_USERS_ONLY: {
        const users = action.payload;
        return { ...state, users, isLoading: false, error: '' };
    }
    case GET_IS_LOADING: {
        return { ...state, isLoading: true, error: '' };
    }
    case GET_ERROR: {
        return { ...state, isLoading: false, error: action.payload };
    }
    default: {
        return {
            ...state
        };
    }
    }
};

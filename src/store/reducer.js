import * as actionTypes from './actions';

const initialState = {
    tickets: []
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TICKET_LIST:
            return {
                ...state,
                tickets: action.tickets
            };
        default:
            return state;
    }
};

export default reducer;
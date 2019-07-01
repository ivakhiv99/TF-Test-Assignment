const initialState = {
    isLoading: 'Search your organization',
    orgsList: [],
};

function OrgsListReducer(state = initialState, action) {
    if (action.type === 'GET_ORGS_LIST') {
        return  action.payload;
    }
    return state;
}


export default OrgsListReducer
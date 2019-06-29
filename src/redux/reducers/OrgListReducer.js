const initialState = {
    isLoading: 'Search your organization',
    orgsList: [],
};
// const OrgsListReducer = (state = initialState, action) => action.type === 'GET_ORGS_LIST' ? action.payload : state;
function OrgsListReducer(state = initialState, action) {
    if (action.type === 'GET_ORGS_LIST') {
        return  action.payload;
    }
    return state;
}


export default OrgsListReducer
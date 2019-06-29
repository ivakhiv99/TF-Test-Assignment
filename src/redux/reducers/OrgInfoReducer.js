const initialState = {
    orgName: '',
    orgInfo: {},
};

function OrgInfoReducer(state = initialState, action) {
    if (action.type === 'GET_ORG_INFO') {
        return  action.payload;
    }
    return state;
}


export default OrgInfoReducer;
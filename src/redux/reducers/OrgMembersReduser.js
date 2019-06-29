const initialState = {
    members: [],
    membersCount: null,
};

function OrgMembersReducer(state = initialState, action) {
    if (action.type === 'GET_ORG_MEMBERS') {
        // console.log('OrgMembersReducer');
        return  action.payload;
    }
    return state;
}


export default OrgMembersReducer;
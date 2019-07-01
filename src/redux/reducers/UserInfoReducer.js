const initialState = {
    userName:'',
    userInfo:{},
};

function UserListReducer(state = initialState, action) {
    if (action.type === 'GET_USER_INFO') {
        return  action.payload;
    }
    return state;
}


export default UserListReducer;
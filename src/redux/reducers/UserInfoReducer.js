const initialState = {
    userName:'',
    userInfo:{},
    // csdasda
};

// const UserListReducer = (state = initialState, action) => action.type === 'GET_USER_LIST' ? action.payload : state;

function UserListReducer(state = initialState, action) {
    if (action.type === 'GET_USER_INFO') {
        return  action.payload;
    }
    return state;
}


export default UserListReducer;
import { combineReducers } from 'redux';
import OrgsListReducer from './reducers/OrgListReducer';
import OrgInfo from './reducers/OrgInfoReducer';
import UserInfo from './reducers/UserInfoReducer';

const allReducers = combineReducers({
    currentSearchResult: OrgsListReducer,
    currentOrg: OrgInfo,
    currentUser: UserInfo,
});

export default allReducers;
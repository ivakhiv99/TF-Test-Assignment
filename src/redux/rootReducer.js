import { combineReducers } from 'redux';
import OrgsListReducer from './reducers/OrgListReducer';
import OrgInfo from './reducers/OrgInfoReducer';
import UserInfo from './reducers/UserInfoReducer';
import OrgMembers from './reducers/OrgMembersReduser';


const allReducers = combineReducers({
    currentSearchResult: OrgsListReducer,
    currentOrg: OrgInfo,
    currentOrgMembers: OrgMembers,
    currentUser: UserInfo,
});

export default allReducers;
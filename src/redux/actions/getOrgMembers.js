export const getOrgMembers = orgMembers => {
    return {
        type: 'GET_ORG_MEMBERS',
        payload: orgMembers
    }
};
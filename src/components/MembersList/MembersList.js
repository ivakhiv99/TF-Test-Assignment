import React from 'react';
import {connect} from 'react-redux';
import {URL} from '../../apiConsts';
import UserListItem from '../UserListItem/UserListItem';
import s from './MembersList.module.scss';

class MembersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgName: this.props.currentOrg.orgName,
            isLoaded: false,
            members: null,
        };
        this.getMembers = this.getMembers.bind(this);
    }

    async getMembers() {
        const req = await fetch(`${URL}/orgs/${this.state.orgName}/members?per_page=100`);
        const members = await req.json();
        this.setState({
            isLoaded: true,
            members: members,
        });
    }

    componentDidMount() {
        this.getMembers();
    }

    render() {
        return this.state.isLoaded ?
                    this.state.members.length > 0 ?
                        <>
                            <h2 className={s.title}> Public members:</h2>
                            <ul className={s.membersList}>
                                {this.state.members.map((member) =>
                                        <UserListItem key={member.id} user={member}/>
                                )}
                            </ul>
                        </>
                        :
                        <h2 className={s.text}>No public members</h2>
            :
            <h1 className={s.text}>Loading...</h1>
    }
}

function mapStateToProps(state) {
    return {currentOrg: state.currentOrg}
}

export default connect(mapStateToProps)(MembersList);
import React from 'react';
import {connect} from "react-redux";
import {CLIENT_ID, CLIENT_SECRET, URL} from "../../apiConsts";
import UserListItem from "../UserListItem/UserListItem";
import {bindActionCreators} from "redux";
import {getOrgInfo} from "../../redux/actions/getOrgInfo";
import {getOrgMembers} from "../../redux/actions/getOrgMembers";
import s from './MembersList.module.scss';

class MembersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgName: this.props.currentOrg.orgName,
            isLoaded: false,
            members: null,
            page: 0
        };
        this.getMembers = this.getMembers.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

    }


    async getMembers(num) {
        const req = await fetch(`${URL}/orgs/${this.state.orgName}/members?page=${this.state.page}&per_page=15&access_token=308067903547ca4e080805668fb12d4aa4fc1d32`);//&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
        const members = await req.json();
        // this.props.getOrgMembers({members: members, membersCount: members.length});
        const nextPageNum = this.state.page + num;
        console.log(nextPageNum);
        this.setState({
            isLoaded: true,
            members: members,
            page: nextPageNum
        });
    }

    next(){
        this.getMembers(1)
    }
    previous(){
        this.getMembers(-1)
    }
    componentDidMount() {
        this.getMembers(1);
    }

    render() {

        console.log(this.state.members);
        // console.log(this.state.page);

        return this.state.isLoaded ?
            <>
                {
                    this.state.members.length > 0 ?
                        <>
                            <h2 className={s.title}> Public members:</h2>
                            <ul className={s.membersList}>
                                {this.state.members.map((member) =>
                                        <UserListItem key={member.id} user={member}/>
                                )}
                            </ul>
                            {/*{*/}
                                {/*this.state.members.length > 0 && this.state.members.length >= 30 ?*/}
                                    {/*<>*/}
                                        {/*<button onClick={this.previous}>hither</button>*/}
                                        {/*<div>{this.state.page}</div>*/}
                                        {/*<button onClick={this.next}>there</button>*/}
                                    {/*</>*/}
                                    {/*:*/}
                                    {/*null*/}
                            {/*}*/}
                        </>
                        :
                        <h2 className={s.text}>No public members</h2>
                }
            </>
            :
            <h1>Loading...</h1>
    }
}

function mapStateToProps(state) {
    return {currentOrg: state.currentOrg}
}

export default connect(mapStateToProps)(MembersList);
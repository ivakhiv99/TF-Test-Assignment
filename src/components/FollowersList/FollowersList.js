import React from 'react';
import {connect} from "react-redux";
import {CLIENT_ID, CLIENT_SECRET, URL} from "../../apiConsts";
import UserListItem from "../UserListItem/UserListItem";
import {bindActionCreators} from "redux";
import {getOrgInfo} from "../../redux/actions/getOrgInfo";
import {getOrgMembers} from "../../redux/actions/getOrgMembers";
import s from './FollowersList.module.scss';
import {getUserInfo} from "../../redux/actions/getUserInfo";

class FollowersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // show: 'followers',
            isLoaded: false,
            followers: []
        };
        this.getFollowers = this.getFollowers.bind(this);
    }

    //https://cors-anywhere.herokuapp.com/

    async getFollowers() {
        console.log(this.props.currentUserInfo.login);

        // const req = await fetch(`${URL}/user/${this.props.currentUserName}/following`);
        const req = await fetch(`${this.props.currentUserInfo.followers_url}?per_page=100`);
        const followers = await req.json();
        console.log('followers', followers);
        this.setState({
            followers: followers,
            followersCount: followers.length
        });

    }


    render() {
        console.log(this.props.currentUserName);
        return this.state.isLoaded ?
            <div>
                {
                    this.state.followers.length > 0 ?
                        <>
                            <div className={s.titleWrapper}>
                                <h2 className={s.title}> User followers:</h2>
                            </div>
                            <ul className={s.followersList}>
                                {this.state.followers.map((follower) =>
                                    <UserListItem key={follower.id} user={follower}/>
                                )}
                            </ul>
                        </>
                        :
                        <h2 className={s.text}>User have no followers</h2>
                }
            </div>
            :
            <h1>Loading...</h1>
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.getFollowers();
    }

    componentDidMount() {
        this.getFollowers().then(
            this.setState({
                isLoaded: true
            })
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUserName: state.currentUser.userName,
        currentUserInfo: state.currentUser.userInfo
    }
}

function MapDispatchToProps(dispatch) {
    return bindActionCreators({getUserInfo: getUserInfo}, dispatch)
}

export default connect(mapStateToProps, MapDispatchToProps)(FollowersList);
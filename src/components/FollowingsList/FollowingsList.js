import React from 'react';
import {connect} from "react-redux";
import {CLIENT_ID, CLIENT_SECRET, URL} from "../../apiConsts";
import UserListItem from "../UserListItem/UserListItem";
import {bindActionCreators} from "redux";
import {getOrgInfo} from "../../redux/actions/getOrgInfo";
import {getOrgMembers} from "../../redux/actions/getOrgMembers";
import s from './FollowingsList.module.scss';
import {getUserInfo} from "../../redux/actions/getUserInfo";

class FollowingsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // show: 'followers',
            isLoaded: false,
            followings: []
        };
        this.getFollowings = this.getFollowings.bind(this);
    }

    //https://cors-anywhere.herokuapp.com/

    async getFollowings() {

        // const req = await fetch(`${URL}/user/${this.props.currentUserName}/following`);
        // let g = this.props.currentUserInfo.following_url -  '{/other_user}';
        const req = await fetch(`${URL}/users/${this.props.currentUserInfo.login}/following?per_page=100`);
        const followings = await req.json();
        console.log('followings', followings);
        this.setState({
            followings: followings,
            followingsCount: followings.length
        });

    }

    render() {
        console.log(this.props.currentUserInfo.following_url);
        return this.state.isLoaded ?
            <div>
                {
                    this.state.followings.length > 0 ?
                        <>
                            <div className={s.titleWrapper}>
                                <h2 className={s.title}> User followings:</h2>
                            </div>
                            <ul className={s.followingsList}>
                                {this.state.followings.map((follow) =>
                                    <UserListItem key={follow.id} user={follow}/>
                                )}
                            </ul>
                        </>
                        :
                        <h2 className={s.text}>User have no followings</h2>
                }
            </div>
            :
            <h1>Loading...</h1>
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.getFollowings();
    }

    componentDidMount() {
        this.getFollowings().then(
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

export default connect(mapStateToProps, MapDispatchToProps)(FollowingsList);
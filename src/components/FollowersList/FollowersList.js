import React from 'react';
import {connect} from "react-redux";
import UserListItem from "../UserListItem/UserListItem";
import s from './FollowersList.module.scss';

class FollowersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            followers: []
        };
        this.getFollowers = this.getFollowers.bind(this);
    }

    async getFollowers(isThereNewProps) {
        const data = isThereNewProps ? isThereNewProps : this.props;
        const req = await fetch(`${data.currentUserInfo.followers_url}?per_page=100`);
        const followers = await req.json();
        this.setState({
            followers: followers,
            followersCount: followers.length
        });
    }

    render() {
        return this.state.isLoaded ?
            this.state.followers.length > 0 ?
                <div>
                    <h2 className={s.title}> User followers:</h2>
                    <ul className={s.list}>
                        {this.state.followers.map((follower) =>
                            <UserListItem key={follower.id} user={follower}/>
                        )}
                    </ul>
                </div>
                :
                <h2 className={s.text}>User have no followers</h2>
            :
            <h1>Loading...</h1>
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.getFollowers(nextProps);
    }

    componentDidMount() {
        this.getFollowers(false).then(
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

export default connect(mapStateToProps)(FollowersList);
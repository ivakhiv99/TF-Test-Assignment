import React from 'react';
import {connect} from 'react-redux';
import {URL} from '../../apiConsts';
import UserListItem from '../UserListItem/UserListItem';
import s from './FollowingsList.module.scss';

class FollowingsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            followings: []
        };
        this.getFollowings = this.getFollowings.bind(this);
    }

    async getFollowings(isThereNewProps) {
        const data = isThereNewProps ? isThereNewProps : this.props;
        const req = await fetch(`${URL}/users/${data.currentUserInfo.login}/following?per_page=100`);
        const followings = await req.json();
        this.setState({
            followings: followings,
            followingsCount: followings.length
        });
    }

    render() {
        return this.state.isLoaded ?
            this.state.followings.length > 0 ?
                <div>
                    <h2 className={s.title}> User followings:</h2>
                    <ul className={s.list}>
                        {this.state.followings.map((follow) =>
                            <UserListItem key={follow.id} user={follow}/>
                        )}
                    </ul>
                </div>
                :
                <h2 className={s.text}>User have no followings</h2>
            :
            <h1>Loading...</h1>
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getFollowings(nextProps);
    }

    componentDidMount() {
        this.getFollowings(false).then(
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

export default connect(mapStateToProps)(FollowingsList);
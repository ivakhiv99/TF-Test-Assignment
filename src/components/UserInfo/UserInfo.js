import React from 'react';
import {connect} from "react-redux";
import {URL, CLIENT_ID, CLIENT_SECRET} from "../../apiConsts";
import s from './UserInfo.module.scss';
import {Link} from "react-router-dom";
import {routes} from "../../Router";

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.followersCount);
        return (
            <div className={s.userHeader}>
                <div className={s.left}>
                    <img src={this.props.currentUserInfo.avatar_url}
                         className={s.userAvatar}/>
                    <h1 className={s.userName}>{this.props.currentUserName}</h1>
                </div>
                <div className={s.right}>
                    {this.props.followersCount ?
                        this.props.followersCount < 100 ?
                            <h3 className={s.followersCount}>followers {this.props.followersCount}</h3>
                            :
                            <h3 className={s.followersCount}>100+ followers</h3>
                        :
                        null
                    }
                    <a href={this.props.currentUserInfo.html_url} target='blank'>
                        <img src="https://img.icons8.com/material-sharp/48/000000/github.png"/>
                    </a>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUserName: state.currentUser.userName,
        currentUserInfo: state.currentUser.userInfo,
        followersCount: state.currentUser.followersCount,
    }
}

export default connect(mapStateToProps)(UserInfo);
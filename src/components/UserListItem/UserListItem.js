import React from 'react';
import {bindActionCreators} from "redux";
import {getUserInfo} from "../../redux/actions/getUserInfo";
import history from "../../history";
import {routes} from "../../Router";
import {connect} from "react-redux";
import s from './UserListItem.module.scss';

class UserListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            // followings: [],
            // followers: [],
        };
        this.selectUser = this.selectUser.bind(this);
    }

    selectUser() {
        const payload = {
            userName: this.props.user.login,
            userInfo: this.props.user
        };
        this.props.getUserInfo(payload);
        console.log(history);
        history.push(routes.user);
    }

    render() {
        return (
            <li className={s.userItem}>
                <img onClick={this.selectUser} className={s.userLogo} src={this.props.user.avatar_url}/>
                <span onClick={this.selectUser} className={s.userName}>{this.props.user.login}</span>
            </li>
        )
    }
}


// {
//     this.state.isLoaded ?
//         <>
//             <button className={s.userFollow}>Followers {this.state.followers.length}</button>
//             <button className={s.userFollow}>Following {this.state.followings.length}</button>
//         </>
//         :
//         null
// }


function mapDispatchToProps(dispatch) {
    return bindActionCreators({getUserInfo: getUserInfo}, dispatch)
}

export default connect(null, mapDispatchToProps)(UserListItem);
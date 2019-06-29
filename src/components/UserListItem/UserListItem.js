import React from 'react';
import {bindActionCreators} from "redux";
import {getUserInfo} from "../../redux/actions/getUserInfo";
import history from "../../history";
import {routes} from "../../Router";
import {connect} from "react-redux";
import {URL, CLIENT_ID, CLIENT_SECRET} from "../../apiConsts";
import s from './UserListItem.module.scss';

class UserListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            followings: [],
            followers: [],
        };
        this.selectUser = this.selectUser.bind(this);
    }

    selectUser() {
        // const payload = {
        //     userName: this.props.useR.login,
        //     userInfo: this.props.user
        // };
        // this.props.getUserInfo(payload);
        history.push(routes.user);
    }

// /users/:username/following

// /user/following
    //page=${this.state.page}&
    async getFollowings() {
        // let t = 'ivahiv99:308067903547ca4e080805668fb12d4aa4fc1d32 ';
        // let g = t.toString('base64')
        const req = await fetch(`${URL}/user/following&?per_page=15&access_token=308067903547ca4e080805668fb12d4aa4fc1d32`);//client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
        // , {
        //     headers: {
        //         'Authorization': 'basic' + g
        //     }
        // });
        const followings = await req.json();
        this.setState({
            followings: followings,
        });
    }

    async getFollowers() {
        // const req = await fetch(`${URL}/user/${this.props.user.login}/following&?per_page=15&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);


        //https://cors-anywhere.herokuapp.com/
        const p = 'ivahiv99:tel56to72kl82nam7';
        let opa = p.toString('base64');
        const req = await fetch(`${URL}/user/${this.props.user.login}/following`, {
            headers: {
                'Authorization': 'Basic' + opa
                // 'client_secret': CLIENT_SECRET
            }
        });


        const followers = await req.json();
        this.setState({
            followers: followers,
        });
    }

    async getRate() {
        const req = await fetch(`${URL}/rate_limit`);
        const rate = await req.json();
        console.log('rate', rate);
    }

    componentDidMount() {
        this.getFollowers().then(
            // this.getFollowings()
        ).then(
            this.setState({
                isLoaded: true
            })).then(
            this.getRate()
        )
    }

    render() {
        console.log(this.state.followers);
        return (
            <li onClick={this.selectUser} className={s.userItem}>
                <img className={s.userLogo} src={this.props.user.avatar_url}/>
                <span className={s.userName}>{this.props.user.login}</span>
                {
                    this.state.isLoaded ?
                        <>
                            <button className={s.userFollow}>Followers {this.state.followers.length}</button>
                            <button className={s.userFollow}>Following {this.state.followings.length}</button>
                        </>
                        :
                        null
                }
            </li>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getUserInfo: getUserInfo}, dispatch)
}

export default connect(null, mapDispatchToProps)(UserListItem);
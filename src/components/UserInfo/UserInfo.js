import React from 'react';
import {connect} from 'react-redux';
import {URL} from '../../apiConsts';
import s from './UserInfo.module.scss';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        };
        this.getInfo = this.getInfo.bind(this);
        this.format = this.format.bind(this);
    }

    async getInfo(isThereNewProps) {
        const data = isThereNewProps ? isThereNewProps : this.props;
        const req = await fetch(`${URL}/users/${data.currentUserInfo.login}`);
        const userInfo = await req.json();
        this.setState({
            following: this.format( userInfo.following),
            followers: this.format( userInfo.followers),
            location:  this.format( userInfo.location),
            company:   this.format( userInfo.company),
            name:      this.format( userInfo.name),
            bio:       this.format( userInfo.bio)
        });
    }

    format(text){
        if(text){
            return this.makeItShort(text);
        }
        return text;
    }

    makeItShort(text){
        if (text.length > 15){
            return text.substring(0,15).concat('...');
        }
        return text;
    }

    render() {
        return (
            <div className={s.userHeader}>
                <div className={s.top}>
                    <div className={s.left}>
                        <img src={this.props.currentUserInfo.avatar_url}
                             className={s.userAvatar}/>
                        <h1 className={s.userName}>{this.props.currentUserName}</h1>
                    </div>
                    <div className={s.right}>
                        <a href={this.props.currentUserInfo.html_url} target='blank'>
                            <img src='https://img.icons8.com/material-sharp/48/000000/github.png'/>
                        </a>
                    </div>
                </div>
                <div className={s.bottom}>
                    {this.state.name       ? <h4 className={s.bottomTitle}>name:      <span>{this.state.name}</span>      </h4>  :null }
                    {this.state.bio        ? <h4 className={s.bottomTitle}>bio:       <span>{this.state.bio}</span>       </h4>  :null }
                    {this.state.location   ? <h4 className={s.bottomTitle}>location:  <span>{this.state.location}</span>  </h4>  :null }
                    {this.state.company    ? <h4 className={s.bottomTitle}>company:   <span>{this.state.company}</span>   </h4>  :null }
                    {this.state.followers  ? <h4 className={s.bottomTitle}>followers: <span>{this.state.followers}</span> </h4>  :null }
                    {this.state.following  ? <h4 className={s.bottomTitle}>following: <span>{this.state.following}</span> </h4>  :null }
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getInfo(nextProps);
    }

    componentDidMount() {
        this.getInfo(false).then(
            this.setState({
                isLoaded: true
            })
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUserName: state.currentUser.userName,
        currentUserInfo: state.currentUser.userInfo,
    }
}

export default connect(mapStateToProps)(UserInfo);
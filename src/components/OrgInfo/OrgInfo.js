import React from 'react';
import {connect} from "react-redux";
import {URL, CLIENT_ID, CLIENT_SECRET} from "../../apiConsts";
import s from './OrgInfo.module.scss';

class OrgInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            reposCount: null,
        }
    }

    async getReposCount() {
        const req = await fetch(`${this.props.currentOrg.orgInfo.repos_url}?per_page=1000&page=1&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
        const repos = await req.json();
        console.log(repos);

        this.setState({
            isLoaded: true,
            reposCount: repos.length,
        });
    }

    componentDidMount() {
        this.getReposCount();
    }

    render() {
        return (
            <div className={s.orgHeader}>
                <div className={s.left}>
                    <img src={this.props.currentOrg.orgInfo.avatar_url}
                         className={s.orgLogo}/>
                    <h1 className={s.orgName}>{this.props.currentOrg.orgName}</h1>
                </div>
                <div className={s.right}>
                    {this.state.isLoaded ?
                        this.state.reposCount < 100 ?
                            <h3 className={s.reposCount}>Repos {this.state.reposCount}</h3>
                            :
                            <h3 className={s.reposCount}>100+ repos</h3>
                        :
                        null
                    }
                    <a href={this.props.currentOrg.orgInfo.html_url} target='blank'>
                        <img src="https://img.icons8.com/material-sharp/48/000000/github.png"/>
                    </a>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentOrg: state.currentOrg,
    }
}

export default connect(mapStateToProps)(OrgInfo);
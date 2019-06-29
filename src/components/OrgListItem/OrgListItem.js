import React from 'react';
import {bindActionCreators} from "redux";
import {getOrgInfo} from "../../redux/actions/getOrgInfo";
import history from "../../history";
import {routes} from "../../Router";
import {connect} from "react-redux";
import s from './OrgListItem.module.scss';

class OrgListItem extends React.Component {

    constructor(props) {
        super(props);

        this.selectOrg = this.selectOrg.bind(this);
    }

    selectOrg() {
        console.log('helloo there');
        const payload = {
            orgName: this.props.orgInfo.login,
            orgInfo: this.props.orgInfo
        };
        this.props.getOrgInfo(payload);
        history.push(routes.organization);
    }

    render() {
        return (
            <li className={s.orgItem} key={this.props.orgInfo.id}>
                <img src={this.props.orgInfo.avatar_url} className={s.orgLogo} onClick={this.selectOrg}/>
                <span className={s.orgName} onClick={this.selectOrg}>{this.props.orgInfo.login}</span>
            </li>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getOrgInfo: getOrgInfo}, dispatch)
}

export default connect(null, mapDispatchToProps)(OrgListItem);
import React from 'react';
import {connect} from "react-redux";
import OrgListItem from '../OrgListItem';
import s from './OrgList.module.scss';

class OrgList extends React.Component {
    render() {
        return this.props.currentSearchResult.length > 0 ?
            <ul className={s.orgList}>
                {this.props.currentSearchResult.map((org) =>
                    <OrgListItem key={org.id} orgInfo={org}/>
                )}
            </ul>
            :
            <h1 className={s.text}>{this.props.isLoading}</h1>
    }
}

function mapStateToProps(state) {
    return {
        currentSearchResult: state.currentSearchResult.orgsList,
        isLoading: state.currentSearchResult.isLoading
    }
}


export default connect(mapStateToProps)(OrgList)
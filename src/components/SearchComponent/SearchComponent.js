import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getOrgsList} from '../../redux/actions/getOrgsList';
import {URL} from '../../apiConsts';
import s from './SearchComponent.module.scss';

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async request(val) {
        this.props.getOrgsList({
            isLoading: 'Loading...',
            orgsList: [],
        });
        const req = await fetch(`${URL}/search/users?q=${val}+type:org&access_token=308067903547ca4e080805668fb12d4aa4fc1d32`);
        const orgsList = await req.json();
        this.props.getOrgsList({
            isLoading: 'Search your organization',
            orgsList: orgsList.items
        });
    }

    handleInput(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    handleSubmit() {
        if (this.state.inputValue.trim() !== '') {
            this.request(this.state.inputValue.trim())
        }
    }

    render() {
        return (
            <div className={s.searchHeader}>
                <input className={s.searchInput} type='text' onChange={this.handleInput}/>
                <button className={s.searchBtn} onClick={this.handleSubmit}>
                    <img src="https://img.icons8.com/ios/30/000000/search.png" alt={'Search'}/>
                </button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getOrgsList: getOrgsList}, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchComponent);
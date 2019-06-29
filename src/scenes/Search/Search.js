import React from 'react';
import SearchComponent from '../../components/SearchComponent';
import OrgList from '../../components/OrgList';
import s from './Search.module.scss';

class Search extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <SearchComponent/>
                <OrgList/>
            </div>
        );
    }
}

export default Search
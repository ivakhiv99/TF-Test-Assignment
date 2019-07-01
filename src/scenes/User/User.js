import React from 'react';
import UserInfo from "../../components/UserInfo";
import FollowersList from "../../components/FollowersList";
import FollowingsList from "../../components/FollowingsList";
import s from './User.module.scss';
import {Link} from "react-router-dom";
import {routes} from "../../Router";

export default function User() {
    return (
        <div>
            <UserInfo/>
            <div className={s.linkWrapper}>
                <Link className={s.link} to={routes.search}>Back to search</Link>
            </div>
            <div className={s.lists}>
                <FollowersList/>
                <FollowingsList/>
            </div>
        </div>
    );
}
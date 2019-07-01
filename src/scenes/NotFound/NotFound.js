import React from 'react';
import {Link} from 'react-router-dom';
import {routes} from '../../Router';
import s from './NotFound.module.scss';

export default function NotFound() {
    return (
        <div className={s.wrapper}>
            <h1 className={s.text}>Error 404</h1>
            <h2 className={s.text}>Page not found</h2>
            <h2 className={s.text}>Maybe try <Link className={s.link} to={routes.search}>this</Link>?</h2>
        </div>
    );
}
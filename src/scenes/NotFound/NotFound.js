import React from 'react';
import {Link} from 'react-router-dom';
import {routes} from '../../Router';

export default function NotFound() {
    return (
        <>
            <h1>Error 404</h1>
            <h2>Page not found</h2>
            <h2>Maybe try <Link to={routes.search}>this</Link>?</h2>
        </>
    );
}
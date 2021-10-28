import { Link, RouteComponentProps } from '@reach/router';
import * as React from 'react';

import style from './style.scss';

export const Loading: React.FC = () => <div>Loading...</div>;

export const NotFound: React.FC<RouteComponentProps> = () => (
    <div className={style.container}>
        <h2>404 Not found</h2>
        <p>Sorry, content you are looking for was not found.</p>
        <Link to={'/'}>Go Home</Link>
    </div>
);

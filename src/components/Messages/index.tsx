import * as React from 'react';
import style from './style.scss';
import {Link} from "@reach/router";

export const Loading = () => <div>Loading...</div>

export const NotFound = () => <div className={style.container}>
  <h2>404 Not found</h2>
  <p>Sorry, content you are looking for was not found.</p>
  <Link to={'/'}>Go Home</Link>
</div>

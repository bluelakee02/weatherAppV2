import './style.global.scss';
import 'normalize.css';
import * as React from 'react';
import ReactDOM from 'react-dom';

import "core-js/stable";
import "regenerator-runtime/runtime";
import ViewsContainer from './containers/viewContainer';

ReactDOM.render(<ViewsContainer />, document.getElementById('root'));
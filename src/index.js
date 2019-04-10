import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AppContainer } from 'react-hot-loader';
import * as serviceWorker from './serviceWorker';
import { store } from './store';

import './stylesheets/index.css';

const MOUNT_POINT = document.getElementById('root');

ReactDOM.render(
	<AppContainer>
		<App store={store} />
	</AppContainer>,
	MOUNT_POINT
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

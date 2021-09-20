import { Playground, store } from '@lumapps-extensions-playground/devenv';

import '@lumapps-extensions-playground/devenv/devenv.esm.css';

// DO not remove
import '@lumx/core/lumx.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import config from './config.js';

import { Share } from './extension/Share';
import { ShareGlobalSettings } from './extension/ShareGlobalSettings';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Playground config={config} ContentComponent={Share} GlobalSettingsComponent={ShareGlobalSettings} />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Playground, store } from '@lumapps-extensions-playground/devenv';

import '@lumx/core/lumx.css';

import { Share } from './extension/Share';
import { ShareGlobalSettings } from './extension/ShareGlobalSettings';

import config from './config.js';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Playground
                config={config as import('lumapps-sdk-js').ExtensionConfig}
                ContentComponent={Share}
                GlobalSettingsComponent={ShareGlobalSettings}
            />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

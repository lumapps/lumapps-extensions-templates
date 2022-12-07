import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Playground, store } from '@lumapps-extensions-playground/devenv';

import '@lumx/core/lumx.css';

import config from './config.js';
import { SearchSettings } from './index.settings';
import { SearchGlobalSettings } from './index.global_settings';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Playground
                config={config as any}
                SettingsComponent={SearchSettings}
                GlobalSettingsComponent={SearchGlobalSettings}
            />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

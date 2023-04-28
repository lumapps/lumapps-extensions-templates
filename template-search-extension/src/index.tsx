import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ExtensionConfig } from 'lumapps-sdk-js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Playground, store } from '@lumapps-extensions-playground/devenv';

import '@lumx/core/lumx.css';

import config from './config';
import { SearchSettings } from './index.settings';
import { SearchPagePreview } from './playground/SearchPagePreview';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Playground
                config={config as ExtensionConfig}
                ContentComponent={SearchPagePreview}
                SettingsComponent={SearchSettings}
            />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

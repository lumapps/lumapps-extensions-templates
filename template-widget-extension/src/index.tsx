import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Playground, store } from '@lumapps-extensions-playground/devenv';

import '@lumx/core/lumx.css';

import { Widget } from './widget/Widget';
import { WidgetSettings } from './widget/WidgetSettings';
import { WidgetGlobalSettings } from './widget/WidgetGlobalSettings';

// eslint-disable-next-line import/extensions
import config from './config';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Playground
                config={config as import('lumapps-sdk-js').ExtensionConfig}
                ContentComponent={Widget}
                SettingsComponent={WidgetSettings}
                GlobalSettingsComponent={WidgetGlobalSettings}
            />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

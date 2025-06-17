import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Playground, store } from '@lumapps-extensions-playground/devenv';

import '@lumx/core/lumx.css';

import { WidgetGlobalSettings } from './widget/WidgetGlobalSettings';

import config from './config';

const container = document.getElementById('root') as Element;

const root = createRoot(container);

root.render(
    <Provider store={store}>
        <Playground
            config={config as Pick<import('lumapps-sdk-js').ExtensionConfig, 'category' | 'extensionId'>}
            GlobalSettingsComponent={WidgetGlobalSettings}
        />
    </Provider>,
);

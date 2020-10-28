import { Playground } from '@lumapps-extensions-playground/devenv';

import '@lumapps-extensions-playground/devenv/devenv.esm.css';

// We only import both themes for the theme switch
// The order of import is important
import '@lumx/core/lumx-theme-material.min.css';
import '@lumx/core/lumx-theme-lumapps.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import config from './config';
import { Widget, WidgetGlobalSettings, WidgetSettings } from './widget';

ReactDOM.render(
    <React.StrictMode>
        <Playground
            config={config}
            Widget={Widget}
            WidgetSettings={WidgetSettings}
            WidgetGlobalSettings={WidgetGlobalSettings}
        />
    </React.StrictMode>,
    document.getElementById("root")
);

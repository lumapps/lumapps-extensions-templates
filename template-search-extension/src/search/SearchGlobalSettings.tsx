import React from 'react';
import { GlobalSettingsComponent, useExportProps } from 'lumapps-sdk-js';
import { TextField } from '@lumx/react';

import { SampleSearchGlobalParams } from './types';
import { DEFAULT_GLOBAL_SETTINGS } from './constants';

type SearchGlobalSettings = GlobalSettingsComponent<SampleSearchGlobalParams>;

/**
 * Render the widget Picsum settings form.
 *
 * @param {Object} props The settings component properties.
 */
export const SearchGlobalSettings: SearchGlobalSettings = ({ properties = DEFAULT_GLOBAL_SETTINGS, exportProp }) => {
    const [currentBaseUrl, setCurrentBaseUrl] = React.useState(properties.baseUrl || DEFAULT_GLOBAL_SETTINGS.baseUrl);

    useExportProps(currentBaseUrl, 'baseUrl', properties, exportProp);

    return (
            <TextField
                label="Base URL"
                value={currentBaseUrl}
                onChange={setCurrentBaseUrl}
            />
    );
};

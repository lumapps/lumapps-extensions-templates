import React, { useState } from 'react';
import { TextField } from '@lumx/react';
import { useDebounce, useExportProps } from 'lumapps-sdk-js';

import defaultGlobalSettings from './defaultGlobalSettings';

type WidgetGlobalSettings = import('lumapps-sdk-js').GlobalSettingsComponent<import('./types').SampleAppGlobalParams>;

/**
 * Render the widget Picsum settings form.
 *
 * @param {Object} props The settings component properties.
 */
export const WidgetGlobalSettings: WidgetGlobalSettings = ({ properties = {}, exportProp }) => {
    const [baseUrl, setBaseUrl] = useState(properties.baseUrl || defaultGlobalSettings.baseUrl);
    const debouncedBaseUrl = useDebounce(baseUrl, 800);

    useExportProps(debouncedBaseUrl, 'baseUrl', properties, exportProp);

    return (
        <div>
            <TextField className="mt0 ml" label="URL" value={baseUrl} onChange={setBaseUrl} />
        </div>
    );
};

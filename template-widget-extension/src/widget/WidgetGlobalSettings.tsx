import React, { useState } from 'react';
import { TextField } from '@lumx/react';
import { useDebounce, useProperties } from 'lumapps-sdk-js';

import defaultGlobalSettings from './defaultGlobalSettings';
import { SampleAppGlobalParams } from './types';

type WidgetGlobalSettings = import('lumapps-sdk-js').GlobalSettingsComponent<SampleAppGlobalParams>;

/**
 * Render the widget Picsum settings form.
 *
 * @param {Object} props The settings component properties.
 */
export const WidgetGlobalSettings: WidgetGlobalSettings = () => {
    const { globalProperties, save } = useProperties<SampleAppGlobalParams>();
    const [baseUrl, setBaseUrl] = useState(globalProperties?.baseUrl || defaultGlobalSettings.baseUrl);
    const debouncedBaseUrl = useDebounce(baseUrl, 800);

    save({ baseUrl: debouncedBaseUrl });

    return (
        <div>
            <TextField className="mt0 ml" label="URL" value={baseUrl} onChange={setBaseUrl} />
        </div>
    );
};

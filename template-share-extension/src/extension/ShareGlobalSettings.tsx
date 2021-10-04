import React, { useState } from 'react';
import { TextField } from '@lumx/react';

import { useDebounce, useExportProps } from '@lumapps-extensions-playground/common';

import defaultGlobalSettings from './defaultGlobalSettings';

/**
 * Render the widget Picsum settings form.
 *
 * @param {Object} props The settings component properties.
 */
export const ShareGlobalSettings = ({ properties = {}, exportProp }: any) => {
    const [baseUrl, setBaseUrl] = useState(properties.baseUrl || defaultGlobalSettings.baseUrl);
    const debouncedBaseUrl = useDebounce(baseUrl, 800);

    useExportProps(debouncedBaseUrl, 'baseUrl', properties, exportProp);

    return (
        <div>
            <TextField className="mt0 ml" label="URL" value={baseUrl} onChange={setBaseUrl} />
        </div>
    );
};

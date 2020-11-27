// react and react-dom are not part of the package.json
// dependencies because of a conflict with LumX versions
// (imho, LumX should put react and react-dom in peer dependencies)
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
import { TextField } from '@lumx/react';
import { useDebounce, useExportProps } from '@lumapps-extensions-playground/common';
import defaultGlobalSettings from './defaultGlobalSettings';
/**
 * Render the widget Picsum setttings form.
 *
 * @param {Object} props The settings component properties.
 */
const WidgetGlobalSettings = ({ properties = {}, exportProp }) => {
    const [baseUrl, setBaseUrl] = useState(properties.baseUrl || defaultGlobalSettings.baseUrl);
    const debouncedBaseUrl = useDebounce(baseUrl, 800);
    useExportProps(debouncedBaseUrl, 'baseUrl', properties, exportProp);
    return (
        <div>
            <TextField className="mt0 ml" label="URL" value={baseUrl} onChange={setBaseUrl} />
        </div>
    );
};
export default WidgetGlobalSettings;

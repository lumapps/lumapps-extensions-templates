import React from 'react';
import { TextField } from '@lumx/react';
import { SettingsComponent, useExportProps } from 'lumapps-sdk-js';

import { SampleSearchGlobalParams, SampleSearchParams } from './types';
import { DEFAULT_GLOBAL_SETTINGS, DEFAULT_SETTINGS } from './constants';

type SearchSettingsProps = SettingsComponent<SampleSearchGlobalParams, SampleSearchParams>;

export const SearchSettings: SearchSettingsProps = ({ exportProp, properties = DEFAULT_SETTINGS, globalProperties }) => {
    const [currentSearchId, setCurrentSearchId] = React.useState(properties.searchId || DEFAULT_SETTINGS.searchId);

    useExportProps(currentSearchId, 'searchId', properties, exportProp);

    return (
            <TextField
                label={`Search identifier for "${globalProperties?.baseUrl || DEFAULT_GLOBAL_SETTINGS.baseUrl}"`}
                value={currentSearchId}
                onChange={setCurrentSearchId}
            />
    );
};

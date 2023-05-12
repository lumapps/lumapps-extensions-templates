import React from 'react';
import { TextField } from '@lumx/react';
import { SettingsComponent, useExportProps } from 'lumapps-sdk-js';

import { ExtensionGlobalSearchSettings, ExtensionSearchSettings } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

type SearchSettingsProps = SettingsComponent<ExtensionGlobalSearchSettings, ExtensionSearchSettings>;

/**
 * TODO: Change this component to fit your needs.
 * @param ExtensionSearchSettings
 * @returns SearchSettings React component
 */
export const SearchSettings: SearchSettingsProps = ({ exportProp, properties = DEFAULT_SETTINGS }) => {
    const [currentSearchId, setCurrentSearchId] = React.useState(properties.searchId || DEFAULT_SETTINGS.searchId);

    useExportProps(currentSearchId, 'searchId', properties, exportProp);

    return <TextField label="Search identifier" value={currentSearchId} onChange={setCurrentSearchId} />;
};

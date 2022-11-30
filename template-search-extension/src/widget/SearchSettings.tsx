import React from 'react';
import { SettingsComponent } from 'lumapps-sdk-js';

export type SearchSettingsTab = {};

type SearchSettingsProps = SettingsComponent<any, SearchSettingsTab>;

export const SearchSettings: SearchSettingsProps = ({ exportProp, properties = {} }) => {
    return <></>;
};

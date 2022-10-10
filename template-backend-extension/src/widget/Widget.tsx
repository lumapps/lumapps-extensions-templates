import React from 'react';
import { Theme } from '@lumx/react';

type Widget = import('lumapps-sdk-js').ContentComponent<any, any>;

const Widget: Widget = ({ value = {}, globalValue = {}, theme = Theme.light }) => {
    return <></>;
};

export { Widget };

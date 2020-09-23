// react and react-dom are not part of the package.json
// dependencies because of a conflict with LumX versions
// (imho, LumX should put react and react-dom in peer dependencies)
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

const WidgetGlobalSettings = () => <></>;
export default WidgetGlobalSettings;
  
/**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
 */
export const useGlobalSettings = false;

const providerId = 'LumAppsLAB';

const bundleName = 'SampleWidgetTest152';

const description = {
  en: 'SampleWidgetTest152',
};

const name = {
  en: 'SampleWidgetTest152',
};

const icon = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/airplane_2708.png'; // a working link to your widget icon

// do not change the following unless you know what you are doing
const config = {
  bundleName: `${bundleName}.mdr`,
  description,
  name,
  extensionComponents: [
    {
      componentName: 'Widget', // must reflect the component exported in 'index.widget.js' and/or index.widget.no_global.js
      type: 'WidgetContent', // DO NOT CHANGE
      version: '0.0.1',
    },
    {
      componentName: 'WidgetSettings', // must reflect the component exported in 'index.widget.js' and/or index.widget.no_global.js
      type: 'WidgetSettings', // DO NOT CHANGE
      version: '0.0.1',
    },
    {
      componentName: 'WidgetGlobalSettings', // must reflect the component exported in 'index.widget.js' and/or index.widget.no_global.js
      type: 'GlobalWidgetSettings', // DO NOT CHANGE
      version: '0.0.1',
    },
  ],
  icon,
  providerId,
  type: 'widget',
  isActivated: true,
};

if (!useGlobalSettings) {
  config.extensionComponents.pop();
}

export default config;
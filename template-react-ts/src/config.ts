/**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
*/

 export const useGlobalSettings = true;

const providerId = 'LumAppsLAB';

const bundleName = 'SampleWidgetTypescript';

const description = {
  en: 'SampleWidgetTypescript',
};

const name = {
  en: 'SampleWidgetTypescript',
};

const icon = 'https://lh3.googleusercontent.com/-6F_iwel8KGY/WD8MdGS0PkI/AAAAAAAAGDI/KaqvKtZCK_AsdK6BcKp6Cy1MpwoEWCUvgCKgB/s400/logo.png'; // a working link to your widget icon

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
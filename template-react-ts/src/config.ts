/**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
 */

import {
  ComponentTypes,
  ExtensionCategories,
  ExtensionConfigProps,
} from '@lumapps-extensions-playground/playground-server';

export const useGlobalSettings = true;

const providerId: ExtensionConfigProps['providerId'] = 'LumAppsLAB';

const extensionId: ExtensionConfigProps['extensionId'] = '0123456789';

const description: ExtensionConfigProps['description'] = {
  en: 'Sample Widget written using Typescript',
};

const name: ExtensionConfigProps['name'] = {
  en: 'SampleWidgetTypescript',
};

const icon: ExtensionConfigProps['icon'] = {
  en:
      'https://lh3.googleusercontent.com/-6F_iwel8KGY/WD8MdGS0PkI/AAAAAAAAGDI/KaqvKtZCK_AsdK6BcKp6Cy1MpwoEWCUvgCKgB/s400/logo.svg',
};

// do not change the following unless you know what you are doing
const config: ExtensionConfigProps = {
  category: ExtensionCategories.Widget,
  description,
  extensionComponents: [
    {
      componentName: 'Widget', // must reflect the component exported in 'index.widget.js' and/or index.widget.no_global.js
      entryFile: './widget/Widget.js',
      type: ComponentTypes.content,
      version: '0.0.1',
    },
    {
      componentName: 'WidgetSettings', // must reflect the component exported in 'index.widget.js' and/or index.widget.no_global.js
      entryFile: './widget/WidgetSettings.js',
      type: ComponentTypes.settings,
      version: '0.0.1',
    },
    {
      componentName: 'WidgetGlobalSettings', // must reflect the component exported in 'index.widget.js' and/or index.widget.no_global.js
      entryFile: './widget/WidgetGlobalSettings.js',
      type: ComponentTypes.global_settings,
      version: '0.0.1',
    },
  ],
  extensionId,
  icon,
  name,
  providerId,
  public: false,
};

if (!useGlobalSettings) {
  config.extensionComponents.pop();
}

export default config;

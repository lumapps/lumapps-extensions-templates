"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useGlobalSettings = void 0;

/**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
 */
var useGlobalSettings = true;
/**
 * The ids of your provider and extension
 */

exports.useGlobalSettings = useGlobalSettings;
var providerId = '111254103421414216664258126308453860562';
var extensionId = '101021853165562821606065325782027490855';
var description = {
  en: 'SampleWidgetTypescript'
};
var name = {
  en: 'SampleWidgetTypescript'
};
var icon = {
  en: 'https://lh3.googleusercontent.com/-6F_iwel8KGY/WD8MdGS0PkI/AAAAAAAAGDI/KaqvKtZCK_AsdK6BcKp6Cy1MpwoEWCUvgCKgB/s400/logo.png' // a working link to your widget icon

};
/**
 * The components available for your extensions
 * 'content' : For the Widget content itself (required)
 * 'settings' : For your widget settings
 * 'globalSettings' : For globalsettings used by platform admin.
 */

var components = ['content', 'settings', 'global_settings']; // Whether the extension is public or not in the marketplace.

var isPublic = true;
/**
 * The list of authorized customer ids.
 *
 * If your extension is not public only these customers will see and
 * will be able to install this extensions.
 */

var whitelist = []; // do not change the following unless you know what you are doing

var config = {
  providerId: providerId,
  extensionId: extensionId,
  name: name,
  description: description,
  icon: icon,
  components: components,
  isPublic: isPublic,
  public: isPublic,
  whitelist: whitelist,
  category: 'widget'
};

if (!useGlobalSettings) {
  config.components.pop();
}

var _default = config;
exports.default = _default;
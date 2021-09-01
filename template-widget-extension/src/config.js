/**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
 */

/**
 * The ids of your partner and extension
 */
const partnerId = '';
const extensionId = '';

const description = {
    en: 'SampleWidgetTypescript',
};

const name = {
    en: 'SampleWidgetTypescript',
};

const icon = {
    en:
        'https://lh3.googleusercontent.com/-6F_iwel8KGY/WD8MdGS0PkI/AAAAAAAAGDI/KaqvKtZCK_AsdK6BcKp6Cy1MpwoEWCUvgCKgB/s400/logo.png', // a working link to your widget icon
};


/**
 * Define if your extension needs to connect to extenal service through an application declare on provider side.
 * 
 * Uncomment the following block to declare application usage for your extension.
 * Do not forget to add the application attribute in the config object.
 */ 
/*const application = {
    providerType: '',
};*/

/**
 * The documentation's url of the extension.
 */
const links = {
    documentation: null,
}

/**
 * The components available for your extensions
 * 'content' : For the Widget content itself (required)
 * 'settings' : For your widget settings
 * 'globalSettings' : For global settings used by platform admin.
 */
const components = ['content', 'settings', 'global_settings'];

// Whether the extension is public or not in the marketplace.
const isPublic = true;

/**
 * The list of authorized customer ids.
 *
 * If your extension is not public only these customers will see and
 * will be able to install this extensions.
 */
const whitelist = [];

// do not change the following unless you know what you are doing
const config = {
    partnerId,
    extensionId,
    name,
    description,
    icon,
    //application,
    links,
    components,
    isPublic,
    public: isPublic,
    whitelist,
    category: 'widget',
};

export default config;

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
    en: 'Sample extension to share contents and posts',
};

const name = {
    en: 'Share Extension - Sample',
};

const icon = {
    en: 'https://snipstock.com/assets/cdn/png/9c1f15d4a0f1db7c0faa3daae39e56bd.png',
};

const shareTo = {
    name: {
        en: 'My external service',
    },
    icon: {
        en: 'https://www.logolynx.com/images/logolynx/56/56f9957253c5718361c93a52c1ab950d.png'
    },
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
 * 'content' : For the share dialog content  (required)
 * 'globalSettings' : For global settings used by platform admin.
 */
const components = ['content', 'global_settings'];

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
    shareTo,
    //application,
    links,
    components,
    isPublic,
    public: isPublic,
    whitelist,
    category: 'share_to',
};

export default config;

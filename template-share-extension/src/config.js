/**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
 */

/**
 * The ids of your partner and extension
 */
const partnerId = {
    beta: '',
    production: '',
};

const extensionId = {
    beta: '',
    production: '',
};

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
        en: 'https://www.logolynx.com/images/logolynx/56/56f9957253c5718361c93a52c1ab950d.png',
    },
};

/**
 * Define the availability of your extension :
 * - open : available for everyone
 * - marketplace : the customer need to have access to the marketplace
 */

const availability = 'marketplace';

/**
 * Define if your extension needs to connect to external service through an application declare on provider side.
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
};

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
    availability,
    category: 'share_to',
    components,
    description,
    extensionId,
    icon,
    links,
    name,
    partnerId,
    public: isPublic,
    shareTo,
    whitelist,
};

export default config;

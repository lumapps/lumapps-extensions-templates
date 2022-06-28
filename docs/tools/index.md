---
layout: default
title: Tools
nav_order: 3
has_children: false
---

# Get to know your tools

<h6>Table of Contents</h6>

-   [Get to know your tools](#get-to-know-your-tools)
    -   [Playground](#playground)
        -   [Settings (opt.)](#settings-opt)
        -   [Current state](#current-state)
        -   [Quick actions](#quick-actions)
        -   [Extension preview](#extension-preview)
        -   [Playground settings](#playground-settings)
    -   [Templates](#templates)
        -   [Widget extensions](#widget-extensions)
            -   [Widget - file structure](#widget---file-structure)
            -   [Widget - Translations](#widget---translations)
            -   [Widget - Props received](#widget---props-received)
            -   [Make API calls to LumApps](#make-api-calls-to-lumapps)
        -   [Share To extensions](#share-to-extensions)
            -   [Share To - file structure](#share-to---file-structure)
            -   [Share To - Translations](#share-to---translations)
            -   [Share To - Props received](#share-to---props-received)
    -   [LumApps SDK](#lumapps-sdk)
        -   [Python SDK](#python-sdk)
        -   [JavaScript SDK](#javascript-sdk)
            -   [Quick start](#quick-start)
            -   [React hooks](#react-hooks)
                -   [useContext](#usecontext)
                -   [useCurrentUser](#usecurrentuser)
                -   [useLanguage](#uselanguage)
                -   [useOrganization](#useorganization)
                -   [useFeatureEnabled](#usefeatureenabled)
                -   [useRequest](#userequest)
                -   [useBooleanState](#usebooleanstate)
                -   [useDebounce](#usedebounce)
                -   [useExportProps](#useexportprops)
    -   [LumApps API](#lumapps-api)
    -   [LumApps Design system](#lumapps-design-system)

## Playground

The playground offers multiple features to help you develop, test, and interact with the LumApps Marketplace environment.

![Playground](extension-playground.png)

1.  [Settings](#Settings)  
2.  [Current State](#CurrentState)
3.  [Quick actions](#QuickActions)
4.  [Extension preview](#ExtensionPreview)
5.  [Playground settings](#PlaygroundSettings)

### Settings (opt.)

There are two types of settings available: widget settings and global settings.

**Widget settings** are only available for widget extensions. They are the settings you will display in the LumApps designer that will be used by user adding your widget.

**Global settings** are the configurations applied at the extension level. They are visible in the extension information in the marketplace.

### Current state

When you are logged in, your information is updated.

-   LumApps token: are you logged in your LumApps test platform?
    -   OK - you are logged in.
    -   Invalid - you are not logged in. See the `Log in` button.

### Quick actions

Simulate how it shows in LumApps:

-   Dark background: check how your extension responds to dark mode.
    Lang: display translations (English is by default).
-   Padding: display the extension design with a different padding (24px by default).
-   Simulate env: test actions for different environments (ex: get different API depending on the environment).
-   Feature flag: activate feature flags for development.

### Extension preview

Get a preview of what your extension looks like.

### Playground settings

![Playground Settings](playground-settings.png)

Clicking Playground settings opens a modal with two tabs.

-   LumApps context:
    -   LumApps user token: this is your token. When you are logged in, the information is already filled in.
    -   HTTP origin: this is your environment. When you are logged in, the information is already filled in.
    -   LumApps content ID: if you want to emulate a real context, you can pull information from a specific content using its ID.
    -   LumApps Haussmann Cell URL: if you want to use our API, you need to fill out this field. The information is available in your Advanced Debug Info administration.
-   Build: create a .zip of your extension. You can upload the .zip in your developer portal.

## Templates

### Widget extensions

-   [Widget - file structure](#widget-file-structure)
-   [Widget - Translations](#widget-translations)
-   [Widget - Props received](#widget-props-received)
-   [Make API calls to LumApps](#make-api-calls-to-lumapps)

#### Widget - file structure

For a widget extension, your extension's directory should look like this:

    my-extension-widget
    |-- src
    |   |-- widget
    |   |   |-- index.ts
    |   |   |-- Widget.tsx
    |   |   |-- WidgetGlobalSettings.tsx
    |   |   `-- WidgetSettings.tsx
    |   |-- translations
    |   |   |-- en.json
    |   |   |-- es.json
    |   |   `-- fr.json
    |   |-- config.js
    |   |-- index.content.ts
    |   |-- index.global_settings.ts
    |   |-- index.settings.ts
    |   |-- index.tsx
    |   `-- index.widget.ts
    |-- package.json
    |-- tsconfig.build.json
    `-- tsconfig.json

You can use the LumApps extensions template to scaffold an extension and be sure you have the correct configuration to start your development.

#### Widget - Translations

We encourage you to translate your extensions. LumApps has a lot of international customers so you will reach a wider audience if your extensions are available in multiple languages.

To connect your extension with the LumApps translation system, you will have to use the LumApps JavaScript SDK. You have to use the `useLanguage` hook to retrieve the current language of the user to render your widget with the current user language. Natively, we provide the [react-intl](https://www.npmjs.com/package/react-intl) library to manage the translation in your ReactJS components.

```tsx
import { IntlProvider } from 'react-intl';
import { useLanguage } from 'lumapps-sdk-js';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

const Widget = () => {
    const { displayLanguage } = useLanguage();
    const messages: Record<string, Record<string, string>> = {
        en: messagesEn,
        fr: messagesFr,
    };
    const lang = useMemo(() => (Object.keys(messages).includes(displayLanguage) ? displayLanguage : 'en'), [
        displayLanguage,
        messages,
    ]);

    return (
        <IntlProvider messages={messages[lang]} locale={lang}>
            <FormattedMessage id="massage.title" />
        </IntlProvider>
    );
}
```

In the playground the SDK will use the language set on the `Quick actions` pane to let you test your widget in different languages.

#### Widget - Props received

Within the LumApps platform, your extension widget components will receive different props.

| Props           | Components                 | Description                                                                                                        |
| --------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **value**       | Content                    | JSON object with the value of the settings define in the Settings component.                                       |
| **globalValue** | Content                    | JSON Object with the value settings defined in the Global Settings component.                                      |
| **Theme**       | Content                    | LumApps Design System type to indicates the current them apply to your component (`Theme.Light` or `Theme.Dark`).  |
| **properties**  | Settings / Global Settings | JSON object containing the value of the settings defined by the user.                                              |
| **exportProps** | Settings / Global Settings | Function used to export the values of the settings and refresh the content component with the new settings values. |
| **extensionId** | All                        | The extension ID.                                                                                                  |

#### Make API calls to LumApps

If your extension needs to make API calls to LumApps, you will have to retrieve the current user token with the LumApps JavaScript SDK.

In the LumApps SDK, you will need to use the `useCurrentUser` hook to have access to the current user token, and the `useContext` hook get the base URL of the LumApps platform.

Example of API call

```tsx
const { token } = useCurrentUser();
const { baseURL } = useContext();

const { data } = await axios.get(`${baseUrl}/_ah/api/v1/users/list`, {
    'Authorization': `Bearer ${token}`
});
```

If you want to test API calls to LumApps from the playground, CORS errors may occur. As you are running your extension locally, the local host is not whitelisted on the LumApps side. You will need to use a backend application to access the LumApps API.
In the LumApps playground, the SDK uses the current user logged in the playground as the current user, and the value set in the HTTP Origin field in playground settings as base URL.

### Share To extensions

-   [Share To - file structure](#share-to-file-structure)
-   [Share To - Translations](#share-to-translations)
-   [Share To - Props received](#share-to-props-received)

#### Share To - file structure

For a Share To extension, your extension's directory should look like this:

    my-extension-widget
    |-- src
    |   |-- extension
    |   |   |-- Share.tsx
    |   |   `-- ShareGlobalSettings.tsx
    |   |-- translations
    |   |   |-- en.json
    |   |   |-- es.json
    |   |   `-- fr.json
    |   |-- config.js
    |   |-- index.content.ts
    |   |-- index.global_settings.ts
    |   |-- index.tsx
    |   `-- index.widget.ts
    |-- package.json
    |-- tsconfig.build.json
    `-- tsconfig.json

You can use the LumApps extensions template to scaffold an extension and be sure you have the correct configuration to start you development.

#### Share To - Translations

We encourage you to translate your extensions. LumApps has a lot of international customers so you will reach a wider audience if your extensions are available in multiple languages.

To connect your extension with the LumApps translation system, you will have to use the LumApps JavaScript SDK. You have to use the `useLanguage` hook to retrieve the current language of the user to render your widget with the current user language. Natively, we provide the [react-intl](https://www.npmjs.com/package/react-intl) library to manage the translation in your ReactJS components.

```tsx
import { IntlProvider } from 'react-intl';
import { useLanguage } from 'lumapps-sdk-js';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

const Widget = () => {
    const { displayLanguage } = useLanguage();
    const messages: Record<string, Record<string, string>> = {
        en: messagesEn,
        fr: messagesFr,
    };
    const lang = useMemo(() => (Object.keys(messages).includes(displayLanguage) ? displayLanguage : 'en'), [
        displayLanguage,
        messages,
    ]);

    return (
        <IntlProvider messages={messages[lang]} locale={lang}>
            <FormattedMessage id="massage.title" />
        </IntlProvider>
    );
}
```

In the playground, the SDK uses the language set on the `Quick actions` pane to let you test your widget in different languages.

#### Share To - Props received

Within the LumApps platform, your extension widget components will receive different props.

| Props           | Components      | Description                                                                                                        |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| **value**       | Content         | JSON object with the value of the settings define in the Settings component.                                       |
| **globalValue** | Content         | JSON Object with the value settings defined in the Global Settings component.                                      |
| **Theme**       | Content         | LumApps Design System type to indicates the current them apply to your component (`Theme.Light` or `Theme.Dark`).  |
| **properties**  | Global Settings | JSON object containing the value of the settings defined by the user.                                              |
| **exportProps** | Global Settings | Function used to export the values of the settings and refresh the content component with the new settings values. |

## LumApps SDK

-   [LumApps SDK](#lumapps-sdk)
    -   [Python SDK](#python-sdk)
    -   [JavaScript SDK](#javascript-sdk)
        -   [Quick start](#quick-start)
        -   [React hooks](#react-hooks)

LumApps provides two SDK to ease the development of extension and the integration within the customers LumApps platform.
Each SDK can be used depending on your needs.

![LumApps Extensions Playground](sdk-schema.png "LumApps Extensions Playground")

In this schema, the extension is composed of a Frontend and a Backend part. The Frontend part is connected to the Backend part.

-   The Frontend of the extension integrate the JavaScript SDK to have access to contextual information around the extension in LumApps (the connected user, the search engine for example).
-   The Backend part reaches an external provider to authenticate the user (with OAuth protocol for example), and use the Python SDK to access the LumApps API.

### Python SDK

The Python SDK is currently in beta. tTe feature provided can change in future releases.
This SDK is mainly used to connect your extension to the LumApps API.

You can read more in the [Python SDK](https://lumapps.github.io/lumapps-sdk/) documentation.

### JavaScript SDK

The JavaScript SDK is used for extensions connected to the LumApps user interface such as widget extensions.
With this SDK you can have access to some contextual information, the connected user, the content where your widget is used, etc.

The LumApps JavaScript SDK is a lightweight interface to LumApps for your React components.

#### Quick start

Install the SDK with NPM:

```console
$ npm install --save lumapps-sdk-js
```

Import LumApps hooks to use them:

```javascript
import React, { FC, useMemo } from 'react';

import { useCurrentUser, useLanguage } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const { email, fullName } = useCurrentUser();
    const { displayLanguage } = useLanguage();

    const welcomeMessage = useMemo(() => {
        return (
            <p>
                Hello {fullName}, your email is {email}.
            </p>
        );
    }, [email, fullName]);

    return (
        <>
            {welcomeMessage}
        </>
    );
};
```

#### React hooks

To access data from the customer LumApps platform, we provide React hooks in the SDK:

-   [useContext](#usecontext)
-   [useCurrentUser](#usecurrentuser)
-   [useLanguage](#uselanguage)
-   [useOrganization](#useorganization)
-   [useRequest](#userequest)

The SDK also embeds some helpers:

-   [useBooleanState](#usebooleanstate)
-   [useDebounce](#usedebounce)
-   [useExportProps](#useexportprops)

##### useContext

Use this hook to retrieve the context around the widget extension (when added in a LumApps content):

-   contentId
-   instanceId
-   baseUrl
-   environment ('production' or 'development')

```javascript
import React, { FC, useMemo } from 'react';

import { useContext } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const { contentId, instanceId, baseUrl, environment, isDesignerMode } = useContext();

    const welcomeMessage = useMemo(() => {
        return (
            <p>
                This widget is used in {contentId} in the {instanceId} instance. The environment base URL is : {baseUrl}
            </p>
            <p>
                The environment is {environment}
            </p>
            <p>
                You are on designer mode : {isDesignerMode ? `True`: `False`}
            </p>
        );
    }, [emaicontentIdl, contentId]);

    return (
        <>
            {welcomeMessage}
        </>
    );
};
```

##### useCurrentUser

This hook gives you access to the current user viewing the extension in the customer platform.
With this hook you can access:

-   email
-   first name
-   last name
-   full name
-   thumbnail photo URL
-   token
-   apiProfile
-   accountType

```javascript
import React, { FC, useMemo } from 'react';


import { useCurrentUser } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const { email, fullName, thumbnailPhotoUrl, apiProfile, accountType } = useCurrentUser();

    const welcomeMessage = useMemo(() => {
        return (
            <div>
                <img src={thumbnailPhotoUrl} alt="User Profil Picture">
                <p>
                    Hello {fullName}, your email is {email}.
                </p>
            <div>
        );
    }, [email, fullName]);

    return (
        <>
            {welcomeMessage}
        </>
    );
};
```

##### useLanguage

This hook is used to get the user languages. It's useful to translate your extensions.
You have access to:

-   displayLanguage
-   inputLanguage

```javascript
import React, { FC, useMemo } from 'react';


import { useLanguage } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const { displayLanguage } = useLanguage();

    const welcomeMessage = useMemo(() => {
        return (
        <IntlProvider locale={displayLanguage} messages={messages[displayLanguage]}>
            <FormattedMessage id="message.id" />
        </IntlProvider>
        );
    }, [displayLanguage]);

    return (
        <>
            {welcomeMessage}
        </>
    );
};
```

##### useOrganization

This hook gives you access to the organization identifier:

-   id
-   slug

```javascript
import React, { FC, useMemo } from 'react';


import { useOrganization } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const { id } = useOrganization();

    const welcomeMessage = useMemo(() => {
        return (
            <p>
                You are currently in the organization ; {id}.
            </p>
        );
    }, [id]);

    return (
        <>
            {welcomeMessage}
        </>
    );
};
```

##### useFeatureEnabled

This hook tells you if a lumapps feature is enabled or not:

```javascript
import React, { FC, useMemo } from 'react';


import { useFeatureEnabled } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const isCommunityEnabled = useFeatureEnabled('community');

    const message = useMemo(() => {
        return (
            <p>
                Community feature enabled : {isCommunityEnabled ? 'Yes' : 'No'}.
            </p>
        );
    }, [isCommunityEnabled]);

    return (
        <>
            {message}
        </>
    );
};
```

##### useRequest

This hook is used to contact an OAuth application.

##### useBooleanState

This helper ease the ReactJS useState usage for boolean values.

```tsx
import React, { FC, useMemo } from 'react';
import { ExpansionPanel } from '@lumx/react';

import { useBooleanState } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const [isPanelOpen, togglePanel, closePanel] = useBooleanState(!parameters.isCollapsed);

    return (
        <ExpansionPanel
            hasBackground
            onClose={closePanel}
            isOpen={isPanelOpen}
            onToggleOpen={togglePanel}
            toggleButtonProps={{ label: 'toggle' }}
        >
            <p>Content</p>
        </ExpansionPanel>
    );
};
```

##### useDebounce

The `useDebounce` helper allows you to debounce any fast changing value.

```tsx
import React, { FC, useMemo } from 'react';
import { ExpansionPanel } from '@lumx/react';
import { callAPI } from './api';

import { useDebounce } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const [value, setValue] = useState();
    const debouncedValue = useDebounce(value, 800);

    useEffect(() => {
        if (debouncedValue) {
            callApi(debouncedValue);
        }
    }, [debouncedValue]);

    return (
         <div>
            <TextField
                className="mt0 ml"
                label="Value"
                value={value}
                onChange={setValue}
            />
         </div>
    );
};
```

##### useExportProps

This helper can be used to ease the `exportProps` function usage. This function is used to send the settings from a setting component to the content component as props.

This hook required the following properties:

```typescript
/**
 * @param {Object}   value        The Value of the property to set
 * @param {string}   name         The name of the property
 * @param {Object}   props        The property object that regroup ll the properties to send to Content component.
 * @param {Function} exportMethod The fucntion to call to export these properties to the Content component.
 **/
useExportProps = (
    value: any,
    name: string,
    props: any,
    exportMethod: any) => {}
```

```tsx
import React, { FC, useMemo } from 'react';
import { ExpansionPanel } from '@lumx/react';
import { callAPI } from './api';

import { useDebounce, useExportProps } from 'lumapps-sdk-js';

export const HelloWidget: FC = ({ properties = {}, exportProp }: any) => {
    const [value, setValue] = useState();
    const debouncedValue = useDebounce(value, 800);

    useExportProps(debouncedValue, 'value', properties, exportProp);

    return (
         <div>
            <TextField
                className="mt0 ml"
                label="Value"
                value={value}
                onChange={setValue}
            />
         </div>
    );
};
```

## LumApps API

Everything you need to know about the LumApps API is available on our [API Portal](https://apiv1.lumapps.com).

## LumApps Design system

We encourage you to use the LumApps Design System, you can check the [Design System documentation site](https://design.lumapps.com) to find all the component you can import and how to use them.

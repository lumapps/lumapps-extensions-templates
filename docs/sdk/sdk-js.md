---
layout: default
title: SDK JS
nav_order: 1
parent: SDK
---

# Lumapps SDK JS

<h6>Table of Contents</h6>

- [Lumapps SDK JS](#lumapps-sdk-js)
  - [Quick start](#quick-start)
  - [React hooks](#react-hooks)
    - [useContext](#usecontext)
    - [useCurrentUser](#usecurrentuser)
    - [useLanguage](#uselanguage)
    - [useOrganization](#useorganization)
    - [useRequest](#userequest)
    - [useBooleanState](#usebooleanstate)
    - [useDebounce](#usedebounce)
    - [useExportProps](#useexportprops)

The LumApps JavaScript SDK is a lightweight interface to LumApps for your React components.

## Quick start

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

## React hooks
To access data from the customer LumApps platform, we provide React hooks in the SDK:

 - [useContext](#usecontext)
 - [useCurrentUser](#usecurrentuser)
 - [useLanguage](#uselanguage)
 - [useOrganization](#useorganization)
 - [useRequest](#userequest)

The SDK also embeds some helpers:
 - [useBooleanState](#usebooleanstate)
 - [useDebounce](#usedebounce)
 - [useExportProps](#useexportprops)

### useContext
Use this hook to retrieve the context around the widget extension (when added in a LumApps content): 
 - contentId
 - instanceId
 - baseUrl
 - environment ('production' or 'development')

```javascript
import React, { FC, useMemo } from 'react';

import { useContext } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const { contentId, instanceId, baseUrl, environment } = useContext();

    const welcomeMessage = useMemo(() => {
        return (
            <p>
                This widget is used in {contentId} in the {instanceId} instance. The environment base URL is : {baseUrl}
            </p>
            <p>
                The environment is {environment}
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


### useCurrentUser
This hook gives you access to the current user viewing the extension in the customer platform.
With this hook you can access: 
 - email
 - first name
 - last name
 - full name
 - thumbnail photo URL
 - token
 - apiProfile
 - accountType

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

### useLanguage
This hook is used to get the user languages. It's useful to translate your extensions.
You have access to: 
 - displayLanguage
 - inputLanguage

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

### useOrganization
This hook gives you access to the organization identifier: 
- id
- slug

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

### useFeatureEnabled
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

### useRequest
This hook is used to contact an OAuth application. 


### useBooleanState
This helper ease the ReactJS useState usage for boolean values.
```tsx
import React, { FC, useMemo } from 'react';
import { ExpansionPanel } from '@lumx/react';

import { useBooleanState } from 'lumapps-sdk-js/helpers';

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

### useDebounce
The `useDebounce` helper allows you to debounce any fast changing value.

```tsx
import React, { FC, useMemo } from 'react';
import { ExpansionPanel } from '@lumx/react';
import { callAPI } from './api';

import { useDebounce } from 'lumapps-sdk-js/helpers';

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

### useExportProps
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

import { useDebounce, useExportProps } from 'lumapps-sdk-js/helpers';

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

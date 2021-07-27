---
layout: default
title: SDK JS
nav_order: 1
parent: SDK
---

# Lumapps SDK JS

<h6>Table of Contents</h6>

- [Lumapps SDK JS](#lumapps-sdk-js)
  - [Quickstart](#quickstart)
  - [React hooks](#react-hooks)
    - [useContext](#usecontext)
    - [useCurrentUser](#usecurrentuser)
    - [useLanguage](#uselanguage)
    - [useOrganization](#useorganization)
    - [useRequest](#userequest)

The Lumapps JavaScript SDK is a lightweight interface to Lumapps for your React components.

## Quickstart

Install the SDK with npm:

```console
$ npm install --save lumapps-sdk-js
```

Import Lumapps Hooks to use them:

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
To access data from the customer LumApps platform, we provide React hooks in the SDK :

 - [useContext](#usecontext)
 - [useCurrentUser](#usecurrentuser)
 - [useLanguage](#uselanguage)
 - [useOrganization](#useorganization)
 - [useRequest](#userequest)

The SDK also embed some helpers :
 - useBooleanState
 - useDebounce
 - useExportProps

### useContext
Use this hook to retrieve the context around the widget extension (when added in a LumApps content): 
 - contentId
 - instanceId
 - baseUrl

```javascript
import React, { FC, useMemo } from 'react';

import { useContext } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const { contentId, instanceId, baseUrl } = useContext();

    const welcomeMessage = useMemo(() => {
        return (
            <p>
                This widget is used in {contentId} in the {instanceId} instance. The environment base URL is : {baseUrl}
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
This hook give you access to the current user viewing the extension in the customer platform.
With this hook you can access : 
 - email
 - first name
 - last name
 - thumbnail photo URL
 - token

```javascript
import React, { FC, useMemo } from 'react';


import { useCurrentUser } from 'lumapps-sdk-js';

export const HelloWidget: FC = () => {
    const { email, fullName, thumbnailPhotoUrl } = useCurrentUser();

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
You have access to : 
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
This hook give you access to the organization identifier : 

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

### useRequest
This hook is used to contact an OAuth application. 

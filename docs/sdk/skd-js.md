---
layout: default
title: SDK JS
parent: SDK
nav_order: 1
---

# Lumapps SDK JS
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
To access data from the customer LumApps platform, we provide React hooks int he SDK :

 - [useContext](#useContext)
 - [useCurrentUser](#useCurrentUser)
 - [useLanguage](#useLanguage)
 - [useOrganization](#useOrganization)
 - [useRequest](#useRequest)



###  <a name="useContext"></a>useContext
Use this hook to retrieve the context around the widget extension (when added in a Luampps content): 
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


###  <a name="useCurrentUser"></a>useCurrentUser
This hook give you access to the current user viewing the extension in the customer platform.
With this hooks you can acess : 
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

###  <a name="useLanguage"></a>useLanguage
This hooks is used to get the user languages. It's usefull to translate your extensions.
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

###  <a name="useOrganization"></a>useOrganization
This hooks give you access to the organization identifier : 

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

###  <a name="useRequest"></a>useRequest
this hook is used to contact an OAuth application. 

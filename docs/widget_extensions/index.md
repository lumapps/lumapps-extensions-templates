---
layout: default
title: Widget Extensions
nav_order: 6
has_children: false
---


# Widget Extensions

<h6> Table of Contents</h6>

- [Widget Extensions](#widget-extensions)
  - [Widget extension - file structure](#widget-extension---file-structure)
  - [Translations](#translations)
  - [Props received](#props-received)
  - [Make API calls to LumApps](#make-api-calls-to-lumapps)

## Widget extension - file structure
For a widget extension, your extension's directory should look like something like this :

```
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
|   |   `- fr.json
|   |-- config.js
|   |-- index.content.ts
|   |-- index.global_settings.ts
|   |-- index.settings.ts
|   |-- index.tsx
|   `-- index.widget.ts
|-- package.json
|-- tsconfig.build.json
`-- tsconfig.json
```
You can use the LumApps extensions template to scaffold an extension and be sure you have the correct configuration to start you development.



## Translations
We encourage you to translate your extensions, LumApps having international customers, you'll reach a wider audience if your extensions are available in multiple languages.

To connect your extension with the LumApps translation system, you'll have to use the LumApps JavaScript SDK.
You have to use the `useLanguage` hook to retrieve the current language of the user to render your widget with the current user language. Natively, we provide the [react-intl](https://www.npmjs.com/package/react-intl) library to manage the translation in your ReactJS components.


``` typescript
import { IntlProvider } from 'react-intl';
import { useLanguage } from 'lumapps-sdk-js';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

const Widget() => {
    const messages: any = {
        en: messagesEn,
        fr: messagesFr,
    };

    const [lang, setLang] = useState<string>('en');
    const { displayLanguage } = useLanguage();

    useEffect(() => {
        if (Object.keys(messages).includes(displayLanguage)) {
            setLang(displayLanguage);
        }
    }, [messages, displayLanguage]);

    return (
        <IntlProvider messages={messages[lang]} locale={lang}>
            <FormattedMessage id="massage.title" />
        </IntlProvider>
    );
}
```

In the playground the SDK will use the language set on the `Quick actions` pane to let you test your widget in different languages.



## Props received
Within the LumApps platform, your extension widget components will receive different props.


| Props           | Components                 | Description                                                                                                         |
| --------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **value**       | Content                    | JSON object with the value of the settings define in the Settings component.                                        |
| **globalValue** | Content                    | JSON Object with the value settings defined in the Global Settings component.                                       |
| **Theme**       | Content                    | LumApps Design System type to indicates the current them apply to your component (`Theme.Light` or `Theme.Dark`). |
| **properties**  | Settings / Global Settings | JSON object containing the value of the settings defined by the user.                                               |
| **exportProps** | Settings / Global Settings | Function used to export the values of the settings and refresh the content component with the new settings values.  |



## Make API calls to LumApps

If your extension needs to make API calls to LumApps you'll have to retrieve the current user token with the LumApps JavaScript SDK.

In the LumApps SDK you'll need to use the `useCurrentUser` hook to have access to the current user token, and the `useContext` hook get the base URL of the LumApps platform.

Example of API call 
``` typescript
const { token } = useCurrentUser();
const { baseURL } = useContext();

const { data } = await axios.get(`${baseUrl}/_ah/api/v1/users/list`, {
    'Authorization': `Bearer ${token}`
});
```

If you want to test API calls to LumApps from the playground, CORS errors may occur. As you are running your extension locally, the local host is not whitelisted on LumApps side. You'll need to use a backend application to access the LumApps API.
In the LumApps playground, the SDK use the current user logged in the playground as the current user, and the value set in the HTTP Origin field in playground settings as base URL.

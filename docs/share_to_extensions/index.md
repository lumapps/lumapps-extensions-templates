---
layout: default
title: Share To Extensions
nav_order: 7
has_children: false
---

# Share To extensions

<h6> Table of Contents</h6>

- [Share To extensions](#share-to-extensions)
  - [Share extension - file structure](#share-extension---file-structure)
  - [Translations](#translations)
  - [Props received](#props-received)

## Share extension - file structure
For a share extension, your extension's directory should look like something like this :

```
my-extension-widget
|-- src
|   |-- extension
|   |   |-- Share.tsx
|   |   `-- ShareGlobalSettings.tsx
|   |-- translations
|   |   |-- en.json
|   |   |-- es.json
|   |   `- fr.json
|   |-- config.js
|   |-- index.content.ts
|   |-- index.global_settings.ts
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
Within the LumApps platform, your extension widget components will received different props.


| Props           | Components      | Description                                                                                                        |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| **value**       | Content         | JSON object with the value of the settings define in the Settings component.                                       |
| **globalValue** | Content         | JSON Object with the value settings defined in the Global Settings component.                                      |
| **Theme**       | Content         | LumApps Design System type to indicates the current them apply to your component (`Theme.Light` or `Theme.Dark`).  |
| **properties**  | Global Settings | JSON object containing the value of the settings defined by the user.                                              |
| **exportProps** | Global Settings | Function used to export the values of the settings and refresh the content component with the new settings values. |


---
layout: default
title: Developing extensions
nav_order: 5
parent: Extensions
has_children: false
---

# Developing Extensions

<h6>Table of Contents</h6>

-  [Develop Extensions](#develop-extensions)
   -  [Extension Manifest](#extension-manifest)
      -  [Manifest attributes](#manifest-attributes)
      -  [Links](#links)
      -  [Availability](#availability)
      -  [PartnerId & ExtensionId](#partnerid--extensionid)
      -  [Components](#components)
      -  [Application](#application)
      -  [Public](#public)
      -  [Whitelist](#whitelist)
   -  [Extension Dependencies](#extension-dependencies)
      -  [Add new dependencies](#add-new-dependencies)
         -  [Dynamic import](#dynamic-import)
   -  [Using OAuth application](#using-oauth-application)
      -  [Configure extension](#configure-extension)
      -  [Recieved selected application](#recieved-selected-application)

## Extension Manifest

The Extension Manifest is the file used by the LumApps Marketplace to identify your extension and know what your extension does.

You'll have to fill in this extension manifest to be able to declare your extension in the LumApps Marketplace. This file is attached to the extension and is already pre-configured when you create an extension using LumApps extension template.

### Manifest attributes

In this configuration file, you have to define the following properties :

| Attribute        | Type                           | Description                                                                            |
| :--------------- | :----------------------------- | :------------------------------------------------------------------------------------- |
| **name**         | Translatable string (required) | The name of the extension in multiple language                                         |
| **description**  | Translatable string (required) | The description of the extension in multiple language                                  |
| **icon**         | Translatable string (required) | The public link to the icon of the extension in multiple language                      |
| **links**        | JSON Object                    | The useful HTTP links related to the extension.                                        |
| **availability** | string (required)              | The availability of the extension                                                      |
| **components**   | Array of components (required) | Array of the components that compose your extension                                    |
| **application**  | JSON Object                    | Indicates if the extension need to connect to an external service (from LumApps side). |
| **partnerId**    | string (required)              | The id of your partner                                                                 |
| **extensionId**  | string (required)              | The id of your extension                                                               |
| **public**       | boolean (required)             | Whether the extension is public or private                                             |
| whitelist        | Array of string OR JSON Object | The list of whitelisted customer IDs. Used only if your extension is not public        |
| **category**     | string (required)              | The category of your extension.                                                        |

Some properties are pretty simple to define such as name, description or icon. For other properties here is a quick description on how to retrieve the wanted data.

### Links
This property lets the developer define useful links for the extension.
For now, we only manage documentation links and must be defined as a sub property of links attribute:
```json
links: {
	documentation: ‘https//….’
}
```

This link will be displayed in extension administration in the customer platform.

### Availability

Define the availability of the extension. Two types are available :

-  `marketplace` (default) : The customer need to have the marketplace activated on his environment
-  `open` : The extension is available for everyone.

> Note that if your extension is set as `marketplace`, a customer without the marketplace activated will never be able to see the extension even if you withelist it.

### PartnerId & ExtensionId
Only users with a valid LumApps JWT token can query marketplace services. And for security reasons the partner ID is claimed by LumApps employees

To claim partner ID, you must give us at least its name, a support email address, and as a non required data, a phone number to reach the support.
When the Partner ID is generated, we can send it to you, and you will keep the same for all your extensions. You also have to set your Partner ID in the manifest file.

And to claim the extension ID, we will use data defined in the manifest file to generate the ID, like the provider ID, this ID has to be set in the extension manifest file.

### Components
The components attribute is the array of React components type that compose its extension. The components depend on the category of your extension.

For Widget Extensions, the available values are :

For widget extensions, the available values are : 
 - **content** - For widget content components
 - **settings** - For widget settings component (display when user adds a widget in a content)
 - **global_settings** - Global settings of the extension (display in extension administration)

Only the content component is required.

For Share To Extensions, the available values are :

For share to extensions, the available values are : 
 - **content** - For share to dialog content
 - **global_settings** - Global settings of the extension (display in extension administration)


Only the content component is required.

### Application

The application attribute is used to indicate your extension needs to contact an external service through an authorization protocol (OAuth v2 or Application token).
To determine which provider you want to connect to your extension you have to set the provider type in the application object :

```json
application: {
	providerType: 'microsoft'
}
```

The provider type can be retrieved from the provider list accessible by contacting the following endpoint
`https://go-shared-services.api.lumapps.com/v2/providers`.

If your provider is not present in the list you can request a provider creation by sending us the following information :

-  Provider name
-  Provider icon
-  Provider type

### Public

The public attribute is used to define if the extension is available for every LumApps customer (at least customers with the feature enabled). If a partner doesn't want to publish its extension for all LumApps customers he can set his extension as private (non-public).

### Whitelist
The whitelist is used only for private extension. You have to define a list of authorized customer IDs for your extension.
The customer ID is available in the customer platform by pressing on `CTRL + ?`. The customer ID is displayed in the dialog.

If a customer has multiple platforms in different environments (Production and Staging for example), he also has a different customer ID for each environment, so each customer ID has to be whitelisted to publish the extension in every environment for this customer.

```json
# Simple whitelist (for production environment)
whitelist: ['987654321'],
# With different environment
whitelist : {
    staging: [
        '123456789',
    ],
    production: [
        '987654321'
    ]
}
```

### Category
The category attribute is used to define the kind of extension. It could be **widget**, **backend** or **share_to**.

## Extension Dependencies
For your frontend extensions, you'll need to add dependencies.

As your extension will be loaded by the LumApps platform you cannot use any libraries you want, but we provide a list of authorized libraries for your extension.

Here is the list of available libraries :

| library                                                        | version    | description            |
| :------------------------------------------------------------- | :--------- | :--------------------- |
| [axios](https://github.com/axios/axios)                        | "^0.21.1"  |                        |
| [lodash](https://github.com/lodash/lodash)                     | "4.17.21"  |                        |
| [lumapps-sdk-js](https://www.npmjs.com/package/lumapps-sdk-js) | "0.0.44"   | LumApps JavaScript SDK |
| [lumX](https://github.com/lumapps/design-system)               | "^1.0.17"  | LumApps Design System  |
| [prop-types](https://github.com/facebook/prop-types)           | "15"       |                        |
| [qs](https://github.com/ljharb/qs)                             | "^6.7.0"   |                        |
| [react](https://github.com/facebook/react)                     | "^16.13.1" |                        |

### Add new dependencies

You can import any dependency into your extension, but they can increase drastically the size of your bundle.
To prevent this and create a better user experience you should consider using dynamic import when you can.

#### Dynamic import

Dynamic import lets you make import asynchronously. In some cases, it can be very useful to load a dependency only when needed.

Example :

In this example, we import two elements from `my-library`.

Imports are only made when the `loadLibrary` function is called.

We can use webpack magic comments to optimize even more the build by telling webpack that we only need specific elements from the library :

`/* webpackExports: ["import1", "import2", ...] */`

Remember : Imports are made asynchronously, so you need to check that they are loaded before using them

```tsx
const Widget = (): React.ReactElement => {
   const [myLibrary, setMyLibrary] = useState < any > null;

   const loadLibrary = async () => {
      const { exempleImportedConst, exempleImportedFunction } = await import(
         /* webpackExports: ["exempleImportedConst", "exempleImportedFunction"] */ "my-library"
      );
      setMyLibrary({ exempleImportedConst, exempleImportedFunction });
   };

   return (
      <>
         <button onClick={loadLibrary}>Click me</button>
         {myLibrary && (
            <>
               <p>Display : {myLibrary.exempleImportedConst}</p>
               <p>Execute : {myLibrary.exempleImportedFunction()}</p>
            </>
         )}
      </>
   );
};

export default Widget;
```

## Using OAuth application

From your extension you can use the OAuth protocol to contact an application server.

### Configure extension
If your extension needs to use an OAuth application you have to set it up in the manifest file. For more information, see [Manifest](#application).

Then the user who installs the app has the capability to define which application (declare on its platform) he wants to use.

### Received selected application

In your content & your Settings components you'll be able to retrieve the application set by the customer administrator via props sent by LumApps to your extension.
You'll recieve the OAuth application ID inside the `globalValue` property:

```javascript
interface WidgetProps {
    globalValue?: {
        oauthApplicationId: string
    };
    ...
}
```

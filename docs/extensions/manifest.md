---
layout: default
title: Manifest
parent: Extensions
nav_order: 1
---
# Manifest file
To declare an extension in the LumApps marketplace, you have to set some data in a manifet file. This file is attached to the extension and is already pre configured when you create an extension using LumApps extension template.


In this configuration file, you have to define the following properties : 

| Attribute       | Type                           | Description                                                                              |
| :-------------- | :----------------------------- | :--------------------------------------------------------------------------------------- |
| **name**        | Translatable string (required) | The name of the extension in multiple language                                           |
| **description** | Translatable string (required) | The description of the extension in multiple language                                    |
| **icon**        | Translatable string (required) | The public link to the icon of the extension in multiple language                        |
| **links**       | JSON Object                    | The useful HTTP links related to the extension.                                          |
| **components**  | Array of components (required) | yumm                                                                                     |
| **oauth**       | boolean                        | Indicates if the extension need to consume an OAuth application declare on customer side |
| **providerId**  | string (required)              | Indicates if the extension need to consume an OAuth application declare on customer side |
| **extensionId** | string (required)              | The id of your extension                                                                 |
| **public**      | boolean (required)             | Whether the extension is public or private                                               |
| whitelist       | Array of string OR JSON Object | The list of whitelisted customer IDs. Used only if your extension is not public          |
| **category**    | string (required)              | The category of your extension. **widget** is the only available choice for now.         |


Some properties are pretty simple to define such as name, description or icon. For other properties here is a quick description on how to retrieve the wanted data.

## <a name="links"></a>Links
This property let the developer define useful links for the extension.
For now we only manage documentation links and must be defined as a sub property of links attribute :
```json
links: {
	documentation: ‘https//….’
}
```
This link will be displayed in extension administration in the customer platform.

## <a name="provID"></a>ProviderId & ExtensionId
These Ids are claimed by LumApps employees for security reasons. For now only users with a valid LumApps JWT token can query Marketplace services.

To claim Provider ID, you must give us at least its name, a support email address, and as a non required data, a phone number to reach the support.
When the provider ID is generated, we can send it to you, and you will keep the same for all your extensions. You also have to set your provider Id in the manifest file.

And to claim the Extension ID, we will use data defined in the manifest file to generate the ID, like the provider ID, this ID has to be set in the extension manifest file.

## <a name="components"></a>Components
The components attribute is the array of React components type that compose its extension. 
As we only manage widget, the available values are : 
 - content : For widget content components
 - settings : For widget settings component (display when user add a widget in a content)
 - global_settings : Global settings of the extension (display in extension administration)

Only the content component is required.


## <a name="oauth"></a>OAuth
The OAuth attribute indicates the extension uses a Client OAuth Application declared in the client side. The administrator will have to select the Application he wants to use in the extension administration. The selected application will be sent to the Settings & Widget components via properties.
You can find more details on OAuth in extension [here](./oauth.md)

## <a name="public"></a>Public
The public attribute is used to define if the extension is available for every LumApps customer (at least customers with the feature enabled). If a partner doesn't want to publish its extension for all LumApps customers he can set his extension as private (non public).


## <a name="whitelist"></a>Whitelist
The whitelist is used only for private extension. You have to define a list of authorized customer ids for your extension.
The customer ID is available in the customer platform by pressing on CTRL + ?, the customer ID is displayed in the dialog.

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

## <a name="category"></a>Category
The category attribute is used to define the kind of extension, as we only handle widget, the only valid value is **widget** for now.

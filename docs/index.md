# Getting started

We provide a development playground for developer to let them build and test their extension.

## Initiate a new extension

See the [Readme](../README.md)

## Start the playground with your extension
To start the web server with your extension just run the following commands :

```bash
yarn
yarn start
```

## Develop your extension

**Lumapps extension must be written in ReactJs**

Extensions are structured in 3 differents files/components.
- `Content` (**Required**) : The content of your extension, this component contains the main part of your extension.
- `Settings` (Optional) : The settings component is used to set up locally an extension.
- `Global Settings` (Optional) : The global settings is used by administrator to set up global information used by all instances of the extension.

Each component should be written in :
- `<your_folder>/src/widget/Widget.jsx` (Content Component)
- `<your_folder>/src/widget/WidgetSettings.jsx` (Settings Component)
- `<your_folder>/src/widget/WidgetGlobalSettings.jsx` (Glonal Settings Component)

**DO NOT install any other npm components** as they won't be available once deployed in LumApps


## Edit configuration file
You can edit the configuration file `<your_folder>/src/config.js` according to your need.

Available properties :

| Property  | Description  | Notes |
| --------- | ------------ | ----- |
| description |  Few sentences that describe the extension | This property is translatable |
| components  | The list of React components that compose the extension  | Three types of components are valid : `Content`, `Settings` and `GlobalSettings` |
|  icon | A HTML public link to the extension logo | This property is translatable |
|  name | A human-readable name of the extension | Limited to 100 characters. This property is translatable |
|  type | The kind of Extension  | For now only `widget` is a valid value |

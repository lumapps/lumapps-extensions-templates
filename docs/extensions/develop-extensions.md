---
layout: default
title: Develop your extension
nav_order: 2
parent: Create your extension
has_children: false
---

# Developing extensions

<h6>Table of Contents</h6>

-   [Extension dependencies](#extension-dependencies)
    -   [Add new dependencies](#add-new-dependencies)
        -   [Dynamic import](#dynamic-import)
-   [Using OAuth application](#using-oauth-application)
    -   [Configure extension](#configure-extension)
    -   [Received selected application](#received-selected-application)

## Extension dependencies

For your frontend extensions, you need to add dependencies. As your extension are loaded by the LumApps platform, you cannot use any libraries you want, but we provide a list of authorized libraries for your extension:

| library                                                        | version    | description            |
| :------------------------------------------------------------- | :--------- | :--------------------- |
| [axios](https://github.com/axios/axios)                        | "^0.21.1"  |                        |
| [lodash](https://github.com/lodash/lodash)                     | "4.17.21"  |                        |
| [lumapps-sdk-js](https://www.npmjs.com/package/lumapps-sdk-js) | "latest"   | LumApps JavaScript SDK |
| [lumX](https://github.com/lumapps/design-system)               | "latest"   | LumApps Design System  |
| [moment](https://github.com/moment/moment)                     | "^2.29.1"  |                        |
| [moment-range](https://github.com/rotaready/moment-range)      | "^4.0.2"   |                        |
| [react](https://github.com/facebook/react)                     | "^16.13.1" |                        |

### Add new dependencies

You can import any dependency into your extension, but they can increase drastically the size of your bundle. To prevent this and create a better user experience, you should consider using dynamic import when you can.

> **Note**: LumApps does not support dependencies with a global impact.

#### Dynamic import

Dynamic import lets you make import asynchronously. In some cases, it can be very useful to load a dependency only when needed.

Example:

In this example, we import two elements from `my-library`.

Imports are only made when the `loadLibrary` function is called.

We can use webpack magic comments to optimize even more the build by telling webpack that we only need specific elements from the library :

`/* webpackExports: ["import1", "import2", ...] */`

Remember: Imports are made asynchronously, so you need to check that they are loaded before using them

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

From your extension, you can use the OAuth protocol to contact an application server.

### Configure extension

If your extension needs to use an OAuth application, you have to set it up in the manifest file. Then the user who installs the app can define which application (declared on their platform) they want to use.

### Receive selected application

In your content & your Settings components, you will be able to retrieve the application set by the customer administrator via props sent by LumApps to your extension.

You will receive the OAuth application ID inside the `globalValue` property:

```javascript
interface WidgetProps {
    globalValue?: {
        oauthApplicationId: string
    };
    ...
}
```

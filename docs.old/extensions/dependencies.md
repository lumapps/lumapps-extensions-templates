---
layout: default
title: Dependencies
parent: Extensions
nav_order: 2
---

# Extension dependencies

When developing your extension, you can add dependencies.
As your extension will be loaded by the LumApps platform you cannot use any library you want, but we provide a list of authorized extensions for your extension.

Here is the list of available libraries :

| library                                              | version    | description            |
| :--------------------------------------------------- | :--------- | :--------------------- |
| [axios](https://github.com/axios/axios)              | "^0.18.0"  |                        |
| [lodash](https://github.com/lodash/lodash)           | "4.17.19"  |                        |
| lumapps-sdk-js                                       | "0.0.41"   | LumApps Javascript SDK |
| [lumX](https://github.com/lumapps/design-system)     | "1.0.12"   | Lumapps Design System  |
| [prop-types](https://github.com/facebook/prop-types) | "15"       |                        |
| [qs](https://github.com/ljharb/qs)                   | "^6.7.0"   |                        |
| [react](https://github.com/facebook/react)           | "^16.13.0" |                        |

If you use a dependency which is not in that list, your extension may not render in the LumApps platform.

If you have a specific need, you can contact us.

# Import dependencies - Good practices

You can import any dependencies into your extension, but they can increase drastically the size of your bundle.
To prevent this and create a better user experience you should consider using dynamic import when you can.

## Dynamic import

Dynamic import let you make import asynchronously. In some cases, it can be very useful to load a dependency only when needed.

Exemple :

In this exemple, we import two elements from `my-library`.

Imports are only made when the `loadLibrary` function is called.

We can use webpack magic comments to optimize even more the build by telling webpack that we only need specific elements from the library :

`/* webpackExports: ["import1", "import2", ...] */`

Remember : the imports are made asynchronously, so you need to check that they are loaded before using them

```tsx
const Widget = (): React.ReactElement => {
  const [myLibrary, setMyLibrary] = useState < any > null;

  const loadLibrary = async () => {
    const { exempleImportedConst, exempleImportedFunction } = await import(
      /* webpackExports: ["exempleImportedConst", "exempleImportedFunction"] */ 'my-library'
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

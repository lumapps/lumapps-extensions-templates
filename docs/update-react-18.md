# React 18 migration script

We provide a migration script to help you upgrade your extension to React 18.

To use it, simply launch the following command at the root folder of your extension and follow the instructions :

```bash
npx create-lumapps-extension --update
```

After the upgrade, you might encounter some typing issues. The most common is that the children prop now needs to be listed explicitly, you can find more information about this in the [official React 18 upgrade guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-typescript-definitions).

If for any any reason the script won't work for you, you can try toi update you extension manually. A step by step guide is provided for you bellow.

If you still encounter issues during your migration, you can contact the Lumapps support for help.

# Manual React 18 migration guide

This guide explains how to manually update your extension to React 18. Use this guide if you prefer to make changes manually or if you experienced issues with the automated update.

## Table of Contents

1. [Updating Dependencies](#updating-dependencies)
2. [Updating Config File](#updating-config-file)
3. [Updating Index.tsx File](#updating-indextsx-file)
4. [Updating ESLint Configuration](#updating-eslint-configuration)
5. [Updating TypeScript Configuration](#updating-typescript-configuration)
6. [Troubleshooting](#troubleshooting)

## Updating dependencies

The first step is to update or install the necessary dependencies.

### Mandatory dependencies

These are the core dependencies that need to be updated:

-  `@lumx/core`: ^3.14.1
-  `@lumx/icons`: ^3.14.1
-  `@lumx/react`: ^3.14.1
-  `lumapps-sdk-js`: 2.0.0
-  `react`: 18.3.1
-  `react-dom`: 18.3.1

Run the following command to update your main dependencies:

```bash
yarn add @lumx/core@^3.14.1 @lumx/icons@^3.14.1 @lumx/react@^3.14.1 lumapps-sdk-js@2.0.0 react@18.3.1 react-dom@18.3.1
```

### Mandatory dev dependencies

These development dependencies need to be updated:

-  `@lumapps-extensions-playground/devenv`: 2.0.0
-  `@lumapps-extensions/shipping-server`: ^1.10.1
-  `@types/react`: ^18.3.1
-  `@types/react-dom`: ^18.3.1

Run the following command to update your development dependencies:

```bash
yarn add -D @lumapps-extensions-playground/devenv@2.0.0 @lumapps-extensions/shipping-server@^1.10.1 @types/react@^18.3.1 @types/react-dom@^18.3.1
```

### Optional dependencies

The script checks if you're using any of these optional dependencies, and if so, updates them:

-  `axios`: 1.7.7
-  `lodash`: 4.17.21
-  `moment`: ^2.30.1
-  `moment-range`: ^4.0.2
-  `react-intl`: 5.24.0
-  `reselect`: ^4.1.5

To manually update these, you can run the following command for the dependencies you use:

```bash
yarn up axios@1.7.7 lodash@4.17.21 moment@^2.30.1 moment-range@^4.0.2 react-intl@5.24.0 reselect@^4.1.5
```

### Optional dev dependencies

These optional development dependencies can be updated if you use them:

-  `@testing-library/jest-dom`: ^6.4.2
-  `@testing-library/react`: ^14.2.2
-  `@testing-library/user-event`: ^14.5.2
-  `@types/jest`: ^29.5.12
-  `@types/lodash`: ^4.17.0
-  `@types/node`: ^20.12.2
-  `@typescript-eslint/eslint-plugin`: ^7.5.0
-  `@typescript-eslint/parser`: ^7.5.0
-  `eslint`: ^8.57.0
-  `eslint-config-airbnb`: ^19.0.4
-  `eslint-config-prettier`: ^9.1.0
-  `eslint-plugin-import`: ^2.29.1
-  `eslint-plugin-jsx-a11y`: ^6.8.0
-  `eslint-plugin-prettier`: ^5.1.3
-  `eslint-plugin-react`: ^7.34.1
-  `eslint-plugin-react-hooks`: ^4.6.0
-  `jest`: ^29.7.0
-  `npm-run-all`: ^4.1.5
-  `prettier`: 3.2.5
-  `prettier-stylelint`: ^0.4.2
-  `react-scripts`: ^5.0.1
-  `stylelint`: ^16.3.1
-  `stylelint-config-idiomatic-order`: ^10.0.0
-  `stylelint-config-recommended`: ^14.0.0
-  `stylelint-config-recommended-scss`: ^14.0.0
-  `stylelint-scss`: ^6.2.1
-  `ts-loader`: 9.5.1
-  `typescript`: ^5.4.3

For optional development dependencies, you can use:

```bash
yarn up @testing-library/jest-dom@^6.4.2 @testing-library/react@^14.2.2 @testing-library/user-event@^14.5.2 @types/jest@^29.5.12 @types/lodash@^4.17.0 @types/node@^20.12.2 @typescript-eslint/eslint-plugin@^7.5.0 @typescript-eslint/parser@^7.5.0 eslint@^8.57.0 eslint-config-airbnb@^19.0.4 eslint-config-prettier@^9.1.0 eslint-plugin-import@^2.29.1 eslint-plugin-jsx-a11y@^6.8.0 eslint-plugin-prettier@^5.1.3 eslint-plugin-react@^7.34.1 eslint-plugin-react-hooks@^4.6.0 jest@^29.7.0 npm-run-all@^4.1.5 prettier@3.2.5 prettier-stylelint@^0.4.2 react-scripts@^5.0.1 stylelint@^16.3.1 stylelint-config-idiomatic-order@^10.0.0 stylelint-config-recommended@^14.0.0 stylelint-config-recommended-scss@^14.0.0 stylelint-scss@^6.2.1 ts-loader@9.5.1 typescript@^5.4.3
```

> **Note**: Only update the optional dependencies that you actually use in your project.

### Dedupe dependencies

After updating dependencies, clean up any duplicates:

```bash
yarn dedupe
```

## Updating config.js file

Your `config.js` file needs to be updated to match the latest format expected by the playground.

Update the content of your `config.js` file to follow this new structure:

```javascript
// If extensionId is a string
const extensionId = "your-extension-id";

// OR if extensionId is an object
const extensionId = {
   dev: "your-dev-id",
   prod: "your-prod-id",
   // other environments...
};

const config = {
   extensionId,
   category: "your-category",
};

export default config;```

This change moves any additional configuration props from the config object to dedicated variables.

All other information that you might have here are now manage by the dev portal

## Updating index.tsx file

The React 18 update requires changes to your application's entry point.

1. Update the React import to use `createRoot`:

   ```javascript
   // Replace
   import ReactDOM from "react-dom";

   // With
   import { createRoot } from "react-dom/client";
   ```

2. Update the rendering code:

   ```javascript
   // Replace
   ReactDOM.render(
     <Playground ... />,
     document.getElementById('root'),
   );

   // With
   const container = document.getElementById('root') as Element;
   const root = createRoot(container);
   root.render(
     <Playground ... />
   );
   ```

3. Update config imports (remove .js extension):

   ```javascript
   // Replace
   import config from "./config.js";

   // With
   import config from "./config";
   ```

4. Update the Playground component props for type safety:

   ```javascript
   // Replace
   <Playground config={config as any} />

   // With
   <Playground config={config as Pick<import('lumapps-sdk-js').ExtensionConfig, 'category' | 'extensionId'>} />
   ```

## Updating ESLint configuration

The ESLint configuration needs to be updated to support the latest React version.

If you have an `.eslintrc.json` file, remove `"prettier/react"` from the `extends` array if it exists. This configuration is no longer needed.

If you don't have an `.eslintrc.json` file, you may want to create one with the recommended configuration from our templates.

## Updating typeScript configuration

The TypeScript configuration needs to be updated to properly handle React types.

If you have a `tsconfig.json` file, add proper React type paths:

```json
{
   "compilerOptions": {
      "paths": {
         "react": ["./node_modules/@types/react"]
      }
      // other options...
   }
}
```

If you don't have a `tsconfig.json` file, you may want to create one with the recommended configuration from our templates.

## Troubleshooting

If you encounter lint issues after updating, try running:

```bash
npx eslint . --fix
```

For React 18 specific migration issues, check the [official React 18 upgrade guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide).

If you encounter issues with the TypeScript configuration, ensure that your `@types/react` package is properly installed:

```bash
yarn add -D @types/react@^18.3.1
```

### Dependency version comparison

Below is a comparison of the key dependencies being updated:

| Package                               | Current Version | Updated Version |
| ------------------------------------- | --------------- | --------------- |
| @lumx/core                            | ^3.6.7          | ^3.14.1         |
| @lumx/icons                           | ^3.6.7          | ^3.14.1         |
| @lumx/react                           | ^3.6.7          | ^3.14.1         |
| lumapps-sdk-js                        | 1.37.0          | 2.0.0   |
| react                                 | 17.0.2          | 18.3.1          |
| react-dom                             | 18.3.1          | 18.3.1          |
| @lumapps-extensions-playground/devenv | 1.27.0          | 2.0.0   |
| @lumapps-extensions/shipping-server   | 1.9.2           | ^1.10.1         |
| @types/react                          | 18.3.1          | ^18.3.1         |
| @types/react-dom                      | 18.3.1          | ^18.3.1         |

## After updating

After completing all the update steps, you can start your extension with:

```bash
yarn start
```

This should launch your extension with React 18 and all the necessary updates.

---
layout: default
title: Build your extension
nav_order: 3
parent: Create your extension
has_children: false
---

# Build your extensions

Our playground allows developers to build and test their extension quickly, easily, and locally. It's a ReactJS based application that you can import on your machine to create and run an extension project, using either your own extension code or example templates.

The playground also lets you connect your extension with your LumApps test platform.

<h6>Table of Contents</h6>

-   [LumApps extensions playground](#lumapps-extensions-playground)
    -   [Create an extension](#create-an-extension)
        -   [Prerequisites](#prerequisites)
        -   [Use the CLI](#use-the-cli)
    -   [Playground interfaces](#playground-interfaces)
        -   [Local test](#local-test)
        -   [Login](#login)
        -   [Deployment manager](#deployment-manager)
        -   [Back Office interface](#back-office-interface)
            -   [Extensions manager](#extensions-manager)

## Prerequisites

1.  Install [NodeJs](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).

2.  Use the latest LTS version of [NodeJS releases](https://nodejs.org/en/about/releases/), you can use tools like [n](https://github.com/tj/n) or [nvm](https://github.com/nvm-sh/nvm) to easily manage your NodeJS versions.

## Use the CLI

You can run the following commands to create, initiate, and launch your extension:

```shell
npx create-lumapps-extension <extension-name>
cd <extension-name>
yarn
yarn start
```

## Playground development

You are redirected to the playground interface. Our playground offers multiple features to help you develop, test, and interact with the LumApps Marketplace environment. For more information on the Playground interface, see the [Tools](../tools/index.md) documentation.

![LumApps Extensions Playground](Playground.png "LumApps Extensions Playground")

### Login

Sign in to the playground with your LumApps test platform credentials. When you are logged in, your account is used by the SDK to emulate the current connected user. The login feature also gives you access to administration feature within the playground.


### Mocked data

With the Playground, we mock the information you can retrieve with the LumApps JavaScript SDK, if you want to use real data, you can log in to the playground with your LumApps test account. It will replace the following mocked information:
 -  **Current connected user** - The SDK will use your user as the current connected user for your extension.
 -  **Instance ID** - The instance ID will be your LumApps Test Platform ID

Another solution to edit mocked data is to use the playground settings dialog. You can set up the following information:
 - **Base URL** - By editing the HTTP Origin field
 - **Content ID** - You can define a specific content ID to be used by the LumApps JavaScript SDK

The last possibility is to edit the language field in the Quick actions section of the left panel to set a specific language and test the translations of your extension.

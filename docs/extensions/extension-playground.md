---
layout: default
title: Extensions Playground
nav_order: 2
parent: Extensions
has_children: false
---

# LumApps Extensions Playground

<h6>Table of Contents</h6>

- [LumApps Extensions Playground](#lumapps-extensions-playground)
  - [Create a project](#create-a-project)
  - [Playground interfaces](#playground-interfaces)
    - [Local Test](#local-test)
    - [Login](#login)
    - [Deployment manager](#deployment-manager)
    - [Back Office interface](#back-office-interface)
      - [Extensions manager](#extensions-manager)
  - [Troubleshooting](#troubleshooting)

The LumApps extensions playground allow extension developers to develop and test their extension quickly, easily and locally. It's a ReactJS based application that you can import on your machine. It lets you connect your extension with your LumApps test platform.

You use the playground to create and run an extension project, using either your own extension code or example templates. An extension project is a combination of an extension manifest (metadata) and extension code.

## Create a project
1. Install the LumApps extension template, a library to kick-start your extensions: 
   - https://github.com/lumapps/lumapps-extensions-templates
2. Run the create lumapps-extension script to retrieve the Extensions Playground application and a sample extension.
3. Install the needed dependencies :
   - `yarn`
4. Run the playground :
    - `yarn start`


## Playground interfaces

The playground offers multiple features to help you develop, test, and interact with the LumApps Marketplace environment.

![LumApps Extensions Playground](Playground.png "LumApps Extensions Playground")

### Local Test
The playground is designed to offer a local test environment for your extension. This local environment emulate a LumApps platform to let you render and connect your extension parts. From there you can test all parts of your extension and see if its works as expected all together.

To emulate a LumApps platform you can use some options such as the **Theme switcher** to visualize your extension with a light or dark Theme, and a language field to test the translations of your extension.

### Login
The playground allows you to sign in to your LumApps test platform with your credentials. Once logged in, your account is used by the SDK to emulate the current connected user. The login feature gives you access to administration feature within the playground.

### Deployment manager

![Playground - Deployment Manager](playground-deploy.png "Playground - Deployment Manager")


With your LumApps test platform account you can proceed to deployment of your extension in your LumApps test platform. It will publish your extension on your test platform.

To perform this deployment you have to open the playground settings. 

If it's the first time you deploy your extension in your LumApps test platform, you have to declare your extension in the LumApps test marketplace by using the `Claim Extension ID` interface. It uses the information defined in your extension manifest to declare your extension.

Once declared, save the extension ID in the manifest of your extension to perform next actions.

Once your extension is declared in the test marketplace, you can build your extension using the `Build & Deploy` interface. The build process generate the Extension's Bundles, one per extension part (Content, Settings and Global Settings) and a `versionBump.json` file depending on the kind of bump you want to do. 

For the hosted test environment, you have to store the extensions bundles in a server or CDN accessible online using **HTTPS**, and allowing **CORS** to be reached by your LumApps test platform.

Once your bundles are stored, you can deploy your extension. You'll have to define the public link used by the platform to reach your extension's Bundles (eg : `https://my-server/my-extension/my-version`).

After this operation, the version of your extension is available on your LumApps test platform.


### Back Office interface
If you are logged in, you can access a back office interface. You can access this interface by clicking on your name and selecting **Back office** on the menu.

#### Extensions manager

![Playground Back Office- Extensions manager](./playground-bo-extlist.png "Playground Back Office- Extensions manager")

In this view, you will find all the extensions you already deployed on you LumApps test platform.

## Troubleshooting


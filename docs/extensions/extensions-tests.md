---
layout: default
title: Test your extension
nav_order: 4
parent: Create your extension
has_children: false
---

# Test your extension

<h6>Table of Contents</h6>

-   [Local test](#local-test)
-   [LumApps test](#lumapps-test)

For both local and LumApps test, extensions are visible only to a developer-provided list of test accounts and a small subset of LumApps accounts. Other users cannot access your extension.

## Local test

Every version of every extension begins with local test on the playground. The playground emulates a LumApps site to let you render and connect your extension. From the playground, you can test all parts of your extension and see if everything works as expected.

> **Note:** If you are working locally in the playground, you do not need to declare an identifier for your extension.

You can use some options to test different capabilities of a LumApps platform such as the **Theme switcher** to visualize your extension with a light or dark Theme, or a language field to test the translations of your extension. For more information on the Playground interface, see the [Tools documentation](../tools/index.md).

## LumApps test

When you are satisfied with your extension locally, you can deploy it on your LumApps test platform to see it in context. To perform this deployment, you must open the playground settings and go to the [deployment manager](../tools/index.md#deployment-manager) and log in with your LumApps test platform credentials (sent in the confirmation email).

If it's the first time you deploy your extension in your LumApps test platform, you have to declare your extension in the LumApps test marketplace by using the `Claim Extension ID` interface. It uses the information defined in your extension manifest to declare your extension. Once declared, save the extension ID in the manifest of your extension to perform next actions.

>**Note:** You cannot use fake partner organization or extension ID. To deploy your extension, you have to use the real IDs to let the test platform identify your extension in the test marketplace.

Once your extension is declared in the test marketplace, you can build your extension using the `Build & Deploy` interface.

![Playground - Deployment Manager](playground-deploy.png "Playground - Deployment Manager")

The build process generates the extension's bundles - one per extension part (Content, Settings, and Global Settings) and a `versionBump.json` file depending on the kind of bump you want to do.

For the LumApps test platform, you have to store the extensions bundles in a server or CDN accessible online using **HTTPS**, and allowing **CORS** to be reached by your LumApps test platform.

Once your bundles are stored, you can deploy your extension. You'll have to define the public link used by the platform to reach your extension's Bundles (e.g.,: `https://my-server/my-extension/my-version`).

After this operation, the version of your extension is available on your LumApps test platform. Access your test platform via <https://preview.lumapps.com>.

> **Note:** The first time you log in, you need to use the credentials LumApps sent in the confirmation email.

On your test platform, you need to install the extension before you can use it, then you can add it to a piece of content to ensure everything is working as expected inside a LumApps platform. For more information, see [Custom built extensions](https://docs.lumapps.com/docs/expand-l6014157339667398marketplace-custom_built).

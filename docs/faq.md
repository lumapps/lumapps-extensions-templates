---
layout: default
title: FAQ
nav_order: 8
has_children: false
---

# Frequently Asked Questions

<h6>Table of contents</h6>

- [Frequently Asked Questions](#frequently-asked-questions)
  - [Extension development](#extension-development)
    - [What if I do not want to use mocked data ?](#what-if-i-do-not-want-to-use-mocked-data-)
    - [Where can I find documentation for a specific UI component ?](#where-can-i-find-documentation-for-a-specific-ui-component-)
  - [LumApps Playground](#lumapps-playground)
    - [Do I need a partner ID and/or an extension ID ?](#do-i-need-a-partner-id-andor-an-extension-id-)
    - [Can I use fake partner and extension IDs ?](#can-i-use-fake-partner-and-extension-ids-)
  - [LumApps Test Platform](#lumapps-test-platform)
    - [How can I reach my LumApps test platform](#how-can-i-reach-my-lumapps-test-platform)

## Extension development

### What if I do not want to use mocked data ?
With the Playground we mock the information you can retrieve with the LumApps JavaScript SDK, if you want to use more real data, you can sign in to the Playground with your LumApps test account. It will replace the following mocked information :
 -  **Current connected user** - the SDK will use your user as the current connected user for your extension.
 -  **Instance ID** - The instance ID will be your LumApps Test Platform ID

Another solution to edit mocked data is to use the Playground settings dialog. You can set up the following information : 
 - **Base URL** - By editing the HTTP Origin field
 - **Content ID** - You can define a specific content ID to be used by the LumApps JavaScript SDK

The last possibility is to edit the language field in the Quick actions section of the left panel to set a specific language and test the translations of your extension.

### Where can I find documentation for a specific UI component ?
As we encourage you to use the LumApps Design System, you can check the [Design System documentation site](https://design.lumapps.com) to find all the component you can import and how to use them.


## LumApps Playground

### Do I need a partner ID and/or an extension ID ?
No, as long as you develop and test your extension locally in the LumApps Extension Playground, you do not need to declare identifier for your extension.
Your provider ID is created during the creation of your environment.

### Can I use fake partner and extension IDs ?
No, to deploy your extension on your LumApps Test Platform you'll have to use real IDs to let the platform identify your extension in the test Marketplace. 

## LumApps Test Platform

### How can I reach my LumApps test platform ?
You can access to the LumApps Test Platform via this URL : [https://preview.lumapps.com](https://preview.lumapps.com). You'll have to sign in with the credentials LumApps sent you if it's the first time you sign in, or the one you set after your first login.

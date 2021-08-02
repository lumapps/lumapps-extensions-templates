---
layout: default
title: Required technical background
nav_order: 1
parent: Extensions
has_children: false
---

# Technical background

<h6>Table of Contents</h6>

- [Technical background](#technical-background)
  - [Backend Extension](#backend-extension)
  - [Share To & Widget Extension](#share-to--widget-extension)
    - [Extension Parts](#extension-parts)

## Backend Extension
In Backend extensions you are free to define your extension as you want while it respects our guidelines.
We encourage you to use Python language since our backend SDK is only available in this language.

## Share To & Widget Extension

Since the LumApps product is developed using **ReactJS** framework, Extensions that require a UI and an integration within the LumApps platform have to be developed using this framework. You can find more information about the ReactJS framework on the [official website](https://reactjs.org/)

We also strongly encourage you to use **TypeScript** language for your front extensions. You can find more information about TypeScript on the [official website](https://www.typescriptlang.org/)

Extension written with any other language and framework won't be approved during the [Review](lifecycle-management.md#review)

### Extension Parts
Extensions are composed of three parts, one required and two optionals.

The required part:
 - **Extension Content** is the ReactJS component visible by LumApps users.

The optional parts:
 - **Extension Settings** is the ReactJS component used to display a setting panel to let contributor or advanced users set up your extension in a usage context.
 - **Extension Global Settings** is the ReactJS component used to display a setting panel to LumApps Administrators to set up your extension.




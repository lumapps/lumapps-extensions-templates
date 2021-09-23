---
layout: default
title: Required technical prerequisites
nav_order: 1
parent: Extensions
has_children: false
---

# Technical prerequisites

<h6>Table of Contents</h6>

- [Technical prerequisites](#technical-prerequisites)
  - [Backend extension](#backend-extension)
  - [Share To & Widget extension](#share-to--widget-extension)
    - [Extension parts](#extension-parts)

## Backend extension
In Backend extensions you can define your extension as you want while it respects our guidelines.
We encourage you to use Python language as our backend SDK is only available in this language.

## Share To & Widget extension

Since the LumApps product is developed using **ReactJS** framework. Extensions that require a UI and an integration within the LumApps platform have to be developed using this framework. You can find more information about the ReactJS framework on the [official website](https://reactjs.org/).

We also encourage you to use **TypeScript** language for your front extensions. You can find more information about TypeScript on the [official website](https://www.typescriptlang.org/).

Extension written with any other language and framework won't be approved during the [review](lifecycle-management.md#review).

### Extension parts
Extensions are composed of three parts, one required and two optional.

Required:
 - **Extension Content** is the ReactJS component visible by LumApps users.

Optional:
 - **Extension Settings** is the ReactJS component used to display a setting panel to let contributor or advanced users set up your extension in a usage context.
 - **Extension Global Settings** is the ReactJS component used to display a setting panel to LumApps administrators to set up your extension.




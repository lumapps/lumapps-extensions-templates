---
layout: default
title: Designing Extensions
nav_order: 3
parent: Extensions
has_children: false
---

# Designing Extensions

<h6>Table of Contents</h6>

- [Designing Extensions](#designing-extensions)
  - [Introduction](#introduction)
  - [General guidelines](#general-guidelines)
    - [UI Recommendation](#ui-recommendation)
  - [Share To Extension Guidelines](#share-to-extension-guidelines)
  - [Widget Extension Guidelines](#widget-extension-guidelines)

## Introduction
If you are just getting started with Extensions, use the recommendations in this guide to put your best foot forward for LumApps users. If you already shipped an extension, use this guide to take your extension to the next level.

## General guidelines
Extensions provide ways to extends LumApps, so we provide guidelines to help ensure your experiences are harmonious with the overall LumApps experience. 

The guidelines in this section apply to all extension types. Guidelines for specific extension types appear in Share To Extension Guidelines, and Widget Extension Guidelines.


### Terminology

The following table contains terms you will need to understand when you’re designing an extension.

| Term                                                                                                                                                                       | Guideline |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| The extension’s Name is how you define what LumApps users know it as. The name can show up in many places, such as the Extensions library and the extension usage. |  Use a descriptive name that allows users to understand what your extension does at a glance.<br/><br/>Don’t change the name, unless the nature of the extension has changed significantly.<br/><br/> Don’t use words unrelated to your extension just to boost your extension in search results.<br/><br/> We do recommend translating your extension's name in different languages to let international users find your extension.|
| The Description is a longer explanation of your extension. It appears on the extension library page. | Write the description from a user’s viewpoint. Let users know how your extension will improve and enhance their platform.<br/><br/> Consider writing in the second person (using you/your), to more closely associate with users.<br/><br/> Don’t be too verbose.<br/><br/> We do recommend translating your extension's description in different languages to let international users understand what your extension does.|
| The Extension's Logo is the first thing users see of your extension. Like the name and the description this logo is visible in many places. | Avoid having too much detail in the image, to maximize visibility.<br/><br/> Prefer vector images to optimize the resizing of your logo.<br/><br/> Do not set to large images to not affect platform performances.|
| The Documentation link is a link to your documentation to help LumApps users to use and set up your extension. This link is available in the extensions list in the customer platform. | Your documentation link should not be use as a promotion link to your product, you should present documentation about your extension and the way to use your extension.|


### UI Recommendation
 - **Branding** - Your extension’s branding should be clean, recognizable, and unique. In general, use your logo sparingly and use brand color to enhance your brand on LumApps. Your extension cannot include LumApps-branded elements, including the LumApps logos.
 - **Color** - Use a limited color palette. Use a key color for emphasis and calls to action. Avoid using the same colors for interactive and non interactive elements. You are supporting light vs. dark mode for widget and Share To Extensions.
 - **Contrast and accessibility** - Always provide enough contrast between colors, to ensure your designs are as accessible as possible. Avoid links on backgrounds that are of similar contrast. Consider your color-blind audience. We recommend you use this [contrast checker tool](https://webaim.org/resources/contrastchecker/).
 - **Stateful feedback** - Preload wherever possible.
Widget: If a widget extension needs to display a loading state, design the loading state to be as clear and concise as possible. Consider adding a loading indicator. Use status indicators to communicate updates, errors, and other issues; your audience should not have to guess what is going on.
 - **Navigation** - In general, avoid multi-layered navigation. If you cannot, then provide a clear path to let users know where they are. Ask yourself if each navigation element is necessary.

## Share To Extension Guidelines
 - **UI** - In LumApps we develop and maintain a [Design System](https://design.lumapps.com/), in order to keep consistency with the LumApps platform of our client, you have to use this design for your extension. Using this library will bring you facilities to use some LumApps core features (Theme switching from Light to Dark), ease the development of your extension.
 - **Sizing** - As LumApps platform can be used on mobile, you have to think about responsibility of your extension to ensure the user experience is still good even on smaller screen. You can test the responsibility during the Local Test on the Playground, the Content part of your extension is in a resizable block. 
 - **Accessibility** - Always keep an eye on accessibility of your extension. Think of color contrast, keyboard navigation, and as explain above, mobile navigation.
 - **Internationalization** - LumApps customers can be worldwide, your extension must implement internationalization features and provide several translations. At least you have to provide English translations for your extension.

## Widget Extension Guidelines
Widget Extensions are meant to be used in contents and visible by all LumApps end users, you have to be aware of some points of attention : 
 - **Performances** -Your extension will be used in content, with other widgets, your extension must not alter global performances of LumApps platform, you can refer to [develop extensions](develop-extensions.md) page to have good practices.
 - **UI** - In LumApps we develop and maintain a [Design System](https://design.lumapps.com/), in order to keep consistency with the LumApps platform of our client, you have to use this design for your extension. Using this library will bring you facilities to use some LumApps core features (Theme switching from Light to Dark), ease the usage of specific styles for LumApps customers, and ease the development of your extension.
 - **Sizing** - As LumApps platform can be used on mobile, you have to think about responsibility of your extension to ensure the user experience is still good even on smaller screen. You can test the responsibility during the Local Test on the Playground, the Content part of your extension is in a resizable block. 
 - **Accessibility** - Always keep an eye on accessibility of your extension. Think of color contrast, keyboard navigation, and as explain above, mobile navigation.
 - **Internationalization** - LumApps customers can be worldwide, your extension must implement internationalization features and provide several translations. At least you have to provide English translations for your extension.


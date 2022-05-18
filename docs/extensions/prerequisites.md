---
layout: default
title: Prerequisites and guidelines
nav_order: 1
parent: Create your extension
has_children: false
---

# Prerequisites and guidelines

<h6>Table of Contents</h6>

- [Prerequisites](#prerequisites)
  - [Backend extension prerequisites](#backend-extension-prerequisites)
  - [Share To & Widget extension prerequisites](#share-to-widget-extension-prerequisites)
- [Guidelines](#guidelines)
  - [Terminology](#terminology)
  - [Common recommendations](#common-recommendations)

## Prerequisites

### Backend extension prerequisites
For Backend extensions, there are no specific restrictions as long as you respect the guidelines. We encourage you to use the Python language as our backend SDK is only available in this language.

### Share To & Widget extension prerequisites
Since your LumApps platform is developed using a **ReactJS** framework, extensions that require a user interface and an integration within the LumApps platform have to be developed using this framework. You can find more information about the ReactJS framework on the [official website](https://reactjs.org/). We also encourage you to use the **TypeScript** language for your front extensions. You can find more information about TypeScript on the [official website](https://www.typescriptlang.org/).

**Important**: Extension written with any other language and framework will not be approved during the [review](submit-extension.md#review).

Share To and Widget extensions are composed of three parts:
 - **Extension Content** is the ReactJS component visible by LumApps users.
 - **Extension Settings** (opt.) is the ReactJS component used to display a setting panel to let contributor or advanced users set up your extension in a usage context.
 - **Extension Global Settings** (opt.) is the ReactJS component used to display a setting panel to LumApps administrators to set up your extension.

## Guidelines
If you are just getting started with extensions, use the following recommendations to bring the best for LumApps users. If you already shipped an extension, use this guide to take your extension to the next level.

Extensions provide ways to extend LumApps capabilities. We provide guidelines to help ensure your experiences are in line with the overall LumApps experience. The guidelines in this section apply to all extension types. Guidelines for specific extension types appear in Share To extension guidelines, and Widget extension guidelines.

### Terminology

 The following table contains terms you need to understand when you’re designing an extension.

| Term             | Definition       | Guidelines |
| ---------------- | ---------------- | --------- |
| Extension name   | The extension’s name reflects the purpose of your extension. The name can show up in many places, such as the extensions library and the extension usage. |  Use a descriptive name that allows users to understand what your extension does at a glance.<br/><br/>Don’t change the name, unless the nature of the extension has changed significantly.<br/><br/> Don’t use words unrelated to your extension just to boost your extension in search results.<br/><br/> We do recommend translating your extension's name in different languages to let international users find your extension.|
| Extension description | The description is a more detailed explanation of your extension. It appears on the extension library page. | Write the description from a user’s viewpoint. Let users know how your extension will improve and enhance the experience on their platform.<br/><br/>Consider writing in the second person (using you/your), to more closely associate with users.<br/><br/> Don’t be too verbose.<br/><br/> We do recommend translating your extension's description in different languages to let international users understand what your extension does.|
| Extension logo | The extension's logo is the first thing users see of your extension. Like the name and the description, this logo is visible in many places. | Avoid having too much detail in the image, to maximize visibility.<br/><br/> Prefer vector images to optimize the resizing of your logo.<br/><br/> Do not set too large images to not affect platform performances.|
| Extension documentation link | The documentation link must redirect to your documentation to help LumApps users to use and set up your extension. This link is available in the extensions list in the customer platform. | Your documentation link should not be used as a promotion link to your product. You should present documentation about your extension and the way to use it.|

### Common guidelines
  - **Branding**: Use a clean and recognizable branding for your extension. It affects the extension's name, description, and logo.
  - **UI**: At LumApps, we develop and maintain a [Design System](https://design.lumapps.com/). In order to keep a consistency within the LumApps platform of our client, you have to use this design for your extension. Using this library will bring you facilities to use some LumApps core features (Theme switching from Light to Dark), ease the usage of specific styles for LumApps customers, and ease the development of your extension.
  - **Sizing**: As a LumApps platform can be used on mobile, you have to think about the mobile responsiveness of your extension to ensure the user experience is still good even on smaller screens. You can test the responsiveness during the local test on the playground. The content part of your extension is in a resizable block.
  - **Accessibility**: Always keep the accessibility of your extension in sight. Think of color contrast, keyboard navigation, and mobile navigation.
  - **Internationalization**: LumApps has customers on different continents, your extension must implement internationalization features and provide several translations. Provide English translations for your extension at the very least.

Additional guidelines for widget extensions:
  - **Performances**: Your extension will be used with other widgets, your extension must not alter the global performances of a LumApps platform. You can refer to [develop extensions](develop-extensions.md) page to have good practices. If you have to load data, use loading indicator, and clear and concise loading states.
  - **Feedback**: Provide LumApps users with clear feedbacks on updates or errors. Users should know what happens on the extension.

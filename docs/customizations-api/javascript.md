---
layout: default
title: JavaScript
nav_order: 1
has_children: true
parent: Customizations API
---

# Getting started

<h6>Table of Contents</h6>

## Concept and context
When it comes to customizing your site using JavaScript, LumApps provides a set of functionalities that allow developers to add visual components to the existing product without the need to use standard JavaScript or external libraries such as [jQuery](https://jquery.com/), or to write these components from the ground up. It is important to remember that this API should be used as a last resort, meaning that the current customization possibilities that LumApps provides are not enough for achieving the desired functionality.

## Prerequisites
- In order to add customizations to your site, basic knowledge of [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is mandatory.
- In order to deploy customizations into your site, you will need to be the administrator of the site where you want to add these customizations.
- In order to follow this guide and use the examples documented below, your platform needs to have the new top bar activated. Without it, customizations will not work as expected. Please reach out to your LumApps representative if you still do not have the new top bar activated.
- For development, we strongly suggest using the following tools in order to have a proper development environment:
    - [Visual Studio Code](https://code.visualstudio.com/) for creating and editing code;
    - [Git](https://git-scm.com/) for properly versioning the customizations that you will be creating.

## Principles
Before discussing how the Customizations API technically works, it is important to know what principles it follows and what the objective of this API is in the long run. In essence, this api aims to:
- Support customization in a simple, supported and maintainable way
- Help developers to support and control these customizations, without breaking a sweat
- Provide an API that is agnostic to the framework used by LumApps for developing web applications while been able to reuse patterns and components
- Standarize and officialise the way in which customizations in JS and CSS are added to the page

## Foundations

The Customizations API is based on JavaScript callbacks that are executed once the application has finished loading. These customizations are added directly into the HTML of the page when a user requests to access the website, and these customizations are mounted when the page is being rendered. Customizations are stored in memory while the necessary JS bundles are downloaded and the mandatory API requests are finished. Once that process is done, each section of the page can easily determine if there are any customizations associated to that specific section added to the application. If there are, each component carries it its rendering process while considering any customizations that were added to the page, been that moment the exact moment when the customizations callback is executed.

The technical reasoning behind this decision was:

- Customizations added to the website could have an impact on the performance of the site. Storing them while the page is being rendered in order to execute them later on allows the application to carry out the most important and core tasks and then, later on, take care of the specifics of the current application. An argument could be made that if there were a lot of customizations added with a considerable amount of code, retrieving and adding them to the HTML will cause the overall size of the page's HTML to increase, therefore impacting performance. This is a fair argument and it is something that needs to be considered while developing these customizations. For more information, see best practices.
- Callbacks allow the page to load the necessary information to render the page, but also it gives these customization access to that same information, by passing in that data when that callback is executed.

The main entry point for customizations is the `window.lumapps` object, which is intended to hold all of the functionalities and utilities needed to customize a site. On that variable, the main function that will allow developers to customize their sites, is the `window.lumapps.customize` function. The following code snippet is a simple example on how to create a customization, reuse existing components and render them in a specific target and placement. This specific snippet renders a message on top of all pages.

```js
window.lumapps.customize(({ targets, components, render, placement, constants }) => {
    const { Message } = components;
    const { Kind } = constants;

    render({
        placement: placement.ABOVE,
        target: targets.PAGE,
        toRender: Message({
            className: 'general-message',
            kind: Kind.info,
            children: 'Message above all pages',
            hasBackground: true,
        }),
    });
});
```

Lets analyze that snippet, line by line:

```js
window.lumapps.customize(({ targets, components, render, placement, constants }) => {
```

As mentioned before, the customizations API works on callbacks. That is why we pass into `window.lumapps.customize` a function. This will be the function that will be executed once the application is mounted. This callback will receive several parameters, (which are detailed in our [detailed api](#detailed-api) section) that are useful for retrieving components, targets and other important variables. In the example, the callback is using the following variables:
- `targets`: Variable that defines the targets available in the page for customization.
- `components`: Variable that holds all the available components for customization.
- `placement`: Variable that defines the different places where a target can be customized.
- `render`: Function that allows rendering a customization on the application.
- `constants`: Variable that defines several constants that can be reused when creating components.

```js
const { Message } = components;
const { Kind } = constants;
```

From the `components` and `constants` variables we can retrieve the different components that we want to reuse as well as the constant values that these components use. In this case, we retrieve the `Message` component and since that component has a specific `kind`, we retrieve the `Kind` variable from `constants`.

```js
render({
    placement: placement.ABOVE,
    target: targets.PAGE,
    toRender: Message({
        className: 'general-message',
        kind: Kind.info,
        children: 'Message above all pages',
        hasBackground: true,
    }),
});
```

In order to render the custom component on the page, we use the `render` function, specifying the placement, the target and the component to render.
- `placement`: We use the `placement` parameter in order to retrieve the `ABOVE` position.
- `target`: We use the `target` parameter in order to retrieve the `PAGE` target.
- `toRender`: This parameter allows passing in a component, which is the result of executing the `Message` component function. That component has the following properties that allow it to be configured:
    - `className`: CSS class that will be applied to the component.
    - `kind`: Type of message that will be displayed.
    - `children`: Content that will be displayed inside the `Message` component.
    - `hasBackground`: Whether the background color should be displayed or not.

This code will result in the following component being rendered on the page:

![Target Page Placement Above](./assets/page-above.png "Target Page Placement Above Example")
---
layout: default
title: Best practices
nav_order: 7
has_children: false
parent: JavaScript
grand_parent: Customizations API
---

# Best practices

## Multiple customizations

It may occur that you have multiple customizations in your site, each of them customizing a different `target` and `placement`. In this scenario, we recomend that you group your customizations depending on the configuration that you have passed in as a second argument to the `window.lumapps.customize` function. So for example, if you have three customizations, where two of them are customizing the top bar and should not be rendered on navigation, and another one is customizing the contextual actions menu with the `shouldRenderOnNavigation` on `true`, we recommend that you structure your code like this:

```js
window.lumapps.customize(({ targets, components, render, placement }) => {
    const { Button, DropdownSection, DropdownItem, Dropdown } = components;

    render({
        placement: placement.RIGHT,
        target: targets.SEARCH_BOX,
        toRender: Button({
            children: 'Help',
            className: 'lumx-spacing-margin',
            leftIcon: 'help',
            href: 'https://portal.help.com',
            target: '_blank'
        }),
    });

    render({
        placement: placement.RIGHT,
        target: targets.NAVIGATION,
        toRender: Dropdown({
            children: DropdownSection({
                children: [
                    DropdownItem({
                        title: 'Google Drive',
                        icon: 'google-drive',
                        href: 'https://drive.google.com/',
                    }),
                    DropdownItem({
                        title: 'Google Docs',
                        icon: 'text-box',
                        href: 'https://docs.google.com/document',
                    }),
                    DropdownItem({
                        title: 'Google Slides',
                        icon: 'play-box-outline',
                        href: 'https://docs.google.com/presentation/',
                    }),
                ],
                header: 'Google',
            }),
            label: 'Utils',
        }),
    });
});

window.lumapps.customize(({ targets, components, render, placement, constants }) => {
    const { ContextualAction } = components;
    const currentContent = window.lumapps.getCurrentContent();

    render({
        placement: placement.UNDER,
        target: targets.CONTEXTUAL_ACTIONS,
        toRender: ListItem({
            labelKey: 'Action',
            action: {
                href: `https://external.url.com/content/${currentContent.id}`
                target: '_blank',
            },
            icon: 'content-copy',
        }),
    });
},
{
    shouldRenderOnNavigation: true,
});
```

## Using external libraries

While developing customizations you might want to use external javascript libraries such as `jQuery`, `moment` or `lodash`. LumApps does not have any library exposed on the site other than the Customizations API. Furthermore, you should be able to customize many different types of customizations only with the Customizations API and the functionalities available out-of-the-box for each browser. If you need to add an external library, you might want to reconsider your customization and see if you can implement it without a library. 

If, by any reason, you still need to use a library to develop your customization, please consider the following notes:
- Any of the customizations that you add to the page would need to be executed after these libraries are downloaded, since they will be using that downloaded library. This is not how the Customizations API was intended to be use, so this scenario is considered as a not supported use case. This means that customizations could not be working as expected, and LumApps will not support this use case in any way.
- You might want to consider using [unpkg.com](https://unpkg.com/) for retrieving these libraries.

## Customizing with JS without the customizations API

Since the Head (HTML) field on the Style administration is a free text field, you are most certainly able to enter whatever HTML you want to change the behavior of your site. That being said, any JS customizations applied to your site that do not use the Customizations API will not be consider as a valid use case and therefore will not have any support whatsoever if the customization does not work or stops working with a new LumApps release.

Furthermore, not using the Customizations API in order to change the markup of the application may result in a degradation in the performance of your site, and also lead to some unexpected behaviour. For example, adding a script tag to an HTML Widget where you are querying an API and updating the markup wiht the response will cause the rendering of the page to be blocked for a few instants, pausing the entire rendering process and interrupting the natural life cycle of the LumApps web application. The reason is that script that changes the DOM is considered as render blocking by the browser, meaning that the browser needs to analyze, execute and impact the results of that script before continuing with the rendering of the page. The Customizations API allows developers to tap into LumApps web application's life cycle, thus avoiding this render blocking scenario.

## Rendering on callbacks

As of right now, we do not provide support for executing the `render` function from a callback, for example, after the user has clicked on a button and the `onClick` function was called. As for now, we only support executing `render` on the application's start up.

## Executing code after an HTML customization has rendered

Consider the use case where you want to execute a JS code that manipulates the DOM of a certain HTML that you have rendered on LumApps using the customizations API:

```js
window.lumapps.customize(({ targets, components, render, placement, constants, session }) => {
    const { RawHTML } = components;

    render({
        placement: placement.RIGHT,
        target: targets.LOGO,
        toRender: RawHTML({
            className: 'raw_html',
            html: '<input id="input" />'
        }),
    });

    const input = document.getElementById('input');

    console.log(input);
});
```

That code won't print 100% of the times an actual reference to the input, as we mentioned before, the Customizations API renders the customizations in a very specific way, tapping into LumApps internal rendering process. This means that when `document.getElementById` is executed, the `input` might have not yet been rendered on the page.

In this scenario, it is best to execute your code with a small delay, by using `window.setTimeout` for example:
```js
window.lumapps.customize(({ targets, components, render, placement, constants, session }) => {
    const { RawHTML } = components;

    render({
        placement: placement.RIGHT,
        target: targets.LOGO,
        toRender: RawHTML({
            className: 'raw_html',
            html: '<input id="input" />'
        }),
    });

    window.setTimeout(() => {
        const input = document.getElementById('input');

        console.log(input);
    }); // Consider adding some miliseconds to this callback if the contents that you are rendering take a significant time to render.
});
```

**IMPORTANT**: This will only work while using the `RawHTML` component, using this snippet with other components is not supported.

## No need to use DOMContentLoaded

In order to execute your customizations, there is no need to execute them inside an event listener for `DOMContentLoaded`. This is already taken care of by the customizations API, and it might result on displaying your customizations after the first paint of the page is executed, which can not be the best user experience.

## Do not use setText and disable dynamically

The functions `setText` and `disable` are two functionalities that allow developers to change the behavior of their site. They provide the possibility to disable specific components of the page, as well as changing the text of specific components.

For example, we want to change the text of the search box on the top bar, and hide the contribution button. We would need to add the following code:
```js
window.lumapps.setText('search-box', {
    en: 'Explore',
    fr: 'Explorer',
    es: 'Explorar'
});

window.lumapps.disable('contribution-button');
```

These changes are quite visible on the page, since both the search box and the contribution are right at the top center of the page. So if we are going to disable the feature (meaning that the button will disappear) or change the text of the search box text field, we need to do this as quick and as fast as possible in order to avoid showing the old text and the button for a split second, and then hide them right away when the page is loaded. 

So in order to avoid these scenarios (where components appear and then disappear), `setText` and `disable` will not work in combination with `customize`. For these specific scenarios, we recommend using plain javascript in order to make these changes, however we do not provide any support for this usage.

## Execute disable as quickly as possible

The `disable` function should be executed as quickly as possible in the application's lifecycle. This is in order to avoid having flashes of a component displaying and hiding a few moments later.

## Do not use onNavigation for rendering components

This specific function should be used for tracking purposes as well as triggering other external services. It should not be used in combination with the `render` function, since this is not intended to work by design. Targets and placement should already help in rendering customizations on specific pages. 

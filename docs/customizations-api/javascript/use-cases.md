---
layout: default
title: Use cases
nav_order: 3
has_children: false
parent: JavaScript
grand_parent: Customizations API
---

# Use cases

In this document you will find a series of most common use cases when it comes to implementing the Customizations API on a LumApps site. These code snippets should give a clear idea of what the API is capable to do and provide several ideas on how to implement it.

**IMPORTANT:** these are just examples of the different scenarios where the Customizations API could be an adequate solution for it. They are not complete examples, and would definitely need to be adjusted/changed/rewritten in order to be compatible with your LumApps site.

## Adding a side navigation to the application

The following script uses the target `targets.APP` and the placement `placements.LEFT` or `placements.RIGHT` in order to create a side navigation that will be visible throughout the entire application, displaying links to Google's applications.

This use case can be extended and combined with the use case [Querying an external service](#querying-an-external-service) in order to retrieve the links to display in the side navigation from any service.

```js
window.lumapps.customize(({ targets, components, render, placement, session, constants }) => {
    const { Orientation, ColorPalette, Size } = constants;
    const items = [
        {
            name: {
                en: 'Google Drive',
                fr: 'Google Drive',
                es: 'Google Drive',
            },
            link: {
                en: 'https://drive.google.com/',
                fr: 'https://drive.google.com/',
                es: 'https://drive.google.com/',
            },
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png'
        },
        {
            name: {
                en: 'Google Meet',
                fr: 'Google Meet',
                es: 'Google Meet',
            },
            link: {
                en: 'https://meet.google.com/',
                fr: 'https://meet.google.com/',
                es: 'https://meet.google.com/',
            },
            thumbnail:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/1024px-Google_Meet_icon_%282020%29.svg.png',
        },
    ];
    const { Link, FlexBox, Thumbnail, RawHTML } = components;

    render({
        placement: placement.LEFT,
        target: targets.APP,
        toRender: FlexBox({
            className: 'side-bar',
            orientation: Orientation.vertical,
            children: items.map((item) => {
                const name = item.name[session.language];
                const link = item.link[session.language];

                return Link({
                    children: [
                        Thumbnail({ className: 'app-link--image', image: item.thumbnail, size: Size.m }),
                        RawHTML({ html: `<span class="app-link--name">${name}</span>` }),
                    ],
                    href: link,
                    color: ColorPalette.primary,
                    className: 'app-link lumx-spacing-padding-big',
                });
            }),
        }),
    });
});
```

![Use case side Navigation](./assets/use-case-side-navigation.png "Use case side Navigation")

Here's the CSS used for this specific snippet, but you can use whatever CSS you want to customize your side nav. This is just an example.

```css
.side-bar {
    z-index: 10000; // make sure it displays above the site's header
    background: #0165FB;
    color: white;
    position: fixed;
    height: 100vh;
}

.app-link--name {
    color: white;
}

.app-link--image {
    margin-bottom: 16px;
}
```

## Displaying a modal welcome window

In order to display a message that shows up when the user enters the site, you can use a Dialog in order to get the user's attention right away, and display a message at the center of the page. For that, you can use the `Dialog` component in combination with the `RawHTML` component. A good use of this Dialog is to display on boarding messages to users that have never used your platform.

**IMPORTANT:** This is just an example on how to use the Dialog component. This is not a full working example, and adjustements are needed for making this solution work in combination with a proper cache system.

```js
window.lumapps.customize(({ targets, components, render, placement, session }) => {
    const { RawHTML, Dialog } = components;

    /**
    * Since we want to avoid this dialog showing everytime the user enters the page, we want to save whether the user has already
    * accepted the message by setting a variable in local storage when the user clicks on the accept button. If that value is true,
    * the next time the user enters the page, they won't see the dialog.
    */
    const storageKey = 'has-read-onboarding';
    const hasReadOnBoarding = localStorage.getItem(storageKey);

    const onAccept = () => {
        localStorage.setItem(storageKey, true);
    }

    if (!hasReadOnBoarding) {
        render({
            placement: placement.LEFT,
            target: targets.APP,
            toRender: Dialog({
                isOpen: true,
                header: RawHTML({ html: '<span class="lumx-typography-title">Welcome to your site\'s on boarding message!</span>' }),
                accept: {
                    label: 'OK',
                    onClick: onAccept,
                },
                /**
                 * For the message, we can use the user's current session to retrieve their name and make their onboarding more personalized
                 */
                body: RawHTML({
                    html: `
                        <p>
                            Welcome <b>${session.user.firstName}</b>, glad to see you could join us!
                        </p>
                        <br/>
                        <p>
                            A warm welcome and lots of good wishes on becoming part of our growing team. Congratulations and on behalf of all the members. We are all happy and excited about your inputs and contribution to our company!
                        </p>
                        <br/>
                    `,
                }),
            }),
        });
    }
});
```

![Use case onboarding](./assets/use-case-onboarding.png "Use case onboarding")

**Use case limitations and best practices**
- Showing the Dialog when the user enters the site means that each time the page is loaded, the dialog will be displayed. In that case, it is important to manage when the user has closed the dialog and open the dialog only if the user did not already close it. This can be managed by setting a variable in local storage or a cookie when the user has clicked on the **Accept** button and executing the render function only if that value was not set.
- The Dialog component is meant to be used only one time during the life cycle of a user's session. Meaning that this Dialog will be displayed, the user will close it, and the Dialog will not display again during the user's session. Reusing a Dialog and displaying it multiple times is not supported.

## Hide app launcher

In the scenario that you would want to hide the App launcher, the following snippet needs to be included in your site:

```js
window.lumapps.disable('bookmarks');
```

## Display a message above all pages of a certain type

In this use case, we are displaying a message oon all pages of a certain type. This should be used when an important message wants to be conveyed for all pages of a site in a quick and efficient way.

This customization can be executed with `target.COMMUNITY` if the message should only be displayed on communities, or `target.CONTENT` if the message should only be displayed on contents.

```js
window.lumapps.customize(({ targets, components, render, placement, constants }) => {
    const { Message } = components;
    const { Kind } = constants;
    const desiredTarget = targets.COMMUNITY; // or targets.CONTENT

    render({
        placement: placement.ABOVE,
        target: desiredTarget, 
        toRender: Message({
            className: 'message',
            kind: Kind.info,
            children: `All pages of the ${desiredTarget} type will see this message!`,
            hasBackground: true,
        }),
    });
});
```

![Use case community](./assets/use-case-community.png "Use case community")

**Use case limitations and best practices**
- This customization could be combined with `window.lumapps.getCurrentContent()` in order to render the message on just a few pages, by checking their ID. However, in those scenarios we recommend adding a widget to those pages rather than executing a customization.

## Create a Copy Link to Content action

The contextual actions menu displays a set of actions that can be executed on the currently displayed content. It is a great place to add custom actions to your contents. For example, let's say that you want to add a `Copy link to content` action, that will copy the current content's link to the clipboard.

```js
window.lumapps.customize(({ targets, components, render, placement, constants }) => {
    const { ContextualAction, ListItem, Icon } = components;
    const { Size } = constants;

    const onClick = () => {
        /**
         * Copying to the clipboard requires the creation of a DOM element that will serve
         * as the placeholder for the text to be copied. In order to copy the URL, we create
         * a textarea, replace the text for the `window.location.href` value and then execute
         * the `document.execCommand('copy')`.
         */
        const copyingTextArea = document.createElement('textarea');
        copyingTextArea.value = window.location.href;

        document.body.appendChild(copyingTextArea);

        copyingTextArea.select();
        document.execCommand('copy');

        document.body.removeChild(copyingTextArea);

        /** Displaying an alert in order to let the user know that the copy was a success is always a best practice */
        alert('Content URL copied to clipboard!')
    }

    render({
        placement: placement.UNDER,
        target: targets.CONTEXTUAL_ACTIONS,
        toRender: ContextualAction({
            /** The action label translation key. */
            labelKey: 'Copy link',
            /** The action which can be either a link or a callback. */
            action: onClick,
            /** The action icon to display in the contextual menu. */
            icon: 'content-copy',
            /** Whether or not the action is disabled. */
            isDisabled: false,
            /** Whether the action should appear selected or not. */
            isSelected: false,
            /** The action tooltip label translation key. */
            tooltipLabelKey: 'Copy link from current content',
        }),
    });
});
```

![Use case contextual actions](./assets/use-case-icon-contextual-actions-copy-link.png "Use case contextual actions")

If the action that you are creating needs to retrieve information from the current content in order to create a URL, you can use the `getCurrentContent` function available on the `window.lumapps` variable. Let's say that you want to create a URL that uses the content's id and that opens a new tab.


```js
window.lumapps.customize(({ targets, components, render, placement, constants }) => {
    const { ContextualAction } = components;
    const { Size } = constants;
    /**
     * This retrieves the current displayed content, so it can be used as input for creating the customization.
     */
    const currentContent = window.lumapps.getCurrentContent();

    render({
        placement: placement.UNDER,
        target: targets.CONTEXTUAL_ACTIONS,
        toRender: ContextualAction({
            /** The action label translation key. */
            labelKey: 'Action',
            /** The action icon to display in the contextual menu. */
            icon: 'content-copy',
            /** Whether or not the action is disabled. */
            isDisabled: false,
            /** Whether the action should appear selected or not. */
            isSelected: false,
            /** The action tooltip label translation key. */
            tooltipLabelKey: 'Do something',
            /** Since we are displaying a link and not a clickable action, we pass link properties to the `action` property in order to configure our link */
            action: {
                href: `https://external.url.com/content/${currentContent.id}`,
                target: '_blank',
            },
        }),
    });
},
/**
 * Customizations by default are not re-rendered when there is a navigation on the page. This allows the application to remain responsive and avoid
 * unnecessary re-renders since these customizations are 90% of the time the same, no matter the page they are in. For the cases where we need to access
 * the information coming from the current content, an additional parameter can be passed to the `window.lumapps.customize` function, letting the frontend
 * application know that this customization needs to be rendered on navigation. That way, when the user navigates between contents, the URL on the contextual
 * actions will be up to date.
 */
{
    shouldRenderOnNavigation: true,
});
```

**Use case limitations and best practices**
- In order to maintain a visual coherence on the contextual actions menu, the best components to use for these types of customizations are ListItems. Using other components will result in a non-optimal user interface, possibly hurting the user experience. Furthermore using other components in this customization is a not supported feature.
- Avoid using `shouldRenderOnNavigation` configuration if possible, re-rendering customizations may have an impact on the performance of the application. This option should only be used if there is no other possible solution to retrieve the content's information (like retrieving the URL from `window.location.href`).

## Adding new actions on the top bar

In order to allow the users of the site to have additional quick access to other tools within your enterpise, adding components to the top bar of your site can be a great solution.

For example, if you want to add a button with a link between the contribution button and the search box, the following snippet will add one, allowing users to be redirected to an external page.

```js
window.lumapps.customize(({ targets, components, render, placement }) => {
    const { IconButton } = components;

    render({
        placement: placement.RIGHT,
        target: targets.SEARCH_BOX,
        toRender: IconButton({
            /** Usage of lumapps base CSS classes that allow adding margin or padding using the base spacing units */
            className: 'lumx-spacing-margin',
            /** id of the icon to be displayed */
            icon: 'help',
            /** link for the button */
            href: 'https://portal.help.com',
            /** how the link should be opened */
            target: '_blank'
        }),
    });
});
```

![Adding new actions on the top bar](./assets/use-case-adding-new-actions-to-the-top-bar.png "Adding new actions on the top bar")

**Use case limitations and best practices**
- Please take into consideration how many items you already have in your main navigation, specially the ones added as directories. Adding a lot of items on the top bar can eventually result in unwanted behavior since the top bar as a fixed width of `1128px` in desktop. If the total amount of items on the top bar exceeds that length, icons will be displayed in several lines, which will provide a look & feel that will not appeal to your users.
- Also consider that the icons added to the top bar with the customizations API will display on the responsive version of the page, so adding a lot of icons may also result in unwanted behavior on the responsive version. If you want to avoid showing the icon in responsive version, please take a look at the [detailed api](#detailed-api) for more information.
- In order to maintain a visual coherence on the top bar, the best components to use for these types of customizations are Buttons or Icon Buttons. Using other components will result in a non-optimal user interface, possibly hurting the user experience.

## Adding links to the contribution menu

The contribution menu displays a set of links for creating content on the site. If you have other utilities that allow creating content, this contribution menu can be an ideal place for adding links that connect LumApps with those utilities. For example, let's say that you want to connect your users to Medium, so they have a quick access for creating articles:

```js
window.lumapps.customize(({ targets, components, render, placement }) => {
    const { DropdownSection, DropdownItem } = components;

    render({
        placement: placement.UNDER,
        target: targets.CONTRIBUTION_MENU,
        toRender: DropdownSection({
            children: DropdownItem({
                title: 'New Medium Article',
                icon: 'message-text',
                href: 'https://medium.com/new-story',
            }),
            header: 'Medium',
        }),
    });
});
```

![Use case contribution menu](./assets/use-case-contribution-menu.png "Use case contribution menu")

**Use case limitations and best practices**
- In order to maintain a visual coherence on the contribution menu, the best components to use for these types of customizations are `DropdownSection` and `DropdownItem`. Using other components will result in a non-optimal user interface, possibly hurting the user experience. Furthermore using other components in this customization is a not supported feature.

## Add an additional logo or badge depending on the current user

The logo target allows developers to add a customization to the left or to the right hand side of the logo. In this use case, we will be adding a badge to the right hand side of the logo when the user is a site admin. This can be done by combining the `Badge` component with the `session.user` object, by only adding the customization if `session.user.isAdmin` is `true`.

```js
window.lumapps.customize(({ targets, components, render, placement, session }) => {
    const { Badge } = components;
    const { user } = session;

    if (user.isAdmin) {
        render({
            placement: placement.RIGHT,
            target: targets.LOGO,
            toRender: Badge({
                children: 'A',
                className: 'admin-badge',
            }),
        });
    }
});
```

![Use case logo](./assets/use-case-logo-badge.png "Use case logo")

In order to make the badge display on top of the logo, a small CSS adjustment needs to be made. This is the code used for the purpose of this use case:

```css
.admin-badge {
    margin-top: 15px;
    margin-left: -5px; // use a negative margin so the badge displays on top of the logo.
}
```

## Hide the entire navigation on your site

If your site does not need a navigation and you want to avoid the space that the navigation occupies, you can use the following code snippet to hide the navigation and adjust your site to profit from that additional space.

**IMPORTANT:** If you are trying to hide the navigation on your site, please use this approach and avoid hiding it with CSS. This method will provide you an increase in performance as well as in user experience.

```js
window.lumapps.disable('navigation');
```

This snippet will:
- Avoid the display of the navigation's UI.
- Avoid any XHR requests that are executed in order to retrieve the navigation's data.
- Avoid downloading the javascript code needed to display the navigation.

![Use case no navigation](./assets/use-case-no-navigation.png "Use case no navigation")

In order to make this customization work as expected, an additional CSS and some configuration to your site needs to be added in order to achieve the expected behaviour:

```css

// move the box-shadow to the header rather than the navigation and add the box shadow
// to the server side rendered header
.header-top,
.inline-header-top {
    box-shadow: 0 4px 4px 0 rgb(0 0 0 / 12%);
}

// the LumApps web application has a skeleton for the navigation already rendered
// from our backend application. The skeleton needs to be removed so that the loading
// state of the application does not display the navigation
.inline-main-nav {
    display: none;
}

// This padding compensates the fact that the navigation is no longer displayed on the page.
#front-office-app,
.app-content .header-content {
  padding-top: 60px !important; 
}
```

**Use case limitations and best practices**
- In order to really disable the navigation, we recommend using this approach instead of hiding the navigation with just CSS.
- Please consider changing or adjusting the size of your [slideshow](https://docs.lumapps.com/docs/explore-l0285322674420444) accordingly.

## Hide the entire sub navigation on your site

If your site does not need the child's navigation and you want to avoid the space that the navigation occupies, you can use the following code snippet to hide the sub navigation and adjust your site to profit from that additional space.

**IMPORTANT:** If you are trying to hide the sub navigation on your site, please use this approach and avoid hiding it with CSS. This method will provide you an increase in performance as well as in user experience.

```js
window.lumapps.disable('sub-navigation')
```

This snippet will:
- Avoid the display of the sub navigation's UI.
- Avoid any XHR requests that are executed in order to retrieve the navigation's data.
- Avoid downloading the javascript code needed to display the navigation.

**Use case limitations and best practices**
- In order to really disable the sub navigation, we recommend using this approach instead of hiding it with just CSS.

## Create a custom navigation for your site

In this use case, we will use the customizations API in order to disable the out-of-the-box UI for the site's navigation and render our own custom navigation instead. This customization has two steps:

1. Disable the navigation ui

```js
window.lumapps.disable('navigation-ui');
```

This snippet will:
- Avoid the display of the sub navigation's UI.
- However it will not disable any XHR requests that are executed in order to retrieve the navigation's data. This is intended since we can then reuse the data fetched in order to render our own navigation.

2. Retrieve the promise for the navigation's data from `session.navigations.getCurrent()` and use the data to render a custom navigation.

```js
window.lumapps.customize(({ targets, components, render, placement, session }) => {
    const { navigations, language } = session;
    const { Link, FlexBox } = components;

    // We retrieve the promise for the current site's navigation and use the response.
    navigations.getCurrent().then((navigationItems) => {
        render({
            target: targets.NAVIGATION,
            placement: placement.REPLACE,
            toRender: FlexBox({
                // You can reuse the class for the navigation
                className: 'main-nav__wrapper',
                children: navigationItems.map((item) => {
                    return Link({
                        // Add some margin between the elements
                        className: 'lumx-spacing-margin-right',
                        // Use the navigation item title to render the text. Here you should use the
                        // current user's language coming from `session.language` or retrieve the first translation available or use directly the title
                        // if there is nothing defined for the current language
                        children: item.title[language] || item.title[Object.keys(item.title)[0]] || item.title,
                        // Retrieve
                        href: item.url ? window.lumapps.getInternalUrl(`/${item.url}`) : null,
                    });
                }),
            }),
        });
    });
});
```

![Use case custom navigation](./assets/use-case-custom-navigation.png "Use case custom navigation")

In addition to this JS snippet, we recommend that you include the following CSS to your page:

```css
// This will avoid displaying the navigation while your JS customization is loading.
.header-main-nav,
.inline-main-nav {
    display: none;
}
```

If your site has the [navigation inheritance](https://docs.lumapps.com/docs/explore-l0914183586055497inheritance) feature enabled, you can still use the snippet displayed above but you will need to decide which navigation you want to replace.

If you want to replace the parent site's navigation (which is the main navigation displayed at the top of your site), you need to use the `session.navigations.getParent()` promise instead of `session.navigations.getCurrent()`.

## Display a message across your entire site

If there is an important message that you want to display on all pages, no matter their type, you can use the customizations API to print a message above each page with the following snippet.

```js
window.lumapps.customize(({ targets, components, render, session, placement, constants }) => {
    const { Message } = components;
    const { Kind } = constants;

    render({
        placement: placement.ABOVE,
        target: targets.PAGE,
        toRender: Message({
            className: 'customizations-wrapper',
            kind: Kind.warning,
            children: 'This site won\'t be accessible between 10PM and 11PM PST due to maintenance',
            hasBackground: true,
        }),
    });
});
```

![Use case message in all pages](./assets/use-case-message-in-all-pages.png "Use case message in all pages")

**Use case limitations and best practices**
- The target `PAGE` makes this customization appear on every single page of your site (excluding the administration interface). Please take a look at the [api](./api) to see how you can narrow down which page you want to target.
- When using slideshows or changing the content position (via the administration interface), this customization could possibly generate different results depending on the page. Please make sure that when adding a customization like this, it is displayed correctly on every type of page. If you are combining slideshows with negative content positions, this might not be a customization you want to use.

## Disable the search box

```js
window.lumapps.disable('search-box');
```

Adding this code snippet to the application will hide the search box from your LumApps site.

## Add links to other administration tools

The settings target is a great way of adding links that will only be displayed for users that have the sufficient access rights to see the [settings icon](https://docs.lumapps.com/docs/explore-l3451406716743173#l34173657923168954).

For example, with the following snippet you will be able to add a link towards managing your Medium account:

```js
window.lumapps.customize(({ targets, components, render, placement, session, api, constants }) => {
    const { RawHTML } = components;
    const { Orientation, Size, ColorPalette } = constants;

    const { DropdownSection, DropdownItem } = components;

    render({
        placement: placement.ABOVE,
        target: targets.SETTINGS,
        toRender: DropdownSection({
            children: DropdownItem({
                title: 'Manage Medium account',
                icon: 'message-text',
                href: 'https://medium.com',
            }),
            header: 'Medium',
        }),
    });
});
```

![Use case settings](./assets/use-case-settings.png "Use case settings")

## Disable the sticky header

You can disable the functionality that fixes the header to the top of the page using a combination of JS and CSS:

```js
window.lumapps.disable('sticky-header');
```

```css
.header-top {
    position: initial !important;
}

.header-main-nav {
    position: initial !important;
}
```

## Adding a customization to a widget

The following customization adds an HTML block at the top of the given widget.

```js
window.lumapps.customize(({ components, placement, render }) => {
    const { RawHTML } = components;

    render({
        placement: placement.ABOVE,
        // ID retrieved from inspecting the HTML of the page and focusing on the `article` tag that surrounds the widget.`
        target: 'widget-b14fc167-f5e3-4cbb-a215-7111103eeafb',
        toRender: RawHTML({
            html: 'widget customization!',
        }),
    });
});
```

In the scenario where you want to display a customization on a widget on both the Next Gen Interface as well as the Legacy interface, you can use the `targets` property
to render the same customization on both interfaces.

```js
window.lumapps.customize(({ components, placement }) => {
    const { RawHTML } = components;

    props.render({
        placement: placement.ABOVE,
        targets: 
            [
                // ID retrieved from inspecting the HTML of the page and focusing on the `article` tag that surrounds the widget
                // The attribute to retrieve is `id`
                'widget-b14fc167-f5e3-4cbb-a215-7111103eeafb',
                // ID retrieved from inspecting the HTML of the page and focusing on the `div` tag that surrounds the widget
                // The attribute to retrieve is `id`
                'widget-744017b8-a61e-11ec-be8f-bdc334d7377c-5086421325447168',
            ],
        toRender: RawHTML({
            html: 'widget customization!',
        }),
    });
});
```

**Use case limitations and best practices**
- This use case should only be used when the other customization options for a widget are not enough.

## Adding components to the main navigation

In the following use case, we are using the target `NAVIGATION` and placement `RIGHT` to render a custom dropdown on the right hand side of the navigation, so we can profit from the extra space and display some useful links to our users.

```js
window.lumapps.customize(({ targets, components, render, placement }) => {
    const { DropdownSection, DropdownItem, Dropdown } = components;

    render({
        placement: placement.RIGHT,
        target: targets.NAVIGATION,
        toRender: Dropdown({
            children: DropdownSection({
                children: [
                    DropdownItem({
                        title: 'Google Drive',
                        icon: 'message-text',
                        href: 'https://medium.com',
                    }),
                    DropdownItem({
                        title: 'Google Docs',
                        icon: 'message-text',
                        href: 'https://medium.com',
                    }),
                    DropdownItem({
                        title: 'Google Slides',
                        icon: 'message-text',
                        href: 'https://medium.com',
                    }),
                ],
                header: 'Google',
            }),
            label: 'Utils',
        }),
    });
});
```

![Use case navigation dropdown](./assets/use-case-navigation-dropdown.png "Use case navigation dropdown")

## Querying an external service

Sometimes in order to customize your site, you will need to execute an XHR request in order to obtain data from an external service. For example, let's say that you want to display the current weather in Paris on all your pages. For that, we can use an external service like [Open Weather map](https://openweathermap.org/) in order to retrieve that data, and then display it using the Customizations API.

```js
window.lumapps.customize(({ api, components, render, constants, placement, targets }) => {
    const { FlexBox, RawHTML } = components;
    const { Orientation } = constants;

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=48.8563223&lon=2.3159289&units=metric&appid=<YOUR APP ID>')
    .then((response) => response.json())
    .then((data) => {
        const currentWeather = `<span>Weather in Paris: ${data.weather[0].main} (${data.main.temp} C)</span>`;

        render({
            placement: placement.ABOVE,
            target: targets.PAGE,
            toRender: FlexBox({
                className: 'weather-in-paris',
                orientation: Orientation.horizontal,
                children: RawHTML({ html: currentWeather }),
            }),
        });
    });
});
```

**IMPORTANT:**: When using the `RawHTML` component in order to create HTML without LumApps already created components, it is highly likely that you will need to combine this with the CSS Customizations feature in order to add style to your raw HTML. Please take a look at that documentation [here](../css/index)

## Querying an internal service

You can also use the `api` to query an internal LumApps service. Please keep in mind that these services need to be queried using their relative path, not their absolute one.

So for example, if you are querying the stock exchange API, you will need to use the relative URL rather than the absolute one:
- Absolute URL: `https://sites.lumapps.com/_ah/api/lumsites/v1/stockexchange/get?symbol=SYMBOL`
- Relative URL: `/_ah/api/lumsites/v1/stockexchange/get?symbol=STLA.MI`


```js
window.lumapps.customize(({ api, components, render, constants, placement, targets }) => {
    const { FlexBox, RawHTML } = components;
    const { Orientation } = constants;

    /**
     * api is an axios instance that allows you to execute internal XHR requests only. Please take a look at the   specific documentation for this in the detailed API section.
     */
    api.get('/_ah/api/lumsites/v1/stockexchange/get?symbol=STOCK').then((response) => {
        const { data } = response;

        const currentPrice = `<span>Stock price: ${data.values.current}</span>`;

        render({
            placement: placement.ABOVE,
            target: targets.PAGE,
            toRender: FlexBox({
                className: 'stock',
                orientation: Orientation.horizontal,
                children: RawHTML({ html: currentPrice }),
            }),
        });
    });
});
```


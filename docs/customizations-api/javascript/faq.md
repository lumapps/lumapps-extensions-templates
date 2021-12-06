---
layout: default
title: Frequently asked questions
nav_order: 6
has_children: false
parent: JavaScript
grand_parent: Customizations API
---

# Frequently asked questions

## What features are not supported?

### Self hosting

If you are considering self hosting your assets on a separate CDN, here are some tips and notes that you might want to take into consideration:
- Using the Customizations API with a self hosted asset is not supported as of right now. Customizations are extremely tied to the fact that they are added into the head of the page. You can definitely go ahead and create customizations and host them on your CDN, but we do not guarantee that they will work as expected and no support will be provided if this is the way you are adding customizations to your site.
- As mentioned before, the Customizations API should be used only when no other customization options that LumApps provides are not enough. So if you need to host these customizations in another server, it would be worth considering what you are customizing and if you cannot achieve this with all the other customization options that LumApps provides.

### Comments on code
Adding comments to the deployed code is currently not supported. Comments add kilobytes to the overall page size which can potentially impact performance. So in order to avoid that performance overhead, comments are not supported and minifying the code is the best practice to follow.

## Rendering on callbacks

As of right now, we do not provide support for executing the `render` function from a callback, for example, after the user has clicked on a button and the `onClick` function was called. As for now, we only support executing `render` on the application's start up.

## Using other components in menu
- In order to maintain a visual coherence on the contribution menu, the best components to use for these types of customizations are `DropdownSection` and `DropdownItem`. Using other components will result in a non-optimal user interface, possibly hurting the user experience. Furthermore using other components in this customization is a not supported feature.
- In order to maintain a visual coherence on the contextual actions menu, the best components to use for these types of customizations are ListItems. Using other components will result in a non-optimal user interface, possibly hurting the user experience. Furthermore using other components in this customization is a not supported feature.
- In order to maintain a visual coherence on the settings menu, the best components to use for these types of customizations are `DropdownSection` and `DropdownItem`. Using other components will result in a non-optimal user interface, possibly hurting the user experience. Furthermore using other components in this customization is a not supported feature.

## Why are not all placements supported?

Depending on a given target, adding a customization in a specific placement might generate the layout of the page or of a certain component to behave in ways that were not intended to. For example, LumApps main header has a sticky behaviour. Adding a target `HEADER` and a placement `ABOVE` would conflict directly with that feature, generating issues in the rendering of the page. 

We could argue that when adding a certain customization, this would disable a specific feature, like adding a customization above the header would disable the sticky header. Or at least have some sort of mechanism to disable a specific feature that might interfere with a specific combination of target and placement. This is definitely a route that we will explore in the future, but as of today, this is not supported.

## Is there any way to apply more than a single customization to the same target and placement?

As of today, it is not possible to execute two separate `render` in order to render independent customizations to the same target and place. This means that executing `render` multiple times in order to show multiple components will just override the previous customization with the new one.

We currently do not support this feature, mainly because displaying multiple components is supported by using the component [FlexBox](./api#flexbox). Morevoer, development and debugging made more sense with the current approach. You create a customization, test it in the console, make a change and run the code again and the customization gets updated. In this scenario, there is no need to reset, refresh or do anything in particular to see the updated customization.

## Why some features need extra CSS in order to work?

As we have mentioned on the [use cases documentation](./use-cases), some customizations need some extra CSS in order to be fully functional. There are several reasons to this:
- Customizations like disabling the navigation have a server side rendered component, which is, as of today, impossible to customize using just JS. In order to disable the navigation, a small JS snippet needs to be added as well as some CSS in order to hide the pre-rendered navigation that our backend service returns for displaying the application.
- Depending on where you are hosting your JS script code, there might be a moment when the feature that you want to disable is still visible in the application while your code is downloading. In order to avoid this scenario, we ask developers to ensure that they will be correctly disabling their features with adding some CSS code in order to hide those components while the actual disabling code is being loaded.

# Responsive navigation and customizations

We currently do not support any changes whatsoever when it comes to the responsive navigation of your web application. This means that using the target `NAVIGATION` and adding a customization does not have any impact whatsoever when it comes to the responsive version.
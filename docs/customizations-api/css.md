---
layout: default
title: CSS
nav_order: 2
has_children: true
parent: Customizations API
---

# Customizations CSS

## Concept and context
When it comes to customizing your site using CSS, LumApps provides a set of functionalities that allow developers to change the visual style to the existing product. It is important to remember that this customization should be used as a last resort, meaning that the current customization possibilities that LumApps provides are not enough for achieving the desired functionality.

## Prerequisites
- In order to add customizations to your site, basic knowledge of [CSS](https://developer.mozilla.org/en-US/docs/Glossary/CSS) is mandatory.
- In order to deploy customizations into your site, you will need to be the administrator of the site where you want to add these customizations.
- In order to follow this guide and use the examples documented below, your platform needs to have the new top bar activated. Without it, customizations will not work as expected. Please reach out to your LumApps representative if you still do not have the new top bar activated.
- For development, we strongly suggest using the following tools in order to have a proper development environment:
    - [Visual Studio Code](https://code.visualstudio.com/) for creating and editing code;
    - [Git](https://git-scm.com/) for properly versioning the customizations that you will be creating.

## Principles
Before discussing how these CSS Customizations work, it is important to know what principles it follows and what is the objective of this. In essence, LumApps allows CSS customizations in order to:
- Support customization in a simple, supported and maintainable way.
- Help developers to support and control these customizations, without breaking a sweat.
- Provide a set of best practices, use cases and page anchors that are supported in the long run. The idea is to have a series of defined CSS classes that can be used as stable classes that can be customized.
- Standarize and officialise the way in which CSS customizations are added to the page.

## Overview

CSS customizations allow developers to add CSS into their pages in order to tweak the look and feel of their sites. CSS customizations can basically change anything on the page if they are correctly created and added to the page. It is also very important to mention that this is an advanced option. You are responsible for any CSS code you are writing. So it would be wise to make sure you know what you are doing as it may generate unexpected side-effects. LumApps will not maintain or support this customization, as the product markup may change without notice expect for some anchors and css classes detailed on [supported anchors](./css/api).
---
layout: default
title: Development
nav_order: 4
has_children: false
parent: JavaScript
grand_parent: Customizations API
---

# Development

## Setup

For developing these customizations, we recommend that you setup a repository for saving your customizations as well as version controling them. LumApps releases a new version of the application each 6 weeks, so depending on what you are customizing and how you are customizing it, changes to that customization may be needed between releases, and having a repository will enable that release process to be a smooth one. Breaking changes on the Customizations API will be notified in advance so that customizations can be updated accordingly. We recommend then to:
- Install [Visual Studio Code](https://code.visualstudio.com/) for developing these customizations in a local environment
- Use a git repository hosting service like [BitBucket](https://bitbucket.org/product), [GitHub](https://github.com) or [GitLab](https://about.gitlab.com/)

## Testing

There are 2 different techniques for testing these customizations:
- Develop your customization and execute it on the Dev tools of your browser by going into the Console. This method can be a good way of rapidly testing out different options, like colors and sizes, as well as to get a good idea on how a customization will look in the final product. A couple of notes on this method:
    - Rerunning a customization for a specific target and placement will override the already existing customization for that target and placement.
    - Due to the nature of the application and how components are rendered in the site, some customizations will not have the same result if you run them on the console and if you run them on the deployed version. 
    - Some customizations (like customizing pages) do not display right away, due to the fact that there are specific optimizations on that section. If your customization does not appear, try navigating to another page or directly deploying your customization.
- Develop your customization and add it to the `head` of a testing site. This is the best way to test your customizations, since it will provide a production like environment for working them and seeing if everything works as expected. We suggest that you create a playground site on your platform. Please take a look at the [deployment](#deployment) documentation for more information on that.

# Deployment

In order to test these customizations, as well as making them available for your platform's users, they need to be configured into your site. LumApps's approach to adding these customizations is to allow developers to insert custom HTML into the application's `<head>` tag. This provides a high level of flexibility to developers, allowing them to add scripts, styles, external resources, etc.

To add these customizations, we will need to have access to the administration UI for LumApps platform, and have access to the Style side navigation link:
1. Go to the administration UI and click the **Style** navigation link.

![image](./assets/deployment-style-side-nav.png)

2. Click the **Style** tab on the tabs displayed at the top left corner of the screen and then scroll down to the **Advanced** section.

![image](./assets/deployment-advanced.png)

3. You will see two fields under **Advanced**, **Site theme** and **head tag (HTML)**.

![image](./assets/deployment-head.png)

4. In the **Head tag (HTML)** field, create a tag `script` and paste your customization inside it.

```html
<script>
    window.lumapps.customize(({ targets, components, render, placement, constants, session }) => {
        const { Message } = components;
        const { Kind } = constants;

        const translatedMessage = {
            en: `Welcome ${session.user.firstName}!`,
            es: `Bienvenido ${session.user.firstName}!`,
        };

        render({
            placement: placement.ABOVE,
            target: targets.PAGE,
            toRender: Message({
                className: 'general-message',
                kind: Kind.info,
                children: translatedMessage[session.language],
                hasBackground: true,
            }),
        });
    });
</script>
```

5. Save the change by clicking the **Save** button at the top of the style side navigation. The customization would be added to your site.

## Testing environment

If you are still developing your customization, you are free to add these customization without taking into consideration performance or overall impact. Following the procedure mentioned before will serve you just fine.

## Production environment

When deploying into production, there are several considerations that we need to have before making our customization available for our users:
- Customization size in KB: Since customizations are added into the `<head>` tag of your site's HTML, added code can have a direct impact on the performance of the site, mostly on the first render of the page. The more code you add as a customization, the more heavier your HTML will be, thus taking more time to download. In order to mitigate this impact, we suggest that:
    - You minify your code before creating the `<script>` in the `Head (HTML)` field on the Advanced settings for Style. Code minification will remove unnecessary spaces and comments and make other enhancements that will minimise the total amount of bytes added to your HTML. You can use a service like [minifier](https://www.minifier.org/) in order to minify your code and see how many bytes you are adding to the page.
    - Related to minification, you might just ask yourself, what if I want other developers or other administrators to take a look at the code on the Head (HTML) field and see what customizations there are? Wouldn't the minification process make this impossible to do, since the code will not be easily understandable? The answer is yes, they won't be able to read it from there. However, this is a great opportunity to rethink your current process for maintaining the customizations that you have. Code needs to be managed and versioned in order to have a reliable system, and having your code only on the Head (HTML) field on LumApps is not the best way to do that. Developers and other administrators should have access to your code repository, where they will be able to take a look at the code and see what you currently have customized on your site.
    - As mentioned before, the Customizations API should be used only when no other customization options that LumApps provides are not enough. With that in mind, the total KB added to the page by a customization should vary between 2KB and 5KB so there is no noticeable performance impact on the page. Adding code that surpases that estimated amount can potentially have an impact on the performance of your site.
- Browsers used by your users: JavaScript code can be executed in a variety of different browsers, each of them with functionalities that could be or not supported. With that in mind, please consider what browsers your enterprise and your users use for accessing LumApps and code accordingly. You might be using a feature that is supported in Chrome but not supported on Safari for example, and you would need to transpile your code to support both browsers. Also consider that LumApps support the latest 2 versions of Google Chrome, Firefox, Safari and Edge. IE11 is no longer supported.
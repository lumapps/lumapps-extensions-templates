---
layout: default
title: Best practices
nav_order: 3
has_children: false
parent: CSS
grand_parent: Customizations API
---

## Best practices

### Do not customize elements that can be already customized out of the box

Injecting CSS to your site enables you to change a variety of behaviors and styles on your site. Before you start coding and figuring out what classes you need to change, please take into consideration that LumApps already provides a lot of different options when it comes to customizing your site. Please make sure that you have read the documentation for each of LumApps functionalities before customizing them. The most common example would be changing the background color of either the top bar or the navigation bar with CSS, when these customizations options are available on the Style administration page.

### Customize undocumented elements

Since CSS can target any class or element in our application, developers are free to change whatever they need to on LumApps. However, we do not ensure that these anchors, css classes or elements will be the same from one release to another. We have defined a set of anchors that we will not change between releases (or at least not without a formal communication) and those are the supported anchors. Any other customization that relies on other elements is therefore not supported and we do not guarantee that the markup will be the same between releases.

### Do not use HTML tags on your customizations

When creating CSS custom code, please take into consideration what selectors you are using in order to customize your site. As we mentioned before, we have created a set of fixed anchors that you can use for creating these customizations. We call them anchors since you should be able to anchor your customizations to them and be confident that they will not change between releases. What we do not guarantee is that the HTML tags that use these anchors do not change. That is why, when creating customizations please avoid using HTML tags when writing your CSS code.

For example, for customizing the bookmarked apps icon, you should not create a selector that includes the `div` of the component. In essence, do not do this:

```css
div.header-top__bookmarked-apps {
    background-color: #2ba0fd; /* we recommend this color to be same one as your site's primary color */
}
```

Do this:
```css
.header-top__bookmarked-apps {
    background-color: #2ba0fd; /* we recommend this color to be same one as your site's primary color */
}
```

### Use instance head or site theme accordingly

In order to enhance the performance and user experience of your site, we recommend that your add your styles depending on where they are used:
- If you are customizing any component that is displayed on the first render of the page (on the top bar and the widgets displayed on the viewport on the first render), the CSS should be added to the Head of the page, which will allow to quickly display your custom styles and avoid the "blink" effect that happens when the CSS is loaded after the page is rendered
- If you are customizing anything outside those sections, we recommend adding the code to the Site Theme, since the code downloaded will be applied when those customized components are displayed on the page.

### Combine customizations with custom CSS classes

Several LumApps components allow adminsitrators to add custom css classes to them, which then is something extremely useful if we want to customize these components using custom CSS. Here is a non exhaustive list of the components that allow custom css classes:
- Main navigation links.
- Slideshow.
- All widgets.
- Content cells.
- Content rows.

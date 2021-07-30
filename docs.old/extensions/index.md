---
layout: default
title: Extensions
nav_order: 3
has_children: true
---

# Extensions
With the LumApps Marketplace, LumApps users can now extend the capabilities of their platform with extensions. 
These extensions can be developed and implemented using our SDK.

## <a name="ExtensionsPrerequisites"></a>Prerequisites
In order to develop an extension for the LumApps Marketplace you have to fulfill the following prerequisites : 

 - Be able to develop using [ReactJs](https://reactjs.org/) Framework
 - Be able to develop using [Typescript](https://www.typescriptlang.org/) language
 - Be familiar with the version control system [git](https://git-scm.com/) and [Github](https://github.com/)

## Different kind of extensions
We offer different possibilities to extend the LumApps platform : 
 - Widgets
 - Backend scripts
 - Share To

## <a name="widgetExtension"></a>Widget extension
Inside LumApps, a widget is the main entity in a page. They can be added and set up in any page.


A Lumapps widget extension is composed by 3 main components : 
 - Widget Content
 - Widget Settings
 - Widget Global Settings


### <a name="widgetContent"></a>Widget Content
The widget content is the main component of a widget, it renders the data you want to present to the users.

### <a name="widgetSettings"></a>Widget Settings
The widget settings component render the settings of your widget, it allows the content contributor to set up the widget instance in the page.

### <a name="wodgetGlobalsSettings"></a>Widget Global Settings
The widget global settings component is used by LumApps platform administrator.
The settings define on this component is sent to every instance of the widget on the customer platform.

---
layout: default
title: Extensions
nav_order: 3
has_children: true
---

# Extensions
Lumapps Extensions must be develop using **ReactJs** framework.
For npw we only open the widget part of LumApps through the Marketplace.

## <a name="widgetExtension"></a>Widget extension
Inside LumApps, a widget is the main entity in a page. They can be added and set up in any page.


A Lumapps widget extension is composed by 3 main components : 
 - Widget Content
 - Widget Settings
 - Widget Global Settings


### <a name="widgetContent"></a>Widget Content
The widget content is the main component of a widget, it render the data you want to present to the users.

### <a name="widgetSettings"></a>Widget Settings
The widget settings component render the settings of your widget, it allow the content contributor to set up the widget instance in the page.

### <a name="wodgetGlobalsSettings"></a>Widget Global Settings
The widget global settings component is used by LumApps platform administrator. The settings define on this component is send to every instance of the widget on the customer platform.

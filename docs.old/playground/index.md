---
layout: default
title: Playground
nav_order: 2
has_children: true
---

# What is LumApps Extensions Playground
![LumApps Extensions Playground](../Playground.png "LumApps Extensions Playground")

The LumApps Extensions Playground is a tool provided by LumApps to its partners who want to develop extensions for the LumApps Marketplace.

It offers a web development server and an interface to render your extension nearly like if you were in a LumApps platform. It ran on your machine, so it can be run without any internet connection.

## How to install the LumApps Extensions Playground
The LumApps Extensions Playground can be installed via the LumAps Extensions Template. By creating your extension with the LumApps Extensions Template you have access to the LumApps Extensions Playground

## How to run the LumApps Extensions Playground
To run the LumApps Extensions Playground, you just have to run the following command : 

```bash
yarn # To install dependencies
yarn start
```
It uses the `3000` and the `3333` port to works. You can reach it by using `localhost:3000` on your browser.

To ease the extension development we activate the Hot Module Reload, so no need to restart the Playground or refresh the page after each modification, the Playground refresh after each modification on your extension code.

# How to develop an extension for LumApps

After gaining access to LumApps Extension program, you'll have access to a GitHub repository and be able to launch the LumApps extension playground. 

This playground offers a development environment for developer who want to create extensions for LumApps platforms.

## Create your extension with LumApps Extension template
You can follow the documentation the LumApps extension template repository : 
[LumApps Extension Template](https://github.com/lumapps/lumapps-extensions-templates)

## Launch the playground

To launch the playground environment locally you can use the following command :
```shell
yarn #To install dependencies
yarn start
```

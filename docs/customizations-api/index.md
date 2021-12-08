---
layout: default
title: Customizations API
nav_order: 8
has_children: true
---

# Customizations API

<h6>Table of Contents</h6>

- [Customizations API](#customizations-api)
  - [Introduction](#introduction)
  - [Concept](#concept)
  - [Context](#context)
  - [Prerequisites](#prerequisites)
  - [Capabilities](#capabilities)

## Introduction
The Customizations API proposes a framework for extending LumApps beyond its native capabilities. It is aimed at advanced users with a technical background. LumApps only provides support for the Customizations API base functionality. Any code beyond what is described in this section is the code owner's responsibility.

## Concept
The **Customizations API** is a frontend development kit that allows developers to extend their LumApps sites by adding an array of visual components to several predetermined placeholders in the product, and interact with it in order to trigger actions when certain events are fired. This development kit allows customizing your site using [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [CSS](https://developer.mozilla.org/en-US/docs/Glossary/CSS). They are one of the core elements of our web page application, and are fundamental for the Customizations API.

This documentation relies heavily on both of these elements, and will mention them across each of its sections.

## Context
On LumApps, sites and platforms can be heavily customized in order to make them adopt the visual identity of each of our customers. Changing logos, colors, content layout and where to position each of these contents is all part of the out-of-the-box product. In that context, the **Customizations API** falls as a last resort option for adapting a site so it can have other functionalities that are not part of the out-of-the-box product. If the expected site cannot be achieved by using the out-of-the-box customization options that the platform has, as well as other extensions such as the Marketplace or specific configurations for each of LumApps functionalities, the **Customizations API** is a tool to consider.

## Prerequisites
Depending on the user's objectives regarding the **Customizations API**, different prerequisites should be met in order to fully digest the contents of this documentation:
- If you want to know what are the capabilities of this API and the different possibilities that can be achieved while using it, a basic understanding of how LumApps works, its entities and how these entities are managed is required
- The user's has validated that the customization that they are trying to achieve cannot be executed using either out-of-the-box functionalities that LumApps already provides, or Extensions.

## Capabilities
The Customizations API is separated into two different aspects:
- [JavaScript Customizations API](javascript.md)
- [CSS Customizations API](css.md)
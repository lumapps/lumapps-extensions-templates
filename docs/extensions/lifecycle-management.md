---
layout: default
title: Life Cycle Management
nav_order: 4
parent: Extensions
has_children: false
---

# Extensions Life Cycle Management

<h6>Table of Contents</h6>

- [Extensions Life Cycle Management](#extensions-life-cycle-management)
  - [Local Test](#local-test)
  - [LumApps Test Environment](#lumapps-test-environment)
  - [Review](#review)
  - [Post Review - Approved or Rejected](#post-review---approved-or-rejected)
  - [Release](#release)
  - [Update an extension after release](#update-an-extension-after-release)
    - [Update extension's information](#update-extensions-information)
    - [Update extension](#update-extension)
  - [Delete an extension](#delete-an-extension)

## Local Test
Every version of every Extension begins in Local Test. This test is done in the LumApps Extensions Playground in which you will be able to render your extension and emulate a LumApps environment.

## LumApps Test Environment
When you’re satisfied with the local test version, deploy your extension to your LumApps test platform. Then you can install and use your extension to ensure everything is fine in a LumApps environment.

In both Local Test and Hosted Test, Extensions are visible only to a developer-provided list of test accounts and a small subset of LumApps staff. Other users won't have access to your extension.

To move from Local Test to Hosted Test, you have to use the LumApps Extensions Playground.

You can find more information on how to use your LumApps Test Environment [here](https://docs.lumapps.com/docs/expand-l9650191038731043/expand-l9615254296582716)

## Review
Once you complete your tests on your LumApps test platform, you can submit the version for Review. While in review, all test accounts can continue to test the Extension as before. 

The submission is done via a GitHub Pull Request with the code you want to submit.

## Post Review - Approved or Rejected
After an extension version is  reviewed by LumApps, it is placed under on these 2 status : 
 - **Approved** means your extension respects our guidelines, you can ask for production deployment for your extension.
 - **Rejected** means that your extension may not respect our guidelines and some revisions are required. The reason will be explained in the PR. You can edit your extension test it again and resubmit your extension when you are ready.

## Release
When an extension is approved after the review, you can ask LumApps to deploy it on production, we will release the version of your extension.

When a new version is Released, it goes live, if you want to edit your extension you have resubmitted a version and ask a new review. 

We authorize multiple version of your extension in production, LumApps users can upgrade manually their extension to the new version. Be sure to provide enough information to user if some actions has to be done to upgrade to a newer version.

## Update an extension after release
To update an extension after it has been release, you have 2 possibilities : 
 - Update extension's basic information, it's Name, Description or Logo
 - Update the extension itself

### Update extension's information
To update extension's information you have to use the LumApps Extensions Playground.
In the administration panel of your Playground, you can list the extensions you already deployed on your LumApps test platform. From there you can edit the extension's information. 

If your extension has already been released, you'll have to ask for extension update to let LumApps staff update the information in the production version of your extension.

### Update extension
To update your extension after editing your extension itself, or fixing issues, you'll have to resubmit a new version of your extensions, so you'll have to deploy your extension in your LumApps test platform and ask for a new Review.


## Delete an extension
If you decide to stop supporting your extension you can ask for deletion. We'll delete your extension from the production. Your extension will no longer be visible and usable by LumApps users.
You can delete a specific version of an extension  

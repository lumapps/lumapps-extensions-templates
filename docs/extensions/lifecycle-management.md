---
layout: default
title: Life Cycle Management
nav_order: 4
parent: Extensions
has_children: false
---

# Extensions life cycle management

<h6>Table of Contents</h6>

- [Extensions life cycle management](#extensions-life-cycle-management)
  - [Local test](#local-test)
  - [LumApps test environment](#lumapps-test-environment)
  - [Review](#review)
  - [Post review - Approved or Rejected](#post-review---approved-or-rejected)
  - [Release](#release)
  - [Update an extension after release](#update-an-extension-after-release)
    - [Update the extension's information](#update-the-extensions-information)
    - [Update extension](#update-extension)
  - [Delete an extension](#delete-an-extension)

## Local test
Every version of every extension begins with local test. This test is performed in the LumApps extensions playground in which you will be able to render your extension and emulate a LumApps environment.

## LumApps test environment
When you’re satisfied with the local test version, you can deploy your extension to your LumApps test platform. Then you can install and use your extension to ensure everything is fine in a LumApps environment.

In both local test and hosted test, extensions are visible only to a developer-provided list of test accounts and a small subset of LumApps staff. Other users won't have access to your extension.

To move from local test to hosted test, you have to use the LumApps extensions playground, and more specifically the [deployment manager](extension-playground.md#deployment-manager).

You can find more information on how to use your LumApps test environment [Install and configure an extension documentation](https://docs.lumapps.com/docs/expand-l9650191038731043/expand-l9615254296582716).

## Review
Once your tests are done on your LumApps test platform, you can submit the version for Review. While in review, all test accounts can continue to test the extension as before. 

The submission is done via a GitHub pull request with the code you want to submit.

## Post review - Approved or Rejected
After an extension version is reviewed by LumApps, it can be placed into on of these 2 states : 
 - **Approved** means your extension respects our guidelines. You can ask for production deployment for your extension.
 - **Rejected** means that your extension may not respect our guidelines and some revisions are required. The reason will be explained in the PR. You can edit your extension, test it again and resubmit your extension when you are ready.

## Release
When an extension is approved after the review, you can ask LumApps to deploy it on production. We will release the version of your extension.

When a new version is released, it goes live, if you want to edit your extension you have to resubmit a version and ask a new review. 

We authorize multiple versions of your extension in production, LumApps users can upgrade manually their extension to the new version. Be sure to provide enough information to users if some actions have to be done to upgrade to a newer version.

## Update an extension after release
To update an extension after it has been released, you can: 
 - Update the extension's basic information. It's name, description or logo
 - Update the extension itself

### Update the extension's information
To update the extension's information you have to use the LumApps extensions playground.
In the administration panel of your playground, you can list the extensions you already deployed on your LumApps test platform. From there you can edit the extension's information. 

If your extension has already been released, you'll have to ask for extension update to let LumApps staff update the information in the production version of your extension.

### Update extension
To update your extension after editing your extension itself, or fixing issues, you'll have to resubmit a new version of your extensions. So you'll have to deploy your extension in your LumApps test platform and ask for a new review.


## Delete an extension
If you decide to stop supporting your extension, you can ask for deletion. We'll delete your extension from the production. Your extension will no longer be visible and usable by LumApps users.
You can delete a specific version of an extension. 

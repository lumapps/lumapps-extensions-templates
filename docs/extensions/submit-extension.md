---
layout: default
title: Submit your extension
nav_order: 5
parent: Create your extension
has_children: false
---

# Submit your extension

Once your local and LumApps tests are done, you can submit the version of your extension for review. While in review, all test accounts can continue to test the extension. The submission is done via a GitHub pull request with the code you want to submit.

To ease the review, you have to open a specific PR for each deployment request with the code you want to deploy.

<h6>Table of Contents</h6>

-   [Create your Pull Request](#create-your-pull-request)
  -   [Pull Request labels](#pull-request-labels)
  -   [Approval and rejection](#approval-and-rejection)
-   [Extension deployment](#extension-deployment)
  -   [Multiple versions](#multiple-versions)

## Create your Pull Request

You must use the Pull Request template provided by LumApps. This template is available in the `pull_request_template.md` file in a `.github` folder.
This folder has to be in the root folder of your repository so GitHub can find it and automatically apply the template to your PR.

You must fill in the template to give our code reviewers enough information about the feature or fix you want to deploy.

### Pull Request labels

We use labels on PR to give developers visibility on review and deployment workflow.

| Label       | Description                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| need review | Ask for a code review. LumApps performs the code review.                                                                     |
| validated   | LumApps has reviewed and validated your extension.                                                                           |
| rejected    | LumApps has reviewed and rejected your extension.                                                                            |
| need deploy | Ask for a production deployment of your extension. The deployment is performed by LumApps **after** a validated code review. |
| deployed    | LumApps has deployed your extension. Customers can now use it in production.                                                 |

### Approval and rejection

After an extension version is reviewed by LumApps, there are two possible outcomes:

-   **Approved** means your extension respects our guidelines. You can ask for production deployment for your extension. See [Extension Deployment](/submit-extension.md/extension_deployment).
-   **Rejected** means that your extension may not respect our guidelines and some revisions are required. The reason is provided in the PR. You can edit your extension, test it again, and resubmit your extension when you are ready.

## Extension deployment

Once your source code has been reviewed and validated, your extension can be deployed in production.

>**Note:**: If you want to edit your extension after its validation, you have to resubmit this new version and ask for a new review.

If you want your extension to be deployed, use the `need deploy` label on your PR. You must also select the kind of bump you want for  your extension in production between `Major`, `Minor`, or `Patch` in the PR template.

Once your extension is deployed, you will see the `deployed` label on your PR. You can then merge your PR in the main/master branch of your repository.

### Multiple versions

LumApps authorize multiple versions of your extension in production at the same time. Users can manually update their extension inside their administration panel.

![Extension update](extensions-updates.png "Extension updates")

Be sure to provide enough information to users if some actions need to be performed to upgrade to a new version.

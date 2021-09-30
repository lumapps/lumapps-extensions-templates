---
layout: default
title: Request production deployment
nav_order: 6
parent: Extensions
has_children: false
---

# Request production deployment

<h6>Table of Contents</h6>

- [Request production deployment](#request-production-deployment)
  - [Extension code review](#extension-code-review)
    - [Create your Pull Request](#create-your-pull-request)
    - [Pull Request labels](#pull-request-labels)
  - [Extension deployment](#extension-deployment)


## Extension code review
Before publishing your extension in the LumApps Marketplace, you have to submit your extension for a code review.
This code review is done on your GitHub repository, via a Pull Request.

### Create your Pull Request
In order to ease the review of your extension, you have to use a Pull request template you can find on your extension folder. This template is available, in the `pull_request_template.md` file in a `.github` folder.
This folder has to be in the root folder of your repository, so that GitHub can find it and apply the template automatically to your PR. 

You have to fill in the template to give code reviewer enough information about the feature, or fix you want to deploy.

### Pull Request labels
We use labels on PR to give developers visibility on review and deployment workflow.

| label       | description                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| need review | Ask for a code review. The code review is performed by LumApps.                                                          |
| need deploy | Ask form a production deployment of your extension. The deployment is perfomed by LumApps after a validated code review. |
| validated   | Your code review has been validated by LumApps.                                                                          |
| rejected    | Your extension has been rejected by LumApps.                                                                             |
| deployed    | Your extension has been deployed by LumApps and can be used by LumApps customer.                                         |

## Extension deployment
Once your source code has been reviewed and validated, your extension can be deployed in production.

You can use the `need deploy` label on your PR to notify LumApps your need for deployment. To let us deploy your extension you have to select the kind of bump you want to do on your extension in production by choosing between `Major`, `Minor` or `Patch` in the PR template.

Once your extension is deployed, you can merge your PR in the main/master branch of your repository.
To ease the review before a deployment, you have to open a specific PR for each deployment request with the code you want to deploy.

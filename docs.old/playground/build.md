---
layout: default
title: How to build and deploy an extension
parent: Playground
nav_order: 3
---

# How to build and deploy an extension

The playground let you build and deploy your extensions in your beta environment instance to see it in a real lumapps environment.

**Before starting, you should have the following information :**

-   An instance of the playground running on your computer with the extension you want to deploy
-   An email address with an admin access to your Lumapps beta environment
-   An online CDN or server accepting CORS requests to upload your built extensions files.

## <a id="step-one"></a>1.  Retrieve your environment JWT token.

The first step is to be sure that you have connected the playground to your beta environment.

To do so, in the playground, click on the **PLAYGROUND SETTINGS** button in the top right corner.
In the **LUMAPPS CONTEXT** tab you will have to fill your **Lumapps Slug**

> For exemple : if your beta environment URL is
> https://preview.lumapps.com/a/my-beta-env/home
> 
> Your Slug will be : **my-beta-env**

When done, click on the **GET TOKEN** button.

A new browser tab will open, where you will see a JSON with some information about your beta environment :

-   CellUrl
-   organizationId
-   organizationName
-   refreshToken
-   token

Copy the token and paste it in the **LumApps JWT token** field in the **Playground Settings**

The **Lumapps organization id** is automatically fulfilled and should correspond to the organizationId of the JSON from where you copy the token.

Click on **SAVE IN LOCAL STORAGE**.

Your playground is now connected to your lumapps environment.

## 2. <a name="step-two"></a> Request a partner ID (first time only)

Now that you are connected to Lumapps, you can request a partner ID.

To do so, open the **PLAYGROUND SETTINGS** and go to the **REQUEST PARTNER ID** tab.

In order to retrieve your partner ID you will have to fill in at minima your partner name, and an email address.

When the form is filled, click on **CLAIM ID FOR BETA**. Your partner ID should be displayed on the page.

> IMPORTANT : COPY YOUR PARTNER ID, YOU WON'T BE ABLE TO RETRIEVE IT ON YOUR OWN

Copy the **partner ID** and paste it in you extension config.
You can find the `config.js` file in your extension folder. Copy your partner id in the partnerId variables as a string and save the file :

    const  partnerId  =  'paste_your_partner_id_here';

When refreshing the playground page, you should see you partner ID on the left panel in the **Current state** section.

*If you need to build or deploy a new version of your extension, you will not have to retrieve your partner ID again.*

## 3. <a name="step-three"></a>Request an extension ID (first time only)

You should now be connected to your beta environment and have a partner ID. Retrieving your extension ID is similar to the partner ID.

In the playground, go to the **REQUEST EXTENSION ID** tab.

You have nothing to parameter in the tab. You should see your partner ID, the name of you extension, your logo…

This information come from the `config.js` file of your extension.

> Note: As you are deploying your extension in a beta environment, even if you modify the **isPublic** key and **whitelist** key in your `config.js` file, those will be forced to private and to your beta environment ID. So only your environment will have access to the extension.

If everything look good, click on the **CLAIM ID FOR BETA** button. Your extension ID should be displayed.

> IMPORTANT: COPY YOU EXTENSION ID AS YOU WON'T BE ABLE TO RETRIEVE IT ON YOUR OWN.


Copy the **extension ID** and paste it in you extension config.
You can find the `config.js` file your extension folder. Copy your extension id in the `extensionId` variables as a string and save the file :

    const  extensionId  =  'paste_your_extension_id_here';

When refreshing the playground page, you should see your extension ID on the left panel in the **Current state** section.

*If you need to build or deploy a new version of your extension, you will not have to retrieve your extension ID again.*

## 4. <a id="step-four"></a>Build your extension

You should now be connected to your lumapps environment and have a partner and an extension ID.

The extension will be build on your local machine under the **dist** folder of your extension.

Open the **PLAYGROUND SETTINGS** and go to the **BUILD & DEPLOY** tab.

To build your extension, choose the type of bump you want to do (« Major », « Minor », « Patch » ).

> If it’s the first time you're building the extension, choose « Major »

Click on the **BUILD EXTENSION** button. The extension files will be under the `dist/{your_extension_id}/` folder.

You should see at least one file : Content.js

If you have created settings for your extension you should have one file per settings (Settings.js, GlobalSettings.js).

Your extension has been built, you can now deploy it.

## 5. <a id="step-five"></a>Deploy your extension

You should be connected, have a partner and an extension id and have build your extension.

The first step is to host your extension on your own server / CDN.\
To be accessible from Lumapps, your server must use HTTPS.
You should also activate the CORS to let Lumapps platform contact and retrieve the extension files.

When it’s done, you will have to keep a URL which should point to the generated LUM files.

In the playground, go to **PLAYGROUND SETTINGS** and go to the **BUILD & DEPLOY** tab.

In the section 2, **Deploy the extension**, fill in the HTTP Server input with the URL pointing to the built files.

Click on the DEPLOY EXTENSION IN BETA button.

That's it, your extension is deployed on your Lumapps beta environment.

## 6. <a id="step-six"></a>Update your extension information

If you want to update your extension information : **name**, **description**, **icon** you need to follow these steps : 

- Edit the information you want to change in your `config.js` file.
- Connect the playground to your Lumapps environment (cf. steps [1 - Retrieve your environment token](#a-idstep-onea1--retrieve-your-environment-jwt-token))
- In the playground, go to **PLAYGROUND SETTINGS**, click on the **REQUEST EXTENSION ID** tab and then **UPDATE EXTENSION IN BETA**

> You don't need to build and deploy your extension to updates this information

## 7. Build and deploy a new version

To deploy a new version, you should follow these steps: 

- Be sure to be connected on the Lumapps beta environment (cf. [step 1](#a-idstep-onea1--retrieve-your-environment-jwt-token))
- Choose the type of bump you want to do and build (cf. [step 4](#4-a-idstep-fourabuild-your-extension))
- Update your files on your server / CDN : the URL of your server / CDN is linked to the version of your extension
- Deploy the extension (cf. [step 5](#5-a-idstep-fiveadeploy-your-extension))

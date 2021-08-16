# Contributing to LumApps Extensions Templates

<h2>Table of contents</h2>

- [Contributing to LumApps Extensions Templates](#contributing-to-lumapps-extensions-templates)
  - [Found an issue?](#found-an-issue)
  - [Want a feature?](#want-a-feature)
  - [Submission guidelines](#submission-guidelines)
    - [Submitting an issue](#submitting-an-issue)
    - [Submitting a pull request](#submitting-a-pull-request)
  - [Coding rules](#coding-rules)
  - [Git commit guidelines](#git-commit-guidelines)
  - [Publish](#publish)

## Found an issue?
If you find a bug in the source code or a mistake in the documentation, you can help us by submitting an issue to our [GitHub Repository][Github Repo].

If you feel like it, you can even fix the issue and submit a Pull Request. Before handing in a Pull Request, please see the Submission Guidelines below.

## Want a feature?
You can request a new feature by submitting an issue to our [GitHub Repository][Github Repo]. If you would like to implement a new feature then consider what kind of change it is, discuss it with us before hand in your issue, so that we can better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.

## Submission guidelines

### Submitting an issue

Before you submit your issue search the archive, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue. Help us to minimize our efforts by not reporting duplicate issues. Providing the following information will increase the chances of your issue being dealt with quickly:

-   **Motivation for or Use Case** - explain why this is a bug for you
-   **LumApps Extensions Templates Version** - is it a regression?
-   **Operating System** - is this a problem with all OS ?
-   **Reproduce the Error** - provide a live example (using [Plunker](http://plnkr.co/edit) or [JSFiddle](http://jsfiddle.net/)) or an unambiguous set of steps.

### Submitting a pull request

Before you submit your pull request consider the following guidelines:

-   Search [GitHub](https://github.com/lumapps/design-system/pulls) for an open or closed Pull Request that relates to your submission. You don't want to duplicate effort.
-   Make your changes in a new git branch

```bash
git fetch && git checkout -b <feat|fix|...>/<descriptive branch name> origin/master
```

-   Create your patch.
-   Follow the [Coding Rules](#rules).
-   Commit your changes using a descriptive commit message that follows the [commit message conventions](#commit-message-format).
-   Check and test your changes locally.

*   Push your branch to GitHub:

```bash
git push origin <full branch name>
```

-   In GitHub, send a pull request to `lumappst-extensions-templates:master`.

If we suggest changes to your Pull Request, then:

-   Make the required updates.
-   Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

```bash
git fetch && git rebase origin/master && git push --force-with-lease
```

That's it! Thank you for your contribution!

## Coding rules

We're using ES6 JavaScript and TypeScript to build the tool.
NPM scripts are used to ease the setup, start and build of LumApps Extensions Template.

The coding convention is the following:

-   4 spaces for indentation, for JavaScript and TypeScript.
-   Wrap all codes at 120 characters.
-   Use camel-case.
-   Use the [Allman style](http://en.wikipedia.org/wiki/Indent_style#Allman_style).

All submitted JavaScript code must be properly documented. You _must_ at least document all your functions, methods and members using the JSDoc format.

For the ease of use and contributing, most of the coding styles are enforced with ESLint, TSLint and Prettier. So as long as the pre-commit script let you commit, you should be good.

## Git commit guidelines

See https://github.com/lumapps/commit-message-validator

## Publish

First bump the version by running:

```
yarn version:patch
```

or

```
version:minor
```

Then make a PR to master. 
Once merged on master you can publish it via the LumApps NPM profile by going to the master branch and running

```
npm publish
```


[Github Repo]: https://github.com/lumapps/lumapps-extensions-templates/issues



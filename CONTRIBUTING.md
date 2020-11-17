# Contributing

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
Once merged on master you can publish it via the lumapps npm profile by going to the master branch and running

```
npm publish
```

## Doc

The doc uses [docsify](https://docsify.js.org) and simply uses markdown files.
The navigation is setup in the `_sidebar.md` file.

### Dev localy

```
yarn serve:doc
```



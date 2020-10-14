# SDK

We provide a SDK to reach our API.

## Use the SDK

```js
import Lumapps from 'lumapps-sdk-js';

const lumapps = new Lumapps();
```

## Retrieve current connected user
```js
lumapps.getConnectedUser().then((user) => {
    console.log(user);
}).catch((error) => {
    console.log(error);
});
```

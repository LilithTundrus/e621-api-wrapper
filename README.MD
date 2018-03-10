# e621-api

[![Build Status](https://travis-ci.org/LilithTundrus/e621-api-wrapper.svg?branch=master)](https://travis-ci.org/LilithTundrus/e621-api-wrapper)

## About

This is a small wrapper for the site [e621](https://e621.net)


If you're here you know what this site is for.


## Getting Started

This project is available via NPM:

```
npm install e621-api --save
```

You should have `Node 8.9.4` and `tsc 2.1` or higher to be safely running this.

**Note**: When calling the wrapper class you __must__ provide a user-agent or e621 will deny your API requests.


**For typeScript setup is easy:**

```typescript
import e621 from 'e621-api'
import { e621PostData } from 'e621-api/build/interfaces';
import { e621TagTypes, e621PopularityStrings } from 'e621-api/build/enums';
 
// First argument is your user agent, the second is the page limit per search result (pageLimit * 50 = maximum number of results returned)
let wrapper = new e621('Node-test-1.0', 3);
 
wrapper.getPopularPosts(e621PopularityStrings.daily)
.then((data) => {
    console.log(data[0].file_url);
})
```


**ES6 requires slightly different setup**

```javascript
let e621 = require('e621-api').default;
let enums = require('e621-api/build/enums');
let wrapper = new e621('Node-test-1.0', 3);
 
// First argument is your user agent, the second is the page limit per search result (pageLimit * 50 = maximum number of results returned)
wrapper.getPopularPosts(enums.e621PopularityStrings.daily)
.then((data) => {
    console.log(data[0].file_url);
})
```


## Issues

Do you have any issues or recommendations for this package? Feel free to open an issue in the [issue](https://github.com/LilithTundrus/e621-api/issues) section. I'm always happy to help :D


## License

This project is licensed under the MIT License - see the LICENSE.md file for details